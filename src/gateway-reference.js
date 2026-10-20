import { GATEWAY_PROVIDERS, GATEWAY_MODELS } from './gateway-catalog.js';
import { CURRENT_OR_MODELS, CURRENT_OR_ROUTES } from './openrouter-current.js';

// Uses the calculator's escaping, translation and number-formatting functions.
// Provider-native prices stay native here; an unknown tariff is never shown as 0.
export function gatewayReferenceHTML({ escape, translate, number } = {}) {
  const grEscape = escape || (value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character])));
  const grTranslate = translate || (value => value);
  const grNumber = typeof number === 'function' ? number : number?.format ? value => number.format(value) : value => new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 }).format(value);
  const grText = value => grEscape(grTranslate(value));
  const grLink = (url, label) => `<a href="${grEscape(url)}" target="_blank" rel="noopener noreferrer">${grText(label)}</a>`;
  const grRate = value => value == null || !Number.isFinite(value) ? '—' : grEscape(grNumber(value));
  const grNote = (text, url, label = 'Source') => `<li>${grText(text)} ${grLink(url, label)}</li>`;
  const grModels = provider => GATEWAY_MODELS.filter(model => model.provider === provider);
  const grTable = (models, currency) => `<div class="table-wrap"><table class="table"><caption class="inline-help">${grText(currency === 'RUB' ? 'RUB per million tokens' : 'USD per million tokens')}</caption><thead><tr>${['Model / route', 'Input', 'Cache write', 'Cache read', 'Output'].map((label, index) => `<th scope="col"${index ? ' class="right"' : ''}>${grText(label)}</th>`).join('')}</tr></thead><tbody>${models.map(model => {
    const route = model.routeName || (model.requiresManualRates ? grTranslate('Confirmed quote required') : grTranslate(model.processing === 'batch' ? 'Batch' : 'Standard'));
    return `<tr><th scope="row" class="name">${grLink(model.sourceUrl, model.name)}<small><code>${grEscape(model.upstreamModel)}</code></small><small>${grText('Route')}: ${grEscape(route)}${model.alternative ? ` · ${grText('Alternative host')}` : ''}</small></th>${model.rates.map(value => `<td class="right">${grRate(value)}</td>`).join('')}</tr>`;
  }).join('')}</tbody></table></div>`;
  const grProvider = (name, summary, content) => `<details class="details gateway-provider"><summary><strong>${grEscape(name)}</strong> · ${grText(summary)}</summary>${content}</details>`;
  const grOpenRouterModels = CURRENT_OR_MODELS.flatMap(model => (CURRENT_OR_ROUTES[model.id] || []).map(route => ({
    name: model.name.replace(' · OpenRouter', ''),
    upstreamModel: route.modelSlug || model.orSlug,
    routeName: route.providerTag || route.name,
    rates: route.rates,
    alternative: route.alternative,
    sourceUrl: route.source
  })));
  const grOpenRouter = grProvider('OpenRouter', 'USD usage + funding fee', `
    <ul class="notes">
      ${grNote('Standard: no seat fee; 5.5% credit-purchase fee. Business: no seat fee; 8%. Taxes are separate.', 'https://openrouter.ai/pricing', 'Plans')}
      ${grNote('Organizations: 10 members by default; request more. Standard has 5 workspaces, Business 1,000; workspaces are not seats.', 'https://openrouter.ai/docs/cookbook/administration/organization-management', 'Members')}
      ${grNote('Standard card funding: minimum $0.80 per purchase, once per shared funding account. Business minimum and crypto/Business interaction are unconfirmed.', 'https://openrouter.ai/docs/faq', 'Funding')}
      ${grNote('BYOK still pays the upstream provider. OpenRouter charges 5% above $25,000/month of list-price-equivalent usage; this is not free inference.', 'https://openrouter.ai/docs/guides/overview/auth/byok', 'BYOK')}
      ${grNote('Startup awards are conditional: up to $3,000 and 12 months without platform fees; most awarded credits expire after 6 months.', 'https://openrouter.ai/startups', 'Startup offer')}
    </ul>
    ${grTable(grOpenRouterModels, 'USD')}
    <p class="inline-help">${grText('Prices exclude funding fees and paid tools. Pin the route; alternative hosts may differ in quantization, latency and availability.')}</p>
    <details class="details"><summary>${grText('Cache, timing and capacity')}</summary><ul class="notes">
      ${grNote('GPT long-context prices apply above 272,000 input tokens per request: input and cache ×2; output ×1.5. Claude one-hour cache writes have separate prices.', 'https://openrouter.ai/docs/guides/overview/models', 'Price rules')}
      ${grNote('DeepSeek Pro on the deepseek route is half price off-peak. Peak: weekdays 01:00–04:00 and 06:00–10:00 UTC. During 09:00–18:00 Moscow, uniform weekday usage is 4/9 peak.', 'https://openrouter.ai/api/v1/models/deepseek/deepseek-v4-pro-0813/endpoints', 'Timed route')}
      ${grNote('Paid tiers have no published plan-based request cap, but upstream capacity, balance holds and protection limits still apply. Extra keys do not multiply capacity.', 'https://openrouter.ai/docs/api_reference/limits', 'Capacity')}
      ${grNote('Europe routing requires Business or Enterprise and includes the UK and Switzerland. Account-specific identity checks and country eligibility remain subject to confirmation.', 'https://openrouter.ai/docs/guides/features/in-region-routing', 'Regions')}
    </ul></details>`);
  const grProxy = grProvider(GATEWAY_PROVIDERS.proxyapi.name, 'RUB usage · 5% VAT included', `
    <ul class="notes">
      ${grNote('No mandatory model-API subscription or seat fee. Top up any amount by card, SBP or business invoice.', 'https://proxyapi.ru/docs/balance', 'Billing')}
      ${grNote('Up to 10 API keys by default; request more. This is a key limit, not a team-member limit. A key’s monthly budget is compared with total account usage.', 'https://proxyapi.ru/docs/api-keys', 'Keys')}
      ${grNote('Prices include 5% VAT. Do not add it again. Published Batch prices are separate asynchronous tariffs.', 'https://proxyapi.ru/models/browse', 'Tariffs')}
    </ul>
    ${grTable(grModels('proxyapi'), 'RUB')}
    <p class="inline-help">${grText('GPT-6.1 Sol has a 272K+ tier: input and cache ×2; output ×1.5. Other unpublished long-context or one-hour cache-write prices need confirmation.')}</p>
    <details class="details"><summary>${grText('Capacity and account conditions')}</summary><ul class="notes">
      ${grNote('No fixed customer concurrency guarantee was verified. Twenty 4xx errors per key per minute can trigger a temporary pause; retry only suitable transient errors.', 'https://proxyapi.ru/docs/rate-limits', 'Capacity')}
      ${grNote('Business invoices require contract registration. Universal per-member passport checks and UK/KZ/RU citizenship-specific eligibility were not established; upstream terms still apply.', 'https://proxyapi.ru/terms', 'Terms')}
    </ul></details>`);
  const grPolza = grProvider(GATEWAY_PROVIDERS.polza.name, 'RUB usage · choose an exact route', `
    <ul class="notes">
      ${grNote('No mandatory API seat fee. Shared organization balance, separate employee keys; minimum card top-up 100 RUB.', 'https://polza.ai/docs/gaidy/getting-started', 'Billing')}
      <li>${grText('No standard volume discount is published. Enterprise starts at 100,000 RUB monthly usage, which is an eligibility threshold, not an extra fee.')} ${grLink('https://polza.ai/docs/glavnoe/faq', 'Discounts')} · ${grLink('https://polza.ai/docs/glavnoe/enterprise', 'Enterprise')}</li>
      ${grNote('Pin provider.only and disable fallbacks to reproduce the selected tariff. A “from” price can use Flex or a different host.', 'https://polza.ai/docs/gaidy/provider-selection', 'Routing')}
    </ul>
    ${grTable(grModels('polza'), 'RUB')}
    <p class="inline-help">${grText('VAT inclusion, long-context premiums and unlisted cache-write prices are unconfirmed. The displayed RUB snapshot may change; your display exchange rate does not set the provider’s prices.')}</p>
    <details class="details"><summary>${grText('Capacity and account conditions')}</summary><ul class="notes">
      ${grNote('Team roles are advertised, but a numeric member cap and fixed customer concurrency entitlement were not verified.', 'https://polza.ai/docs/glavnoe/enterprise', 'Teams')}
      ${grNote('Registration asks for name, email and phone. Further information may be requested within 5 business days. Worldwide terms do not confirm every payment method or upstream model in every country.', 'https://polza.ai/documents/user-agreement', 'Terms')}
    </ul></details>`);
  const grVsePlanNames = { basic: 'Basic', professional: 'Professional', professional_3_days: 'Professional · 3 days', team4: 'Team 4', team10: 'Team 10', fast: 'FAST' };
  const grVsePlans = GATEWAY_PROVIDERS.vsegpt.plans.map(plan => `<tr><th scope="row">${grText(grVsePlanNames[plan.id] || plan.id)}</th><td class="right">${grRate(plan.price_rub)} RUB</td><td>${grText(plan.period_days === 3 ? '3 days' : '30 days')}</td><td>${grText(plan.fee_scope === 'head_account' ? (plan.max_subaccounts === 4 ? 'Head account + up to 4 separately subscribed subaccounts' : 'Head account + up to 10 separately subscribed subaccounts') : 'Per account')}</td></tr>`).join('');
  const grVse = grProvider(GATEWAY_PROVIDERS.vsegpt.name, 'Access fee + usage · confirmed token quote needed', `
    <p class="inline-help">${grText('Each selected developer or server agent is counted as a paid account. Team access includes the head account; every added subaccount needs its own Basic or Professional subscription. Usage is always extra.')}</p>
    <div class="table-wrap"><table class="table"><caption class="inline-help">${grText('Access fees in RUB; generation costs are extra')}</caption><thead><tr>${['Plan', 'Fee', 'Period', 'Account coverage'].map(label => `<th scope="col">${grText(label)}</th>`).join('')}</tr></thead><tbody>${grVsePlans}</tbody></table></div>
    <p class="inline-help">${grLink('https://vsegpt.ru/Docs/Tariffs', 'Individual plans')} · ${grLink('https://vsegpt.ru/Docs/Tariffs/Ext', 'Team and FAST plans')} · ${grLink('https://vsegpt.ru/Docs/Tariffs/ExampleTeam', 'Team billing example')}</p>
    <ul class="notes">
      ${grNote('Team and FAST need requested activation. Team activation requires at least 1,500 RUB on balance. Larger teams need a quote; no annual discount was verified.', 'https://vsegpt.ru/Docs/Tariffs/TeamStart', 'Activation')}
      <li>${grText('These are 30-day periods, not calendar months. The 3-day pass is listed for reference; renewals follow the selected period.')}</li>
      ${grNote('Public documentation conflicts on character versus token billing. Enter a confirmed RUB-per-million-token quote; the calculator does not convert character prices.', 'https://vsegpt.ru/Docs/Tariffs/Example', 'Billing units')}
    </ul>
    ${grTable(grModels('vsegpt'), 'RUB')}
    <details class="details"><summary>${grText('Capacity and account conditions')}</summary><ul class="notes">
      ${grNote('Standard rate limits conflict: 1 request/second on the tariff page versus 1 every 2 seconds in API errors. FAST’s 10–20 RPS statement is not a guaranteed concurrency allowance.', 'https://vsegpt.ru/Docs/API/Errors', 'Capacity')}
      ${grNote('Claude Code uses an Anthropic-compatible beta. Responses API is not supported; current Codex compatibility is not established.', 'https://vsegpt.ru/Docs/API', 'API support')}
      ${grNote('Consumer plans are for individuals. VAT, enterprise terms and citizenship-specific eligibility need confirmation; no universal passport-check guarantee is made.', 'https://vsegpt.ru/docs/oferta', 'Terms')}
    </ul></details>`);
  return `<section class="section gateway-reference"><div class="section-heading"><h3>${grText('Gateways: plans, models and conditions')}</h3><span class="small muted">${grText('Checked 20 October 2026')}</span></div><p class="inline-help">${grText('A researched shortlist, not a popularity ranking. Expand a provider to see native-currency prices and conditions. A dash means unverified, not free.')}</p>${grOpenRouter}${grProxy}${grPolza}${grVse}</section>`;
}
