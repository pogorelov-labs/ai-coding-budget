# Russian-language AI API gateways: calculator integration evidence

Checked **20 October 2026 (Europe/Moscow)**. Companion machine-readable data: [russian-gateways-2026-10-20.json](./russian-gateways-2026-10-20.json).

## Scope and selection

This is a practical shortlist of **ProxyAPI, Polza AI and VseGPT**, chosen for their public multi-vendor catalogues, Russian payment paths and coding/API integrations. It is **not a popularity or market-share ranking**: no comparable, independent usage dataset was established. Discovery used provider-name queries for API prices, limits and team terms; verification followed official catalogues, billing/API documentation and agreements. No paid requests, account creation, credential access or support contact occurred.

Prefer ProxyAPI and pinned Polza routes for token-cost calculations. Include VseGPT's verified access plans and model availability, but require a user-confirmed token quote before estimating its model spend: its public billing units conflict.

## Model prices suitable for integration

All figures below are **RUB per one million tokens**, not USD. Preserve full precision from JSON and round only for display. A dash means **not published/verified**, never a confirmed zero. These are a dated snapshot, not a guarantee of future prices.

### ProxyAPI

| Exact API model ID | Input | Cache write | Cache read | Output | Source |
|---|---:|---:|---:|---:|---|
| `openai/gpt-6.1-sol` | 420 | 525 | 21 | 2,100 | [Model tariff](https://proxyapi.ru/models/openai/gpt-6-1-sol) |
| `anthropic/claude-sonnet-5-5` | 500 | 625 | 50 | 2,500 | [Model tariff](https://proxyapi.ru/models/anthropic/claude-sonnet-5-5) |
| `z-ai/glm-5.3` | 200 | — | 50 | 700 | [Model tariff](https://proxyapi.ru/models/z-ai/glm-5.3) |
| `z-ai/glm-5.3-flash` | 16.84 | — | 3.58 | 58.95 | [Model tariff](https://proxyapi.ru/models/z-ai/glm-5.3-flash) |
| `deepseek/deepseek-v4.1-flash-1017` | 21.05 | — | 0.41 | 81.05 | [Model tariff](https://proxyapi.ru/models/deepseek/deepseek-v4.1-flash-1017) |

All five pages explicitly include **5% VAT**. GPT-6.1 Sol and Sonnet 5.5 publish Batch prices at half their standard prices. GPT-6.1 Sol additionally publishes a **272K+** tier: 840 input, 1,050 cache write, 42 cache read and 3,150 output; Batch is again half. No separate long-context tier was found on the other selected model pages. The gateway's model IDs and threshold must be retained rather than substituted with another provider's conventions.

**Freshness conflict resolved:** a search-engine snapshot of the GLM-5.3 detail page showed 189.47/18.95/600 for input/cache-read/output. A direct public HTML retrieval on 20 October showed **200/50/700**, agreeing with the current catalogue. The JSON uses the live values. All five model pages were directly fetched and their visible price tables checked.

### Polza AI: explicit routes, not a blended “from” price

The [public Models API](https://polza.ai/api/v1/models?type=chat&include_providers=true) requires no authentication. Its route-specific fields explicitly say `prompt_per_million`, `completion_per_million`, `input_cache_read_per_million`, `input_cache_write_per_million`, and `currency: RUB`. The [documentation](https://polza.ai/docs/api-reference/models/list) still has older prose describing per-token units; use the response's explicit field units.

| Exact API model ID | Pinned provider | Input | Cache write | Cache read | Output |
|---|---|---:|---:|---:|---:|
| `openai/gpt-6.1-sol` | `openai` | 233.9592 | 292.449 | 11.69796 | 1,169.796 |
| `anthropic/claude-sonnet-5.5` | `anthropic` | 233.9592 | 292.449 | 11.69796 | 1,169.796 |
| `z-ai/glm-5.3` | `z-ai/fp8` | 163.77144 | — | 30.414696 | 514.71024 |
| `z-ai/glm-5.3-flash` | `z-ai/fp8` | 17.54694 | — | 3.509388 | 58.4898 |
| `deepseek/deepseek-v4.1-flash-1017` | `deepseek` | 17.54694 | — | 0.3509388 | 70.18776 |

The JSON also records three optional routes: GPT-6.1 Sol on `openai/flex`, GLM-5.3 Flash on `open-inference/fp4`, and GLM-5.3 on `wafer/us`. They are distinct service/hosting choices; do not silently replace the standard routes with them. The catalogue's top GPT-6.1 price used `openai/flex`, half the selected standard route.

For the chosen rate to be meaningful, [pin the provider](https://polza.ai/docs/gaidy/provider-selection) with `provider.only` and disable fallbacks, or clearly label the estimate as variable routing. Automatic routing considers availability and latency as well as price. Neither a long-context tariff nor a fixed customer concurrency entitlement was established for these route rows. Cache-write omissions remain unknown. Public business material mentions VAT, but its exact rate/inclusion in these catalogue values was not established: do not invent a tax rate.

## Access fees, teams, limits and billing

### ProxyAPI

- Model API is prepaid PAYG with **no compulsory subscription, monthly payment or package**; the balance documentation says any top-up amount. Cards/SBP are immediate; business bank invoices require contract registration. Prices are in RUB and include VAT. [Balance and billing](https://proxyapi.ru/docs/balance)
- Default maximum is **10 API keys**, expandable through support. This is a key limit, not 10 team seats. Keys can restrict models and IPs. A surprising documented rule: a key's monthly budget compares against the entire account's monthly usage. [API keys](https://proxyapi.ru/docs/api-keys)
- No numerical customer concurrency/RPM/TPM guarantee is published in the checked limits page. The provider describes pooled upstream capacity; don't turn that marketing claim into a guaranteed limit. Twenty 4xx errors per key per minute triggers escalating pauses. [Rate limits](https://proxyapi.ru/docs/rate-limits)
- API usage and some optional add-on subscriptions are separate concepts. Terms require compliance with downstream API terms. Public docs did not establish a universal passport requirement for the buyer or every developer, or a UK/KZ/RU citizenship matrix. Business invoicing is not proof of per-member KYC. [Terms](https://proxyapi.ru/terms)

### Polza AI

- PAYG organisation balance; minimum **card top-up 100 RUB**. Card, SBP and business invoice are documented. No seat access charge is required for the metered API. [Getting started](https://polza.ai/docs/gaidy/getting-started)
- A shared organisational balance with separate employee keys is described; numeric key/member caps were not found. [Coding integrations and team features](https://polza.ai/collections/code)
- Standard volume discounts are not advertised; large customers may negotiate. [FAQ](https://polza.ai/docs/glavnoe/faq) Enterprise eligibility begins at **100,000 RUB monthly usage**, not an additional fixed fee. Business/Enterprise conditions are quoted separately. [Enterprise](https://polza.ai/docs/glavnoe/enterprise)
- Registration requests name, email and phone, with email confirmation. The provider may request additional information within five business days. The agreement says worldwide use, but that does not establish every country's payment acceptance or override upstream restrictions. No universal passport check for every team member was established. [User agreement, sections 3–5](https://polza.ai/documents/user-agreement)
- No general annual, team-volume or peak/off-peak price reduction was verified. The catalogue is repriced; its RUB snapshot must not be converted into a fictional permanent USD tariff. No fixed per-customer concurrency limit was verified. A vendor-published ten-parallel-request SEO experiment is only that experiment, not a team-coding throughput guarantee.

### VseGPT

| Access plan | Fee | Period | What is included |
|---|---:|---|---|
| Basic | 199 RUB | 30 days | One account; eligible Basic models; tokens/generations extra |
| Professional | 399 RUB | 30 days | One account; Professional models; usage extra |
| Professional short pass | 99 RUB | 3 days | Usage extra |
| Team 4 | 699 RUB | 30 days | Head account with Professional access and up to 4 **additional subaccounts** |
| Team 10 | 999 RUB | 30 days | Head account with Professional access and up to 10 **additional subaccounts** |
| FAST | 999 RUB | 30 days | Higher request rate, requested activation; usage extra |

[Basic/Professional prices](https://vsegpt.ru/Docs/Tariffs), [Team/FAST prices](https://vsegpt.ru/Docs/Tariffs/Ext).

**Each team subaccount buys its own Basic/Professional subscription.** The head can move balances to/from subaccounts; usage is never bundled. Team is for administration, not discounted seats. Thus a head who also codes plus nine Professional subaccounts costs **4,590 RUB per 30 days** before usage; a separate non-coding organiser plus ten Professional subaccounts costs **4,989 RUB**. Larger 20/50-subaccount offers are quoted. [Team mechanism and example](https://vsegpt.ru/Docs/Tariffs/ExampleTeam) Activation requires a balance of at least **1,500 RUB** and a request. [Activation procedure](https://vsegpt.ru/Docs/Tariffs/TeamStart)

Use 30-day renewals faithfully. Twelve calendar months are not necessarily twelve charges; an initial purchase plus renewals at days 30 through 360 gives 13 cash payments inside a 365-day horizon. This is a calendar arithmetic observation, not an annual discount. No annual discount was verified.

There is a rate-limit conflict: the plan page says 1 request/second with further conditions; [API errors](https://vsegpt.ru/Docs/API/Errors) says one request every two seconds per account. FAST advertises accepting roughly 10–20 RPS with a potential experimental 100 RPS; these are not guaranteed concurrency entitlements. Confirm the endpoint and quota before a team load test.

VseGPT supports Chat Completions and an Anthropic-compatible **beta** for Claude Code. Its [API documentation](https://vsegpt.ru/Docs/API) explicitly says Responses API is not planned, so do not promise modern Codex compatibility merely because it is OpenAI-compatible. Individual tariffs are marked for natural persons. VAT, enterprise contract pricing and citizenship-specific eligibility remain unverified. [Terms](https://vsegpt.ru/docs/TermsOfUse) require accurate phone/email contact data; a mandatory passport check for each subaccount was not found.

## Why VseGPT model token costs must remain manual

Its [model table](https://www.vsegpt.ru/Docs/Models) uses **RUB per 1,000 characters**; its [worked billing example](https://vsegpt.ru/Docs/Tariffs/Example) calculates characters. Newer model details instead describe provider token-based billing, while the [public model API](https://api.vsegpt.ru/v1/models) repeats numeric prices without units. This is unresolved first-party inconsistency.

For reference, these exact model IDs were present: `openai/gpt-6.1-sol-medium`, `anthropic/claude-sonnet-5.5-medium`, `z-ai/glm-5.3-low`, `z-ai/glm-5.3-flash-low`. Raw displayed input/output pairs are respectively 0.6/3, 0.6/3, 0.4/1.3 and 0.035/0.10. **Do not multiply these by 1,000 and call the result RUB/M tokens.** The JSON deliberately has `requiresManualRates: true`. GLM-5.3 Max was explicitly disabled in the catalogue, so the included GLM row is Low. Cache discounts were not verified.

## Worked token comparison

Assumption: **5M total input, including 4M cache reads; 1M output; no cache writes, tools or long-context surcharge**. Formula is `1 × input + 4 × cache-read + 1 × output`. USD is shown only as an exchange-rate equivalent at **95 RUB/USD**. This is not a measured developer-month or proof of equal quality/latency.

| Model / pinned route | ProxyAPI RUB / USD | Polza RUB / USD |
|---|---:|---:|
| GPT-6.1 Sol / OpenAI standard | 2,604 / $27.41 | 1,450.55 / $15.27 |
| Claude Sonnet 5.5 / Anthropic | 3,200 / $33.68 | 1,450.55 / $15.27 |
| GLM-5.3 / Z.ai FP8 | 1,100 / $11.58 | 800.14 / $8.42 |
| GLM-5.3 Flash / Z.ai FP8 | 90.11 / $0.95 | 90.07 / $0.95 |
| DeepSeek V4.1 Flash 1017 / DeepSeek | 103.74 / $1.09 | 89.14 / $0.94 |

These calculations use the per-model sources and exact snapshot above. ProxyAPI VAT is included; Polza VAT inclusion is unverified. Preserve this limitation when comparing procurement costs.

## Calculator integration boundaries

1. Keep gateway billing provider distinct from the model vendor and route. Never silently map model IDs across gateways.
2. Store native RUB prices and divide by the user's exchange rate only for USD display. Editing the exchange rate must leave the RUB provider bill unchanged.
3. Keep absent cache-write, long-context, tax and rate-limit fields unknown. Require explicit assumptions or a manual tariff when the workload uses an unsupported billing bucket.
4. Provider quotes, observed web availability and one successful model call would not establish team throughput. Estimate peak RPM/TPM from the user's workload, then compare only to verified quotas; otherwise label capacity as requiring confirmation.
5. Treat lower-priced alternate hosts and Flex as opt-in route choices, with distinct availability/latency/privacy trade-offs. Do not rank them as proven equivalent to the standard provider route.
