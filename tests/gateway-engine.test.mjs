import test from 'node:test';
import assert from 'node:assert/strict';
import {MODEL,ROUTES} from '../src/catalog.js';
import {DEFAULT_SETTINGS as S,newLine,newRow,costRow,calculateLine,calculateScenario,lineErrors,clone} from '../src/engine.js';

const near=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-9,`${actual} != ${expected}`);
const run=(lines,s=S)=>calculateScenario({lines},s);
function router(model='or26-sol',input=20,output=1){
 const line=newLine('openrouter','glm-pro',1);
 return Object.assign(line,{period:'team-month',input,output,routerFeeScope:'account',org:'test-account',rows:[newRow(model)]});
}

test('dated OpenRouter rows choose exact real default routes and cost a known request mix',()=>{
 for(const [model,route,expected] of [
  ['or26-sol','openai',21.6],['or26-luna','openai',1.16],
  ['or26-sonnet','anthropic',21.6],['or26-opus','anthropic',43.2],
  ['or26-glm','z-ai/fp8',14.16],['or26-flash','z-ai/fp8',1.58],
  ['or26-dsflash','sail-research/fp4',0.66176]
 ]){
  const line=router(model),row=line.rows[0],result=calculateLine(line,S);
  assert.equal(row.route,route);
  assert.ok(result.valid,JSON.stringify(result.errors));
  near(result.api,expected);
 }
});

test('unpublished cache-write prices default to ordinary input and reject a distinct unpriced write bucket',()=>{
 const line=router('or26-glm'),row=line.rows[0];
 assert.equal(row.writes,0);
 near(calculateLine(line,S).api,4*1.4+16*.26+4.4);
 row.writes=100;
 assert.equal(calculateLine(line,S).valid,false);
 assert.ok(lineErrors(line,S).some(e=>e.includes('price for the selected token category is unconfirmed')));
 row.customRates=[1.4,1.6,.26,4.4];
 const manual=calculateLine(line,S);
 assert.equal(manual.valid,true);
 near(manual.api,4*1.6+16*.26+4.4);
 row.customRates=null;row.cache=100;
 assert.equal(calculateLine(line,S).valid,true); // Zero write quantity needs no fabricated tariff.
 near(calculateLine(line,S).api,20*.26+4.4);
});

test('current route rates do not reapply published discounts or inherit another host pricing',()=>{
 const line=router('or26-flash'),row=line.rows[0];row.route='streamlake/fp8';
 const result=calculateLine(line,S);
 assert.equal(result.valid,true);
 near(result.api,4*.073845+16*.014769+.24615);
 assert.equal(result.rows[0].time,null);
});

test('timed DeepSeek vendor uses the Moscow workday while fixed alternatives override timed model defaults',()=>{
 const line=router('or26-dspro',1,0),row=line.rows[0];row.cache=0;
 near(calculateLine(line,S).api,1.32*4/9+.66*5/9);
 near(calculateLine(line,{...S,peakMode:'manual',peak:0}).api,.66);
 near(calculateLine(line,{...S,peakMode:'manual',peak:100}).api,1.32);
 for(const [route,expected] of [['streamlake',.66],['sail-research/fp4',.896]]){
  row.route=route;
  for(const peak of [0,100]){
   const result=calculateLine(line,{...S,peakMode:'manual',peak});
   near(result.api,expected);assert.equal(result.rows[0].time,null);
  }
 }
 // The original model is timed too; its fixed historical routes must remain fixed.
 const legacy=router('dspro',1,0);legacy.rows[0].cache=0;legacy.rows[0].route='streamlake';
 for(const peak of [0,100])near(calculateLine(legacy,{...S,peakMode:'manual',peak}).api,.66);
});

test('route-specific long-context and cache TTL prices retain published multipliers and surcharges',()=>{
 const line=router('or26-sol'),row=line.rows[0];row.long=100;
 near(calculateLine(line,S).api,4*5+16*.2+15);
 row.route='azure/eu';
 near(calculateLine(line,S).api,4*5.5+16*.22+16.5);
 assert.equal(ROUTES['or26-sol'][0].thresholdComparison,'gt');
 const claude=router('or26-opus');claude.rows[0].ttl='1h';
 near(calculateLine(claude,S).api,4*8+16*.2+20);
 assert.equal(ROUTES['or26-opus'][0].long,null);
});

test('gateway-only models cannot enter direct API or coding-subscription calculations',()=>{
 const line=router('or26-sol');
 for(const kind of ['api','subscription']){
  line.kind=kind;
  assert.equal(calculateLine(line,S).valid,false);
  assert.ok(lineErrors(line,S).some(e=>e.includes('only available through its listed gateway')));
 }
 line.kind='openrouter';line.rows[0].speed='batch';
 assert.equal(calculateLine(line,S).valid,false);
});

test('shared-account funding minimum is applied once and allocated without changing the combined total',()=>{
 const a=router('or26-luna',0,1),b=router('or26-luna',0,2);
 let result=run([a,b]);assert.equal(result.valid,true);near(result.api,1.5);near(result.fees,.8);near(result.low,2.3);
 near(result.lines[0].feeHigh,.8/3);near(result.lines[1].feeHigh,1.6/3);
 near(run([b,a]).low,result.low);
 const merged=router('or26-luna',0,3);near(run([merged]).low,result.low);
 for(const l of [a,b])l.topups=2;
 result=run([a,b],{...S,tax:20});near(result.fees,1.6);near(result.low,(1.5+1.6)*1.2);
 b.org='different-account';near(run([a,b]).fees,3.2);
 a.output=b.output=0;near(run([a,b]).fees,0);
});

test('shared-account proportional funding fee overtakes minimum at meaningful usage',()=>{
 const a=router('or26-sol',0,10),b=router('or26-sol',0,20);
 near(run([a,b]).fees,300*.055);
 a.routerPlan=b.routerPlan='business';near(run([a,b]).fees,300*.08);
});

test('one account rejects conflicting funding settings and repeated oversized startup awards',()=>{
 for(const [key,value] of [['routerPlan','business'],['feeMin',1],['topups',2],['startup',true],['startupDate','2026-11-01']]){
  const a=router('or26-luna',0,1),b=clone(a);b.id+='b';b[key]=value;
  const result=run([a,b]);
  assert.equal(result.valid,false,`${key} conflict was accepted`);
  assert.ok(result.errors.some(e=>e.includes('same funding settings')));
 }
 const a=router('or26-luna'),b=router('or26-luna');a.startupGrant=b.startupGrant=2000;
 assert.equal(run([a,b]).valid,false);
 a.routerFeeScope='unsupported';assert.ok(lineErrors(a,S).some(e=>e.includes('funding-fee scope')));
});

test('shared-account BYOK fee and paid inference require only one funding purchase',()=>{
 const paid=router('or26-luna',0,2),own=router('or26-luna',0,2);
 own.routerPlan='byok';own.byokPrior=25000;
 const result=run([paid,own]);
 assert.equal(result.valid,true);
 near(result.api,2);
 // $1 direct-provider invoice + $1 OpenRouter inference + $.05 BYOK fee.
 // Purchase $1.05 of shared-account credits: one $.80 minimum, not two.
 near(result.fees,.85);
 near(result.low,2.85);
});

test('legacy saved route rates and funding scope keep their original estimate',()=>{
 const a=router('glm');a.rows[0].route='relace';delete a.routerFeeScope;
 const b=router('glm');b.rows[0].route='relace';delete b.routerFeeScope;
 const expected=4*.0632+16*.0588+4.4;
 near(run([a]).api,expected);near(run([a]).fees,.8);near(run([a,b]).fees,1.6);
 assert.deepEqual(ROUTES.glm.find(r=>r.id==='relace').rates,[.0632,.0632,.0588,4.4]);
 assert.deepEqual(ROUTES.dsflash.find(r=>r.id==='sail').rates,[.09,.09,.006,.3]);
 assert.deepEqual(ROUTES.dspro.find(r=>r.id==='sail').rates,[.448,.448,.0935,1.164]);
});

test('native RUB rates convert once, preserve ruble totals across FX and treat custom rates in native currency',()=>{
 const id='gateway-test-rub',old=MODEL[id];
 MODEL[id]={id,name:'RUB test fixture',provider:'proxyapi',gatewayOnly:true,allowedKinds:['api'],rates:[95,190,9.5,950],currency:'RUB',cacheWriteKnown:true};
 try{
  const line=router(id);line.kind='api';line.apiProvider='proxyapi';
  const r95=run([line],{...S,fx:95}),r100=run([line],{...S,fx:100});
  assert.equal(r95.valid,true);assert.equal(r100.valid,true);
  near(r95.api,1862/95);near(r100.api,1862/100);
  near(r95.lines[0].rubLow,1862);near(r100.lines[0].rubLow,1862);
  line.rows[0].customRates=[100,200,10,1000];
  const custom=run([line],{...S,fx:100,tax:20});near(custom.api,19.6);near(custom.lines[0].rubLow,2352);
 }finally{if(old===undefined)delete MODEL[id];else MODEL[id]=old;}
});
