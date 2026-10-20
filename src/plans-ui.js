import {GATEWAY_PROVIDERS} from './gateway-catalog.js';
import {gatewayAccessCost} from './gateway-billing.js';
import {createPlanDraft,changePlanDraft,builderProviders,builderPlans,builderModels,planDraftErrors,previewPlanDraft,commitPlanDraft,draftScenario} from './plan-builder.js';
import {runningPlanCost} from './running-cost.js';

const planJourneys=new Map();
function planJourney(){if(!planJourneys.has(active().id))planJourneys.set(active().id,{mode:'choice',draft:null,errors:[]});return planJourneys.get(active().id);}
function enterPlans(mode='choice'){planJourney().mode=mode;state.tab='calculator';}
function plansChoiceHTML(){
 const sc=active(),f=sc.lines.length?forecast(sc,settings()):null;
 return `${heading('Step 2 of 3','Choose your setup','Get a recommendation or build one plan at a time.')}<div class="plan-paths"><button class="plan-path suggested" data-action="plan-recommend"><strong>Use a recommendation</strong><span>We compare costs for your team and suggest a setup.</span></button><button class="plan-path" data-action="plan-manual"><strong>Build my own</strong><span>Choose people, plans and models in four steps.</span></button></div>${f?`<section class="saved-setup"><div><strong>Saved setup</strong><p><span>${sc.lines.length}</span> <span>plans</span> · ${f.regular.valid?priceRange(f.regular.low,f.regular.high):tr('Check inputs')} <span>/ month</span></p>${planAnnualHTML(f.year)}</div><button class="btn" data-action="plan-edit">Edit saved setup</button></section>`:''}<div class="step-footer"><button class="btn quiet" data-tab="team">Back to team</button></div>`;
}
function plansEditorHTML(){
 const sc=active(),f=forecast(sc,settings());
 return `${heading('Step 2 of 3','Your plans','Edit a plan or add another.')}<button class="btn quiet plans-back" data-action="plan-choice">Change setup</button><div id="summary">${planEstimateHTML(f)}</div><div id="lines">${sc.lines.map((l,i)=>compactPlanHTML(l,i,f.regular.lines[i],f.first.lines[i])).join('')}</div><button class="btn add-plan" data-action="plan-manual">Add another plan</button>${stepFooter('team','budget','Review budget')}`;
}
function recommendationStepHTML(){
 const hasPlans=active().lines.length>0;
 return `${heading('Step 2 of 3','Recommended setup','Lowest cost among the compared direct-provider options.')}<button class="btn quiet plans-back" data-action="plan-choice">Change setup</button>${recommendationHTML()}<div class="step-footer"><span></span>${currentRecommendation().valid?`<button class="btn primary" data-action="use-recommendation">${hasPlans?'Save alternative':'Use this setup'}</button>`:''}</div>`;
}
function startManualPlan(audience){if(active().lines.length>=50){toast('A scenario can contain up to 50 plans.');return;}const j=planJourney();j.draft??=createPlanDraft(settings(),audience);j.mode='wizard';j.errors=[];state.tab='calculator';render();focusPage();}
function wizInput(key,title,value,options={}){const d=planJourney().draft,invalid=planJourney().errors.length&&(!Number.isFinite(value)||value<(options.min??0)||value>(options.max??100000000)||(options.step===1&&!Number.isInteger(value))||(key.startsWith('row.')&&key.endsWith('.share')&&Math.abs(d.line.rows.reduce((n,r)=>n+(r.share||0),0)-100)>.00001));return `<label class="field"><span>${title}</span><input data-wizard="${key}" ${invalid?'aria-invalid="true" aria-describedby="wizard-errors"':''} type="number" value="${esc(value??'')}" min="${options.min??0}" max="${options.max??100000000}" step="${options.step??'any'}" required></label>`;}
function wizSelect(key,title,value,options){return `<label class="field"><span>${title}</span><select data-wizard="${key}">${options.map(([id,name,disabled])=>`<option value="${esc(id)}" ${id===value?'selected':''} ${disabled?'disabled':''}>${esc(name)}</option>`).join('')}</select></label>`;}
function wizardAudienceHTML(d){
 const l=d.line,e=effectiveLine(l,settings()),choices=audienceOptions().map(o=>[...o,o[0]!=='manual'&&effectiveLine({...l,audience:o[0]},settings()).users===0]);
 return `<h3>Who is it for?</h3>${wizSelect('audience','Team group',l.audience,choices)}${l.audience==='manual'?wizInput('quantity','People / accounts',l.users,{min:1,max:10000,step:1}):`<p class="wizard-note"><strong>${e.users}</strong> <span>${l.audience==='technical'?'agent accounts':'people from your team'}</span></p>`}<p class="inline-help">Each plan covers one group. You can add more plans later.</p>`;
}
function wizardPlanHTML(d){
 const l=d.line,p=PLAN[l.plan],subscription=l.kind==='subscription',periods=[['monthly','Monthly']];if(p?.quarterly!=null)periods.push(['quarterly','Quarterly']);if(p?.annual!=null)periods.push(['annual','Annual · paid upfront']);
 return `<h3>How will you pay?</h3><fieldset class="wizard-method"><legend>Payment type</legend>${[['subscription','Subscription','Per person, with usage limits'],['api','API','Pay for tokens used']].map(([id,title,hint])=>`<label><input type="radio" name="wizard-method" data-wizard="method" value="${id}" ${(subscription?'subscription':'api')===id?'checked':''}><span><strong>${title}</strong><small>${hint}</small></span></label>`).join('')}</fieldset><div class="wizard-fields">${wizSelect('provider','Provider',d.provider,builderProviders(l.kind))}${subscription?wizSelect('plan','Subscription',l.plan,builderPlans(d.provider).map(p=>[p.id,p.name]))+wizSelect('billing','Billing period',l.billing,periods):''}${subscription&&p?.family==='custom'?wizInput('unitPrice','Monthly price / seat, USD',l.unitPrice):''}</div>${subscription&&p?.metered?'<p class="inline-help">Metered workspace credits. Confirm the credit price in your contract.</p>':subscription&&p?.family!=='custom'?`<div class="wizard-plan-price"><strong>${USD.format(p?.[l.billing]??p?.monthly??0)}</strong> <span>/ person / month</span>${l.billing!=='monthly'?'<small>Paid upfront for the billing period.</small>':''}</div>`:''}${subscription&&p?.team?`<p class="inline-help">Team size: ${p.min} minimum${p.max?' · '+p.max+' maximum':' · no published upper seat limit'}</p>`:''}${subscription&&p?.team?detail('wizard-workspace','Workspace settings',`<label class="field"><span>Team / workspace name</span><input type="text" data-wizard="org" value="${esc(l.org)}" maxlength="100"></label><p class="inline-help">Use the same name for seats in one team.</p>`):''}${!subscription?gatewayPlanControlsHTML(l,true):''}${(l.audience==='technical'||l.consumerType==='technical')&&subscription?'<p class="callout warn">Shared agents usually need API billing. Check this plan’s account rules before using it.</p>':''}`;
}
function wizardUsageHTML(d){
 const l=d.line,models=builderModels(d),manual=l.audience==='manual';
 return `<h3>Set the workload</h3><div class="wizard-fields">${manual?wizSelect('period','Token period',l.period,[['person-day','Per person / day'],['person-month','Per person / month'],['team-month','Whole line / month']])+wizInput('input','Input, M tokens',l.input)+wizInput('output','Output, M tokens',l.output):wizInput('profileShare','Share of this group’s workload, %',l.profileShare,{max:100})}</div>${!manual?'<p class="inline-help">Token estimates come from your team profile.</p>':''}<div class="wizard-models">${l.rows.map((r,i)=>`<div class="wizard-model"><div class="wizard-model-fields">${wizSelect('row.'+i+'.model','Model',r.model,models.map(m=>[m.id,m.name]))}${wizInput('row.'+i+'.share','Share, %',r.share,{max:100})}${wizInput('row.'+i+'.cache','Cached input, %',r.cache,{max:100})}${l.rows.length>1?`<button class="btn quiet" data-action="wizard-remove-model" data-index="${i}" aria-label="${tr('Remove model')} ${i+1}">×</button>`:''}</div>${l.kind==='openrouter'?wizSelect('row.'+i+'.route','Upstream route',r.route,(ROUTES[r.model]||[]).map(x=>[x.id,x.name])):''}${MODEL[r.model]?.gatewayOnly?gatewayModelNoteHTML(MODEL[r.model],l.kind==='openrouter'?(ROUTES[r.model]||[]).find(x=>x.id===r.route):null):''}${r.model==='custom'||MODEL[r.model]?.requiresManualRates?`<p class="inline-help">Enter confirmed prices per million tokens. Character prices are not equivalent.</p><div class="grid four">${(MODEL[r.model]?.currency==='RUB'?['Input RUB/M','Cache write RUB/M','Cache read RUB/M','Output RUB/M']:['Input $/M','Cache write $/M','Cache read $/M','Output $/M']).map((title,j)=>wizInput('rate.'+i+'.'+j,title,r.customRates?.[j])).join('')}</div>`:''}</div>`).join('')}</div><button class="btn quiet" data-action="wizard-add-model" ${l.rows.length>=50?'disabled':''}>Add model</button><p class="inline-help">Model shares must total 100%. All token volumes are in millions.</p>${l.kind==='subscription'&&PLAN[l.plan]?.family==='glm'?wizSelect('overflow','When the quota runs out',l.overflow,[['stop','Stop · no paid fallback'],['payg',PLAN[l.plan].team?'Paid Team overage':'Separate PAYG fallback']]):''}<p class="inline-help">Advanced rates and discounts are available after adding the plan.</p>`;
}
function wizardSelectionsHTML(d){
 if(d.step===0)return '';
 const l=d.line,e=effectiveLine(l,settings()),p=PLAN[l.plan];
 const selected=(step,title,body)=>`<div class="wizard-selection"><dt>${tr(title)}</dt><dd class="selection-value">${body}</dd><dd class="selection-action"><button type="button" class="btn quiet" data-action="wizard-edit-step" data-step="${step}" aria-label="${tr('Edit '+title.toLowerCase())}">Edit</button></dd></div>`;
 const count=nf.format(e.users),people=esc(tr(audienceName(l.audience)))+' · '+count+' '+esc(tr(l.audience==='technical'||l.consumerType==='technical'?(e.users===1?'agent account':'agent accounts'):l.audience==='manual'?(e.users===1?'person / account':'people / accounts'):(e.users===1?'person':'people')));
 let rows=selected(0,'People',people);
 if(d.step>1){
  const provider=builderProviders('api').find(([id])=>id===d.provider)?.[1]||d.provider;
  let plan=l.kind==='subscription'?esc(tr(p?.name||'Subscription')):esc(tr('API')+' · '+tr(provider));
  if(l.kind==='subscription'){
   const period=p?.metered?'Metered workspace credits':l.billing==='annual'?'Annual · paid upfront':l.billing==='quarterly'?'Quarterly':'Monthly';
   plan+=`<small>${esc(tr(period))}${l.unitPrice!=null?' · '+USD.format(l.unitPrice)+' '+esc(tr('/ person / month')):''}</small>`;
   if(p?.team)plan+=`<small><span>${tr('Workspace')}</span>: <span data-user-content>${esc(l.org||'main')}</span></small>`;
  }
  if(l.kind==='openrouter')plan+=`<small>${tr(l.routerPlan==='business'?'Business · 8%':l.routerPlan==='byok'?'BYOK · own provider keys':'Standard · 5.5%')}</small>`;if(l.apiProvider==='vsegpt')plan+=`<small>${esc(gatewayTierName(l.gatewayAccessTier||'professional'))} · <span>${tr('access plus usage')}</span></small>`;rows+=selected(1,'Plan',plan);
 }
 if(d.step>2){
  const manual=l.audience==='manual';
  let usage=manual?`${nf.format(l.input)}M <span>${tr('Input')}</span> · ${nf.format(l.output)}M <span>${tr('Output')}</span><small>${tr({'person-day':'Per person / day','person-month':'Per person / month','team-month':'Whole line / month'}[l.period])}</small>`:`${nf.format(l.profileShare??100)}% <span>${tr('of group workload')}</span>`;
  const model=(r,withRates=false)=>`<span class="selection-model">${esc(tr(MODEL[r.model]?.name||r.model))} ${nf.format(r.share)}% · <span>${tr('Cache')}</span> ${nf.format(r.cache)}%${l.kind==='openrouter'?`<small>${esc((ROUTES[r.model]||[]).find(route=>route.id===r.route)?.name||r.route)}</small>`:''}${withRates&&r.customRates?`<small>${(MODEL[r.model]?.currency==='RUB'?['Input RUB/M','Cache write RUB/M','Cache read RUB/M','Output RUB/M']:['Input $/M','Cache write $/M','Cache read $/M','Output $/M']).map((label,i)=>esc(tr(label))+': '+nf.format(r.customRates[i])).join(' · ')}</small>`:''}</span>`;
  usage+=`<div class="selection-models">${l.rows.slice(0,2).map(r=>model(r)).join('')}</div>`;
  if(l.rows.length>2||l.rows.some(r=>r.customRates))usage+=`<details class="selection-model-details"><summary>${tr('All model details')} (${l.rows.length})</summary>${l.rows.map(r=>model(r,true)).join('')}</details>`;
  if(l.kind==='subscription'&&p?.family==='glm')usage+=`<small>${tr(l.overflow==='stop'?'Stop · no paid fallback':p.team?'Paid Team overage':'Separate PAYG fallback')}</small>`;
  rows+=selected(2,'Usage',usage);
 }
 return `<section class="wizard-selections" aria-label="${tr('Your choices')}"><h3>Your choices</h3><dl>${rows}</dl></section>`;
}
function wizardReviewHTML(d){
 const l=d.line,s=settings(),p=PLAN[l.plan],f=previewPlanDraft(d,s,active()),r=f.regular;
 const issues=planDraftErrors(d,s,active(),3);const overlaps=coverageNotes(draftScenario(d,active())).filter(n=>n.includes('This counts some usage more than once.'));
 return `<h3>Review this plan</h3>${r.valid?`<div class="wizard-cost"><span>Estimated monthly cost</span><strong>${priceRange(r.low,r.high)}</strong><span>${priceRange(r.low,r.high,'rub')}</span><p><span>First payment</span> <b>${priceRange(f.first.cashLow,f.first.cashHigh)}</b></p></div>`:''}${issues.length?`<div class="callout bad" role="alert">${issues.map(x=>`<p>${esc(tr(x))}</p>`).join('')}</div>`:''}${r.valid&&!r.covered?'<p class="callout warn">This plan does not cover all entered usage. Go back and enable paid fallback or choose a larger plan.</p>':''}${r.valid&&r.high-r.low>.005?'<p class="callout warn">Included quota is unknown; this is a cost range.</p>':''}${overlaps.length?'<p class="callout warn">Some workload is counted more than once. Adjust each plan’s workload share.</p>':''}${l.kind==='subscription'&&p?.family==='glm'&&!p.team&&l.overflow==='payg'?'<p class="inline-help">Personal GLM fallback needs a separate API key and manual switching.</p>':''}${automationCallout(l)}${detail('wizard-detail','Quota and provider details',lineResultHTML(r,f.first))}`;
}
function wizardRunningCostHTML(d){
 if(!d.estimateStarted)return '';
 const q=runningPlanCost(d,settings(),active());
 if(!q.valid)return `<div class="running-cost-unavailable"><span>Draft plan / month</span><strong>Complete plan details</strong>${q.errors[0]?`<p class="running-cost-warning">${esc(tr(q.errors[0]))}</p>`:''}</div>`;
 const total=(label,r,secondary=false)=>`<div class="running-cost-total ${secondary?'running-cost-setup':''}"><span>${label}</span><div><strong>${priceRange(r.low,r.high)}</strong><small>${priceRange(r.low,r.high,'rub')}</small></div>${planAnnualHTML(r.annual)}</div>`;
 const warnings=[];
 if(!q.draft.covered||!q.setup.covered||(q.setup.annual.valid&&!q.setup.annual.covered))warnings.push('Not all usage is covered. Add fallback or change plans.');
 if(q.draft.range||q.setup.range||q.setup.annual.range)warnings.push('Included quota is unknown; this is a cost range.');
 if(automationAssessment(d.line,settings())?.level==='bad')warnings.push('Review account rules before using this route.');
 return `<div class="running-cost-totals">${total('Draft plan / month',q.draft)}${q.hasExisting?total('Setup with this plan / month',q.setup,true):''}</div>${warnings.length?`<p class="running-cost-warning">${warnings.map(w=>`<span>${w}</span>`).join(' ')}</p>`:d.line.kind==='subscription'&&d.line.billing!=='monthly'?'<p class="running-cost-hint">Upfront billing, shown per month.</p>':''}`;
}
function refreshWizardRunningCost(){
 const d=planJourney().draft,slot=$('#wizard-running-cost');
 if(!d||!slot)return;
 slot.innerHTML=wizardRunningCostHTML(d);
 localizeUI(slot);
}
function planWizardHTML(){
 const j=planJourney(),d=j.draft;if(!d)return plansChoiceHTML();
 if(d.step>=1)d.estimateStarted=true;
 const steps=['People','Plan','Usage','Review'];
 return `${heading('Step 2 of 3','Build your setup','')}<ol class="wizard-progress" aria-label="${tr('Plan setup steps')}">${steps.map((name,i)=>`<li ${i===d.step?'aria-current="step"':''} class="${i<d.step?'complete':''}"><span aria-hidden="true">${i+1}</span>${tr(name)}</li>`).join('')}</ol>${wizardSelectionsHTML(d)}<section class="plan-wizard"><div id="wizard-errors" class="callout bad" role="alert" tabindex="-1" ${j.errors.length?'':'hidden'}>${j.errors.map(x=>`<p>${esc(tr(x))}</p>`).join('')}</div>${[wizardAudienceHTML,wizardPlanHTML,wizardUsageHTML,wizardReviewHTML][d.step](d)}</section><div class="step-footer wizard-footer"><div id="wizard-running-cost" aria-live="polite" aria-atomic="true">${wizardRunningCostHTML(d)}</div><div class="wizard-footer-actions"><button class="btn quiet" data-action="${d.step?'wizard-back':'wizard-cancel'}">${d.step?'Back':'Cancel'}</button><button class="btn primary" data-action="${d.step===3?'wizard-save':'wizard-next'}" ${d.step===3&&planDraftErrors(d,settings(),active(),3).length?'disabled':''}>${d.step===3?'Add plan':'Continue'}</button></div></div>`;
}
function plansAction(b){
 const act=b.dataset.action,j=planJourney();
 if(act.startsWith('plan-'))j.errors=[];
 if(act==='plan-choice'){j.mode='choice';}
 else if(act==='plan-recommend'){j.mode='recommend';}
 else if(act==='plan-edit'){j.mode='edit';}
 else if(act==='plan-manual'){startManualPlan();return true;}
 else if(act==='wizard-cancel'){j.draft=null;j.errors=[];j.mode='choice';}
 else if(act==='wizard-edit-step'){const step=Number(b.dataset.step);if(!j.draft||!Number.isInteger(step)||step<0||step>=j.draft.step)return true;j.draft.step=step;j.errors=[];}
 else if(act==='wizard-back'){j.draft.step=Math.max(0,j.draft.step-1);j.errors=[];}
 else if(act==='wizard-next'){
  j.errors=planDraftErrors(j.draft,settings(),active());
  if(!j.errors.length)j.draft.step=Math.min(3,j.draft.step+1);
 }
 else if(act==='wizard-save'){
  const result=commitPlanDraft(j.draft,active(),settings());j.errors=result.errors||[];
  if(result.ok){pendingUndo=clone(state);active().lines=result.scenario.lines;j.draft=null;j.mode='edit';toast('Plan added.');}
 }
 else if(act==='wizard-add-model'){if(j.draft.line.rows.length<50)j.draft.line.rows.push(newRow(builderModels(j.draft)[0].id,0));}
 else if(act==='wizard-remove-model'){if(j.draft.line.rows.length>1)j.draft.line.rows.splice(Number(b.dataset.index),1);}
 else return false;
 render();if(j.errors.length)$('#wizard-errors')?.focus();else focusPage();return true;
}
function updatePlanDraft(el){
 const j=planJourney();if(!j.draft)return;
 const value=el.type==='number'?(el.value===''?null:Number(el.value)):el.value;
 changePlanDraft(j.draft,el.dataset.wizard,value,settings());j.errors=[];
 if(el.tagName==='SELECT'||el.type==='radio'){render();document.querySelector(`[data-wizard="${el.dataset.wizard}"]`)?.focus({preventScroll:true});}
 else{if($('#wizard-errors'))$('#wizard-errors').hidden=true;document.querySelectorAll('[data-wizard][aria-invalid]').forEach(input=>{input.removeAttribute('aria-invalid');input.removeAttribute('aria-describedby');});refreshWizardRunningCost();}
}

function shortRecommendationReason(r){
 if(r.line.audience==='technical')return 'Separate API billing for unattended work.';
 if(r.line.audience==='active')return 'Codex for active users; allowance varies.';
 if(r.line.kind==='api')return 'Pay only for this group’s usage.';
 if(r.quota?.fraction<1-1e-9)return PLAN[r.line.plan].team?'Team seats plus paid overage.':'Subscription plus separate API fallback.';
 return 'Fits this group’s weekly and 5-hour quotas.';
}

function gatewayPlanControlsHTML(l,wizard=false){
 const provider=GATEWAY_PROVIDERS[l.apiProvider];
 const pick=(key,title,value,choices)=>wizard?wizSelect(key,title,value,choices):select('l.'+l.id+'.'+key,title,value,choices);
 if(l.kind==='openrouter')return `<div class="wizard-fields">${pick('routerPlan','OpenRouter plan',l.routerPlan,[['standard','Standard · 5.5%'],['business','Business · 8%'],['byok','BYOK · own provider keys']])}</div>${detail('wizard-or-funding','Account and funding',`<label class="field"><span>Account / organisation / team</span><input type="text" data-wizard="org" value="${esc(l.org)}" maxlength="100"></label>${pick('routerFeeScope','Funding-fee scope',l.routerFeeScope||'account',[['account','Shared billing account'],['line','Per line · legacy estimate']])}<p class="inline-help">Card top-ups are assumed. Use the same account name and funding settings to charge one purchase fee across models.</p><p class="inline-help">10 organisation members by default; support approval is needed for more. Workspaces and API consumers are separate counts.</p>`)}<p class="inline-help">Current routes: 20 Oct 2026. Original saved route prices remain unchanged.</p>`;
 if(!provider)return '';
 let html='<p class="inline-help">Native RUB tariffs. USD is converted at your scenario exchange rate.</p>';
 if(provider.id==='vsegpt'){
  const tier=l.gatewayAccessTier||'professional',p=provider.plans.find(p=>p.id===tier),access=gatewayAccessCost(effectiveLine(l,settings()),settings());
  html+=`${wizard?`<label class="field"><span>Access-account group</span><input type="text" data-wizard="org" value="${esc(l.org)}" maxlength="100"></label>`:''}<div class="wizard-fields">${pick('gatewayAccessTier','VseGPT access plan',tier,provider.plans.filter(p=>p.period_days===30).map(p=>[p.id,gatewayTierName(p.id)+' · '+p.price_rub+' RUB / '+tr('30 days')]))}${p?.max_subaccounts?pick('gatewayMemberTier','Subaccount access',l.gatewayMemberTier||'professional',[['basic','Basic · 199 RUB / 30 days'],['professional','Professional · 399 RUB / 30 days']]):''}</div><p class="inline-help">Access is charged per user or agent. Team head fees and member subscriptions are both included; usage is extra.</p>${access?`<p class="gateway-access-total"><strong>${RUB.format(access.perPeriodRub)}</strong> <span>/ 30 days · access only</span></p>${p?.max_subaccounts?`<p class="inline-help">${access.heads} <span>${tr('head accounts')}</span> + ${access.members} <span>${tr('paid subaccounts')}</span></p>`:''}`:''}<p class="callout warn">Token prices require a manual quote: public VseGPT pages disagree on characters versus tokens.</p>`;
 }else html+=`<p class="inline-help">${provider.id==='proxyapi'?'PAYG with no mandatory access subscription. Published prices include 5% VAT.':'PAYG with no mandatory access subscription. Pin the selected route; VAT inclusion is unconfirmed.'}</p>`;
 return html+detail('gateway-conditions-'+l.id,'Gateway conditions',`<p class="inline-help">Model availability, capacity and account eligibility must be confirmed with the gateway. Upstream subscriptions do not fund these API requests.</p><p class="inline-help">${provider.id==='vsegpt'?'Access renews every 30 days; the forecast counts actual renewal dates. Team plans include 4 or 10 subaccounts, each with a separate subscription.':'A top-up minimum is prepaid balance, not an extra monthly fee. No unconfirmed annual or volume discount is applied.'}</p><a href="${provider.sources[0]}" target="_blank" rel="noopener noreferrer">${tr('Provider documentation')}</a>`);
}
function gatewayModelNoteHTML(m,route=null){
 const currency=m.currency==='RUB'?'RUB':'USD';
 return `<p class="inline-help"><span>${tr('Tariff currency')}</span>: ${currency} · ${m.checked}${m.routeName?' · '+esc(m.routeName):''}</p>${m.cacheWriteKnown===false?'<p class="inline-help">Cache-write pricing is unconfirmed; the default assumes no separately billed writes. Edit rates to budget them.</p>':''}${m.processing==='batch'||m.processing==='flex'?'<p class="callout warn">This processing tier may have different latency from interactive coding.</p>':''}${(route?.alternative??m.alternative)?'<p class="callout warn">Alternative host: quality, quantization and availability may differ.</p>':''}`;
}

function gatewayTierName(id){return ({basic:'Basic',professional:'Professional',team4:'Team 4',team10:'Team 10',fast:'FAST'})[id]||id;}
