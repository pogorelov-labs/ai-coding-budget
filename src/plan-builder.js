import {MODEL,MODELS,PLAN,PLANS,ROUTES} from './catalog.js';
import {clone,newLine,newRow,setAudience,effectiveLine,settingsErrors,lineErrors,calculateScenario} from './engine.js';

export const BUILDER_PROVIDERS=[['zai','Z.ai / GLM'],['openai','OpenAI / Codex'],['anthropic','Anthropic / Claude'],['deepseek','DeepSeek'],['openrouter','OpenRouter'],['custom','Custom']];
export function builderPlans(provider){return PLANS.filter(p=>p.family===(provider==='zai'?'glm':provider));}
export function builderProviders(kind){return BUILDER_PROVIDERS.filter(([id])=>kind!=='subscription'||!['deepseek','openrouter'].includes(id));}
export function builderModels(d){
 const p=PLAN[d.line.plan];
 return MODELS.filter(m=>d.line.kind==='subscription'?(p?.onlyLuna?m.id==='luna':p?.family==='custom'||(p?.family==='glm'?!!m.glm:m.provider===p?.family)):d.provider==='openrouter'?!!ROUTES[m.id]:m.provider===d.provider);
}
export function createPlanDraft(s,audience){
 const group=audience||(s.team>0?'all':s.technical.count>0?'technical':'manual');
 const l=newLine(group==='technical'?'api':'subscription','glm-lite',Math.max(1,s.team));
 setAudience(l,group,s);l.spareSeats=0;l.profileShare=100;l.rows=[newRow(group==='technical'?'dsflash':'flash')];
 return {step:0,provider:group==='technical'?'deepseek':'zai',line:l};
}
function alignDraft(d){
 const l=d.line,p=PLAN[l.plan];
 if(l.kind==='subscription'&&l.billing!=='monthly'&&p?.[l.billing]==null)l.billing='monthly';
 const available=builderModels(d);
 if(!l.rows.length||l.rows.some(r=>!available.some(m=>m.id===r.model)))l.rows=[newRow(available[0]?.id||'custom')];
}
export function changePlanDraft(d,key,value,s){
 const l=d.line;
 if(key==='audience'){setAudience(l,value,s);if(value==='technical'&&d.step===0){l.kind='api';d.provider='deepseek';l.rows=[newRow('dsflash')];}}
 else if(key==='method'){l.kind=value;if(!builderProviders(value).some(([id])=>id===d.provider))d.provider='zai';if(value==='subscription'){l.plan=builderPlans(d.provider)[0].id;l.unitPrice=null;}else if(d.provider==='openrouter')l.kind='openrouter';alignDraft(d);}
 else if(key==='provider'){d.provider=value;if(l.kind==='subscription'){l.plan=builderPlans(value)[0].id;l.unitPrice=null;}else l.kind=value==='openrouter'?'openrouter':'api';alignDraft(d);}
 else if(key==='plan'){l.plan=value;l.unitPrice=null;alignDraft(d);}
 else if(key==='quantity'){l.users=value;l.seats=value;}
 else if(key.startsWith('row.')){const [,index,field]=key.split('.'),r=l.rows[Number(index)];if(field==='model'){r.model=value;r.customRates=null;r.route='vendor';r.speed='standard';r.long=0;}else r[field]=value;}
 else if(key.startsWith('rate.')){const [,index,bucket]=key.split('.'),r=l.rows[Number(index)];r.customRates??=[null,null,null,null];r.customRates[Number(bucket)]=value;}
 else l[key]=value;
 return d;
}
export function draftScenario(d,sc){return {...sc,lines:[...sc.lines,d.line]};}
export function planDraftErrors(d,s,sc={lines:[]},step=d.step){
 const l=d.line,errors=[...settingsErrors(s)],e=effectiveLine(l,s);
 if(!Number.isInteger(e.users)||e.users<1)errors.push('Choose a group with people, or enter a positive whole number.');
 if(step<1)return errors;
 if(!builderProviders(l.kind).some(([id])=>id===d.provider))errors.push('Choose a provider.');
 if(l.kind==='subscription'){
  if(!builderPlans(d.provider).some(p=>p.id===l.plan))errors.push('Choose a subscription.');
  if(!['monthly','quarterly','annual'].includes(l.billing)||(l.billing!=='monthly'&&PLAN[l.plan]?.[l.billing]==null))errors.push('Choose a supported billing period.');
  if(PLAN[l.plan]?.family==='custom'&&(!Number.isFinite(l.unitPrice)||l.unitPrice<0))errors.push('Enter a nonnegative monthly seat price.');
 }
 if(step<2)return errors;
 for(const k of (l.audience==='manual'?['input','output']:['profileShare']))if(!Number.isFinite(l[k]))errors.push('Complete the usage fields.');
 for(const r of l.rows){if(!Number.isFinite(r.share)||!Number.isFinite(r.cache))errors.push('Enter model shares and cache percentages.');if(r.model==='custom'&&(!r.customRates||r.customRates.some(v=>!Number.isFinite(v)||v<0)))errors.push('Enter all four custom token prices.');}
 errors.push(...lineErrors(l,s));
 if(step>=3)errors.push(...calculateScenario(draftScenario(d,sc),s).errors);
 return [...new Set(errors)];
}
export function previewPlanDraft(d,s,sc={lines:[]}){const candidate=draftScenario(d,sc);return {regular:calculateScenario(candidate,s,{month:1}).lines.find(r=>r.line.id===d.line.id),first:calculateScenario(candidate,s,{first:true}).lines.find(r=>r.line.id===d.line.id)};}
export function commitPlanDraft(d,sc,s){
 const errors=planDraftErrors(d,s,sc,3);if(errors.length)return {ok:false,errors};
 if(sc.lines.length>=50)return {ok:false,errors:['A scenario can contain up to 50 plans.']};
 return {ok:true,scenario:{...sc,lines:[...sc.lines,clone(d.line)]}};
}
