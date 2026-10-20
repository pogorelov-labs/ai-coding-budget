import {PLAN} from './catalog.js';

export const TEAM_LIMITS={
 glm:{min:2,max:null,kind:'unlimited',mixedTiers:false,checked:'2026-10-20',source:'https://docs.z.ai/devpack/teamplan'},
 openai:{min:2,max:null,kind:'unverified',mixedTiers:true,checked:'2026-10-20',source:'https://learn.chatgpt.com/docs/pricing'},
 anthropic:{min:2,max:150,kind:'plan-cap',mixedTiers:true,checked:'2026-10-20',source:'https://support.claude.com/en/articles/9266767-what-is-the-team-plan'}
};
const PURCHASE_FIELDS=['plan','billing','unitPrice','discount','intro','introConfirmed','introUntil'];
export const workspaceName=name=>String(name||'main').trim()||'main';
export function workspaceIssueText(issue){
 const prefix=`Workspace "${issue.name}": `;
 if(issue.code==='maximum')return prefix+`${issue.count} paid seats; limit ${issue.max}; ${issue.count-issue.max} over. Reduce seats or choose Enterprise/API.`;
 if(issue.code==='minimum')return prefix+`${issue.count} paid seats; minimum ${issue.min}; add ${issue.min-issue.count} seats.`;
 if(issue.code==='mixed-tiers')return prefix+'GLM Standard and Premium cannot be mixed.';
 if(issue.code==='member-tier')return prefix+'The same members cannot hold different team tiers. Use disjoint member groups.';
 if(issue.code==='purchase-terms')return prefix+'Shared seats must use the same billing period, seat price and discounts.';
 if(issue.code==='member-count')return prefix+'A reused manual member group must have the same number of people.';
 return prefix+'Check member allocation.';
}
// Inputs are effective lines: profile cohorts identify the same people across workload items.
export function analyzeWorkspaces(lines){
 const groups=new Map(),allocations=Object.create(null);
 for(const l of lines){
  const plan=l.kind==='subscription'?PLAN[l.plan]:null;
  if(!plan?.team||!(l.users>0||l.seats>0))continue;
  const name=workspaceName(l.org),key=JSON.stringify([plan.family,name]);
  if(!groups.has(key))groups.set(key,{key,name,family:plan.family,limit:TEAM_LIMITS[plan.family],lines:[],members:new Map(),sparePools:new Map(),spare:0,issues:[]});
  const w=groups.get(key);w.lines.push(l);
  const spare=Math.max(0,l.seats-l.users);
  allocations[l.id]={billedSeats:0,shared:false,groups:[],workspaceKey:key};
  if(spare){
   const poolKey=JSON.stringify(PURCHASE_FIELDS.map(k=>l[k]??null));
   if(!w.sparePools.has(poolKey))w.sparePools.set(poolKey,[]);
   w.sparePools.get(poolKey).push({id:l.id,count:spare});
  }
  const cohorts=l._cohorts?.length?l._cohorts.map(g=>({key:'profile:'+g.id,id:g.id,count:Number(g.count)||0})):
   [{key:l.memberGroup?.trim()?'manual:'+l.memberGroup.trim():'line:'+l.id,id:l.consumerType==='technical'?'technical':'manual',count:Number(l.users)||0}];
  for(const g of cohorts){
   if(!g.count)continue;
   if(!w.members.has(g.key))w.members.set(g.key,{...g,lines:[]});
   const member=w.members.get(g.key);
   if(member.count!==g.count)w.issues.push({code:'member-count'});
   member.lines.push(l);
  }
 }
 for(const w of groups.values()){
  for(const pool of w.sparePools.values()){
   const count=Math.max(...pool.map(x=>x.count)),total=pool.reduce((n,x)=>n+x.count,0);w.spare+=count;
   for(const x of pool){const a=allocations[x.id],share=count*x.count/total;a.billedSeats+=share;a.groups.push({id:'spare',count:share});a.shared||=pool.length>1;}
  }
  for(const member of w.members.values()){
   const first=member.lines[0];
   if(new Set(member.lines.map(l=>l.plan)).size>1)w.issues.push({code:'member-tier'});
   else if(member.lines.some(l=>PURCHASE_FIELDS.some(k=>l[k]!==first[k])))w.issues.push({code:'purchase-terms'});
   for(const l of member.lines){
    const a=allocations[l.id],count=member.count/member.lines.length;
    a.billedSeats+=count;a.shared||=member.lines.length>1;a.groups.push({id:member.id,count});
   }
  }
  w.memberCount=[...w.members.values()].reduce((n,g)=>n+g.count,0);
  w.count=w.memberCount+w.spare;
  if(w.limit?.min&&w.count<w.limit.min)w.issues.push({code:'minimum',min:w.limit.min,count:w.count});
  if(w.limit?.max&&w.count>w.limit.max)w.issues.push({code:'maximum',max:w.limit.max,count:w.count});
  if(w.limit?.mixedTiers===false&&new Set(w.lines.map(l=>l.plan)).size>1)w.issues.push({code:'mixed-tiers'});
  w.issues=[...new Map(w.issues.map(issue=>[issue.code,{...issue,name:w.name,key:w.key}])).values()];
  w.shared=[...w.members.values()].some(g=>g.lines.length>1)||[...w.sparePools.values()].some(g=>g.length>1);
 }
 const workspaces=[...groups.values()].map(({sparePools,...w})=>({...w,members:[...w.members.values()]}));
 const issues=workspaces.flatMap(w=>w.issues);
 return {workspaces,allocations,issues,errors:issues.map(workspaceIssueText),valid:!issues.length};
}
