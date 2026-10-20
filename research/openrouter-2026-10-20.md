# OpenRouter refresh — 20 October 2026

Checked against official pages and unauthenticated public model/endpoint API responses on **2026-10-20** (client timezone Europe/Moscow). The structured companion, [openrouter-2026-10-20.json](openrouter-2026-10-20.json), contains 14 exact route snapshots, conditions and source URLs. No paid inference, account change, checkout or load test was performed.

## Plans: gateway billing, not coding-seat subscriptions

| Tier | Recurring seat price | Credit purchase fee | Workspaces |
|---|---:|---:|---:|
| Free | $0 | — | 5 |
| Standard PAYG | $0 | 5.5% | 5 |
| Business PAYG | $0 | 8% | 1,000 |
| Enterprise | Contract | Negotiated | Contract |

Standard/Business use the same model rates. Business adds regional routing and workload identity federation; Enterprise adds contractual arrangements. Self-service tiers publish no annual or team-volume inference discount. Taxes are separate. [Pricing](https://openrouter.ai/pricing)

The current organization FAQ says **10 members; ask support for more**. It gives no tier-specific exception or minimum member count. This is distinct from workspace caps. An 18-person organization therefore needs an expansion confirmed by support; do not infer 1,000 members from Business's workspace allowance. A verified email is required to create an organization. [Organization management](https://openrouter.ai/docs/cookbook/administration/organization-management)

An organization shares billing. Workspaces support individual-member keys and workspace-owned system keys for server agents; pooled workspace budgets are Enterprise. [Workspaces](https://openrouter.ai/docs/guides/features/workspaces)

## Funding, BYOK and offers

The FAQ's machine-readable Markdown defines card/Stripe fees as **5.5%, minimum $0.80 per purchase**, and crypto fees as **5%**. It does not clarify how the crypto figure interacts with Business's 8%, nor establish a Business-specific minimum. Do not invent a 4% surcharge or stack both automatically. The purchase fee is charged on funded credits, not each request or each developer. [FAQ](https://openrouter.ai/docs/faq), [Markdown source](https://openrouter.ai/docs/faq.md)

For Standard card funding, sum `max(0.055 × purchased_credits, 0.80)` over actual purchases. If five model rows share one account and one purchase, charge the minimum once. The current engine charges Standard/Business minima per row; grouping by billing account is safer. Exact cash outlay also depends on pre-existing balances and purchase sizes.

BYOK leaves inference on the upstream invoice. The monthly platform allowance covers $25,000 of **list-price equivalent usage**, then a 5% charge; it is not $25,000 of free inference. Provider discounts do not reduce that shadow threshold. Shared-capacity fallback can consume OpenRouter credits. Treat the allowance once per represented billing account as an explicit conservative aggregation assumption; precise reset/proration detail was not established. Subscription login sessions and GLM Coding Plan allowance were not verified as BYOK credentials. [BYOK](https://openrouter.ai/docs/guides/overview/auth/byok)

Approved startups may receive up to $3,000 and 12 months without processing/BYOK fees. Most awarded credits expire after six months. Default the promotion off and use the actual award/expiry, rather than assuming eligibility or repeating $3,000 monthly. [Startup program](https://openrouter.ai/startups)

## Current coding routes

Prices below are **USD per million tokens**, before funding fees, taxes or tool charges. `Write` is a replacement price for cache-write input, not an extra charge on top of ordinary input. A dash means no separate published write price, not free writes.

| Exact model → provider tag | Input | Write | Cached | Output |
|---|---:|---:|---:|---:|
| `openai/gpt-6.1-sol` → `openai` | 2 | 2.5 | .1 | 10 |
| `anthropic/claude-sonnet-5.5` → `anthropic` | 2 | 2.5 | .1 | 10 |
| `z-ai/glm-5.3` → `z-ai/fp8` | 1.4 | — | .26 | 4.4 |
| `z-ai/glm-5.3-flash` → `z-ai/fp8` | .15 | — | .03 | .5 |
| `deepseek/deepseek-v4-pro-0813` → `deepseek`, peak | 1.32 | — | .044 | 3.96 |
| same DeepSeek route, off-peak | .66 | — | .022 | 1.98 |

Direct evidence: [GPT route](https://openrouter.ai/api/v1/models/openai/gpt-6.1-sol/endpoints), [Claude route](https://openrouter.ai/api/v1/models/anthropic/claude-sonnet-5.5/endpoints), [GLM route](https://openrouter.ai/api/v1/models/z-ai/glm-5.3/endpoints), [Flash route](https://openrouter.ai/api/v1/models/z-ai/glm-5.3-flash/endpoints), [DeepSeek Pro route](https://openrouter.ai/api/v1/models/deepseek/deepseek-v4-pro-0813/endpoints).

GPT's higher prices apply when a **single prompt exceeds 272,000 tokens**: input/write/read ×2, output ×1.5. Claude's one-hour cache-write price is $4/M. The four GPT/Claude selected routes additionally publish `web_search: $0.01` per operation; token-only estimates omit that and any other separately chosen tools.

DeepSeek Pro's peak windows are weekdays 01:00–04:00 and 06:00–10:00 UTC. With uniform weekday usage from 09:00–18:00 Moscow, **4/9 is peak and 5/9 off-peak**. Chinese holiday pass-through is absent from the observed overrides. Include billed reasoning output.

### Changes to the existing 17 October catalogue

All figures here use input / cache-read / output order, USD/M:

- GLM-5.3 **Relace**: `.0632 / .0588 / 4.4` → **`.75 / .075 / 2.4`**.
- DeepSeek Flash **Sail FP4**: `.09 / .006 / .3` → **`.101 / .006735 / .15`**.
- DeepSeek Pro **Sail FP4**: `.448 / .0935 / 1.164` → **`.896 / .187 / .582`**.
- DeepSeek Flash's **`deepseek` vendor endpoint is absent** from the refreshed [endpoint response](https://openrouter.ai/api/v1/models/deepseek/deepseek-v4.1-flash/endpoints). The previous timed vendor route cannot be described as currently verified.
- GLM Flash **Streamlake FP8** now reports status `0` at **`.073845 / .014769 / .24615`**; the previous snapshot had status `-2`. Its `.5077` discount metadata is already reflected in these prices.

Do not silently substitute a cheap quantized host for a vendor route or assert equivalent quality/capacity. Preserve previous saved assumptions via a dated snapshot or explicitly label stale routes before offering updated choices.

## Discovery and integration contract

The public [`GET /api/v1/models`](https://openrouter.ai/api/v1/models) returned **468 default text-output entries** without credentials. This is a timestamped response count, not the marketing total or a guarantee of usable models. `?output_modalities=all` covers other modalities and `?supported_parameters=tools` filters coding-relevant capabilities. Model endpoint responses give provider tags, quantization, capacity metadata and conditional prices. [Model API guide](https://openrouter.ai/docs/guides/overview/models)

The guide resolves previous uncertainties: `min_prompt_tokens` means **strictly greater than**; all conditions must match; later matching overrides win per price key; absent fields inherit the base. UTC time windows are start-inclusive/end-exclusive and may wrap midnight. Current base prices can already be off-peak, so use the complete override schedule. Do not multiply a displayed price by its discount again. `:batch` is a separate catalog variant where offered, not a blanket 50% switch.

Use the gateway → tier → exact model/route sequence in the wizard; show a dated price snapshot. Discovery should never silently rewrite saved scenarios. Distinguish workspace and member constraints, aggregate funding fees by account, and show only a short cost caveat by default with the details expandable.

## Operational limits and unknowns

Paid tiers have no published OpenRouter plan-based request cap, but provider capacity and DDoS protection remain. Some new/low-balance prepaid accounts also have an in-flight cost hold; positive balance can still yield 402. Exact concurrency guarantees, hold thresholds and provider RPM/TPM are not published. Adding keys does not multiply capacity. [Limits](https://openrouter.ai/docs/api_reference/limits)

Europe routing requires Business/Enterprise and includes EU/EEA, UK and Switzerland; it is not automatically strict EU-only. Operational records and customer-controlled BYOK regions have separate boundaries. [Regional routing](https://openrouter.ai/docs/guides/features/in-region-routing)

Still unknown: Business minimum, crypto/Business fee interaction, contract rates/member caps, account-specific KYC/eligibility, exact BYOK ledger reset/proration, future prices and promotion end dates. These should stay nullable/manual rather than become invented defaults.
