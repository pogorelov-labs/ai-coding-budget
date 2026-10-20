import test from 'node:test';
import assert from 'node:assert/strict';
import {recommendSetup} from '../src/recommendations.js';
import {hybridPreset,clone,forecast,effectiveLine,parseImport,initialState} from '../src/engine.js';
import {PLAN} from '../src/catalog.js';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-6,`${a} != ${b}`);
const settings=()=>hybridPreset().settings;
const tokenTotals=(sc)=>forecast(sc,sc.settings).regular.lines.reduce((sum,l)=>{for(const row of l.rows){sum[0]+=row.vol.monthly[0];sum[1]+=row.vol.monthly[1];}return sum;},[0,0]);
test('18+1: same GLM mix selects Pro, Lite and metered light/server usage',()=>{
 const s=settings(),before=clone(s),r=recommendSetup(s);
 assert.equal(r.valid,true);near(r.forecast.regular.high,366.352);near(r.baseline.regular.high,766.136);near(r.saving,399.784);
 assert.deepEqual(r.scenario.lines.map(l=>[l.audience,l.kind,l.plan]),[['heavy','subscription','glm-pro'],['regular','subscription','glm-lite'],['light','api','glm-pro'],['technical','api','glm-pro']]);
 assert.deepEqual(s,before);assert.deepEqual(r.scenario.settings,s);tokenTotals(r.scenario).forEach((v,i)=>near(v,[4120,206][i]));
 assert.equal(r.compared,186);assert.equal(r.rejected,30);near(r.forecast.first.cashHigh,2907.352);
 assert.ok(r.reasons.every(x=>x.reason.length>20));
});
test('monthly and annual use their own prices and cash timing',()=>{
 const s=settings(),a=recommendSetup(s),m=recommendSetup(s,{billing:'monthly'});
 near(m.forecast.regular.high,465.352);near(m.forecast.first.cashHigh,465.352);
 assert.ok(a.forecast.first.cashHigh>m.forecast.first.cashHigh);assert.ok(a.forecast.regular.high<m.forecast.regular.high);
 const tax=clone(s);tax.tax=20;tax.fx=100;const taxed=recommendSetup(tax);near(taxed.forecast.regular.high,a.forecast.regular.high*1.2);near(taxed.reasons[0].alternative,a.reasons[0].alternative*1.2);
});
test('low usage chooses API instead of a fixed hybrid preset',()=>{
 const s=settings();s.profile.forEach(g=>{g.input=.01;g.output=.001;});const r=recommendSetup(s);
 assert.ok(r.scenario.lines.every(l=>l.kind==='api'));near(r.saving,0);assert.ok(r.forecast.regular.high<50);
});
test('hourly peak and cache changes affect the cost ranking',()=>{
 const s=settings();s.profile.forEach(g=>g.count=g.id==='regular'?1:0);s.team=1;s.technical.count=0;s.profile.find(g=>g.id==='regular').input=13;s.profile.find(g=>g.id==='regular').output=.65;
 const peak=clone(s);peak.peakMode='manual';peak.peak=100;
 const off=clone(s);off.peakMode='manual';off.peak=0;
 const a=recommendSetup(peak,{allowFallback:false}),b=recommendSetup(off,{allowFallback:false});
 assert.equal(a.scenario.lines[0].plan,'glm-pro');assert.equal(b.scenario.lines[0].plan,'glm-lite');assert.ok(b.forecast.regular.high<a.forecast.regular.high);
 const cached=recommendSetup(s,{cache:100}),uncached=recommendSetup(s,{cache:0});assert.notEqual(cached.forecast.regular.high,uncached.forecast.regular.high);
});
test('team-only selection respects combined minimum and cannot mix tiers',()=>{
 const s=settings(),r=recommendSetup(s,{requireTeam:true});near(r.forecast.regular.high,1470.84);assert.ok(r.scenario.lines.filter(l=>l.audience!=='technical').every(l=>l.plan==='glm-team-standard'));
 s.profile.forEach(g=>g.count=g.id==='heavy'?1:0);s.team=1;s.technical.count=0;assert.equal(recommendSetup(s,{requireTeam:true}).valid,false);
 s.profile.find(g=>g.id==='regular').count=1;s.team=2;const two=recommendSetup(s,{requireTeam:true});assert.equal(two.valid,true);assert.equal(new Set(two.scenario.lines.map(l=>l.plan)).size,1);
});
test('extreme workloads never return an uncovered cheap subscription',()=>{
 const s=settings();s.profile.forEach(g=>{g.input=500;g.output=25;});
 const fallback=recommendSetup(s),noFallback=recommendSetup(s,{allowFallback:false});
 assert.equal(fallback.forecast.regular.covered,true);assert.equal(noFallback.forecast.regular.covered,true);
 assert.ok(fallback.scenario.lines.some(l=>l.kind==='subscription'&&l.overflow==='payg'));assert.ok(noFallback.scenario.lines.every(l=>l.kind==='api'));
 assert.ok(fallback.forecast.regular.high<=noFallback.forecast.regular.high);assert.ok(fallback.reasons.some(r=>/separate API fallback|Team overage/.test(r.reason)));
});
test('keeping Codex preserves one workload and exposes uncertainty',()=>{
 const s=settings(),r=recommendSetup(s,{keepCodex:true});near(r.forecast.regular.low,526.352);near(r.forecast.regular.high,828.192);assert.equal(r.forecast.regular.range,true);
 const c=r.scenario.lines.find(l=>l.plan==='oai-business');assert.equal(effectiveLine(c,s).seats,8);assert.equal(c.profileShare,10);assert.equal(c.coverageMode,'unknown');
 tokenTotals(r.scenario).forEach((v,i)=>near(v,[4120,206][i]));
 s.profile[0].count=1;s.profile[1].count=0;s.profile[2].count=0;s.team=1;assert.equal(recommendSetup(s,{keepCodex:true}).valid,false);
});
test('models are held fixed; unknown Claude/OpenAI allowances cannot win as unlimited',()=>{
 for(const mix of ['openai','claude','deepseek']){const r=recommendSetup(settings(),{mix});assert.equal(r.valid,true);assert.ok(r.scenario.lines.every(l=>l.kind==='api'));assert.equal(r.forecast.regular.range,false);}
 assert.equal(recommendSetup(settings(),{mix:'claude',requireTeam:true}).valid,false);
});
test('server-only and empty profiles, invalid inputs, and JSON compatibility',()=>{
 const s=settings();s.profile.forEach(g=>g.count=0);s.team=0;const r=recommendSetup(s);near(r.forecast.regular.high,45.24);assert.equal(r.scenario.lines.length,1);assert.equal(r.scenario.lines[0].kind,'api');
 s.technical.count=0;assert.equal(recommendSetup(s).valid,false);assert.equal(recommendSetup(settings(),{cache:NaN}).valid,false);assert.equal(recommendSetup(settings(),{cache:-1}).valid,false);
 const state=initialState();state.scenarios.push(r.scenario);assert.doesNotThrow(()=>parseImport(JSON.stringify(state)));
});
