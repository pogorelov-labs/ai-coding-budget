import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,defaultProfile,newLine,newRow,calculateScenario,forecast,clone,workspaceAnalysis,parseImport} from '../src/engine.js';
import {createPlanDraft,changePlanDraft,chooseTeamPlan,planDraftErrors,commitPlanDraft} from '../src/plan-builder.js';
import {allocateForecastMonth,budgetAnalytics} from '../src/analytics.js';
import {TEAM_LIMITS} from '../src/workspace-seats.js';
import {translateUI} from '../src/i18n.js';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-6,`${a} != ${b}`);
function settings(n=10){const s=initialState().settings;s.team=n;s.profile=defaultProfile(n);return s;}
function item(plan='oai-business',audience='all',share=100){
 const l=newLine('subscription',plan,10);
 return Object.assign(l,{audience,profileShare:share,spareSeats:0,coverageMode:'manual',coverage:100,rows:[newRow(plan.startsWith('glm')?'glm':plan.startsWith('claude')?'sonnet':'sol')]});
}
const result=(lines,s=settings())=>calculateScenario({lines},s);
test('two workload items for the same ten people charge ten seats and retain all tokens',()=>{
 const a=item('oai-business','all',50),b=item('oai-business','all',50),s=settings();
 const q=result([a,b],s),single=result([item()],s);
 assert.equal(q.valid,true);near(q.seat,250);near(q.api,single.api);
 assert.equal(q.workspaces[0].memberCount,10);assert.equal(q.workspaces[0].count,10);
 assert.ok(q.lines.every(r=>r.sharedSeats));near(q.lines[0].billedSeats,5);
 near(result([b,a],s).high,q.high);
 near(result([b],s).seat,250);
});
test('overlapping all and power groups form a union, while providers and workspaces stay independent',()=>{
 const s=settings();s.profile=defaultProfile(10,true);
 const a=item('oai-business','all',50),b=item('oai-business','heavy',50);
 near(result([a,b],s).seat,250);
 b.org='Other';near(result([a,b],s).seat,325);
 b.org='main';b.plan='claude-team';b.rows=[newRow('sonnet')];near(result([a,b],s).seat,325);
 const personalA=item('oai-plus','all',50),personalB=item('oai-plus','all',50);
 near(result([personalA,personalB],s).seat,400);
});
test('shared annual prepayments, confirmed intro and tax are charged once and forecasts do not mutate input',()=>{
 const a=item('oai-business','all',50),b=item('oai-business','all',50),s=settings();
 s.tax=20;
 for(const l of [a,b])Object.assign(l,{billing:'annual',intro:10,introConfirmed:true});
 const sc={lines:[a,b]},before=clone(sc),f=forecast(sc,s);
 near(f.regular.high,240);near(f.year.high,2592);near(f.first.cashHigh,2592);
 assert.deepEqual(sc,before);
 for(const m of f.months){const atoms=allocateForecastMonth(m.result,s);near(atoms.reduce((n,a)=>n+a.high,0),m.result.cashHigh);}
});
test('analytics allocates reused seats to the correct unique profile groups',()=>{
 const s=settings();s.profile=defaultProfile(10,true);
 const a=item('oai-business','all',50),b=item('oai-business','heavy',50);
 const analytics=budgetAnalytics({lines:[a,b]},s,{dimension:'group'});
 near(analytics.categories.find(g=>g.id==='heavy').high,3*25*12);
 near(analytics.categories.find(g=>g.id==='regular').high,5*25*12);
 near(analytics.categories.find(g=>g.id==='light').high,2*25*12);
});
test('GLM shares quota as well as seats; splitting usage cannot manufacture included allowance',()=>{
 const s=settings();s.profile[1].input=180;s.profile[1].output=9;
 const a=item('glm-team-standard','all',50),b=item('glm-team-standard','all',50),whole=item('glm-team-standard');
 const stopped=result([a,b],s);
 assert.equal(stopped.covered,false);assert.equal(stopped.workspaces[0].count,10);
 for(const l of [a,b,whole])l.overflow='payg';
 const shared=result([a,b],s),single=result([whole],s);
 assert.equal(shared.valid,true);near(shared.seat,single.seat);near(shared.high,single.high);
 near(shared.lines[0].quota.weekly,single.lines[0].quota.weekly);
 near(shared.lines[0].quota.fraction,single.lines[0].quota.fraction);
});
test('GLM quota sharing respects different profile cohorts without pooling spare capacity',()=>{
 const s=settings();s.profile=defaultProfile(10,true);s.profile[0].input=500;s.profile[0].output=25;
 const a=item('glm-team-standard','all',50),b=item('glm-team-standard','heavy',50);
 const baseline=[item('glm-team-standard','heavy',100),item('glm-team-standard','regular',50),item('glm-team-standard','light',50)];
 for(const l of [a,b,...baseline])l.overflow='payg';
 near(result([a,b],s).high,result(baseline,s).high);
});
test('shared seats reject conflicting tiers and purchase terms while disjoint Claude tiers work',()=>{
 const a=item('claude-team'),b=item('claude-premium');
 assert.ok(workspaceAnalysis({lines:[a,b]},settings()).issues.some(i=>i.code==='member-tier'));
 b.plan='claude-team';b.billing='annual';
 assert.ok(workspaceAnalysis({lines:[a,b]},settings()).issues.some(i=>i.code==='purchase-terms'));
 b.billing='monthly';b.discount=5;
 assert.equal(result([a,b]).valid,false);
 const s=settings();s.profile=defaultProfile(10,true);
 a.audience='heavy';b.audience='regular';b.plan='claude-premium';b.discount=0;
 assert.equal(result([a,b],s).valid,true);
 a.plan='glm-team-standard';b.plan='glm-team-premium';a.rows=b.rows=[newRow('flash')];
 assert.ok(workspaceAnalysis({lines:[a,b]},s).issues.some(i=>i.code==='mixed-tiers'));
});
test('manual member groups explicitly reuse people; legacy anonymous groups remain separate',()=>{
 const a=item('oai-business','manual'),b=item('oai-business','manual');
 near(result([a,b]).seat,500);
 a.memberGroup=b.memberGroup='Developers';near(result([a,b]).seat,250);
 a.users=a.seats=b.users=b.seats='10';near(result([a,b]).seat,250);
 b.users=b.seats=9;assert.ok(workspaceAnalysis({lines:[a,b]},settings()).issues.some(i=>i.code==='member-count'));
});
test('shared Claude seats do not duplicate automatically linked API credits',()=>{
 const s=settings(2),a=item('claude-team','all',50),b=item('claude-team','all',50);
 b.org=' main ';
 const api=newLine('api','claude-team',1);
 Object.assign(api,{period:'team-month',input:0,output:100,rows:[newRow('sonnet')],bonusSource:a.id,bonusConfirmed:true});
 const q=result([a,b,api],s);assert.equal(q.valid,true);near(q.lines[2].bonusUsed,40);
});
test('verified caps use unique members and fail at the Plan step, before usage or confirmation',()=>{
 const s=settings(151),sc={lines:[]},d=createPlanDraft(s);chooseTeamPlan(d,'claude-team',s);
 assert.ok(planDraftErrors(d,s,sc,1).some(e=>e.includes('151 paid seats; limit 150; 1 over')));
 assert.equal(commitPlanDraft(d,sc,s).ok,false);
 const within=settings(150),a=item('claude-team','all',50),b=item('claude-team','all',50);
 assert.equal(result([a,b],within).valid,true);assert.equal(result([a,b],within).workspaces[0].count,150);
 const openai=settings(201),oa=createPlanDraft(openai);chooseTeamPlan(oa,'oai-business',openai);
 assert.deepEqual(planDraftErrors(oa,openai,sc,1),[]);assert.equal(TEAM_LIMITS.openai.kind,'unverified');
 assert.equal(TEAM_LIMITS.glm.kind,'unlimited');assert.equal(TEAM_LIMITS.anthropic.max,150);
});
test('one person can explicitly purchase an unused seat to meet the workspace minimum',()=>{
 const s=settings(1),d=createPlanDraft(s),sc={lines:[]};chooseTeamPlan(d,'claude-team',s);
 assert.ok(planDraftErrors(d,s,sc,1).some(e=>e.includes('minimum 2')));
 changePlanDraft(d,'spareSeats',1,s);assert.deepEqual(planDraftErrors(d,s,sc,1),[]);
 const q=result([d.line],s);near(q.seat,50);assert.equal(q.workspaces[0].memberCount,1);assert.equal(q.workspaces[0].spare,1);
 const manual=createPlanDraft(s,'manual');chooseTeamPlan(manual,'claude-team',s);changePlanDraft(manual,'spareSeats',1,s);
 assert.equal(manual.line.users,1);assert.equal(manual.line.seats,2);
});
test('a repeated declaration of the same unused-seat pool is not charged twice',()=>{
 const a=item('claude-team','all',50),b=item('claude-team','all',50),s=settings();
 a.spareSeats=b.spareSeats=2;
 const q=result([a,b],s);assert.equal(q.valid,true);assert.equal(q.workspaces[0].spare,2);
 assert.equal(q.workspaces[0].count,12);near(q.seat,300);
 const atoms=allocateForecastMonth(q,s,'cost');
 near(atoms.filter(a=>a.group==='spare').reduce((n,a)=>n+a.high,0),50);
});
test('manual group naming, imports and direct Codex/Claude selection preserve user intent',()=>{
 const s=settings(),a=createPlanDraft(s,'manual'),b=createPlanDraft(s,'manual',{lines:[a.line]});
 assert.notEqual(a.line.memberGroup,b.line.memberGroup);
 chooseTeamPlan(a,'oai-business',s);assert.equal(a.provider,'openai');assert.equal(a.line.rows[0].model,'sol');
 chooseTeamPlan(b,'claude-team',s);assert.equal(b.provider,'anthropic');assert.equal(b.line.rows[0].model,'sonnet');
 const state=initialState();state.scenarios[0].lines=[a.line,b.line];
 assert.equal(parseImport(JSON.stringify(state)).scenarios[0].lines[0].memberGroup,a.line.memberGroup);
 const message='Workspace \"Test\": 151 paid seats; limit 150; 1 over. Reduce seats or choose Enterprise/API.';
 assert.match(translateUI(message,'ru'),/превышение на 1/);
});
