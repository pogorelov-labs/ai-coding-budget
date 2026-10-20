import {TEAM_LIMITS,workspaceIssueText} from './workspace-seats.js';
import {workspaceAnalysis} from './engine.js';

function teamShortcutsHTML(wizard=false){
 const options=[['oai-business','Codex / ChatGPT Business'],['claude-team','Claude Team · Claude Code'],['glm-team-standard','GLM Team']];
 return `<div class="team-plan-shortcuts" role="group" aria-label="${tr('Team subscriptions')}">${options.map(([id,title])=>`<button class="btn" data-action="${wizard?'wizard-team-plan':'plan-team'}" data-plan="${id}">${title}</button>`).join('')}</div>`;
}
function workspaceLimitHTML(limit){
 if(!limit)return '';
 return `<span>${limit.min} <span>minimum seats</span>${limit.max?` · ${limit.max} <span>maximum</span>`:limit.kind==='unlimited'?' · <span>No upper seat limit</span>':' · <span>Upper limit unverified</span>'}</span>`;
}
function workspaceStatusHTML(w,actions=false){
 const family={glm:'GLM Team',openai:'Codex / ChatGPT Business',anthropic:'Claude Team'}[w.family]||w.family;
 return `<div class="workspace-status ${w.issues.length?'capacity-error':''}"><div class="workspace-heading"><strong>${family} · <span data-user-content>${esc(w.name)}</span></strong><b>${nf.format(w.count)}${w.limit?.max?' / '+w.limit.max:''} <span>paid seats</span></b></div><p><span>Unique members</span>: ${nf.format(w.memberCount)}${w.spare?' · <span>Unused seats</span>: '+nf.format(w.spare):''}</p>${w.shared?'<p class="shared-seat-note">Shared members are charged once; their usage is combined.</p>':''}<p>${workspaceLimitHTML(w.limit)}</p>${w.limit?.kind==='unverified'?'<p class="inline-help">Confirm workspace capacity with OpenAI before purchase.</p>':''}${w.issues.map(issue=>`<p class="capacity-message" role="alert">${esc(tr(workspaceIssueText(issue)))}</p>`).join('')}${actions&&w.issues.length?`<div class="capacity-actions"><button class="btn quiet" data-action="wizard-edit-step" data-step="0">Change people</button>${w.issues.some(i=>i.code==='minimum')?`<button class="btn" data-action="wizard-minimum" data-extra="${w.limit.min-w.count}"><span>Add unused seats</span> (+${w.limit.min-w.count})</button>`:''}</div>`:''}${w.limit?`<a class="capacity-source" href="${w.limit.source}" target="_blank" rel="noopener noreferrer"><span>Provider seat rules</span> · ${w.limit.checked}</a>`:''}</div>`;
}
function wizardWorkspaceHTML(d){
 const l=d.line,p=PLAN[l.plan];if(l.kind!=='subscription'||!p?.team)return '';
 const workspaces=workspaceAnalysis(draftScenario(d,active()),settings()).workspaces;
 const w=workspaces.find(w=>w.lines.some(line=>line.id===l.id));
 const manualNames=[...new Set(active().lines.filter(x=>x.kind==='subscription'&&PLAN[x.plan]?.family===p.family&&(x.org||'main')===(l.org||'main')).map(x=>x.memberGroup).filter(Boolean))];
 return `<section class="workspace-controls"><h4>Workspace & members</h4><label class="field"><span>Team / workspace name</span><input type="text" data-wizard="org" value="${esc(l.org)}" maxlength="100"></label>${l.audience==='manual'?`<label class="field"><span>Member group · same people</span><input type="text" data-wizard="memberGroup" list="workspace-member-groups" value="${esc(l.memberGroup||'')}" maxlength="100" placeholder="${tr('Separate group unless named')}"><datalist id="workspace-member-groups">${manualNames.map(name=>`<option value="${esc(name)}"></option>`).join('')}</datalist></label><p class="inline-help">Reuse a member-group name only for the same people. Choose a profile group to reuse its members.</p>`:'<p class="inline-help">Profile groups identify the same people across items in this workspace.</p>'}${wizInput('spareSeats','Unused seats for this tier',l.spareSeats??Math.max(0,l.seats-l.users),{min:0,max:10000,step:1})}<div id="wizard-capacity" aria-live="polite">${w?workspaceStatusHTML(w,true):''}</div></section>`;
}
function workspaceCartHTML(f){
 return f.workspaces?.length?`<section class="cart-workspaces"><h4>Workspace seats</h4>${f.workspaces.map(w=>workspaceStatusHTML(w)).join('')}</section>`:'';
}
function workspaceEditorHTML(l){
 const p=PLAN[l.plan];if(l.kind!=='subscription'||!p?.team)return '';
 const b='l.'+l.id+'.',s=settings(),w=workspaceAnalysis(active(),s).workspaces.find(w=>w.lines.some(x=>x.id===l.id));
 return `<section class="workspace-controls"><h4>Workspace & members</h4><div class="grid">${input(b+'org','Team / workspace name',l.org,{type:'text'})}${l.audience==='manual'?input(b+'memberGroup','Member group · same people',l.memberGroup||'',{type:'text',placeholder:'Separate group unless named'}):''}${input(b+'spareSeats','Unused seats for this tier',l.spareSeats??Math.max(0,l.seats-l.users),{min:0,max:10000,step:1})}</div><p class="inline-help">${l.audience==='manual'?'Reuse a member-group name only for the same people. Choose a profile group to reuse its members.':'Profile groups identify the same people across items in this workspace.'}</p><div data-workspace-status="${l.id}">${w?workspaceStatusHTML(w):''}</div></section>`;
}
