export const DEFAULT_BUDGET={amount:null,period:'monthly',currency:'USD'};
export function budgetErrors(budget){
 if(budget===undefined)return [];
 if(!budget||typeof budget!=='object'||Array.isArray(budget))return ['Invalid budget limit.'];
 const errors=[];
 if(budget.amount!==null&&(!Number.isFinite(budget.amount)||budget.amount<0||budget.amount>1e12))errors.push('Enter a budget from 0 to 1 trillion, or leave it blank.');
 if(!['monthly','annual'].includes(budget.period))errors.push('Choose monthly or 12-month budgeting.');
 if(!['USD','RUB'].includes(budget.currency))errors.push('Choose USD or RUB for the budget.');
 return errors;
}
export function budgetBalance(budget,settings,f){
 const errors=budgetErrors(budget);
 if(errors.length)return {enabled:true,valid:false,errors};
 if(!budget||budget.amount===null)return {enabled:false,valid:true};
 const cost=budget.period==='annual'?f.year:f.regular,fx=settings.fx;
 if(!cost?.valid||!Number.isFinite(cost.low)||!Number.isFinite(cost.high)||!Number.isFinite(fx)||fx<=0)return {enabled:true,valid:false,errors:['Complete plan details to check the budget.']};
 const limit=budget.currency==='RUB'?budget.amount/fx:budget.amount;
 const low=cost.low-limit,high=cost.high-limit,tolerance=.005/(budget.currency==='RUB'?fx:1);
 const status=low>tolerance?'over':high>tolerance?'possible':Math.abs(high)<=tolerance?'at-limit':'within';
 const delta=status==='over'?{low,high}:status==='possible'?{low:0,high}:status==='at-limit'?{low:0,high:0}:{low:-high,high:-low};
 const periods=budget.period==='annual'?[f.regular,...(f.months||[]).map(m=>m.result)]:[f.regular];
 return {enabled:true,valid:true,status,limit,period:budget.period,low:Math.max(0,delta.low),high:Math.max(0,delta.high),usedLow:cost.low,usedHigh:cost.high,percent:limit>0?cost.high/limit*100:cost.high>0?100:0,covered:periods.every(r=>r?.covered!==false)};
}
export function convertBudgetCurrency(budget,currency,fx){
 if(!['USD','RUB'].includes(currency)||!Number.isFinite(fx)||fx<=0)return {...budget};
 const amount=budget.amount===null?null:budget.currency===currency?budget.amount:budget.amount*(currency==='RUB'?fx:1/fx);
 return {...budget,currency,amount:amount===null?null:Math.round(amount*100)/100};
}
export function cartGroups(scenario,settings){
 const groups=[...(settings.profile||[]),{id:'technical',count:settings.technical?.count||0}];
 return groups.filter(g=>g.count>0).map(g=>{
  const lines=scenario.lines.filter(l=>l.audience===g.id||(g.id!=='technical'&&(l.audience==='all'||l.audience==='active'&&g.id!=='light')));
  return {id:g.id,count:g.count,plans:lines.length,share:lines.reduce((n,l)=>n+(l.profileShare??100),0)};
 });
}
