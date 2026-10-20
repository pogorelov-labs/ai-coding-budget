import { PLAN, MODEL } from './catalog.js';
import { forecast, scenarioSettings, costRow, lineSettings } from './engine.js';

export const ANALYTICS_GROUPS={heavy:'Power users',regular:'Regular users',light:'Light users',technical:'Server agents',manual:'Manual workload',spare:'Unused seats'};
export const ANALYTICS_PROVIDERS={glm:'Z.ai',zai:'Z.ai',openai:'OpenAI',anthropic:'Anthropic',deepseek:'DeepSeek',openrouter:'OpenRouter',custom:'Custom provider',shared:'Other services'};
const positive=n=>Number.isFinite(n)&&n>0?n:0;
// Allocation is explanatory, not a provider invoice. It never changes the forecast.
export function allocateForecastMonth(result,settings,basis='cash'){
 const atoms=[];const tax=1+settings.tax/100;
 for(const r of result.lines){if(!r.valid||r.inactive)continue;
  const l=r.line,p=r.plan,cohorts=l._cohorts?.length?l._cohorts:[{id:l.consumerType==='technical'?'technical':'manual',count:l.users,input:l.input,output:l.output}];
  const billedProvider=l.kind==='openrouter'?'openrouter':p?.family||null;
  const push=(group,provider,model,low,high)=>{if(low>1e-10||high>1e-10)atoms.push({group,provider:provider==='glm'?'zai':provider||'custom',model,low:low*tax,high:high*tax});};
  const split=(amountLow,amountHigh,weights,model='shared',provider=billedProvider||'shared')=>{
   const sum=weights.reduce((a,w)=>a+w.weight,0);if(!sum){push('manual',provider,model,amountLow,amountHigh);return;}
   for(const w of weights){const share=w.weight/sum;push(w.group,w.provider||provider,w.model||model,amountLow*share,amountHigh*share);}
  };
  const seats=cohorts.map(g=>({group:g.id,weight:g.count}));const spare=Math.max(0,(l.seats||0)-(l.users||0));if(spare)seats.push({group:'spare',weight:spare});
  split((basis==='cash'?r.cashSeat:r.seat)||0,(basis==='cash'?r.cashSeat:r.seat)||0,seats);
  split((r.bundleCash||0)+(r.extras||0),(r.bundleCash||0)+(r.extras||0),seats);
  const weights=[];
  for(const g of cohorts){
   const rows=l._cohorts?.length?l.rows.map(row=>costRow({...l,audience:'manual',users:g.count,input:g.input,output:g.output},row,lineSettings(l,settings))):r.rows;
   const q=r.quota?.groups?.find(x=>x.id===g.id),fraction=q?1-q.fraction:r.quota?1-r.quota.fraction:1;
   for(const row of rows){let weight=p?.family==='openai'?row.codexCredits:row.cost;if(p?.family==='glm')weight*=Math.max(0,fraction);
    weights.push({group:g.id,model:row.model.id,provider:l.kind==='openrouter'&&l.routerPlan!=='byok'?'openrouter':billedProvider&&l.kind==='subscription'?billedProvider:row.model.provider,weight:positive(weight)});
   }
  }
  // Zero-price rows cannot claim paid costs. Shared credit/fee effects are allocated
  // proportionally to modeled metered costs; exact category attribution is an estimate.
  split(r.usageLow||0,r.usageHigh||0,weights);
  split(r.feeLow||0,r.feeHigh||0,weights.map(w=>({...w,provider:'openrouter',model:'shared'})),'shared','openrouter');
 }
 return atoms;
}
export function budgetAnalytics(scenario,fallback,{dimension='group',basis='cash',forecastResult=null}={}){
 const settings=scenarioSettings(scenario,fallback),f=forecastResult||forecast(scenario,settings);
 if(!f.year.valid)return {valid:false,months:[],categories:[],range:false};
 const key=['group','provider','model'].includes(dimension)?dimension:'group';
 const byMonth=f.months.map(m=>{const values={};for(const a of allocateForecastMonth(m.result,settings,basis)){const id=a[key];values[id]||={low:0,high:0};values[id].low+=a.low;values[id].high+=a.high;}
  return {date:m.date,values,low:basis==='cash'?m.result.cashLow:m.result.low,high:basis==='cash'?m.result.cashHigh:m.result.high};});
 const ids=[...new Set(byMonth.flatMap(m=>Object.keys(m.values)))];
 const categories=ids.map(id=>({id,name:key==='group'?ANALYTICS_GROUPS[id]||id:key==='provider'?ANALYTICS_PROVIDERS[id]||id:id==='shared'?'Plan fees & shared costs':MODEL[id]?.name||id,low:byMonth.reduce((a,m)=>a+(m.values[id]?.low||0),0),high:byMonth.reduce((a,m)=>a+(m.values[id]?.high||0),0)})).sort((a,b)=>b.high-a.high||a.id.localeCompare(b.id));
 const cumulative={};let low=0,high=0;const months=byMonth.map(m=>{low+=m.low;high+=m.high;for(const c of categories){const v=m.values[c.id]||{low:0,high:0};cumulative[c.id]||={low:0,high:0};cumulative[c.id].low+=v.low;cumulative[c.id].high+=v.high;}
  return {...m,cumulative:JSON.parse(JSON.stringify(cumulative)),cumulativeLow:low,cumulativeHigh:high};});
 return {valid:true,covered:f.months.every(m=>m.result.covered),months,categories,low,high,range:Math.abs(high-low)>.005,basis,dimension:key};
}
// Area-preserving binary treemap. No minimum tile area: small amounts stay small.
export function spendingTreemap(items,x=0,y=0,width=100,height=100){
 const entries=items.filter(i=>i.high>0).slice().sort((a,b)=>b.high-a.high);const out=[];
 const split=(list,x,y,w,h)=>{if(!list.length)return;if(list.length===1){out.push({...list[0],x,y,width:w,height:h});return;}
  const total=list.reduce((a,i)=>a+i.high,0);let sum=0,k=1,best=Infinity;
  for(let i=1;i<list.length;i++){sum+=list[i-1].high;const delta=Math.abs(total/2-sum);if(delta<best){best=delta;k=i;}}
  const ratio=list.slice(0,k).reduce((a,i)=>a+i.high,0)/total;
  if(w>=h){split(list.slice(0,k),x,y,w*ratio,h);split(list.slice(k),x+w*ratio,y,w*(1-ratio),h);}
  else{split(list.slice(0,k),x,y,w,h*ratio);split(list.slice(k),x,y+h*ratio,w,h*(1-ratio));}
 };split(entries,x,y,width,height);return out;
}
