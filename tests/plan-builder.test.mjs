import test from 'node:test';
import assert from 'node:assert/strict';
import {createPlanDraft,changePlanDraft,builderModels,planDraftErrors,previewPlanDraft,commitPlanDraft} from '../src/plan-builder.js';
import {initialState,newLine,newRow,clone,effectiveLine} from '../src/engine.js';
const fixture=()=>{const s=initialState().settings;return {s,sc:{id:'example',name:'Custom budget',lines:[],settings:s}};};
test('wizard draft uses profile workload and cannot change a saved scenario before confirmation',()=>{
 const {s,sc}=fixture(),before=JSON.stringify(sc),d=createPlanDraft(s);
 assert.equal(d.line.audience,'all');assert.equal(effectiveLine(d.line,s).users,10);
 changePlanDraft(d,'audience','regular',s);changePlanDraft(d,'billing','annual',s);d.step=3;
 assert.deepEqual(planDraftErrors(d,s,sc),[]);assert.equal(JSON.stringify(sc),before);
 const added=commitPlanDraft(d,sc,s);assert.equal(added.ok,true);assert.equal(sc.lines.length,0);assert.equal(added.scenario.lines.length,1);
 changePlanDraft(d,'profileShare',20,s);assert.equal(added.scenario.lines[0].profileShare,100);
});
test('technical draft defaults to API and manual detachment preserves its workload and schedule',()=>{
 const {s}=fixture();s.technical.count=2;s.technical.input=40;s.technical.output=2;s.technical.days=30;s.technical.workers=9;
 const d=createPlanDraft(s,'technical');assert.equal(d.line.kind,'api');assert.equal(d.line.rows[0].model,'dsflash');
 const before=previewPlanDraft(d,s).regular;changePlanDraft(d,'audience','manual',s);
 const after=previewPlanDraft(d,s).regular;assert.equal(d.line.users,2);assert.equal(after.high,before.high);assert.equal(d.line.scheduleOverride.days,30);
});
test('switching provider and payment method clears incompatible models and custom seat prices',()=>{
 const {s}=fixture(),d=createPlanDraft(s);changePlanDraft(d,'billing','annual',s);changePlanDraft(d,'provider','openai',s);
 assert.equal(d.line.billing,'monthly');assert.deepEqual(builderModels(d).map(m=>m.id),['luna']);
 changePlanDraft(d,'provider','custom',s);changePlanDraft(d,'unitPrice',333,s);changePlanDraft(d,'method','api',s);changePlanDraft(d,'provider','zai',s);changePlanDraft(d,'method','subscription',s);
 assert.equal(d.line.unitPrice,null);assert.ok(builderModels(d).every(m=>m.provider==='zai'));
});
test('step validation rejects missing quantities, out-of-range shares and incomplete custom rates',()=>{
 const {s,sc}=fixture(),d=createPlanDraft(s,'manual');changePlanDraft(d,'quantity',null,s);assert.ok(planDraftErrors(d,s,sc,0).length);
 changePlanDraft(d,'quantity',2,s);changePlanDraft(d,'row.0.share',70,s);assert.ok(planDraftErrors(d,s,sc,2).some(x=>x.includes('100')));
 changePlanDraft(d,'method','api',s);changePlanDraft(d,'provider','custom',s);assert.ok(planDraftErrors(d,s,sc,2).includes('Enter all four custom token prices.'));
 [2,2.5,.1,10].forEach((v,i)=>changePlanDraft(d,'rate.0.'+i,v,s));changePlanDraft(d,'row.0.share',100,s);
 assert.deepEqual(planDraftErrors(d,s,sc,3),[]);
 changePlanDraft(d,'input',null,s);assert.equal(commitPlanDraft(d,sc,s).ok,false);assert.equal(sc.lines.length,0);
});
test('review enforces combined team minima and rejects mixed GLM tiers',()=>{
 const {s,sc}=fixture(),d=createPlanDraft(s,'manual');changePlanDraft(d,'quantity',1,s);changePlanDraft(d,'plan','glm-team-standard',s);
 assert.ok(planDraftErrors(d,s,sc,3).some(x=>x.includes('minimum')));
 const existing=newLine('subscription','glm-team-standard',1);existing.audience='manual';sc.lines.push(existing);
 assert.deepEqual(planDraftErrors(d,s,sc,3),[]);
 sc.lines[0].plan='glm-team-premium';assert.ok(planDraftErrors(d,s,sc,3).some(x=>x.includes('cannot be mixed')));
 sc.lines[0].users=2;sc.lines[0].seats=2;changePlanDraft(d,'quantity',2,s);changePlanDraft(d,'org','separate-team',s);assert.deepEqual(planDraftErrors(d,s,sc,3),[]);
});
test('OpenRouter only offers catalogue routes and model mixtures retain exact token shares',()=>{
 const {s,sc}=fixture(),d=createPlanDraft(s);changePlanDraft(d,'method','api',s);changePlanDraft(d,'provider','openrouter',s);
 assert.equal(d.line.kind,'openrouter');assert.ok(!builderModels(d).some(m=>m.id==='custom'||m.id==='astra'));
 d.line.rows=[newRow('glm',20),newRow('flash',80)];assert.deepEqual(planDraftErrors(d,s,sc,3),[]);
 const quote=previewPlanDraft(d,s).regular;assert.ok(quote.valid&&quote.feeHigh>0);
});
test('quota shortage remains visible and enabling fallback prices the uncovered workload',()=>{
 const {s,sc}=fixture(),d=createPlanDraft(s,'heavy');d.line.rows=[newRow('glm')];
 assert.equal(previewPlanDraft(d,s).regular.covered,false);
 changePlanDraft(d,'overflow','payg',s);const quote=previewPlanDraft(d,s).regular;assert.equal(quote.covered,true);assert.ok(quote.usageHigh>0);
 assert.equal(commitPlanDraft(d,sc,s).ok,true);
});
test('backtracking keeps selections, and committing at the plan limit is rejected',()=>{
 const {s,sc}=fixture(),d=createPlanDraft(s);changePlanDraft(d,'audience','light',s);changePlanDraft(d,'row.0.cache',60,s);d.step=3;const before=clone(d.line);d.step=2;d.step=1;d.step=2;d.step=3;assert.deepEqual(d.line,before);
 sc.lines=Array.from({length:50},()=>{const l=newLine('api');l.rows=[newRow('flash')];return l;});const result=commitPlanDraft(d,sc,s);assert.equal(result.ok,false);assert.equal(sc.lines.length,50);
});
