import test from 'node:test';
import assert from 'node:assert/strict';
import {MODEL} from '../src/catalog.js';
import {GATEWAY_PROVIDERS} from '../src/gateway-catalog.js';
import {gatewayAccessCost} from '../src/gateway-billing.js';
import {DEFAULT_SETTINGS,newLine,newRow,calculateLine,calculateScenario,lineErrors,forecast} from '../src/engine.js';
import {allocateForecastMonth,budgetAnalytics} from '../src/analytics.js';

const S={...DEFAULT_SETTINGS,date:'2026-10-20',tax:0,fx:95};
const near=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-7,`${actual} != ${expected}`);
const PROXY='proxyapi26-openai-gpt-6-1-sol';
const POLZA='polza26-openai-gpt-6-1-sol-openai';
const VSE='vsegpt26-openai-gpt-6-1-sol-medium';
const BASIC='vsegpt26-z-ai-glm-5-3-flash-low';
function gateway(model,input=20,output=1,users=1){
 const line=newLine('api','glm-pro',users);
 return Object.assign(line,{apiProvider:MODEL[model].provider,period:'team-month',input,output,org:'gateway-test',rows:[newRow(model)]});
}
function vse(model=VSE,users=1,input=0,output=0){
 const line=gateway(model,input,output,users);
 Object.assign(line,{gatewayAccessTier:'professional',gatewayMemberTier:'professional'});
 line.rows[0].customRates=[100,125,10,500]; // Explicit hypothetical quote; never sourced from character prices.
 return line;
}
const run=(line,settings=S)=>calculateScenario({lines:[line]},settings);

test('ProxyAPI exact RUB token tariff includes published VAT without another automatic 5%',()=>{
 const line=gateway(PROXY),result=run(line);
 assert.equal(result.valid,true);
 const rub=4*525+16*21+2100;
 near(result.api,rub/95);near(result.lines[0].rubLow,rub);
 assert.equal(MODEL[PROXY].vatIncluded,true);
 assert.equal(GATEWAY_PROVIDERS.proxyapi.vat_percent,5);
 near(result.fees,0);
 assert.ok(result.lines[0].notes.some(n=>n.includes('prices include 5% VAT')));
 // The user's explicit tax field is an additional surcharge; zero is the default.
 near(run(line,{...S,tax:5}).lines[0].rubLow,rub*1.05);
});

test('RUB invoice remains unchanged across FX; ProxyAPI batch prices are already discounted',()=>{
 const line=gateway(PROXY),rub=4536;
 for(const fx of [70,95,120]){
  const result=run(line,{...S,fx});near(result.low,rub/fx);near(result.lines[0].rubLow,rub);
 }
 line.rows=[newRow(PROXY+'-batch')];
 near(run(line).lines[0].rubLow,rub/2);
 line.rows[0].speed='batch';assert.equal(run(line).valid,false);
});

test('Polza standard and Flex are distinct pinned tariffs, with no second processing discount',()=>{
 const standard=gateway(POLZA),flex=gateway(POLZA+'-flex');
 const rub=4*292.449+16*11.69796+1169.796;
 near(run(standard).lines[0].rubLow,rub);near(run(flex).lines[0].rubLow,rub/2);
 assert.deepEqual(MODEL[POLZA].routing,{only:['openai'],allow_fallbacks:false});
 assert.deepEqual(MODEL[POLZA+'-flex'].routing,{only:['openai/flex'],allow_fallbacks:false});
 assert.equal(MODEL[POLZA+'-flex'].processing,'flex');
 flex.rows[0].speed='flex';assert.equal(run(flex).valid,false);
});

test('unconfirmed cache-write and long-context gateway prices cannot silently become zero',()=>{
 for(const id of ['proxyapi26-z-ai-glm-5-3','polza26-z-ai-glm-5-3-z-ai-fp8']){
  const line=gateway(id),row=line.rows[0];
  assert.equal(row.writes,0);assert.equal(run(line).valid,true);
  row.writes=100;assert.equal(run(line).valid,false);
  assert.ok(lineErrors(line,S).some(e=>e.includes('selected token category is unconfirmed')));
  row.customRates=[100,120,10,500];assert.equal(run(line).valid,true);
 }
 const line=gateway(POLZA);line.rows[0].long=100;
 assert.equal(run(line).valid,false);
 assert.ok(lineErrors(line,S).some(e=>e.includes('Long-context pricing is unconfirmed')));
});

test('VseGPT requires an explicit token quote even though its access price is known',()=>{
 const line=gateway(VSE);
 assert.equal(MODEL[VSE].requiresManualRates,true);
 assert.deepEqual(MODEL[VSE].rates,[null,null,null,null]);
 assert.equal(line.rows[0].cache,0);assert.equal(line.rows[0].writes,0);
 assert.equal(run(line).valid,false);
 assert.ok(lineErrors(line,S).some(e=>e.includes('Character prices cannot be converted automatically')));
 line.rows[0].customRates=[100,125,10,500];
 const result=run(line);assert.equal(result.valid,true);
 near(result.api,(20*100+500)/95);
 assert.ok(result.lines[0].gatewayAccess.monthlyUsd>0);
});

test('VseGPT Basic and Professional requirements apply to all accounts receiving a model',()=>{
 const professional=vse(VSE,18);
 professional.gatewayAccessTier='basic';assert.equal(run(professional).valid,false);
 professional.gatewayAccessTier='professional';assert.equal(run(professional).valid,true);
 professional.gatewayAccessTier='team10';professional.gatewayMemberTier='basic';assert.equal(run(professional).valid,false);
 professional.gatewayMemberTier='professional';assert.equal(run(professional).valid,true);
 const basic=vse(BASIC,18);basic.gatewayAccessTier='basic';basic.gatewayMemberTier='basic';
 assert.equal(run(basic).valid,true);
 basic.gatewayAccessTier='team10';assert.equal(run(basic).valid,true);
 basic.gatewayAccessTier='professional_3_days';assert.equal(run(basic).valid,false);
});

test('VseGPT Team10 includes its head access but each subaccount still needs a paid plan',()=>{
 const line=vse(VSE,18);line.gatewayAccessTier='team10';
 let access=gatewayAccessCost(line,S);
 assert.equal(access.heads,2);assert.equal(access.members,16);
 near(access.perPeriodRub,2*999+16*399);
 near(access.perPeriodRub,8382);
 // Exactly one head and ten subaccounts fit; eleven users do not require two heads.
 line.users=line.seats=11;access=gatewayAccessCost(line,S);
 assert.equal(access.heads,1);assert.equal(access.members,10);near(access.perPeriodRub,4989);
 // A basic-model team may use cheaper Basic subaccounts while heads retain included Professional access.
 const basic=vse(BASIC,18);basic.gatewayAccessTier='team10';basic.gatewayMemberTier='basic';
 near(gatewayAccessCost(basic,S).perPeriodRub,2*999+16*199);
});

test('VseGPT 30-day access has 13 purchases in a 365-day forecast and a 365/360 monthly equivalent',()=>{
 const line=vse(VSE,18);line.gatewayAccessTier='team10';
 const f=forecast({lines:[line]},S),periodRub=8382;
 assert.equal(f.year.valid,true);
 const renewals=f.months.reduce((sum,m)=>sum+m.result.lines[0].gatewayAccess.renewals,0);
 assert.equal(renewals,13);
 near(f.year.low,periodRub*13/95);
 near(f.regular.low,periodRub*365/360/95);
 near(f.months.reduce((sum,m)=>sum+m.result.low,0),periodRub*365/30/95);
 assert.equal(f.months[0].result.lines[0].gatewayAccess.renewals,2); // Oct20→Nov20 is 31 days.
 const november={...S,date:'2026-11-01'};
 assert.equal(gatewayAccessCost(line,november,0).renewals,1); // Nov1→Dec1 is exactly 30 days.
 assert.equal(gatewayAccessCost(line,november,1).renewals,2); // Dec1 and Dec31 renewals.
});

test('individual VseGPT access charges each developer or server account, independently of tokens',()=>{
 const line=vse(VSE,3);
 const access=gatewayAccessCost(line,S);
 assert.equal(access.heads,3);assert.equal(access.members,0);near(access.perPeriodRub,3*399);
 const result=run(line);near(result.api,0);assert.ok(result.low>0);
 line.users=line.seats=1;line.consumerType='technical';
 near(gatewayAccessCost(line,S).perPeriodRub,399);
});

test('VseGPT access and token spend reconcile in analytics for both cash and monthly cost',()=>{
 const line=vse(VSE,18,20,1);line.gatewayAccessTier='team10';
 const settings={...S,tax:20},scenario={lines:[line]},f=forecast(scenario,settings);
 assert.equal(f.year.valid,true);
 for(const basis of ['cash','cost']){
  for(const m of f.months){
   const atoms=allocateForecastMonth(m.result,settings,basis);
   near(atoms.reduce((sum,a)=>sum+a.low,0),basis==='cash'?m.result.cashLow:m.result.low);
   near(atoms.reduce((sum,a)=>sum+a.high,0),basis==='cash'?m.result.cashHigh:m.result.high);
   const access=atoms.filter(a=>a.model==='shared'&&a.provider==='vsegpt');
   near(access.reduce((sum,a)=>sum+a.high,0),(basis==='cash'?m.result.lines[0].gatewayAccess.cashUsd:m.result.lines[0].gatewayAccess.monthlyUsd)*1.2);
  }
  for(const dimension of ['group','provider','model']){
   const analytics=budgetAnalytics(scenario,settings,{basis,dimension,forecastResult:f});
   assert.equal(analytics.valid,true);
   near(analytics.categories.reduce((sum,c)=>sum+c.high,0),analytics.high);
   near(analytics.high,f.months.reduce((sum,m)=>sum+(basis==='cash'?m.result.cashHigh:m.result.high),0));
   if(dimension==='provider')assert.deepEqual(analytics.categories.map(c=>c.id),['vsegpt']);
  }
 }
});

test('gateway models reject wrong selected provider, mixed providers and subscription/OpenRouter misuse',()=>{
 const line=gateway(PROXY);
 line.apiProvider='polza';assert.equal(run(line).valid,false);
 assert.ok(lineErrors(line,S).some(e=>e.includes('matching API gateway')));
 delete line.apiProvider;assert.equal(run(line).valid,false);
 line.apiProvider='proxyapi';line.rows=[newRow(PROXY,50),newRow(POLZA,50)];
 assert.equal(run(line).valid,false);
 line.rows=[newRow(PROXY)];
 for(const kind of ['subscription','openrouter']){line.kind=kind;assert.equal(run(line).valid,false);}
 const direct=gateway(PROXY);direct.rows=[newRow('sol')];assert.equal(run(direct).valid,false);
});

test('unknown one-hour write tariff cannot silently use a cheaper default cache price',()=>{
 const line=gateway('proxyapi26-anthropic-claude-sonnet-5-5');line.rows[0].ttl='1h';
 assert.equal(run(line).valid,false);
 line.rows[0].customRates=[500,1000,50,2500];assert.equal(run(line).valid,true);
});
test('one VseGPT access group cannot be charged twice through separate model lines',()=>{
 const a=vse(),b=vse();assert.equal(calculateScenario({lines:[a,b]},S).valid,false);
 b.org='separate-paid-accounts';assert.equal(calculateScenario({lines:[a,b]},S).valid,true);
});
