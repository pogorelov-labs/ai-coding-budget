import {DEFAULT_BUDGET,budgetErrors,budgetBalance,convertBudgetCurrency} from './budget-limit.js';

const budgetDrafts=new Map();
function currentBudget(sc=active()){return budgetDrafts.get(sc.id)||sc.budget||DEFAULT_BUDGET;}
function budgetSettingsHTML(){
 const b=currentBudget(),errors=budgetErrors(b);
 return `<div class="budget-limit-fields"><label class="field"><span>Budget limit</span><input data-budget="amount" type="number" min="0" max="1000000000000" step="any" value="${esc(b.amount??'')}" placeholder="${tr('No limit')}" ${errors.length?'aria-invalid="true"':''} aria-describedby="budget-input-help"></label><label class="field"><span>Budget period</span><select data-budget="period"><option value="monthly" ${b.period==='monthly'?'selected':''}>Monthly</option><option value="annual" ${b.period==='annual'?'selected':''}>12 months</option></select></label><label class="field"><span>Budget currency</span><select data-budget="currency"><option value="USD" ${b.currency==='USD'?'selected':''}>USD</option><option value="RUB" ${b.currency==='RUB'?'selected':''}>RUB</option></select></label></div><p id="budget-input-help" class="inline-help">${errors.length?esc(tr(errors[0])):'Optional. Leave blank for no limit.'}</p>`;
}
function budgetStatusHTML(f,sc=active(),withDraft=false){
 const s=settings(sc),q=budgetBalance(currentBudget(sc),s,f);
 if(!q.enabled)return '';
 if(!q.valid)return `<div class="budget-balance caution"><strong>Budget not checked</strong><p>${q.errors.map(e=>esc(tr(e))).join(' ')}</p></div>`;
 const title={within:'Remaining budget','at-limit':'Budget fully allocated',possible:'May exceed budget',over:'Over budget'}[q.status];
 const amount=q.status==='possible'?`<span>Up to</span> ${priceRange(q.high,q.high)}`:priceRange(q.low,q.high);
 return `<div class="budget-balance ${['over','possible'].includes(q.status)?'caution':''}" data-budget-state="${q.status}"><div class="balance-heading"><strong>${title}</strong><span>${q.period==='annual'?'12 months':'Monthly'}${withDraft?' · '+tr('including this item'):''}</span></div><div class="balance-amount"><b>${amount}</b><small>${q.status==='possible'?tr('Up to')+' ':''}${priceRange(q.status==='possible'?q.high:q.low,q.high,'rub',s.fx)}</small></div><div class="balance-meter" aria-hidden="true"><span style="width:${Math.max(0,Math.min(100,q.percent))}%"></span></div><p class="balance-context"><span>Budget limit</span>: ${priceRange(q.limit,q.limit)} · ${priceRange(q.limit,q.limit,'rub',s.fx)}</p>${!q.covered?'<p class="balance-context">Some usage is not covered by this estimate.</p>':''}${q.period==='monthly'?'<p class="balance-context">Monthly equivalent; upfront payments may be higher.</p>':''}</div>`;
}
function budgetControlHTML(){
 return `<section class="budget-control"><div class="section-heading"><h3>Spending limit</h3><span class="small muted">Optional</span></div>${budgetSettingsHTML()}<div data-budget-feedback aria-live="polite">${budgetStatusHTML(forecast(active(),settings()))}</div></section>`;
}
function budgetEditDialog(){
 const dialog=$('#add-dialog');
 dialog.innerHTML=`<div class="dialog-head"><h2>Spending limit</h2><button class="btn quiet" data-action="close-dialog">Close</button></div>${budgetSettingsHTML()}<div data-budget-feedback aria-live="polite">${budgetStatusHTML(forecast(active(),settings()))}</div><div class="dialog-footer"><button class="btn primary" data-action="close-dialog">Done</button></div>`;
 localizeUI(dialog);dialog.showModal();
}
function updateBudgetInput(el){
 let b={...currentBudget()};
 const key=el.dataset.budget,value=key==='amount'?(el.value===''?null:Number(el.value)):el.value;
 b=key==='currency'?convertBudgetCurrency(b,value,settings().fx):{...b,[key]:value};
 const errors=budgetErrors(b);
 if(errors.length)budgetDrafts.set(active().id,b);
 else{active().budget=b;budgetDrafts.delete(active().id);save();}
 if(key==='currency')document.querySelectorAll('[data-budget="amount"]').forEach(input=>{input.value=b.amount??'';});
 document.querySelectorAll('[data-budget="amount"]').forEach(input=>{if(errors.length)input.setAttribute('aria-invalid','true');else input.removeAttribute('aria-invalid');});
 const help=$('#budget-input-help');if(help)help.textContent=tr(errors[0]||'Optional. Leave blank for no limit.');
 const f=forecast(active(),settings());
 document.querySelectorAll('[data-budget-feedback]').forEach(slot=>{slot.innerHTML=budgetStatusHTML(f);localizeUI(slot);});
 document.querySelectorAll('[data-action="edit-budget-limit"]').forEach(button=>{button.textContent=tr(b.amount===null?'Set spending limit':'Edit spending limit');});
 if($('#cart-mobile'))$('#cart-mobile').innerHTML=mobileCartHTML(f);
 refreshWizardRunningCost();
 localizeUI();
}
