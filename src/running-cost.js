import {forecast} from './engine.js';
import {planDraftErrors,draftScenario} from './plan-builder.js';

export function runningPlanCost(draft,settings,scenario={lines:[]}){
 const errors=planDraftErrors(draft,settings,scenario,2);
 const hasExisting=scenario.lines.length>0;
 if(errors.length)return {valid:false,errors,hasExisting,draft:null,setup:null};
 const f=forecast(draftScenario(draft,scenario),settings),setup=f.regular;
 if(!setup.valid)return {valid:false,errors:setup.errors,hasExisting,draft:null,setup:null};
 const line=setup.lines.find(r=>r.line.id===draft.line.id);
 if(!line?.valid)return {valid:false,errors:line?.errors||[],hasExisting,draft:null,setup:null};
 const totals=result=>({low:result.low,high:result.high,covered:result.covered,range:result.high-result.low>.005});
 const months=f.months||[],annualValid=f.year.valid&&months.length===12;
 const draftMonths=months.map(m=>m.result.lines.find(r=>r.line.id===draft.line.id));
 const annual=results=>annualValid&&results.every(r=>r?.valid)?{
  valid:true,
  ...totals({low:results.reduce((sum,r)=>sum+r.cashLow,0),high:results.reduce((sum,r)=>sum+r.cashHigh,0),covered:results.every(r=>r.covered)})
 }:{valid:false};
 return {valid:true,errors:[],hasExisting,sharedSeats:!!line.sharedSeats,forecast:f,draft:{...totals(line),annual:annual(draftMonths)},setup:{...totals(setup),annual:annual(months.map(m=>m.result))}};
}
