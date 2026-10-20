import {GATEWAY_PROVIDERS} from './gateway-catalog.js';
import {PLAN} from './catalog.js';
export const AUTOMATION_SOURCES={
 codex:'https://learn.chatgpt.com/docs/non-interactive-mode',
 pat:'https://learn.chatgpt.com/docs/enterprise/access-tokens',
 service:'https://learn.chatgpt.com/docs/enterprise/service-accounts',
 wif:'https://developers.openai.com/api/docs/guides/workload-identity-federation',
 anthropicapi:'https://platform.claude.com/docs/en/manage-claude/authentication',
 api:'https://developers.openai.com/api/docs/guides/terraform/service-accounts',
 glm:'https://docs.z.ai/legal-agreement/subscription-terms',
 glmkey:'https://docs.z.ai/devpack/notice/api-key-management',
 claude:'https://code.claude.com/docs/en/authentication',
 claudelegal:'https://code.claude.com/docs/en/legal-and-compliance',
 proxyapi:'https://proxyapi.ru/docs/rate-limits',polza:'https://polza.ai/docs/glavnoe/faq',vsegpt:'https://vsegpt.ru/Docs/API',
 router:'https://openrouter.ai/docs/api_reference/limits'
};
export function automationAssessment(l,s){
 if(l.audience!=='technical'&&l.consumerType!=='technical')return null;
 const p=PLAN[l.plan],shared=(s.technical?.purpose||'shared')==='shared';
 if(l.kind==='openrouter')return {level:'ok',title:'API · общий серверный агент',text:'Используйте отдельный workspace system key и лимит расходов. BYOK — ключ оплачиваемого API провайдера, не доступ к личной подписке. Параллелизм ограничен маршрутом и балансом; для части prepaid-аккаунтов действует резервирование средств на запросы в полёте.',sources:['router']};
 if(l.kind==='api'&&GATEWAY_PROVIDERS[l.apiProvider])return {level:l.apiProvider==='vsegpt'?'warn':'ok',title:'Gateway API account',text:'Use a separate gateway API key and server-side budget. Upstream subscription allowances and service-account privileges do not transfer. Confirm the selected model, automation terms and rate limits with the gateway.',sources:[l.apiProvider]};
 if(l.kind==='api')return {level:'ok',title:'API · подходит для автоматизации',text:'Оплата токенов отдельно от подписок. Ключ хранится на сервере; процессы используют общие лимиты организации/проекта. OpenAI и Anthropic поддерживают service accounts. У Z.ai/DeepSeek проверьте тип ключа и доступные права.',sources:['api','anthropicapi']};
 if(p?.metered)return {level:'warn',title:'Codex service account · только PAYG',text:'Нечеловеческая identity в ChatGPT workspace, CLI ≥ 0.142.0. Доступность требует подходящего PAYG-плана и администратора. Это workspace metered credits, а не квота Plus/Pro/Business и не Platform API. Подтвердите цену credit; включённая квота равна нулю.',sources:['service','wif']};
 if(p?.family==='glm')return {level:shared?'bad':'warn',title:shared?'Coding Plan не лицензирует общий самописный бот':'Coding Plan · только поддерживаемые инструменты',text:'Coding Plan Key расходует подписку, Standard API Key — PAYG. Подписка персональная: собственные SDK/apps/bots/SaaS и запросы вне поддерживаемых инструментов требуют письменного соглашения. Поддерживаемый headless-инструмент не делает seat общекомандным. Для общего сервиса выберите API.',sources:['glm','glmkey']};
 if(p?.family==='anthropic')return {level:shared?'bad':'warn',title:shared?'Подписка Claude не покрывает общий бот команды':'Claude Code headless · в пределах личного использования',text:'Официальные CLI и Agent SDK допускают обычную личную автоматизацию с авторизацией подписки. Общая квота с интерактивной работой; Team seat закреплён за человеком. Для общего агента и чужих задач используйте API. Режим --bare требует API credentials. API bonus применяется только к отдельно учтённому eligible API/headless расходу.',sources:['claude','claudelegal']};
 if(p?.family==='openai')return {level:'warn',title:'Codex headless · от имени владельца',text:'codex exec поддерживает сохранённую ChatGPT-авторизацию. Business/Enterprise access token представляет пользователя и требует разрешений workspace. Лимит общий с его обычной работой. Для независимого общего бота предпочтительны API или native service account на PAYG; обычную именную подписку не считаем отдельной bot-лицензией.',sources:['codex','pat','service']};
 return {level:'warn',title:'Условия автоматизации не подтверждены',text:'Введите согласованные ставки и проверьте в договоре машинную identity, способы авторизации и совместное использование квоты.',sources:[]};
}
