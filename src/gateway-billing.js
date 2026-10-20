import {GATEWAY_PROVIDERS} from './gateway-catalog.js';
const gatewayMonthDate=(date,n)=>{const d=new Date(date+'T12:00:00Z'),day=d.getUTCDate();d.setUTCDate(1);d.setUTCMonth(d.getUTCMonth()+n);d.setUTCDate(Math.min(day,new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,0)).getUTCDate()));return d;};
export function gatewayAccessCost(line,settings,month=0){
 if(line.kind!=='api'||line.apiProvider!=='vsegpt')return null;
 const plans=GATEWAY_PROVIDERS.vsegpt.plans,p=plans.find(p=>p.id===(line.gatewayAccessTier||'professional'));if(!p)return null;
 const users=Math.max(0,Number(line.users)||0),team=!!p.max_subaccounts,heads=team?Math.ceil(users/(p.max_subaccounts+1)):users,members=team?users-heads:0;
 const memberPlan=plans.find(p=>p.id===(line.gatewayMemberTier||'professional'));
 const perPeriodRub=heads*p.price_rub+members*(memberPlan?.price_rub||0),origin=gatewayMonthDate(settings.date,0),days=date=>(date-origin)/86400000;
 const yearDays=days(gatewayMonthDate(settings.date,12)),start=days(gatewayMonthDate(settings.date,month)),end=days(gatewayMonthDate(settings.date,month+1));
 const renewals=Math.max(0,Math.ceil(end/p.period_days)-Math.ceil(start/p.period_days));
 return {tier:p.id,periodDays:p.period_days,heads,members,perPeriodRub,renewals,monthlyUsd:perPeriodRub*yearDays/12/p.period_days/settings.fx,cashUsd:perPeriodRub*renewals/settings.fx};
}
