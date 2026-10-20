import {MODEL,PLAN,ROUTES,CHECKED} from './catalog.js';
export const uid=()=>globalThis.crypto?.randomUUID?.()||('x'+Date.now()+Math.random().toString(36).slice(2));
export const clone=x=>JSON.parse(JSON.stringify(x));
const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
const num=(x,d=0)=>Number.isFinite(Number(x))?Number(x):d;
const addMonths=(date,n)=>{const d=new Date(date+'T12:00:00Z');const day=d.getUTCDate();d.setUTCDate(1);d.setUTCMonth(d.getUTCMonth()+n);d.setUTCDate(Math.min(day,new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,0)).getUTCDate()));return d.toISOString().slice(0,10);};
export const DEFAULT_SETTINGS={fx:95,team:10,days:22,weekDays:5,start:9,end:18,utc:3,date:CHECKED,peakMode:'schedule',peak:44.4444444444,tax:0};
export const PROFILE_GROUPS=[{id:'heavy',name:'Суперактивные',hint:'Много агентских задач и больших контекстов'},{id:'regular',name:'Обычные',hint:'Ежедневный кодинг с AI-помощником'},{id:'light',name:'Малоактивные',hint:'Небольшие задачи и эпизодическая помощь'}];
export function defaultProfile(team=10,example=false){return PROFILE_GROUPS.map((g,i)=>({...g,count:example?[3,5,2][i]:i===1?team:0,input:[30,10,2][i],output:[1.5,.5,.1][i]}));}
export function profileTotals(s){const groups=s.profile||defaultProfile(s.team);return {count:groups.reduce((a,g)=>a+num(g.count),0),input:groups.reduce((a,g)=>a+num(g.count)*num(g.input),0),output:groups.reduce((a,g)=>a+num(g.count)*num(g.output),0)};}
export const DEFAULT_TECHNICAL={count:0,input:20,output:1,days:30,weekDays:7,start:0,end:0,peakMode:'schedule',peak:0,workers:1,purpose:'shared'};
export function lineSettings(l,s){return l.audience==='technical'?{...s,...(s.technical||DEFAULT_TECHNICAL),utc:s.utc}:l.scheduleOverride?{...s,...l.scheduleOverride,utc:s.utc}:s;}
export function technicalTotals(s){const t=s.technical||DEFAULT_TECHNICAL;return {count:t.count,input:t.count*t.input*t.days,output:t.count*t.output*t.days,workers:t.count*t.workers};}
export function profileLinked(l){return !!l.audience&&l.audience!=='manual';}
export function effectiveLine(line,s){
 if(!profileLinked(line))return line;
 let cohorts=line.audience==='technical'?[( {...(s.technical||DEFAULT_TECHNICAL),id:'technical',name:'Технические учётки'})].filter(g=>g.count>0):(s.profile||[]).filter(g=>(line.audience==='all'||line.audience==='active'&&g.id!=='light'||g.id===line.audience)&&num(g.count)>0);
 const share=num(line.profileShare??100)/100;cohorts=cohorts.map(g=>({...g,input:g.input*share,output:g.output*share}));
 const users=cohorts.reduce((a,g)=>a+num(g.count),0),spare=num(line.spareSeats??Math.max(0,num(line.seats)-num(line.users)));
 return {...line,users,seats:line.kind==='subscription'?users+spare:users,period:'person-day',volumeMode:'mix',input:users?cohorts.reduce((a,g)=>a+num(g.count)*num(g.input),0)/users:0,output:users?cohorts.reduce((a,g)=>a+num(g.count)*num(g.output),0)/users:0,_cohorts:cohorts};
}
export function setAudience(l,audience,s){
 if(audience==='manual'&&profileLinked(l)){if(l.audience==='technical')l.scheduleOverride=clone(s.technical||DEFAULT_TECHNICAL);const e=effectiveLine(l,s);for(const k of ['users','seats','period','volumeMode','input','output'])l[k]=e[k];}
 if(audience==='technical')l.consumerType='technical';else if(audience!=='manual')delete l.consumerType;
 l.audience=audience;
 if(audience!=='manual'){delete l.scheduleOverride;l.volumeMode='mix';l.period='person-day';}
}
// v1 amounts stay manual, so adding a profile never rewrites an existing budget silently.
export function migrateState(x){
 if(!x)return x;
 if(x.version===2){x.version=3;if(x.settings)x.settings.technical=clone(DEFAULT_TECHNICAL);return x;}
 if(x.version!==1)return x;
 x.version=2;if(x.settings)x.settings.profile=defaultProfile(x.settings.team);
 for(const sc of x.scenarios||[])for(const l of sc.lines||[]){l.audience='manual';if(l.kind==='subscription'&&Number.isInteger(l.seats)&&l.seats>=1&&l.users>l.seats){const oldUsers=l.users;l.legacyUsers=oldUsers;l.users=l.seats;(x.migrationNotes||=[]).push('В сценарии «'+sc.name+'» у '+(l.name||PLAN[l.plan]?.name||'подписки')+' было '+l.seats+' оплаченных подписок/мест и '+oldUsers+' активных пользователей. При переносе установлено единое количество '+l.seats+'. Остальные параметры сохранены.');}l.spareSeats=Math.max(0,num(l.seats)-num(l.users));}
 return migrateState(x);
}
export function newRow(id='glm',share=100){return {id:uid(),model:id,share,input:10,output:.5,cache:80,writes:100,ttl:'5m',speed:'standard',long:0,geo:0,route:'vendor',customRates:null};}
export function newLine(kind='subscription',plan='glm-pro',users=10){return {id:uid(),name:'',kind,plan,seats:users,users,billing:'monthly',org:'main',volumeMode:'mix',period:'person-day',input:10,output:.5,rows:[newRow(plan==='oai-go'?'luna':plan.startsWith('oai')?'sol':plan.startsWith('claude')?'sonnet':'glm')],unitPrice:null,discount:0,intro:0,introConfirmed:false,introUntil:'',coverageMode:'unknown',coverage:0,creditUsd:.04,creditConfirmed:false,overflow:'stop',glmOveragePromo:false,extraUsd:0,extraCredits:0,routerPlan:'standard',topups:1,feeMin:null,byokPrior:0,providerDiscount:0,startup:false,startupDate:CHECKED,startupGrant:0,grantOnce:0,grantUntil:'',monthlyCredit:0,bonusSource:'',bonusConfirmed:false,holiday:false,bundle50:0,bundle250:0,bundle1000:0,bundleRecurring:false,bundleMonths:1};}
export function initialState(){
 const a=newLine();a.audience='all';a.spareSeats=0;a.rows=[newRow('glm',80),newRow('flash',20)];
 const b=clone(a);b.id=uid();b.plan='glm-team-standard';
 const c=clone(a);c.id=uid();c.kind='api';
 return {version:3,settings:{...DEFAULT_SETTINGS,profile:defaultProfile(10,true),technical:clone(DEFAULT_TECHNICAL)},active:'s1',tab:'team',scenarios:[{id:'s1',name:'GLM · личные',lines:[a]},{id:'s2',name:'GLM · команда',lines:[b]},{id:'s3',name:'Тот же mix · API',lines:[c]}]};
}
// A preset owns its profile/calendar so it cannot alter existing alternatives.
export const scenarioSettings=(scenario,fallback)=>scenario.settings||fallback;
export function hybridPreset(base=DEFAULT_SETTINGS,billing='annual'){
 const settings={...clone(base),team:18,days:22,weekDays:5,start:9,end:18,utc:3,peakMode:'schedule',peak:400/9,tax:0,profile:defaultProfile(18,true),technical:{...DEFAULT_TECHNICAL,count:1}};
 settings.profile.forEach((g,i)=>g.count=[3,5,10][i]);
 const make=(audience,kind,plan,name,models)=>{const l=newLine(kind,plan);Object.assign(l,{name,audience,spareSeats:0,billing:kind==='subscription'?billing:'monthly',rows:models.map(([id,share])=>newRow(id,share))});if(audience==='technical')l.consumerType='technical';return l;};
 return {id:uid(),name:'Гибрид · 18 разработчиков + сервер',preset:'hybrid18',settings,lines:[
  make('heavy','subscription','glm-pro','Суперактивные · GLM Pro',[['glm',80],['flash',20]]),
  make('regular','subscription','glm-lite','Обычные · GLM Lite',[['glm',40],['flash',60]]),
  make('light','api','glm-pro','Малоактивные · Z.ai Flash API',[['flash',100]]),
  make('technical','api','glm-pro','Серверный агент · DeepSeek Flash API',[['dsflash',100]])
 ]};
}
export function teamStandardPreset(base=DEFAULT_SETTINGS,billing='annual'){
 const settings=hybridPreset(base).settings;
 const make=(audience,plan,name,share,models)=>{const l=newLine('subscription',plan);Object.assign(l,{audience,name,spareSeats:0,billing,profileShare:share,rows:models.map(([id,pct])=>newRow(id,pct))});return l;};
 const active=make('active','glm-team-standard','GLM Team Standard · 8 активных',90,[['flash',80],['glm',20]]);
 const light=make('light','glm-team-standard','GLM Team Standard · 10 малоактивных',100,[['flash',80],['glm',20]]);
 const codex=make('active','oai-business','Codex Business Standard · 8 активных',10,[['sol',100]]);
 const server=newLine('api','glm-pro',1);Object.assign(server,{audience:'technical',consumerType:'technical',name:'Сервер · DeepSeek Flash API',spareSeats:0,rows:[newRow('dsflash')]});
 return {id:uid(),name:'GLM Team 18 + Codex 8',preset:'team-standard',settings,lines:[active,light,codex,server]};
}
// Guided setups preserve the user's counts, usage, FX and calendars.
export function guidedSetup(base,kind='managed',billing='annual'){
 const result=kind==='managed'?teamStandardPreset(base,billing):hybridPreset(base,billing);
 result.settings=clone(base);
 const names=kind==='managed'?['GLM Team · active developers','GLM Team · light users','Codex Business · active developers','Server · DeepSeek Flash API']:['Power users · GLM Pro','Regular users · GLM Lite','Light users · Z.ai Flash API','Server · DeepSeek Flash API'];
 result.lines.forEach((l,i)=>l.name=names[i]);
 return result;
}
// Alternatives retain each group's model mix, cache and workload allocation.
export function teamAlternative(sc,mode){
 const copy=clone(sc);copy.id=uid();copy.name=mode==='active'?'GLM Team 8 + API + Codex 8':'GLM API + Codex 8';
 for(const l of copy.lines)if(l.kind==='subscription'&&PLAN[l.plan]?.family==='glm'&&(mode==='api'||l.audience==='light')){l.kind='api';l.name=mode==='api'?'GLM API · '+(l.audience==='light'?'малоактивные':'активные'):'GLM API · малоактивные';l.spareSeats=0;}
 return copy;
}
export function hours(s){const h=(num(s.end)-num(s.start)+24)%24;return h===0?24:h;}
function isPeak(utcHour,day,provider){return day>=1&&day<=5&&(provider==='glm'?(utcHour>=6&&utcHour<10):((utcHour>=1&&utcHour<4)||(utcHour>=6&&utcHour<10)));}
// Uniform quarter-hour token distribution, repeated working week beginning Monday.
export function timeProfile(s,provider='glm',holiday=false){
 const timeline=Array(672).fill(0),h=hours(s),days=clamp(num(s.weekDays,5),1,7);let peak=0,total=0;
 for(let day=0;day<days;day++)for(let i=0;i<h*4;i++){
  const local=day*24+num(s.start)+i/4;const utc=local-num(s.utc);const utcDay=((Math.floor(utc/24)+1)%7+7)%7;
  const hour=((utc%24)+24)%24;let p=isPeak(hour,utcDay,provider);
  if(provider==='deepseek'&&holiday)p=false;
  const f=1/(h*4);const coefficient=s.peakMode==='manual'?(.5+.5*num(s.peak)/100):(p?1:.5);
  timeline[((Math.floor(local*4)%672)+672)%672]+=f*coefficient;
  total+=f;peak+=f*(p?1:0);
 }
 let max5=0;for(let i=0;i<672;i++){let v=0;for(let j=0;j<20;j++)v+=timeline[(i+j)%672];max5=Math.max(max5,v);}
 const p=provider==='deepseek'&&holiday?0:s.peakMode==='manual'?num(s.peak)/100:peak/total;
 return {peak:p,multiplier:.5+.5*p,max5:s.peakMode==='manual'?(Math.min(5,h)/h)*(.5+.5*p):max5,hours:h};
}
export function volume(line,row,s){
 s=lineSettings(line,s);line=effectiveLine(line,s);
 const f=line.volumeMode==='mix'?num(row.share)/100:1;
 const input=num(line.volumeMode==='mix'?line.input:row.input)*f,output=num(line.volumeMode==='mix'?line.output:row.output)*f;
 const users=num(line.users);const scale=users===0?0:line.period==='person-day'?users*num(s.days):line.period==='person-month'?users:1;
 const monthly=[input*scale,output*scale];return {monthly,daily:monthly.map(v=>users>0&&num(s.days)>0?v/users/num(s.days):0)};
}
function speedFactor(row,m){if(row.speed==='standard')return 1;if(m.provider==='openai')return ({fast:2,ultrafast:6,batch:.5,flex:.5})[row.speed]||1;if(m.provider==='anthropic')return row.speed==='batch'?.5:row.speed==='fast'&&m.fast?2:1;return 1;}
export function costRow(line,row,s){
 s=lineSettings(line,s);
 const m=MODEL[row.model];if(!m)throw new Error('Неизвестная модель');
 const route=line.kind==='openrouter'?(ROUTES[m.id]||[]).find(r=>r.id===row.route):null;
 const rates=row.customRates?[...row.customRates]:(route?[...route.rates]:[...m.rates]);
 if(!row.customRates&&row.ttl==='1h'&&m.write1h){rates[1]=route?.regional?m.write1h*1.1:m.write1h;}
 const vol=volume(line,row,s);const [I,O]=vol.monthly;const R=I*num(row.cache)/100,W=(I-R)*num(row.writes)/100,U=I-R-W;
 const quantities=[U,W,R,O];const long=num(row.long)/100;
 const timed=!row.customRates&&(route?route.timed:m.timed);
 const time=timed?timeProfile(s,'deepseek',line.kind==='api'&&line.holiday):null;
 let effective=rates.map((r,i)=>r*(1+(m.long?m.long[i]-1:0)*long));
 if(timed){const off=row.customRates?rates.map(v=>v*.5):(route?.off||m.off);effective=effective.map((r,i)=>(r*time.peak+off[i]*(1-time.peak)*(1+(m.long?m.long[i]-1:0)*long)));}
 const mult=speedFactor(row,m)*(1+num(row.geo)/100);effective=effective.map(r=>r*mult);
 const components=quantities.map((q,i)=>q*effective[i]);
 const [di,do_]=vol.daily;const h=num(row.cache)/100;
 const glmDaily=m.glm?(di*((1-h)*m.glm[0]+h*m.glm[1])+do_*m.glm[2])*100:0;
 const codexCredits=m.credit?(I*((1-h)*m.credit[0]+h*m.credit[1])+O*m.credit[2])*(row.speed==='fast'?2:row.speed==='ultrafast'?6:1):0;
 return {id:row.id,model:m,route,vol,quantities,rates,effective,components,cost:components.reduce((a,b)=>a+b,0),glmDaily,codexCredits,time};
}
export function lineErrors(l,s){
 l=effectiveLine(l,s);
 const errs=[];const p=PLAN[l.plan];
 if(l.profileShare!==undefined&&(!Number.isFinite(l.profileShare)||l.profileShare<0||l.profileShare>100))errs.push('Доля нагрузки профиля должна быть от 0 до 100%');
 if(l.audience&&!['manual','all','active','technical',...PROFILE_GROUPS.map(g=>g.id)].includes(l.audience))errs.push('Неизвестная группа профиля');
 if(profileLinked(l)&&!s.profile)errs.push('Профиль команды отсутствует');
 if(l.apiRuntime!==undefined&&!['own','claude-action'].includes(l.apiRuntime))errs.push('Неизвестная API-интеграция');
 if(l.scheduleOverride)errs.push(...technicalErrors(l.scheduleOverride));
 if(l.spareSeats!==undefined&&(!Number.isInteger(l.spareSeats)||l.spareSeats<0||l.spareSeats>10000))errs.push('Неиспользуемое количество должно быть целым и неотрицательным');
 if(!['api','subscription','openrouter'].includes(l.kind))errs.push('Неизвестный тип позиции');
 for(const [key,min,max] of [['users',1,10000],['seats',1,10000],['input',0,1e8],['output',0,1e8],['discount',0,100],['intro',0,100],['coverage',0,100],['creditUsd',0,100],['extraUsd',0,1e9],['extraCredits',0,1e9],['topups',1,10000],['byokPrior',0,1e12],['providerDiscount',0,100],['startupGrant',0,3000],['grantOnce',0,1e9],['monthlyCredit',0,1e9],['bundle50',0,100000],['bundle250',0,100000],['bundle1000',0,100000]]){
  const lower=['users','seats'].includes(key)&&(profileLinked(l)||key==='users'&&l.spareSeats===l.seats)?0:min;
  if(!Number.isFinite(Number(l[key]))||num(l[key])<lower||num(l[key])>max)errs.push('Некорректное значение '+key);
 }
 if(!Number.isInteger(num(l.users))||!Number.isInteger(num(l.seats)))errs.push('Количество людей и подписок должно быть целым');
 for(const k of ['topups','bundle50','bundle250','bundle1000'])if(!Number.isInteger(num(l[k])))errs.push(k+': требуется целое количество');
 if(!Number.isInteger(l.bundleMonths??1)||(l.bundleMonths??1)<1||(l.bundleMonths??1)>36)errs.push('Срок bundles: 1–36 месяцев');
 for(const [key,allowed] of [['billing',['monthly','quarterly','annual']],['period',['person-day','person-month','team-month']],['volumeMode',['mix','explicit']],['routerPlan',['standard','business','byok']],['coverageMode',['unknown','manual']],['overflow',['stop','payg']]])if(!allowed.includes(l[key]))errs.push('Неизвестный режим '+key);
 for(const k of ['introUntil','grantUntil','startupDate'])if(l[k]&&!validDate(l[k]))errs.push('Некорректная дата '+k);
 if(l.feeMin!==null&&(!Number.isFinite(Number(l.feeMin))||num(l.feeMin)<0))errs.push('Minimum fee должен быть неотрицательным');
 if(l.kind==='subscription'&&num(l.users)>num(l.seats))errs.push('Активных пользователей больше оплаченных мест');
 if(l.kind==='subscription'&&!p)errs.push('Неизвестный план');
 if(l.kind==='subscription'&&l.unitPrice!==null&&(!Number.isFinite(Number(l.unitPrice))||num(l.unitPrice)<0))errs.push('Цена места должна быть неотрицательной');
 if(l.kind==='subscription'&&l.billing!=='monthly'&&p&&p[l.billing]===null&&l.unitPrice===null)errs.push('У плана нет выбранного периода оплаты');
 if(l.kind==='subscription'&&l.billing!=='monthly'&&p&&p[l.billing]===undefined&&l.unitPrice===null)errs.push('У плана нет выбранного периода оплаты');
 if(l.volumeMode==='mix'&&Math.abs(l.rows.reduce((a,r)=>a+num(r.share),0)-100)>.00001)errs.push('Доли моделей должны давать ровно 100%');
 if(!l.rows.length)errs.push('Добавьте хотя бы одну модель');
 if(l.kind==='subscription'&&p?.onlyLuna&&l.rows.some(r=>r.model!=='luna'))errs.push('Go: в расчёте подписки доступна только Luna');
 for(const row of l.rows){
  const m=MODEL[row.model];if(!m){errs.push('Модель отсутствует в каталоге');continue;}if(m.id==='custom'&&!row.customRates)errs.push('Для своей модели заполните ручные ставки.');
  if(!['standard','fast','ultrafast','batch','flex'].includes(row.speed)||!['5m','1h'].includes(row.ttl))errs.push('Неизвестный режим модели');
  for(const key of ['share','cache','writes','long'])if(!Number.isFinite(Number(row[key]))||num(row[key])<0||num(row[key])>100)errs.push(m.name+': '+key+' должен быть 0–100%');
  for(const key of ['input','output','geo'])if(!Number.isFinite(Number(row[key]))||num(row[key])<0||num(row[key])>1e8)errs.push(m.name+': недопустимый '+key);
  if(row.customRates&&(!Array.isArray(row.customRates)||row.customRates.length!==4||row.customRates.some(x=>!Number.isFinite(Number(x))||Number(x)<0)))errs.push(m.name+': некорректные ручные ставки');
  if(l.kind==='subscription'&&p?.family!=='custom'&&p){const expected=p.family==='glm'?'zai':p.family;if(m.provider!==expected||(p.family==='glm'&&!m.glm))errs.push(m.name+' не входит в этот план');}
  if(l.kind==='subscription'&&row.speed==='ultrafast'&&p&&!p.ultrafast)errs.push('Ultrafast подписки доступен только Pro 500 из представленных планов');
  if(row.speed==='ultrafast'&&!m.ultrafast)errs.push(m.name+': Ultrafast не поддержан');
  if(row.speed==='fast'&&m.provider!=='openai'&&!m.fast)errs.push(m.name+': Fast не поддержан');
  if(row.speed==='flex'&&m.provider!=='openai')errs.push(m.name+': Flex не поддержан');
  if(row.speed==='batch'&&!['openai','anthropic'].includes(m.provider))errs.push(m.name+': Batch не подтверждён');
  if(l.kind==='subscription'&&['batch','flex'].includes(row.speed))errs.push('Batch/Flex применяются к API, не к included subscription allowance');
  if(l.kind==='openrouter'&&!(ROUTES[m.id]||[]).some(r=>r.id===row.route)&&!row.customRates)errs.push(m.name+': выберите проверенный маршрут или введите свои цены');
  if(l.kind==='openrouter'&&row.speed!=='standard')errs.push('OpenRouter: для иных скоростей задайте отдельный маршрут с его ставками, Standard в этой форме');
 }
 return [...new Set(errs)];
}
export function calculateLine(l,s,{first=false,date=s.date,month=0}={}){
 s=lineSettings(l,s);l=effectiveLine(l,s);
 const errors=lineErrors(l,s);if(errors.length)return {line:l,errors,notes:[],rows:[],low:0,high:0,cashLow:0,cashHigh:0,valid:false,covered:false};
 if(profileLinked(l)&&l.users===0&&l.seats===0)return {line:l,plan:PLAN[l.plan],inactive:true,errors:[],notes:['В выбранной группе нет потребителей; позиция не оплачивается и не расходует токены.'],rows:[],low:0,high:0,cashLow:0,cashHigh:0,valid:true,covered:true,api:0,seat:0,usageLow:0,usageHigh:0,feeLow:0,feeHigh:0,extras:0,bundleCash:0};
 const p=l.kind==='subscription'?PLAN[l.plan]:null;const rows=l.rows.map(r=>costRow(l,r,s));const api=rows.reduce((a,r)=>a+r.cost,0);
 const period=l.billing==='annual'?12:l.billing==='quarterly'?3:1;
 const unit=l.unitPrice!==null?num(l.unitPrice):p?(l.billing==='monthly'?p.monthly:p[l.billing]):0;
 const seat=p?unit*num(l.seats)*(1-num(l.discount)/100):0;
 const term=seat*period;const introActive=first&&l.introConfirmed&&(!l.introUntil||date<=l.introUntil);
 const introSaving=introActive?term*num(l.intro)/100:0;
 const notes=[];let usageLow=api,usageHigh=api,covered=true,quota=null,credits=0;
 if(l.audience==='technical'){notes.push('Техническая нагрузка: '+s.days+' дней/месяц, '+s.weekDays+' дней/неделю; '+s.workers+' параллельных процессов на учётку. Расход включает все процессы: параллелизм не умножает объём или квоту.');if(p)notes.push('Отдельная позиция предполагает отдельную оплачиваемую учётку. При использовании учётки сотрудника объедините весь её расход в одной позиции и исключите повторную оплату и квоту.');}
 if(profileLinked(l))notes.push('Расход и количество потребителей связаны с профилем команды. Все группы используют выбранный mix моделей и параметры кеша этой позиции.');
 if(p?.family==='glm'){
  const time=timeProfile(s,'glm');
  const cohorts=l._cohorts||[{id:'manual',name:'На одного человека',count:l.users,input:l.input,output:l.output}];
  const groups=cohorts.map(g=>{const cr=l._cohorts?l.rows.map(row=>costRow({...l,audience:'manual',users:g.count,input:g.input,output:g.output},row,s)):rows;const daily=cr.reduce((a,r)=>a+r.glmDaily,0),groupApi=cr.reduce((a,r)=>a+r.cost,0);const weekly=daily*time.multiplier*num(s.weekDays)+num(l.extraCredits),five=daily*time.max5+num(l.extraCredits)/Math.max(1,num(s.weekDays)),fraction=Math.min(1,weekly?p.qw/weekly:1,five?p.q5/five:1);return {...g,weekly,five,fraction,api:groupApi};});
  const usedFraction=Math.min(1,...groups.map(g=>g.fraction)),excess=1-usedFraction;
  quota={weekly:Math.max(0,...groups.map(g=>g.weekly)),five:Math.max(0,...groups.map(g=>g.five)),weekLimit:p.qw,fiveLimit:p.q5,peak:time.peak,fraction:usedFraction,groups:l._cohorts?groups:null};
  if(excess>1e-9){
   if(l.overflow==='payg'){usageLow=usageHigh=groups.reduce((a,g)=>a+g.api*(1-g.fraction),0)*(p.team&&l.glmOveragePromo ? .9 : 1);notes.push('Перерасход оценён отдельно по каждой группе, при постоянном mix; фактический счёт зависит от порядка запросов.');if(num(l.extraCredits)>0){covered=false;notes.push('Стоимость перерасхода MCP/прочих credits неизвестна и не включена. Добавьте подтверждённую стоимость в другие сервисы; итог пока неполный.');}if(!p.team)notes.push('Personal: PAYG fallback требует отдельного Standard API Key и переключения; автоматического overage нет.');}
   else{usageLow=usageHigh=0;covered=false;notes.push('Квоты не хватает: показанная цена не обеспечивает весь введённый объём.');}
  }else usageLow=usageHigh=0;
  notes.push('Квота на человека, остатки не объединяются. Модель равномерной недели, не точные календарные reset.');
  if(num(l.extraCredits)>0)notes.push('Дополнительные credits равномерны по рабочим дням, но весь дневной расход считается внутри худших 5 часов — консервативное допущение.');
  if(s.peakMode==='manual')notes.push('Пятичасовая оценка при ручной доле пика приближённая; точное распределение неизвестно.');
  if(p.team&&l.glmOveragePromo)notes.push('−10% Team overage: срок акции не опубликован; будущая цена может измениться.');
 }else if(p){
  let metered=api;
  if(p.family==='openai'){
   credits=rows.reduce((a,r)=>a+r.codexCredits,0);metered=credits*num(l.creditUsd);
   if(!l.creditConfirmed)notes.push('USD/credit — ваше допущение. Подтвердите цену пакета в checkout; это не универсальный курс.');
   if(l.rows.some(r=>r.speed==='fast'||r.speed==='ultrafast'))notes.push('Fast/Ultrafast расходуют included allowance ×2.5/×8; paid credits ×2/×6. Процент покрытия задаётся с учётом выбранной скорости.');
  }
  if(p.metered){usageLow=usageHigh=metered;notes.push('Codex service account: PAYG, без включённой квоты подписки; workspace credits отличаются от Platform API. Цена credit требует подтверждения.');}
  else if(l.coverageMode==='manual'){usageLow=usageHigh=metered*(1-num(l.coverage)/100);notes.push('Покрытие подпиской '+num(l.coverage)+'% задано пользователем, не является опубликованной квотой.');}
  else{usageLow=0;usageHigh=metered;notes.push('Включённая токенная квота неизвестна. Диапазон: seats → seats + весь расход сверх квоты, при выбранных допущениях.');}
 }
 if(l.intro>0&&!l.introConfirmed)notes.push('Скидка первого заказа не включена: применимость не подтверждена.');
 if(introActive&&l.billing!=='monthly')notes.push('Разовая скидка применяется к полному первому платежу за период. Stacking с annual/quarterly подтверждает пользователь.');
 if(l.rows.some(r=>r.customRates))notes.push('Есть ручные тарифы: они заменяют опубликованные ставки.');
 if(l.rows.some(r=>num(r.geo)>0))notes.push('Географическая надбавка задана отдельно; не применяйте повторно к цене regional endpoint.');
 if(rows.some(r=>r.route?.alternative))notes.push('Альтернативный хост: эквивалентность качества, скорости и tool support не гарантирована.');
 if(rows.some(r=>r.route?.regional))notes.push('Europe routing включает EU/EEA, UK и CH; это не подтверждение strict EU-only.');
 if(l.kind==='openrouter'&&rows.some(r=>r.time)&&l.holiday)notes.push('Праздничная скидка direct DeepSeek не подтверждена в OpenRouter: здесь не применяется.');
 if(l.kind==='api'&&l.holiday)notes.push('Китайский праздник задан вручную только для direct DeepSeek; календарь не проверяется автоматически.');
 for(const r of rows)if(r.model.promoUntil&&date>r.model.promoUntil)notes.push(r.model.name+': промо подтверждено только до '+r.model.promoUntil+'; сохранена последняя цена, будущая неизвестна.');
 // Discounts and purchased balances are settled across matching accounts in calculateScenario.
 const bundleActive=p?.family==='anthropic'&&(first||l.bundleRecurring);
 const bundleFace=bundleActive?(num(l.bundle50)*50+num(l.bundle250)*250+num(l.bundle1000)*1000):0;
 const bundleCash=bundleActive?(num(l.bundle50)*45+num(l.bundle250)*200+num(l.bundle1000)*700):0;
 const rawLow=usageLow,rawHigh=usageHigh;
 if(l.kind==='openrouter'&&l.routerPlan==='byok'){usageLow*=1-num(l.providerDiscount)/100;usageHigh*=1-num(l.providerDiscount)/100;}
 const startupWithin=l.kind==='openrouter'&&l.startup&&date>=l.startupDate&&date<addMonths(l.startupDate,12);
 if(l.kind==='openrouter'&&l.routerPlan==='business'&&l.feeMin===null)notes.push('Business: отдельный minimum fee не подтверждён; в модели 0, можно изменить.');
 if(l.kind==='openrouter'&&l.routerPlan==='byok')notes.push('BYOK: provider invoice отдельно; порог платформы общий по группе. OR credits оплачивают только platform fee. Пополнение для fee: 5.5%, minimum $0.80, если не изменён.');
 if(l.startup)notes.push('Startup включён как подтверждённая eligibility; waiver 12 месяцев, grant обычно 6.');
 if(num(l.monthlyCredit)>0)notes.push('Ежемесячные credits — ручное допущение; не суммируйте повторно со связанным API bonus.');
 if(p?.family==='anthropic'&&(bundleFace||l.bundle50||l.bundle250||l.bundle1000))notes.push('Перенос bundles в прогнозе: '+(l.bundleMonths??1)+' мес. Это выбранное допущение, срок провайдера не подтверждён. Team баланс общий в группе; personal — равномерно между аккаунтами.');
 const cashSeat=first?term-introSaving:(month%period===0?term:0);
 const out={line:l,plan:p,errors,notes,rows,api,credits,quota,covered,valid:true,seat,period,term,introSaving,usageLow,usageHigh,rawLow,rawHigh,feeLow:0,feeHigh:0,extras:num(l.extraUsd),bundleCash,bundleFace,bundleLeftLow:0,bundleLeftHigh:0,grantUsedLow:0,grantUsedHigh:0,startupWithin,cashSeat,bonusUsed:0};
 return finalize(out,s);
}
function finalize(r,s){
 const beforeLow=r.seat+r.usageLow+r.feeLow+r.extras+r.bundleCash;
 const beforeHigh=r.seat+r.usageHigh+r.feeHigh+r.extras+r.bundleCash;const tax=1+num(s.tax)/100;
 r.low=beforeLow*tax;r.high=beforeHigh*tax;r.cashLow=(r.cashSeat+r.usageLow+r.feeLow+r.extras+r.bundleCash)*tax;r.cashHigh=(r.cashSeat+r.usageHigh+r.feeHigh+r.extras+r.bundleCash)*tax;
 r.rubLow=r.low*num(s.fx);r.rubHigh=r.high*num(s.fx);return r;
}
// Independent low/high balance ledgers preserve uncertainty without spending the same credit twice.
const groupOf=r=>r.plan.team?'team:'+(r.line.org||'main'):'personal:'+r.line.id;
function creditLot(map,key,amount,expires){if(!amount)return;if(!map.has(key))map.set(key,[]);map.get(key).push({low:amount,high:amount,expires});}
function spend(map,key,low,high,date){let usedLow=0,usedHigh=0;const lots=(map.get(key)||[]).filter(x=>x.expires>date).sort((a,b)=>a.expires.localeCompare(b.expires));map.set(key,lots);for(const x of lots){const a=Math.min(x.low,low-usedLow),b=Math.min(x.high,high-usedHigh);x.low-=a;x.high-=b;usedLow+=a;usedHigh+=b;}return [usedLow,usedHigh];}
const ledgerNew=()=>({bundles:new Map(),grants:new Map(),startup:new Map()});
export function calculateScenario(scenario,s,{first=false,date=scenarioSettings(scenario,s).date,month=0,ledger=ledgerNew()}={}){
 s=scenarioSettings(scenario,s);
 const lines=scenario.lines.map(l=>calculateLine(l,s,{first,date,month}));const errors=lines.flatMap((r,i)=>r.errors.map(e=>'Позиция '+(i+1)+': '+e));
 const bonusPools=new Map(),byokGroups=new Map(),bonusTo=new Map(),bonusFrom=new Map(),bundlePurchased=new Map();
 for(const r of lines){if(!r.valid||r.inactive)continue;const l=r.line;
  if(r.bundleFace){const key=groupOf(r);creditLot(ledger.bundles,key,r.bundleFace,addMonths(date,l.bundleMonths??1));bundlePurchased.set(key,(bundlePurchased.get(key)||0)+r.bundleFace);}
  if(first&&num(l.grantOnce)>0&&(!l.grantUntil||date<=l.grantUntil))creditLot(ledger.grants,l.id,num(l.grantOnce),l.grantUntil?addDay(l.grantUntil):addMonths(date,1));
  if(first&&l.kind==='openrouter'&&l.startup&&date>=l.startupDate&&date<addMonths(l.startupDate,6))creditLot(ledger.startup,l.id,num(l.startupGrant),addMonths(l.startupDate,6));
  if(num(l.monthlyCredit)>0)creditLot(ledger.grants,l.id,num(l.monthlyCredit),addMonths(date,1));
  if(l.kind==='openrouter'&&l.routerPlan==='byok'){const key=l.org||'main';if(!byokGroups.has(key))byokGroups.set(key,[]);byokGroups.get(key).push(r);}
 }
 // Bundles are fungible within one Claude Team, even when Standard/Premium are separate lines.
 for(const r of lines){if(!r.valid||r.inactive||r.plan?.family!=='anthropic')continue;const key=groupOf(r),used=spend(ledger.bundles,key,r.usageLow,r.usageHigh,date);r.usageLow-=used[0];r.usageHigh-=used[1];r.bundleUsedLow=used[0];r.bundleUsedHigh=used[1];}
 for(const r of lines){if(!r.valid||r.inactive||r.plan?.family!=='anthropic')continue;const key=groupOf(r),lots=ledger.bundles.get(key)||[];r.bundleLeftLow=lots.reduce((a,x)=>a+x.high,0);r.bundleLeftHigh=lots.reduce((a,x)=>a+x.low,0);const max=r.plan.team?3000:2000*num(r.line.seats);if((bundlePurchased.get(key)||0)>max)errors.push('Превышен monthly лимит discounted Claude bundles: '+max+' номинала для '+key);}
 // General grants reduce metered spend, never subscription seats. BYOK is handled after its provider bill.
 for(const r of lines){if(!r.valid||r.inactive||(r.line.kind==='openrouter'&&r.line.routerPlan==='byok'))continue;for(const pool of [ledger.grants,ledger.startup]){const used=spend(pool,r.line.id,r.usageLow,r.usageHigh,date);r.usageLow-=used[0];r.usageHigh-=used[1];r.grantUsedLow+=used[0];r.grantUsedHigh+=used[1];}}
 // One eligible subscription group <-> one linked Console organization, not one per key or line.
 for(const r of lines){
  if(!r.valid||r.inactive||r.line.kind!=='api'||!r.line.bonusSource||!r.line.bonusConfirmed)continue;
  if(r.line.apiRuntime==='claude-action'){r.notes.push('Monthly Claude API bonus не применяется к официальному Claude Code GitHub Action.');continue;}
  const source=lines.find(x=>x.line.id===r.line.bonusSource&&x.valid&&!x.inactive&&x.plan?.family==='anthropic'&&x.plan.bonus);
  if(!source){errors.push('Claude API bonus: подходящая подписка-источник отсутствует.');continue;}
  const group=source.plan.team?'team:'+(source.line.org||'main'):'personal:'+(source.line.org||source.line.id),target=r.line.org||'main';
  if((bonusTo.has(group)&&bonusTo.get(group)!==target)||(bonusFrom.has(target)&&bonusFrom.get(target)!==group)){errors.push('Claude API bonus: один план/Team связывается с одним Console org, и один Console org — с одним источником.');continue;}
  bonusTo.set(group,target);bonusFrom.set(target,group);
  if(!bonusPools.has(group)){
   const sources=lines.filter(x=>x.valid&&x.plan?.family==='anthropic'&&x.plan.bonus&&(source.plan.team?x.plan.team&&(x.line.org||'main')===(source.line.org||'main'):!x.plan.team&&(x.line.org||x.line.id)===(source.line.org||source.line.id)));
   bonusPools.set(group,source.plan.team?Math.min(500,sources.reduce((a,x)=>a+x.plan.bonus*x.line.seats,0)):Math.max(...sources.map(x=>x.plan.bonus)));
  }
  const eligible=r.rows.filter(x=>x.model.provider==='anthropic').reduce((a,x)=>a+x.cost,0),used=Math.min(bonusPools.get(group),eligible,r.usageLow);
  r.usageLow-=used;r.usageHigh-=used;r.bonusUsed=used;bonusPools.set(group,bonusPools.get(group)-used);
  r.notes.push('Claude API bonus применён только к eligible Anthropic API; claim/7 дней и связанный org подтверждены пользователем.');
 }
 // BYOK threshold and top-up minimum are calculated once per account group; allocate pro rata to lines.
 for(const [key,list] of byokGroups){
  const l=list[0].line;for(const r of list)for(const k of ['byokPrior','feeMin','topups','startup','startupDate'])if(r.line[k]!==l[k])errors.push('BYOK группа '+key+': '+k+' должен совпадать во всех позициях.');
  const total=list.reduce((a,r)=>a+r.api,0),prior=num(l.byokPrior),fee=list[0].startupWithin?0:.05*(Math.max(0,prior+total-25000)-Math.max(0,prior-25000));
  let low=fee,high=fee;for(const r of list)for(const pool of [ledger.grants,ledger.startup]){const used=spend(pool,r.line.id,low,high,date);low-=used[0];high-=used[1];r.grantUsedLow+=used[0];r.grantUsedHigh+=used[1];}
  const funding=v=>v>0?Math.max(v*.055,(l.feeMin===null?.8:num(l.feeMin))*num(l.topups)):0;
  for(const r of list){const share=total?r.api/total:1/list.length;r.feeLow=(low+funding(low))*share;r.feeHigh=(high+funding(high))*share;}
 }
 for(const r of lines){if(!r.valid||r.inactive)continue;const l=r.line;if(l.kind==='openrouter'&&l.routerPlan!=='byok'){const rate=r.startupWithin?0:l.routerPlan==='business'?.08:.055,min=r.startupWithin?0:l.feeMin!==null?num(l.feeMin):l.routerPlan==='standard'?.8:0;const f=v=>v>0?Math.max(v*rate,min*num(l.topups)):0;r.feeLow=f(r.usageLow);r.feeHigh=f(r.usageHigh);}
  if(r.grantUsedHigh)r.notes.push('Применено credits до $'+r.grantUsedHigh.toFixed(2)+' к eligible расходу/комиссии.');finalize(r,s);
 }
 const groups=new Map();for(const r of lines){if(!r.valid||r.inactive||!r.plan?.team)continue;const key=r.plan.family+':'+(r.line.org||'main');if(!groups.has(key))groups.set(key,[]);groups.get(key).push(r);}
 for(const list of groups.values()){const count=list.reduce((a,r)=>a+num(r.line.seats),0),p=list[0].plan;if(p.min&&count<p.min)errors.push(p.name+': в группе минимум '+p.min+' места');if(p.max&&count>p.max)errors.push(p.name+': превышен опубликованный максимум '+p.max);if(p.family==='glm'&&new Set(list.map(r=>r.plan.id)).size>1)errors.push('GLM: Standard и Premium нельзя смешивать в одной Team-группе.');}
 const sum=k=>lines.reduce((a,r)=>a+num(r[k]),0);
 return {lines,errors:[...new Set(errors)],valid:!errors.length,covered:lines.every(r=>r.covered),low:sum('low'),high:sum('high'),cashLow:sum('cashLow'),cashHigh:sum('cashHigh'),seat:sum('seat'),api:sum('api'),usageLow:sum('usageLow'),usageHigh:sum('usageHigh'),fees:sum('feeHigh'),extras:sum('extras')+sum('bundleCash'),range:Math.abs(sum('high')-sum('low'))>.005};
}
export function forecast(scenario,s){
 s=scenarioSettings(scenario,s);
 const bad=settingsErrors(s);if(bad.length){const invalid={lines:scenario.lines.map(line=>({line,valid:false,errors:bad,rows:[],notes:[]})),valid:false,covered:false,errors:bad,low:0,high:0,cashLow:0,cashHigh:0};return {regular:invalid,first:invalid,year:{low:0,high:0,valid:false}};}
 const regular=calculateScenario(scenario,s,{first:false,month:1}),first=calculateScenario(scenario,s,{first:true}),ledger=ledgerNew();let low=0,high=0,valid=true;const months=[];
 for(let m=0;m<12;m++){const r=calculateScenario(scenario,s,{first:m===0,month:m,date:addMonths(s.date,m),ledger});low+=r.cashLow;high+=r.cashHigh;valid&&=r.valid;months.push({date:addMonths(s.date,m),result:r});}
 return {regular,first,year:{low,high,valid},months};
}
function validDate(x){return /^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(Date.parse(x+'T12:00:00Z'))&&new Date(x+'T12:00:00Z').toISOString().slice(0,10)===x;}
function addDay(date){return new Date(Date.parse(date+'T12:00:00Z')+86400000).toISOString().slice(0,10);}
export function settingsErrors(s){const errors=[];for(const [key,min,max] of [['fx',.001,100000],['team',0,10000],['days',1,31],['weekDays',1,7],['start',0,23.75],['end',0,23.75],['utc',-12,14],['peak',0,100],['tax',0,100]])if(!Number.isFinite(Number(s[key]))||num(s[key])<min||num(s[key])>max)errors.push('Некорректный общий параметр: '+key);for(const k of ['weekDays','team','days'])if(!Number.isInteger(num(s[k])))errors.push(k+': требуется целое число');for(const k of ['start','end','utc'])if(!Number.isInteger(num(s[k])*4))errors.push(k+': используйте шаг 0.25 часа (15 минут)');if(s.profile!==undefined){if(!Array.isArray(s.profile)||s.profile.length!==3||new Set(s.profile.map(g=>g?.id)).size!==3||s.profile.some(g=>!g||!PROFILE_GROUPS.some(p=>p.id===g.id)))errors.push('Нужны три группы профиля команды');else{for(const g of s.profile){if(!Number.isInteger(g.count)||g.count<0||g.count>10000)errors.push('В группе '+g.id+' укажите целое количество от 0 до 10000');for(const k of ['input','output'])if(typeof g[k]!=='number'||!Number.isFinite(g[k])||g[k]<0||g[k]>1e8)errors.push('Некорректный расход '+g.id);}if(profileTotals(s).count!==s.team)errors.push('Численность команды должна совпадать с суммой групп');}}if(s.technical!==undefined){const t=s.technical;if(!t||typeof t!=='object')errors.push('Некорректный технический профиль');else errors.push(...technicalErrors(t));}if(!validDate(s.date))errors.push('Некорректная дата');if(!['schedule','manual'].includes(s.peakMode))errors.push('Неизвестный режим расписания');return errors;}
export function technicalErrors(t){const errors=[];for(const [k,min,max] of [['count',0,10000],['input',0,1e8],['output',0,1e8],['days',1,31],['weekDays',1,7],['start',0,23.75],['end',0,23.75],['workers',1,10000],['peak',0,100]])if(typeof t[k]!=='number'||!Number.isFinite(t[k])||t[k]<min||t[k]>max)errors.push('Технический профиль: некорректный '+k);for(const k of ['count','days','weekDays','workers'])if(!Number.isInteger(t[k]))errors.push('Технический профиль: '+k+' должен быть целым');for(const k of ['start','end'])if(!Number.isInteger(t[k]*4))errors.push('Техническое расписание: шаг 15 минут');if(!['schedule','manual'].includes(t.peakMode))errors.push('Технический профиль: неизвестное расписание');if(t.purpose!==undefined&&!['shared','personal'].includes(t.purpose))errors.push('Неизвестное назначение технических учёток');return errors;}
export function validateState(x){
 if(!x||x.version!==3||!x.settings||!Array.isArray(x.scenarios)||!x.scenarios.length||x.scenarios.length>30)throw new Error('Нужен файл сценариев версии 1, 2 или 3, не более 30 сценариев.');
 if(!Array.isArray(x.settings.profile))throw new Error('Отсутствует профиль команды');
 if(!x.settings.technical)throw new Error('Отсутствует технический профиль');
 const s=x.settings,bad=settingsErrors(s);if(bad.length)throw new Error(bad[0]);
 const ids=new Set();for(const sc of x.scenarios){if(typeof sc.id!=='string'||!/^[a-zA-Z0-9_-]{1,100}$/.test(sc.id)||ids.has(sc.id)||typeof sc.name!=='string'||sc.name.length>120||!Array.isArray(sc.lines)||sc.lines.length>50)throw new Error('Некорректный сценарий');ids.add(sc.id);const ss=scenarioSettings(sc,s);if(sc.settings&&(!Array.isArray(ss.profile)||!ss.technical))throw new Error('Неполный профиль сценария');const issues=settingsErrors(ss);if(issues.length)throw new Error(issues[0]);const lineIds=new Set();for(const l of sc.lines){if(typeof l.id!=='string'||!/^[a-zA-Z0-9_-]{1,100}$/.test(l.id)||lineIds.has(l.id)||!Array.isArray(l.rows)||l.rows.length>50)throw new Error('Некорректная позиция');lineIds.add(l.id);const rowIds=new Set();for(const r of l.rows){if(!r||typeof r.id!=='string'||!/^[a-zA-Z0-9_-]{1,100}$/.test(r.id)||rowIds.has(r.id))throw new Error('Некорректный ID модели');rowIds.add(r.id);}if(lineErrors(l,ss).length)throw new Error('Позиция содержит ошибки: '+lineErrors(l,ss)[0]);}}
 if(!x.scenarios.some(sc=>sc.id===x.active))x.active=x.scenarios[0]?.id;
 return x;
}
export function parseImport(text){if(text.length>2000000)throw new Error('Файл больше 2 MB');const x=JSON.parse(text,(k,v)=>{if(['__proto__','constructor','prototype'].includes(k))throw new Error('Недопустимый ключ в JSON');return v;});return validateState(migrateState(x));}
