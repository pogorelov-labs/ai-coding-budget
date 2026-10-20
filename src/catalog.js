import {GATEWAY_PROVIDERS,GATEWAY_MODELS} from './gateway-catalog.js';
import {CURRENT_OR_MODELS,CURRENT_OR_ROUTES} from './openrouter-current.js';
export const CHECKED='2026-10-17';
export const SOURCES=[
 {id:'oai-api',name:'OpenAI · API pricing',url:'https://developers.openai.com/api/docs/pricing',date:CHECKED},
 {id:'codex',name:'Codex · подписки, credits и ограничения',url:'https://learn.chatgpt.com/docs/pricing',date:CHECKED},
 {id:'oai-business',name:'ChatGPT Business · seats и annual',url:'https://help.openai.com/en/articles/8792828-chatgpt-business-overview',date:CHECKED},
 {id:'oai-seat-limits',name:'Business · seat minimum; upper limit unverified',url:'https://learn.chatgpt.com/docs/pricing',date:'2026-10-20'},
 {id:'glm-prices',name:'Z.ai · цены личных подписок',url:'https://z.ai/subscribe',date:CHECKED},
 {id:'glm-credits',name:'GLM · формула и квоты',url:'https://docs.z.ai/devpack/overview',date:CHECKED},
 {id:'glm-team',name:'GLM · Team и overage',url:'https://docs.z.ai/devpack/teamplan',date:CHECKED},
 {id:'glm-api',name:'Z.ai · API pricing',url:'https://docs.z.ai/guides/overview/pricing',date:CHECKED},
 {id:'glm-referral',name:'Z.ai · referral',url:'https://docs.z.ai/devpack/credit-campaign-rules',date:CHECKED},
 {id:'glm-legacy',name:'Z.ai · legacy/current usage',url:'https://docs.z.ai/devpack/notice/usage-revision',date:CHECKED},
 {id:'glm-keys',name:'Z.ai · тип ключа и биллинг',url:'https://docs.z.ai/devpack/notice/api-key-management',date:CHECKED},
 {id:'claude-api',name:'Anthropic · API pricing',url:'https://platform.claude.com/docs/en/about-claude/pricing',date:CHECKED},
 {id:'claude-plans',name:'Claude · подписки',url:'https://claude.com/pricing',date:CHECKED},
 {id:'claude-bonus',name:'Claude · API bonus',url:'https://support.claude.com/en/articles/17154008-monthly-api-credits-for-max-and-team-plans',date:CHECKED},
 {id:'ds-api',name:'DeepSeek · цены и часы',url:'https://api-docs.deepseek.com/quick_start/pricing/',date:CHECKED},
 {id:'or-prices',name:'OpenRouter · комиссии',url:'https://openrouter.ai/pricing',date:CHECKED},
 {id:'or-byok',name:'OpenRouter · BYOK',url:'https://openrouter.ai/docs/guides/overview/auth/byok',date:CHECKED},
 {id:'or-startup',name:'OpenRouter · Startup',url:'https://openrouter.ai/startups',date:CHECKED},
 {id:'or-region',name:'OpenRouter · Europe routing',url:'https://openrouter.ai/docs/guides/features/in-region-routing',date:CHECKED},
 {id:'research',name:'Исследование и условия аккаунтов',url:'https://github.com/pogorelov-labs/ai-coding-budget/tree/main/research',date:'2026-10-15'},
 {id:'economics',name:'Расчёты и сценарии',url:'https://github.com/pogorelov-labs/ai-coding-budget/blob/main/research/hybrid-18-plus-agent-2026-10-17.md',date:'2026-10-15'}
];
const model=(id,name,provider,rates,extra={})=>({id,name,provider,rates,...extra});
// Rates: uncached input, cache write, cache read, output, USD / million.
export const MODELS=[
 model('sol','GPT-6.1 Sol','openai',[2,2.5,.1,10],{long:[2,2,2,1.5],threshold:272000,credit:[50,2.5,250],ultrafast:true,source:'oai-api',orSlug:'openai/gpt-6.1-sol'}),
 model('luna','GPT-6 Luna','openai',[.1,.125,.01,.5],{long:[2,2,2,1.5],threshold:272000,credit:[2.5,.25,12.5],source:'oai-api',orSlug:'openai/gpt-6-luna'}),
 model('astra','GPT-6 Astra','openai',[10,12.5,1,50],{long:[2,2,2,1.5],threshold:272000,credit:[250,25,1250],ultrafast:true,source:'oai-api'}),
 model('sol6','GPT-6 Sol','openai',[2,2.5,.2,10],{long:[2,2,2,1.5],threshold:272000,credit:[50,5,250],source:'oai-api'}),
 model('sol56','GPT-5.6 Sol','openai',[4,5,.4,20],{long:[2,2,2,1.5],threshold:272000,credit:[100,10,500],promoUntil:'2026-11-21',source:'oai-api'}),
 model('sonnet','Claude Sonnet 5.5','anthropic',[2,2.5,.1,10],{write1h:4,source:'claude-api',orSlug:'anthropic/claude-sonnet-5.5'}),
 model('opus','Claude Opus 5.5','anthropic',[4,5,.2,20],{write1h:8,fast:true,source:'claude-api',orSlug:'anthropic/claude-opus-5.5'}),
 model('haiku','Claude Haiku 5.5','anthropic',[.1,.125,.01,.5],{write1h:.2,long:[5,5,5,5],threshold:100000,source:'claude-api'}),
 model('sonnet5','Claude Sonnet 5','anthropic',[2,2.5,.2,10],{write1h:4,source:'claude-api'}),
 model('glm','GLM-5.3','zai',[1.4,1.4,.26,4.4],{glm:[6.9,1.7,24],source:'glm-api',orSlug:'z-ai/glm-5.3'}),
 model('flash','GLM-5.3-Flash','zai',[.15,.15,.03,.5],{glm:[2.3,.56,8],source:'glm-api',orSlug:'z-ai/glm-5.3-flash'}),
 model('flashx','GLM-5.3-FlashX','zai',[.37,.37,.075,1.25],{source:'glm-api'}),
 model('dsflash','DeepSeek V4.1 Flash','deepseek',[.30,.30,.006,1.20],{timed:true,off:[.15,.15,.003,.60],source:'ds-api',orSlug:'deepseek/deepseek-v4.1-flash'}),
 model('dspro','DeepSeek V4 Pro 0813','deepseek',[1.32,1.32,.044,3.96],{timed:true,off:[.66,.66,.022,1.98],source:'ds-api',orSlug:'deepseek/deepseek-v4-pro-0813'}),
 model('custom','Своя модель / тариф','custom',[0,0,0,0],{source:null})
];
MODELS.push(...CURRENT_OR_MODELS,...GATEWAY_MODELS);
export const MODEL=Object.fromEntries(MODELS.map(m=>[m.id,m]));
const plan=(id,name,family,monthly,annual=null,extra={})=>({id,name,family,monthly,annual,...extra});
export const PLANS=[
 plan('glm-lite','GLM Lite','glm',18,12.6,{quarterly:14.4,q5:2000,qw:10000,source:'glm-prices'}),
 plan('glm-pro','GLM Pro','glm',80,56,{quarterly:64,q5:12000,qw:60000,source:'glm-prices'}),
 plan('glm-max','GLM Max','glm',168,117.6,{quarterly:134.4,q5:28000,qw:140000,source:'glm-prices'}),
 plan('glm-team-standard','GLM Team Standard','glm',88,79.2,{q5:15000,qw:66000,team:true,min:2,unlimitedSeats:true,source:'glm-team'}),
 plan('glm-team-premium','GLM Team Premium','glm',188,169.2,{q5:35000,qw:155000,team:true,min:2,unlimitedSeats:true,source:'glm-team'}),
 plan('oai-go','ChatGPT Go','openai',8,null,{source:'codex',onlyLuna:true}),
 plan('oai-plus','ChatGPT Plus','openai',20,null,{source:'codex'}),
 plan('oai-pro100','ChatGPT Pro 100','openai',100,null,{source:'codex'}),
 plan('oai-pro200','ChatGPT Pro 200','openai',200,null,{source:'codex'}),
 plan('oai-pro500','ChatGPT Pro 500','openai',500,null,{source:'codex',ultrafast:true}),
 plan('oai-business','Codex / ChatGPT Business Standard','openai',25,20,{team:true,min:2,max:null,source:'oai-business'}),
 plan('oai-premium','Codex / ChatGPT Business Premium','openai',125,100,{team:true,min:2,max:null,source:'oai-business'}),
 plan('claude-pro','Claude Pro','anthropic',20,200/12,{source:'claude-plans'}),
 plan('claude-max100','Claude Max 5x','anthropic',100,null,{bonus:100,source:'claude-plans'}),
 plan('claude-max200','Claude Max 20x','anthropic',200,null,{bonus:200,source:'claude-plans'}),
 plan('claude-team','Claude Team Standard','anthropic',25,20,{team:true,min:2,max:150,bonus:20,source:'claude-plans'}),
 plan('claude-premium','Claude Team Premium','anthropic',125,100,{team:true,min:2,max:150,bonus:100,source:'claude-plans'}),
 plan('oai-service','Codex · service account PAYG','openai',0,null,{metered:true,source:'codex-service'}),
 plan('custom-sub','Своя / Enterprise / legacy подписка','custom',0,null,{source:null})
];
export const PLAN=Object.fromEntries(PLANS.map(p=>[p.id,p]));
export const ROUTES={
 sol:[{id:'vendor',name:'OpenAI · global',rates:[2,2.5,.1,10]},{id:'azure-eu',name:'Azure · Europe (+10% уже в цене)',rates:[2.2,2.75,.11,11],regional:true}],
 luna:[{id:'vendor',name:'OpenAI · global',rates:[.1,.125,.01,.5]},{id:'azure-eu',name:'Azure · Europe',rates:[.11,.1375,.011,.55],regional:true}],
 sonnet:[{id:'vendor',name:'Anthropic · global',rates:[2,2.5,.1,10]},{id:'vertex-eu',name:'Vertex · Europe',rates:[2.2,2.75,.11,11],regional:true}],
 opus:[{id:'vendor',name:'Anthropic · global',rates:[4,5,.2,20]},{id:'bedrock-eu',name:'Bedrock · eu-west-1',rates:[4.4,5.5,.22,22],regional:true}],
 glm:[{id:'vendor',name:'Z.ai FP8 · global',rates:[1.4,1.4,.26,4.4]},{id:'relace',name:'Relace · альтернативный хост',rates:[.0632,.0632,.0588,4.4],alternative:true},{id:'tenstorrent',name:'Tenstorrent FP8',rates:[.6,.6,.1,2.5],alternative:true}],
 flash:[{id:'vendor',name:'Z.ai FP8 · global',rates:[.15,.15,.03,.5]}],
 dsflash:[{id:'vendor',name:'DeepSeek · тариф по часам',rates:[.3,.3,.006,1.2],timed:true,off:[.15,.15,.003,.6]},{id:'sail',name:'Sail Research FP4',rates:[.09,.09,.006,.3],alternative:true}],
 dspro:[{id:'vendor',name:'DeepSeek · тариф по часам',rates:[1.32,1.32,.044,3.96],timed:true,off:[.66,.66,.022,1.98]},{id:'streamlake',name:'Streamlake · фиксированная цена',rates:[.66,.66,.022,1.98],alternative:true},{id:'sail',name:'Sail Research FP4',rates:[.448,.448,.0935,1.164],alternative:true}]
};
export const OFFERS=[
 ['GLM · часы','Действует','Новые планы: 09–13 МСК по будням ×1, вне пика ×0.5. Legacy V2: ×3/×1 в старых единицах. К API GLM скидка часов не применяется.','glm-legacy'],
 ['GLM · период оплаты','В каталоге','Personal: quarterly −20%, annual −30%; Team annual −10%. Personal и Team перепроверены 17.10; формулы квот — 17.10.','glm-prices'],
 ['GLM · referral','По подтверждению','10% первого подходящего заказа. Renewals/upgrades исключены. Не считать автоматическим stacking с annual или гарантией для Team.','glm-referral'],
 ['GLM · overage','Дата конца не объявлена','Team on-demand сейчас 90% API list. Personal требует отдельного PAYG-профиля/ключа; автоматического перехода нет.','glm-team'],
 ['GLM · ночной Flash','Завершено 07.10.2026','Бесплатный ночной Flash и повышенные лимиты старой кампании не применяются.','glm-credits'],
 ['DeepSeek · off-peak','Действует','Peak будни 01–04 и 06–10 UTC, кроме китайских праздников; остальные часы ×0.5. Праздник задаётся вручную: календарная неоднозначность не скрывается.','ds-api'],
 ['OpenAI · GPT-5.6 Sol','Как минимум до 21.11.2026','Promo уже отражён в цене. После этой даты прогноз использует последнюю ставку с предупреждением, не выдумывает цену renewal.','oai-api'],
 ['OpenAI · Pro 200 legacy','До 29.10.2026 для eligible','Старый повышенный allowance нельзя обещать новому покупателю. Долларовая цена та же, точная квота не опубликована.','codex'],
 ['OpenAI · Batch/Flex/Fast','Режим обработки','API Batch/Flex ×0.5; Fast ×2, Ultrafast ×6. Included subscription allowance Fast ×2.5 / Ultra ×8; это не скорость в столько же раз.','codex'],
 ['Anthropic · API bonus','По подтверждению','Max $100/$200; Team $20/$100 за seat, максимум $500/org. После 7 дней и claim; только eligible API/headless, не interactive Claude Code.','claude-bonus'],
 ['Anthropic · artifacts','Завершено; не для Code','Октябрьское снижение artifact usage не относится к Code/API и не применяется к расчёту.','claude-plans'],
 ['OpenRouter · комиссии','Действует','Standard 5.5%, минимум $0.80 за пополнение; Business 8%. Минимум Business отдельно не подтверждён — задаётся явно.','or-prices'],
 ['OpenRouter · BYOK','Действует','Первые $25,000 list-price inference/month без платформенного сбора, далее 5% превышения. Это не бесплатный inference. Порог общий по аккаунту.','or-byok'],
 ['OpenRouter · Startup','Только одобренным','До $3,000 credits (обычно 6 месяцев), комиссии 0% на 12 месяцев. Введите подтверждённую дату и остаток grant; по умолчанию выключено.','or-startup'],
 ['OpenRouter · регион','Ограничение маршрута','Europe = EU/EEA + UK + Switzerland; это не автоматическая гарантия strict EU-only. Выбранный endpoint может иметь другую цену.','or-region']
];

SOURCES.push({id:'codex-service',date:CHECKED,name:'Codex service accounts · только PAYG',url:'https://learn.chatgpt.com/docs/enterprise/service-accounts'});

Object.assign(ROUTES,CURRENT_OR_ROUTES);
SOURCES.push({id:'or-current',name:'OpenRouter · routes and terms · 20 Oct 2026',url:'https://openrouter.ai/pricing',date:'2026-10-20'});

SOURCES.push({id:'proxyapi-rates',name:'ProxyAPI · RUB prices and conditions',url:'https://proxyapi.ru/models',date:'2026-10-20'},{id:'polza-rates',name:'Polza AI · pinned model routes',url:'https://polza.ai/docs/gaidy/provider-selection',date:'2026-10-20'},{id:'vsegpt-rates',name:'VseGPT · access plans and usage units',url:'https://vsegpt.ru/Docs/Tariffs',date:'2026-10-20'});
