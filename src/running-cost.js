import {calculateScenario} from './engine.js';
import {planDraftErrors,previewPlanDraft,draftScenario} from './plan-builder.js';

export function runningPlanCost(draft,settings,scenario={lines:[]}){
 const errors=planDraftErrors(draft,settings,scenario,2);
 const hasExisting=scenario.lines.length>0;
 if(errors.length)return {valid:false,errors,hasExisting,draft:null,setup:null};
 const setup=calculateScenario(draftScenario(draft,scenario),settings,{month:1});
 if(!setup.valid)return {valid:false,errors:setup.errors,hasExisting,draft:null,setup:null};
 const preview=previewPlanDraft(draft,settings,scenario),line=preview.regular;
 if(!line?.valid)return {valid:false,errors:line?.errors||[],hasExisting,draft:null,setup:null};
 const totals=result=>({low:result.low,high:result.high,covered:result.covered,range:result.high-result.low>.005});
 return {valid:true,errors:[],hasExisting,draft:totals(line),setup:totals(setup)};
}
