import test from 'node:test';
import assert from 'node:assert/strict';
import {runningPlanCost} from '../src/running-cost.js';
import {createPlanDraft,changePlanDraft} from '../src/plan-builder.js';
import {initialState,newLine,newRow,clone} from '../src/engine.js';
import {PLAN} from '../src/catalog.js';

const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-6,`${a} != ${b}`);
function fixture(){
 const s=initialState().settings,sc={id:'estimate',name:'Estimate',lines:[],settings:s};
 return {s,sc,d:createPlanDraft(s,'manual')};
}
function direct({s,d}){
 changePlanDraft(d,'method','api',s);
 changePlanDraft(d,'provider','deepseek',s);
 changePlanDraft(d,'period','team-month',s);
 changePlanDraft(d,'input',10,s);
 changePlanDraft(d,'output',1,s);
}
test('running quote follows token volume, model and cached input without changing saved state',()=>{
 const f=fixture();direct(f);const {d,s,sc}=f,before=clone(sc);
 const first=runningPlanCost(d,s,sc);assert.equal(first.valid,true);assert.equal(first.hasExisting,false);
 changePlanDraft(d,'input',20,s);changePlanDraft(d,'output',2,s);
 near(runningPlanCost(d,s,sc).draft.high,first.draft.high*2);
 changePlanDraft(d,'row.0.model','dspro',s);
 const pro=runningPlanCost(d,s,sc).draft.high;assert.ok(pro>first.draft.high*2);
 changePlanDraft(d,'row.0.cache',100,s);
 assert.ok(runningPlanCost(d,s,sc).draft.high<pro);
 assert.deepEqual(sc,before);
});
test('annual running cost is a monthly equivalent and includes the entered tax',()=>{
 const {d,s,sc}=fixture();changePlanDraft(d,'quantity',2,s);changePlanDraft(d,'period','team-month',s);changePlanDraft(d,'input',1,s);changePlanDraft(d,'output',.1,s);s.tax=20;
 const monthly=runningPlanCost(d,s,sc);assert.equal(monthly.valid,true);near(monthly.draft.high,PLAN['glm-lite'].monthly*2*1.2);
 changePlanDraft(d,'billing','annual',s);
 const annual=runningPlanCost(d,s,sc);near(annual.draft.high,PLAN['glm-lite'].annual*2*1.2);assert.ok(annual.draft.high<monthly.draft.high);
});
test('incomplete quantities, shares and custom rates cannot produce a zero or stale quote',()=>{
 const {d,s,sc}=fixture();changePlanDraft(d,'quantity',null,s);
 assert.equal(runningPlanCost(d,s,sc).draft,null);
 changePlanDraft(d,'quantity',2,s);changePlanDraft(d,'row.0.share',70,s);
 const share=runningPlanCost(d,s,sc);assert.equal(share.valid,false);assert.equal(share.setup,null);assert.ok(share.errors.length);
 changePlanDraft(d,'method','api',s);changePlanDraft(d,'provider','custom',s);changePlanDraft(d,'row.0.share',100,s);
 const custom=runningPlanCost(d,s,sc);assert.equal(custom.valid,false);assert.ok(custom.errors.includes('Enter all four custom token prices.'));
 [1,1,.1,3].forEach((value,i)=>changePlanDraft(d,'rate.0.'+i,value,s));
 assert.equal(runningPlanCost(d,s,sc).valid,true);
 changePlanDraft(d,'input',null,s);assert.equal(runningPlanCost(d,s,sc).draft,null);
});
test('unknown subscription allowance retains both bounds of the running range',()=>{
 const {d,s,sc}=fixture();changePlanDraft(d,'provider','openai',s);changePlanDraft(d,'plan','oai-plus',s);
 const q=runningPlanCost(d,s,sc);assert.equal(q.valid,true);assert.equal(q.draft.range,true);assert.ok(q.draft.high>q.draft.low);near(q.setup.high,q.draft.high);
});
test('uncovered usage is explicit and adding fallback increases the running estimate',()=>{
 const {s,sc}=fixture(),d=createPlanDraft(s,'heavy');d.line.rows=[newRow('glm')];
 const stopped=runningPlanCost(d,s,sc);assert.equal(stopped.valid,true);assert.equal(stopped.draft.covered,false);
 changePlanDraft(d,'overflow','payg',s);
 const paid=runningPlanCost(d,s,sc);assert.equal(paid.draft.covered,true);assert.ok(paid.draft.high>stopped.draft.high);
});
test('workspace minima and mixed team tiers invalidate the quote until the complete setup qualifies',()=>{
 const {d,s,sc}=fixture();changePlanDraft(d,'quantity',1,s);changePlanDraft(d,'plan','glm-team-standard',s);
 assert.equal(runningPlanCost(d,s,sc).valid,false);
 const existing=newLine('subscription','glm-team-standard',1);existing.audience='manual';sc.lines.push(existing);
 const combined=runningPlanCost(d,s,sc);assert.equal(combined.valid,true);assert.equal(combined.hasExisting,true);assert.ok(combined.setup.high>combined.draft.high);
 existing.plan='glm-team-premium';
 const mixed=runningPlanCost(d,s,sc);assert.equal(mixed.valid,false);assert.equal(mixed.draft,null);assert.ok(mixed.errors.some(x=>x.includes('смешивать')));
});
test('combined running quote includes existing subscriptions, API funding fees and tax',()=>{
 const {d,s,sc}=fixture();changePlanDraft(d,'method','api',s);changePlanDraft(d,'provider','openrouter',s);changePlanDraft(d,'period','team-month',s);changePlanDraft(d,'input',.001,s);changePlanDraft(d,'output',.0001,s);
 const existing=newLine('subscription','glm-lite',1);existing.audience='manual';existing.input=0;existing.output=0;sc.lines=[existing];s.tax=20;
 const q=runningPlanCost(d,s,sc);assert.equal(q.valid,true);
 assert.ok(q.draft.high>=.8*1.2);
 near(q.setup.high-q.draft.high,PLAN['glm-lite'].monthly*1.2);
});
