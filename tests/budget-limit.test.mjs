import test from 'node:test';
import assert from 'node:assert/strict';
import {budgetErrors,budgetBalance,convertBudgetCurrency,cartGroups} from '../src/budget-limit.js';
import {initialState,newLine,forecast,parseImport,clone} from '../src/engine.js';
import {PLAN} from '../src/catalog.js';
import {translateUI} from '../src/i18n.js';

const settings={fx:95},budget=(amount,period='monthly',currency='USD')=>({amount,period,currency});
const quote=(low,high=low)=>({regular:{valid:true,covered:true,low,high},year:{valid:true,low:low*12,high:high*12}});
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-6,`${a} != ${b}`);
test('blank means no limit, while zero is an explicit budget',()=>{
 assert.equal(budgetBalance(undefined,settings,quote(20)).enabled,false);
 assert.equal(budgetBalance(budget(null),settings,quote(20)).enabled,false);
 const q=budgetBalance(budget(0),settings,quote(20));assert.equal(q.status,'over');near(q.high,20);
 assert.equal(budgetBalance(budget(0),settings,quote(0)).status,'at-limit');
});
test('remaining budget, exact limit, possible overspend and definite overspend retain bounds',()=>{
 const within=budgetBalance(budget(100),settings,quote(60,80));assert.equal(within.status,'within');near(within.low,20);near(within.high,40);
 assert.equal(budgetBalance(budget(100),settings,quote(100)).status,'at-limit');
 const possible=budgetBalance(budget(100),settings,quote(80,130));assert.equal(possible.status,'possible');near(possible.low,0);near(possible.high,30);
 const over=budgetBalance(budget(100),settings,quote(110,130));assert.equal(over.status,'over');near(over.low,10);near(over.high,30);
});
test('native RUB limits follow scenario FX without changing the entered limit',()=>{
 const b=budget(9500,'monthly','RUB'),before=clone(b);
 near(budgetBalance(b,{fx:95},quote(80)).low*95,1900);
 near(budgetBalance(b,{fx:100},quote(80)).low*100,1500);
 assert.deepEqual(b,before);
 const usd=convertBudgetCurrency(b,'USD',95);assert.equal(usd.amount,100);
 assert.deepEqual(convertBudgetCurrency(usd,'RUB',95),b);
});
test('annual limits compare against the payment ledger including introductory prepayments',()=>{
 const s=initialState().settings,line=newLine('subscription','glm-lite',1);
 Object.assign(line,{input:0,output:0,billing:'annual',intro:10,introConfirmed:true});
 const f=forecast({lines:[line]},s),paid=PLAN['glm-lite'].annual*12*.9;
 near(f.year.high,paid);
 const q=budgetBalance(budget(paid,'annual'),s,f);assert.equal(q.status,'at-limit');
 assert.equal(budgetBalance(budget(paid/12),s,f).status,'over');
});
test('invalid quotes never show a safe balance, and uncovered usage stays explicit',()=>{
 const f=quote(50);f.year.valid=false;
 assert.equal(budgetBalance(budget(1000,'annual'),settings,f).valid,false);
 f.regular.covered=false;assert.equal(budgetBalance(budget(100),settings,f).covered,false);
 assert.equal(budgetBalance(budget(-1),settings,quote(0)).valid,false);
 for(const b of [null,[],budget(NaN),budget(Infinity),budget('100'),budget(1,'weekly'),budget(1,'monthly','EUR')])assert.ok(budgetErrors(b).length);
});
test('scenario budget limits survive exports, keep legacy imports valid and reject malformed input',()=>{
 const state=initialState();state.scenarios[0].budget=budget(25000,'annual','RUB');
 const parsed=parseImport(JSON.stringify(state));assert.deepEqual(parsed.scenarios[0].budget,state.scenarios[0].budget);
 assert.equal(parsed.scenarios[1].budget,undefined);
 const copy=clone(parsed.scenarios[0]);copy.budget.amount=1;assert.equal(parsed.scenarios[0].budget.amount,25000);
 state.scenarios[0].budget.amount=-1;assert.throws(()=>parseImport(JSON.stringify(state)),/budget/);
});
test('cart groups distinguish people from assigned workload and allow multiple plans',()=>{
 const state=initialState(),s=state.settings;s.technical.count=1;
 const make=(audience,profileShare)=>({audience,profileShare});
 const sc={lines:[make('all',40),make('active',30),make('heavy',40),make('technical',100),make('manual',100)]};
 const groups=cartGroups(sc,s);
 assert.deepEqual(groups.map(g=>[g.id,g.count,g.plans,g.share]),[['heavy',3,3,110],['regular',5,2,70],['light',2,1,40],['technical',1,1,100]]);
 s.profile[0].count=0;assert.equal(cartGroups(sc,s).some(g=>g.id==='heavy'),false);
});
test('budget states and cart guidance support both languages',()=>{
 for(const en of ['Remaining budget','Over budget','May exceed budget','Budget fully allocated','Build your plan cart','Add to cart','Budget period','Monthly equivalent; upfront payments may be higher.']){
  const ru=translateUI(en,'ru');assert.match(ru,/[а-яё]/i);assert.equal(translateUI(ru,'en'),en);
 }
});
