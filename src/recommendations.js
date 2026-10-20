import { PLAN, PLANS, MODEL, CHECKED } from './catalog.js';
import { clone, uid, newLine, newRow, calculateLine, calculateScenario, forecast, settingsErrors, effectiveLine } from './engine.js';

// A bounded cost comparison, not a model-quality ranking or a quota guarantee.
export const RECOMMENDATION_MIXES = {
  balanced: { name: 'GLM · 80% Flash / 20% GLM-5.3', rows: [['flash', 80], ['glm', 20]] },
  flash: { name: 'GLM Flash only', rows: [['flash', 100]] },
  flagship: { name: 'GLM · 20% Flash / 80% GLM-5.3', rows: [['flash', 20], ['glm', 80]] },
  deepseek: { name: 'DeepSeek Flash', rows: [['dsflash', 100]] },
  openai: { name: 'OpenAI · GPT-6.1 Sol', rows: [['sol', 100]] },
  claude: { name: 'Anthropic · Claude Sonnet 5.5', rows: [['sonnet', 100]] },
};
const REC_GROUP_NAMES = { heavy: 'Power users', regular: 'Regular users', light: 'Light users', technical: 'Server agents', active: 'Power + regular users' };
export function recommendationOptions(options={}) {
  return { billing: options.billing || 'annual', mix: options.mix || 'balanced', cache: options.cache ?? 80,
    serverModel: options.serverModel || 'dsflash', requireTeam: !!options.requireTeam,
    keepCodex: !!options.keepCodex, allowFallback: options.allowFallback !== false };
}
function recommendationLine(group, kind, plan, rows, s, options) {
  const l=newLine(kind,plan);Object.assign(l,{audience:group,spareSeats:0,org:'recommended',billing:kind==='subscription'?options.billing:'monthly',
    rows:rows.map(([id,share])=>({...newRow(id,share),cache:options.cache})),
    profileShare:options.keepCodex&&['heavy','regular'].includes(group)?90:100});
  if(group==='technical'){l.consumerType='technical';l.profileShare=100;}
  l.name=REC_GROUP_NAMES[group]+' · '+(kind==='subscription'?PLAN[plan].name:(group==='technical'?MODEL[rows[0][0]].name+' API':'Direct API'));
  return l;
}
export function recommendSetup(base, requested={}) {
  const s=clone(base),o=recommendationOptions(requested),errors=settingsErrors(s),mix=RECOMMENDATION_MIXES[o.mix];
  if(!mix)errors.push('Choose a supported model mix.');
  if(!['monthly','annual'].includes(o.billing))errors.push('Choose monthly or annual billing.');
  if(typeof o.cache!=='number'||!Number.isFinite(o.cache)||o.cache<0||o.cache>100)errors.push('Cache must be between 0 and 100%.');
  if(!['dsflash','flash','sol','sonnet'].includes(o.serverModel))errors.push('Choose a supported server model.');
  const humanGroups=s.profile.filter(g=>g.count>0),activeCount=humanGroups.filter(g=>g.id!=='light').reduce((a,g)=>a+g.count,0);
  if(!humanGroups.length&&!s.technical.count)errors.push('Add at least one developer or server agent.');
  if(o.requireTeam&&mix&&!mix.rows.every(([id])=>MODEL[id].glm))errors.push('GLM Team requires a GLM model mix.');
  if(o.keepCodex&&(activeCount<2||activeCount>200))errors.push('Codex Business needs 2–200 power and regular users. Change the profile or turn off Keep Codex.');
  if(errors.length)return {valid:false,errors,options:o};
  const fixed=[];
  if(o.keepCodex){const l=recommendationLine('active','subscription','oai-business',[['sol',100]],s,o);l.profileShare=10;l.coverageMode='unknown';fixed.push(l);}
  if(s.technical.count)fixed.push(recommendationLine('technical','api','glm-pro',[[o.serverModel,100]],s,o));
  const planIds=mix.rows.every(([id])=>MODEL[id].glm)?PLANS.filter(p=>p.family==='glm'&&(!o.requireTeam||p.team)).map(p=>p.id):[];
  const perGroup=humanGroups.map(g=>{
    const candidates=[],api=recommendationLine(g.id,'api','glm-pro',mix.rows,s,o);
    if(!o.requireTeam)candidates.push(api);
    for(const id of planIds){const line=recommendationLine(g.id,'subscription',id,mix.rows,s,o);const q=calculateLine(line,s);if(!q.valid)continue;
      if(!q.covered){if(!o.allowFallback)continue;line.overflow='payg';}
      candidates.push(line);
    }
    return {group:g,api,candidates};
  });
  const evaluated=[];let rejected=0;
  const visit=(i,lines)=>{
    if(i<perGroup.length){for(const line of perGroup[i].candidates)visit(i+1,[...lines,line]);return;}
    const scenario={id:'recommendation',name:'Recommended · '+mix.name,settings:s,lines:[...lines,...fixed]};
    const r=calculateScenario(scenario,s),first=calculateScenario(scenario,s,{first:true});
    if(!r.valid||!r.covered||!first.valid){rejected++;return;}
    evaluated.push({scenario,regular:r,first});
  };
  visit(0,[]);
  // Included Codex allowance is uncertain but identical in every candidate. Compare the
  // same upper estimate, then upfront cash, then prefer fewer paid subscriptions on ties.
  evaluated.sort((a,b)=>a.regular.high-b.regular.high||a.first.cashHigh-b.first.cashHigh||a.regular.seat-b.regular.seat);
  if(!evaluated.length)return {valid:false,errors:['No eligible setup covers this workload with these requirements. Allow API fallback or relax the team-seat requirement.'],options:o};
  const winner=evaluated[0],apiScenario={id:'api-reference',name:o.keepCodex?'Selected mix via API + same Codex seats':'Same models via direct API',settings:s,lines:[...perGroup.map(g=>g.api),...fixed]},apiForecast=forecast(apiScenario,s);
  const reasons=winner.regular.lines.map(r=>{
    const group=r.line.audience,count=r.line.kind==='subscription'?r.line.seats:r.line.users;
    if(group==='technical')return {group,count,name:r.line.name,low:r.low,high:r.high,reason:'A separate API account funds unattended work without sharing a developer’s subscription. Uses the agent’s own schedule.'};
    if(group==='active')return {group,count,name:r.line.name,low:r.low,high:r.high,reason:'Kept because you requested Codex: 10% of active users’ workload, with 90% left on the selected model mix. Included allowance is unknown, so cost remains a range.'};
    if(r.line.kind==='api'){
      const match=perGroup.find(g=>g.group.id===group),quotes=match.candidates.filter(l=>l.kind==='subscription'&&!PLAN[l.plan].team).map(l=>calculateLine(l,s)).filter(x=>x.valid&&x.covered).sort((a,b)=>a.high-b.high);
      return {group,count,name:r.line.name,low:r.low,high:r.high,alternative:quotes[0]?.high,reason:quotes.length?'At this group’s token volume, direct API costs less than the cheapest eligible personal subscription, including any modeled fallback.':'Direct API has a published token price. Subscription allowances for this model are not fixed token quotas, so they cannot be ranked reliably from the profile alone.'};
    }
    const fallback=r.quota?.fraction<1-1e-9;
    return {group,count,name:r.line.name,low:r.low,high:r.high,alternative:r.api*(1+s.tax/100),quota:r.quota?{weekly:r.quota.weekly,weekLimit:r.quota.weekLimit,five:r.quota.five,fiveLimit:r.quota.fiveLimit}:null,
      reason:fallback?(PLAN[r.line.plan].team?'The seat plus enabled Team overage is cheaper in the selected combination. Extra usage is budgeted at API list rates.':'The subscription plus separate API fallback is cheaper in the selected combination. When quota runs out, switch to a Standard API key; this is not automatic overage.'):
        (o.requireTeam?'The least-cost eligible team combination meeting your seat requirement. This group fits its own weekly and 5-hour quotas.':'This group’s subscription is part of the least-cost eligible combination and fits its own weekly and 5-hour quotas.')};
  });
  const recommended=clone(winner.scenario);recommended.id=uid();
  return {valid:true,options:o,scenario:recommended,forecast:forecast(recommended,s),baseline:apiForecast,
    baselineName:apiScenario.name,saving:Math.max(0,apiForecast.regular.high-winner.regular.high),
    compared:evaluated.length,rejected,reasons,checked:CHECKED,
    unknownSubscriptions:!mix.rows.every(([id])=>MODEL[id].glm),
    scope:'Lowest modeled recurring cost among the eligible combinations checked, for the selected models and billing period. Not a model-quality or throughput ranking.'};
}
