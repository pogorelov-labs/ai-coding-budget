import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import * as catalogue from '../src/catalog.js';
import {AUTOMATION_SOURCES,automationAssessment} from '../src/automation.js';
import {translateUI} from '../src/i18n.js';
import {newLine,newRow,initialState,calculateScenario} from '../src/engine.js';
const hasRussian=s=>/[а-яё]/i.test(s);
const source=readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
function research(locale){
 const functions=['automationGuideHTML','catalogHTML','methodHTML'].map(name=>{const start=source.indexOf('function '+name),end=source.indexOf('\nfunction ',start+9);return source.slice(start,end);}).join('\n');
 const context={...catalogue,AUTOMATION_SOURCES,esc:s=>String(s),USD:new Intl.NumberFormat(locale,{style:'currency',currency:'USD'}),nf:new Intl.NumberFormat(locale),sourceLink:id=>{const s=catalogue.SOURCES.find(s=>s.id===id);return s?`<a href="${s.url}">${s.name}</a>`:'';}};
 vm.createContext(context);vm.runInContext(functions+'\nthis.html=automationGuideHTML()+catalogHTML()+methodHTML()',context);
 return context.html.replace(/<[^>]*>/g,'\n').split('\n').map(s=>s.trim()).filter(Boolean);
}
test('all rendered research fragments translate to English in either number locale',()=>{
 for(const locale of ['en-US','ru-RU'])for(const text of research(locale))assert.equal(hasRussian(translateUI(text,'en')),false,text);
});
test('every provider automation condition and route name supports English',()=>{
 for(const purpose of ['shared','personal'])for(const plan of catalogue.PLANS)for(const kind of ['subscription','api','openrouter']){
  const assessment=automationAssessment({kind,plan:plan.id,audience:'technical'},{technical:{purpose}});
  for(const text of [assessment.title,assessment.text])assert.equal(hasRussian(translateUI(text,'en')),false,text);
 }
 for(const routes of Object.values(catalogue.ROUTES))for(const route of routes)assert.equal(hasRussian(translateUI(route.name,'en')),false,route.name);
});
test('static engine notes and representative generated conditions are translated without changing amounts',()=>{
 const engine=readFileSync(new URL('../src/engine.js',import.meta.url),'utf8');
 for(const match of engine.matchAll(/notes\.push\('([^']+)'\)/g))assert.equal(hasRussian(translateUI(match[1],'en')),false,match[1]);
 const messages=[
  ['Техническая нагрузка: 22 дней/месяц, 5 дней/неделю; 3 параллельных процессов на учётку. Расход включает все процессы: параллелизм не умножает объём или квоту.',['22','5','3']],
  ['Покрытие подпиской 72.5% задано пользователем, не является опубликованной квотой.',['72.5%']],
  ['GPT-5.6 Sol: промо подтверждено только до 2026-11-21; сохранена последняя цена, будущая неизвестна.',['GPT-5.6 Sol','2026-11-21']],
  ['Перенос bundles в прогнозе: 3 мес. Это выбранное допущение, срок провайдера не подтверждён. Team баланс общий в группе; personal — равномерно между аккаунтами.',['3']],
  ['Применено credits до $51.23 к eligible расходу/комиссии.',['$51.23']],
  ['Позиция 3: GLM: Standard и Premium нельзя смешивать в одной Team-группе.',['3','GLM','Standard','Premium']],
  ['BYOK группа org-123: feeMin должен совпадать во всех позициях.',['org-123','feeMin']]
 ];
 for(const [message,values] of messages){const en=translateUI(message,'en');assert.equal(hasRussian(en),false,en);for(const value of values)assert.ok(en.includes(value),value);assert.equal(translateUI(en,'ru'),message);}
 const state=initialState(),l=newLine('subscription','glm-pro',1);l.coverageMode='manual';l.coverage=50;l.extraCredits=5;l.overflow='payg';l.rows=[newRow('glm')];
 const result=calculateScenario({lines:[l]},state.settings);
 for(const line of result.lines)for(const note of line.notes)assert.equal(hasRussian(translateUI(note,'en')),false,note);
});
test('migration labels remain verbatim and localization never mutates saved budget data',()=>{
 const original='В сценарии «Бюджет研发» у Личный план было 2 оплаченных подписок/мест и 8 активных пользователей. При переносе установлено единое количество 2. Остальные параметры сохранены.';
 const en=translateUI(original,'en');assert.ok(en.includes('Бюджет研发'));assert.ok(en.includes('Личный план'));assert.equal(translateUI(en,'ru'),original);
 const state=initialState(),before=JSON.stringify(state);for(const lang of ['en','ru','en'])for(const sc of state.scenarios)for(const line of calculateScenario(sc,state.settings).lines)for(const note of line.notes)translateUI(note,lang);assert.equal(JSON.stringify(state),before);
});
