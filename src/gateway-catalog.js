// Provider-native tariff snapshots; missing rates are deliberately not zero.
export const GATEWAY_PROVIDERS={
  "proxyapi": {
    "id": "proxyapi",
    "name": "ProxyAPI",
    "billing_model": "PAYG in RUB; no mandatory subscription for model API",
    "api_base": "https://api.proxyapi.ru/v1",
    "access_fee_rub": 0,
    "minimum_topup_rub": null,
    "minimum_topup_status": "balance documentation explicitly says any amount",
    "vat_included": true,
    "vat_percent": 5,
    "team": "Up to 10 API keys by default; support can increase. This is a key limit, not a team-seat limit. Model API has no published per-seat fee.",
    "limits": {
      "concurrency": null,
      "rpm": null,
      "tpm": null,
      "notes": "No numeric customer guarantee published. Provider describes pooled upstream RPM/TPM. 20 HTTP 4xx errors per key per minute triggers escalating pauses: 1 minute, 10 minutes, 1 hour, 12 hours."
    },
    "kyc": {
      "passport_required_each_member": null,
      "passport_required_buyer": null,
      "country_citizenship_eligibility": "Not published for UK/KZ/RU individually; terms require compliance with upstream service terms. RU payment support does not establish unrestricted upstream eligibility.",
      "buyer_business": "Contract registration and company billing details required for bank invoice; no universal per-developer identity check found."
    },
    "discounts": "Published model batch prices where supported; no annual/team blanket discount verified. Additional products can have subscriptions under terms, but model PAYG requires none.",
    "sources": [
      "https://proxyapi.ru/docs/balance",
      "https://proxyapi.ru/docs/api-keys",
      "https://proxyapi.ru/docs/rate-limits",
      "https://proxyapi.ru/terms"
    ]
  },
  "polza": {
    "id": "polza",
    "name": "Polza AI",
    "billing_model": "PAYG prepaid organisation balance in RUB",
    "api_base": "https://polza.ai/api/v1",
    "access_fee_rub": 0,
    "minimum_card_topup_rub": 100,
    "vat_included": null,
    "vat_percent": null,
    "vat_note": "Business pages mention VAT and monthly UПД, but no explicit inclusion/rate found for public model prices. Do not auto-add or infer 5%.",
    "team": "Shared organisation balance and separate employee API keys; roles advertised. No numeric member/key cap found.",
    "limits": {
      "concurrency": null,
      "rpm": null,
      "tpm": null,
      "notes": "No fixed per-customer numeric API limit verified; public 10-concurrent SEO example is a vendor test, not an entitlement."
    },
    "kyc": {
      "registration_fields": [
        "name",
        "email",
        "phone"
      ],
      "email_confirmation": true,
      "additional_information_may_be_requested": true,
      "additional_information_deadline_business_days": 5,
      "passport_required_each_member": null,
      "passport_required_buyer": null,
      "country_citizenship_eligibility": "User agreement says worldwide; exact payment acceptance and upstream model restrictions for UK/KZ/RU not individually verified.",
      "buyer_business": "Company may register through representative; invoice requires organisation details."
    },
    "discounts": "FAQ says no standard volume discount, individual large-client terms possible. Enterprise starts at 100000 RUB monthly usage; this is eligibility, not an extra access fee. No general annual/team or time-of-day discount verified.",
    "sources": [
      "https://polza.ai/docs/gaidy/getting-started",
      "https://polza.ai/docs/glavnoe/faq",
      "https://polza.ai/docs/glavnoe/enterprise",
      "https://polza.ai/docs/gaidy/provider-selection",
      "https://polza.ai/documents/user-agreement",
      "https://polza.ai/collections/code"
    ]
  },
  "vsegpt": {
    "id": "vsegpt",
    "name": "VseGPT",
    "billing_model": "Mandatory access subscription plus independently metered generations",
    "api_base": "https://api.vsegpt.ru/v1",
    "access_fee_rub": null,
    "vat_included": null,
    "vat_percent": null,
    "vat_note": "No explicit VAT inclusion/rate found in reviewed consumer plan/offer pages.",
    "plans": [
      {
        "id": "basic",
        "price_rub": 199,
        "period_days": 30,
        "fee_scope": "per_account",
        "max_subaccounts": 0,
        "metered_usage_included": false
      },
      {
        "id": "professional",
        "price_rub": 399,
        "period_days": 30,
        "fee_scope": "per_account",
        "max_subaccounts": 0,
        "metered_usage_included": false
      },
      {
        "id": "professional_3_days",
        "price_rub": 99,
        "period_days": 3,
        "fee_scope": "per_account",
        "metered_usage_included": false
      },
      {
        "id": "team4",
        "price_rub": 699,
        "period_days": 30,
        "fee_scope": "head_account",
        "max_subaccounts": 4,
        "head_professional_access_included": true,
        "subaccount_subscription_included": false,
        "metered_usage_included": false,
        "activation_by_request": true
      },
      {
        "id": "team10",
        "price_rub": 999,
        "period_days": 30,
        "fee_scope": "head_account",
        "max_subaccounts": 10,
        "head_professional_access_included": true,
        "subaccount_subscription_included": false,
        "metered_usage_included": false,
        "activation_by_request": true
      },
      {
        "id": "fast",
        "price_rub": 999,
        "period_days": 30,
        "fee_scope": "per_account",
        "head_professional_access_included": true,
        "metered_usage_included": false,
        "activation_by_request": true
      }
    ],
    "team": "Head fee includes head Professional access; up to 4 or 10 additional subaccounts, each separately subscribed (199 or 399 RUB/30 days depending models). Larger 20/50 options are by quote. Do not call Team10 a bundle of 10 paid subscriptions.",
    "activation_minimum_balance_rub": 1500,
    "limits": {
      "concurrency": null,
      "standard_rps": null,
      "standard_rps_status": "conflict: tariff says 1 per second with additional conditions; API Errors says 1 per 2 seconds per account",
      "fast_rps_vendor_claim": [
        10,
        20
      ],
      "fast_rps_guaranteed": false,
      "notes": "FAST requested separately with alternate URL; potential 100 RPS is explicitly experimental, not guaranteed."
    },
    "kyc": {
      "passport_required_each_member": null,
      "passport_required_buyer": null,
      "registration_fields": "Current full contact data including phone/email under TermsOfUse; individual accounts for subaccounts.",
      "buyer_business": "Consumer tariffs marked for individuals; legal-entity contract terms need separate confirmation.",
      "country_citizenship_eligibility": "No explicit UK/KZ/RU citizenship matrix found."
    },
    "discounts": "No annual/team volume discount verified. Team is administration, not a discounted seat bundle. All stated periods are 30 days, not calendar months.",
    "api_compatibility": "OpenAI Chat Completions; native Anthropic Messages beta permits Claude Code; official docs explicitly do not plan Responses API. Do not promise current Codex compatibility.",
    "sources": [
      "https://vsegpt.ru/Docs/Tariffs",
      "https://vsegpt.ru/Docs/Tariffs/Ext",
      "https://vsegpt.ru/Docs/Tariffs/ExampleTeam",
      "https://vsegpt.ru/Docs/Tariffs/TeamStart",
      "https://vsegpt.ru/Docs/Tariffs/Example",
      "https://vsegpt.ru/Docs/API/Errors",
      "https://vsegpt.ru/Docs/API",
      "https://vsegpt.ru/docs/TermsOfUse",
      "https://vsegpt.ru/docs/oferta"
    ]
  }
};
export const GATEWAY_MODELS=[
  {
    "id": "proxyapi26-openai-gpt-6-1-sol",
    "name": "GPT-6.1 Sol · ProxyAPI",
    "provider": "proxyapi",
    "gatewayOnly": true,
    "allowedKinds": [
      "api"
    ],
    "baseModelId": "sol",
    "upstreamModel": "openai/gpt-6.1-sol",
    "rates": [
      420,
      525,
      21,
      2100
    ],
    "currency": "RUB",
    "checked": "2026-10-20",
    "source": "proxyapi-rates",
    "sourceUrl": "https://proxyapi.ru/models/openai/gpt-6-1-sol",
    "cacheWriteKnown": true,
    "write1h": null,
    "longPricingUnknown": false,
    "timed": false,
    "vatIncluded": true,
    "processing": "standard",
    "notes": [
      "ProxyAPI prices include 5% VAT. Do not add that VAT again."
    ],
    "long": [
      2.0,
      2.0,
      2.0,
      1.5
    ],
    "threshold": 272000
  },
  {
    "id": "proxyapi26-openai-gpt-6-1-sol-batch",
    "name": "GPT-6.1 Sol · ProxyAPI · Batch",
    "provider": "proxyapi",
    "gatewayOnly": true,
    "allowedKinds": [
      "api"
    ],
    "baseModelId": "sol",
    "upstreamModel": "openai/gpt-6.1-sol",
    "rates": [
      210.0,
      262.5,
      10.5,
      1050.0
    ],
    "currency": "RUB",
    "checked": "2026-10-20",
    "source": "proxyapi-rates",
    "sourceUrl": "https://proxyapi.ru/models/openai/gpt-6-1-sol",
    "cacheWriteKnown": true,
    "write1h": null,
    "longPricingUnknown": true,
    "timed": false,
    "vatIncluded": true,
    "processing": "batch",
    "notes": [
      "ProxyAPI prices include 5% VAT. Do not add that VAT again.",
      "Batch prices are for asynchronous processing, not an interactive coding latency guarantee."
    ]
  },
  {
    "id": "proxyapi26-anthropic-claude-sonnet-5-5",
    "name": "Claude Sonnet 5.5 · ProxyAPI",
    "provider": "proxyapi",
    "gatewayOnly": true,
    "allowedKinds": [
      "api"
    ],
    "baseModelId": "sonnet",
    "upstreamModel": "anthropic/claude-sonnet-5-5",
    "rates": [
      500,
      625,
      50,
      2500
    ],
    "currency": "RUB",
    "checked": "2026-10-20",
    "source": "proxyapi-rates",
    "sourceUrl": "https://proxyapi.ru/models/anthropic/claude-sonnet-5-5",
    "cacheWriteKnown": true,
    "write1h": null,
    "longPricingUnknown": true,
    "timed": false,
    "vatIncluded": true,
    "processing": "standard",
    "notes": [
      "ProxyAPI prices include 5% VAT. Do not add that VAT again."
    ]
  },
  {
    "id": "proxyapi26-anthropic-claude-sonnet-5-5-batch",
    "name": "Claude Sonnet 5.5 · ProxyAPI · Batch",
    "provider": "proxyapi",
    "gatewayOnly": true,
    "allowedKinds": [
      "api"
    ],
    "baseModelId": "sonnet",
    "upstreamModel": "anthropic/claude-sonnet-5-5",
    "rates": [
      250.0,
      312.5,
      25.0,
      1250.0
    ],
    "currency": "RUB",
    "checked": "2026-10-20",
    "source": "proxyapi-rates",
    "sourceUrl": "https://proxyapi.ru/models/anthropic/claude-sonnet-5-5",
    "cacheWriteKnown": true,
    "write1h": null,
    "longPricingUnknown": true,
    "timed": false,
    "vatIncluded": true,
    "processing": "batch",
    "notes": [
      "ProxyAPI prices include 5% VAT. Do not add that VAT again.",
      "Batch prices are for asynchronous processing, not an interactive coding latency guarantee."
    ]
  },
  {
    "id": "proxyapi26-z-ai-glm-5-3",
    "name": "GLM-5.3 · ProxyAPI",
    "provider": "proxyapi",
    "gatewayOnly": true,
    "allowedKinds": [
      "api"
    ],
    "baseModelId": "glm",
    "upstreamModel": "z-ai/glm-5.3",
    "rates": [
      200,
      null,
      50,
      700
    ],
    "currency": "RUB",
    "checked": "2026-10-20",
    "source": "proxyapi-rates",
    "sourceUrl": "https://proxyapi.ru/models/z-ai/glm-5.3",
    "cacheWriteKnown": false,
    "write1h": null,
    "longPricingUnknown": true,
    "timed": false,
    "vatIncluded": true,
    "processing": "standard",
    "notes": [
      "ProxyAPI prices include 5% VAT. Do not add that VAT again."
    ]
  },
  {
    "id": "proxyapi26-z-ai-glm-5-3-flash",
    "name": "GLM 5.3 Flash · ProxyAPI",
    "provider": "proxyapi",
    "gatewayOnly": true,
    "allowedKinds": [
      "api"
    ],
    "baseModelId": "flash",
    "upstreamModel": "z-ai/glm-5.3-flash",
    "rates": [
      16.84,
      null,
      3.58,
      58.95
    ],
    "currency": "RUB",
    "checked": "2026-10-20",
    "source": "proxyapi-rates",
    "sourceUrl": "https://proxyapi.ru/models/z-ai/glm-5.3-flash",
    "cacheWriteKnown": false,
    "write1h": null,
    "longPricingUnknown": true,
    "timed": false,
    "vatIncluded": true,
    "processing": "standard",
    "notes": [
      "ProxyAPI prices include 5% VAT. Do not add that VAT again."
    ]
  },
  {
    "id": "proxyapi26-deepseek-deepseek-v4-1-flash-1017",
    "name": "DeepSeek V4.1 Flash 1017 · ProxyAPI",
    "provider": "proxyapi",
    "gatewayOnly": true,
    "allowedKinds": [
      "api"
    ],
    "baseModelId": "dsflash1017",
    "upstreamModel": "deepseek/deepseek-v4.1-flash-1017",
    "rates": [
      21.05,
      null,
      0.41,
      81.05
    ],
    "currency": "RUB",
    "checked": "2026-10-20",
    "source": "proxyapi-rates",
    "sourceUrl": "https://proxyapi.ru/models/deepseek/deepseek-v4.1-flash-1017",
    "cacheWriteKnown": false,
    "write1h": null,
    "longPricingUnknown": true,
    "timed": false,
    "vatIncluded": true,
    "processing": "standard",
    "notes": [
      "ProxyAPI prices include 5% VAT. Do not add that VAT again."
    ]
  },
  {
    "id": "polza26-openai-gpt-6-1-sol-openai",
    "name": "GPT-6.1 Sol · Polza AI / openai",
    "provider": "polza",
    "gatewayOnly": true,
    "allowedKinds": [
      "api"
    ],
    "baseModelId": "sol",
    "upstreamModel": "openai/gpt-6.1-sol",
    "rates": [
      233.9592,
      292.449,
      11.69796,
      1169.796
    ],
    "currency": "RUB",
    "checked": "2026-10-20",
    "source": "polza-rates",
    "sourceUrl": "https://polza.ai/api/v1/models?type=chat&include_providers=true",
    "cacheWriteKnown": true,
    "write1h": null,
    "longPricingUnknown": true,
    "timed": false,
    "vatIncluded": null,
    "processing": "standard",
    "notes": [
      "Pin the displayed upstream route and disable fallbacks to reproduce this tariff.",
      "VAT inclusion is unconfirmed; add only a confirmed extra tax or surcharge."
    ],
    "routing": {
      "only": [
        "openai"
      ],
      "allow_fallbacks": false
    },
    "routeName": "openai",
    "alternative": false
  },
  {
    "id": "polza26-anthropic-claude-sonnet-5-5-anthropic",
    "name": "Claude Sonnet 5.5 · Polza AI / anthropic",
    "provider": "polza",
    "gatewayOnly": true,
    "allowedKinds": [
      "api"
    ],
    "baseModelId": "sonnet",
    "upstreamModel": "anthropic/claude-sonnet-5.5",
    "rates": [
      233.9592,
      292.449,
      11.69796,
      1169.796
    ],
    "currency": "RUB",
    "checked": "2026-10-20",
    "source": "polza-rates",
    "sourceUrl": "https://polza.ai/api/v1/models?type=chat&include_providers=true",
    "cacheWriteKnown": true,
    "write1h": null,
    "longPricingUnknown": true,
    "timed": false,
    "vatIncluded": null,
    "processing": "standard",
    "notes": [
      "Pin the displayed upstream route and disable fallbacks to reproduce this tariff.",
      "VAT inclusion is unconfirmed; add only a confirmed extra tax or surcharge."
    ],
    "routing": {
      "only": [
        "anthropic"
      ],
      "allow_fallbacks": false
    },
    "routeName": "anthropic",
    "alternative": false
  },
  {
    "id": "polza26-z-ai-glm-5-3-z-ai-fp8",
    "name": "GLM 5.3 · Polza AI / z-ai/fp8",
    "provider": "polza",
    "gatewayOnly": true,
    "allowedKinds": [
      "api"
    ],
    "baseModelId": "glm",
    "upstreamModel": "z-ai/glm-5.3",
    "rates": [
      163.77144,
      null,
      30.414696,
      514.71024
    ],
    "currency": "RUB",
    "checked": "2026-10-20",
    "source": "polza-rates",
    "sourceUrl": "https://polza.ai/api/v1/models?type=chat&include_providers=true",
    "cacheWriteKnown": false,
    "write1h": null,
    "longPricingUnknown": true,
    "timed": false,
    "vatIncluded": null,
    "processing": "standard",
    "notes": [
      "Pin the displayed upstream route and disable fallbacks to reproduce this tariff.",
      "VAT inclusion is unconfirmed; add only a confirmed extra tax or surcharge."
    ],
    "routing": {
      "only": [
        "z-ai/fp8"
      ],
      "allow_fallbacks": false
    },
    "routeName": "z-ai/fp8",
    "alternative": false
  },
  {
    "id": "polza26-z-ai-glm-5-3-flash-z-ai-fp8",
    "name": "GLM 5.3 Flash · Polza AI / z-ai/fp8",
    "provider": "polza",
    "gatewayOnly": true,
    "allowedKinds": [
      "api"
    ],
    "baseModelId": "flash",
    "upstreamModel": "z-ai/glm-5.3-flash",
    "rates": [
      17.54694,
      null,
      3.509388,
      58.4898
    ],
    "currency": "RUB",
    "checked": "2026-10-20",
    "source": "polza-rates",
    "sourceUrl": "https://polza.ai/api/v1/models?type=chat&include_providers=true",
    "cacheWriteKnown": false,
    "write1h": null,
    "longPricingUnknown": true,
    "timed": false,
    "vatIncluded": null,
    "processing": "standard",
    "notes": [
      "Pin the displayed upstream route and disable fallbacks to reproduce this tariff.",
      "VAT inclusion is unconfirmed; add only a confirmed extra tax or surcharge."
    ],
    "routing": {
      "only": [
        "z-ai/fp8"
      ],
      "allow_fallbacks": false
    },
    "routeName": "z-ai/fp8",
    "alternative": false
  },
  {
    "id": "polza26-deepseek-deepseek-v4-1-flash-1017-deepseek",
    "name": "DeepSeek V4.1 Flash 1017 · Polza AI / deepseek",
    "provider": "polza",
    "gatewayOnly": true,
    "allowedKinds": [
      "api"
    ],
    "baseModelId": "dsflash1017",
    "upstreamModel": "deepseek/deepseek-v4.1-flash-1017",
    "rates": [
      17.54694,
      null,
      0.3509388,
      70.18776
    ],
    "currency": "RUB",
    "checked": "2026-10-20",
    "source": "polza-rates",
    "sourceUrl": "https://polza.ai/api/v1/models?type=chat&include_providers=true",
    "cacheWriteKnown": false,
    "write1h": null,
    "longPricingUnknown": true,
    "timed": false,
    "vatIncluded": null,
    "processing": "standard",
    "notes": [
      "Pin the displayed upstream route and disable fallbacks to reproduce this tariff.",
      "VAT inclusion is unconfirmed; add only a confirmed extra tax or surcharge."
    ],
    "routing": {
      "only": [
        "deepseek"
      ],
      "allow_fallbacks": false
    },
    "routeName": "deepseek",
    "alternative": false
  },
  {
    "id": "polza26-openai-gpt-6-1-sol-openai-flex",
    "name": "GPT-6.1 Sol · Polza AI / openai/flex",
    "provider": "polza",
    "gatewayOnly": true,
    "allowedKinds": [
      "api"
    ],
    "baseModelId": "sol",
    "upstreamModel": "openai/gpt-6.1-sol",
    "rates": [
      116.9796,
      146.2245,
      5.84898,
      584.898
    ],
    "currency": "RUB",
    "checked": "2026-10-20",
    "source": "polza-rates",
    "sourceUrl": "https://polza.ai/api/v1/models?type=chat&include_providers=true",
    "cacheWriteKnown": true,
    "write1h": null,
    "longPricingUnknown": true,
    "timed": false,
    "vatIncluded": null,
    "processing": "flex",
    "notes": [
      "Pin the displayed upstream route and disable fallbacks to reproduce this tariff.",
      "VAT inclusion is unconfirmed; add only a confirmed extra tax or surcharge.",
      "Flex processing is a separate service tier; latency differs from standard interactive requests."
    ],
    "routing": {
      "only": [
        "openai/flex"
      ],
      "allow_fallbacks": false
    },
    "routeName": "openai/flex",
    "alternative": false
  },
  {
    "id": "polza26-z-ai-glm-5-3-flash-open-inference-fp4",
    "name": "GLM 5.3 Flash · Polza AI / open-inference/fp4",
    "provider": "polza",
    "gatewayOnly": true,
    "allowedKinds": [
      "api"
    ],
    "baseModelId": "flash",
    "upstreamModel": "z-ai/glm-5.3-flash",
    "rates": [
      5.6150208,
      null,
      0.7018776,
      18.716736
    ],
    "currency": "RUB",
    "checked": "2026-10-20",
    "source": "polza-rates",
    "sourceUrl": "https://polza.ai/api/v1/models?type=chat&include_providers=true",
    "cacheWriteKnown": false,
    "write1h": null,
    "longPricingUnknown": true,
    "timed": false,
    "vatIncluded": null,
    "processing": "standard",
    "notes": [
      "Pin the displayed upstream route and disable fallbacks to reproduce this tariff.",
      "VAT inclusion is unconfirmed; add only a confirmed extra tax or surcharge.",
      "Alternative host: model quality, quantization, availability and latency may differ."
    ],
    "routing": {
      "only": [
        "open-inference/fp4"
      ],
      "allow_fallbacks": false
    },
    "routeName": "open-inference/fp4",
    "alternative": true
  },
  {
    "id": "polza26-z-ai-glm-5-3-wafer-us",
    "name": "GLM 5.3 · Polza AI / wafer/us",
    "provider": "polza",
    "gatewayOnly": true,
    "allowedKinds": [
      "api"
    ],
    "baseModelId": "glm",
    "upstreamModel": "z-ai/glm-5.3",
    "rates": [
      9.2413884,
      null,
      9.1244088,
      163.77144
    ],
    "currency": "RUB",
    "checked": "2026-10-20",
    "source": "polza-rates",
    "sourceUrl": "https://polza.ai/api/v1/models?type=chat&include_providers=true",
    "cacheWriteKnown": false,
    "write1h": null,
    "longPricingUnknown": true,
    "timed": false,
    "vatIncluded": null,
    "processing": "standard",
    "notes": [
      "Pin the displayed upstream route and disable fallbacks to reproduce this tariff.",
      "VAT inclusion is unconfirmed; add only a confirmed extra tax or surcharge.",
      "Alternative host: model quality, quantization, availability and latency may differ."
    ],
    "routing": {
      "only": [
        "wafer/us"
      ],
      "allow_fallbacks": false
    },
    "routeName": "wafer/us",
    "alternative": true
  },
  {
    "id": "vsegpt26-openai-gpt-6-1-sol-medium",
    "name": "OpenAI: GPT-6.1 Sol (Thinking Medium) · VseGPT",
    "provider": "vsegpt",
    "upstreamModel": "openai/gpt-6.1-sol-medium",
    "gatewayOnly": true,
    "allowedKinds": [
      "api"
    ],
    "requiredAccess": "professional",
    "rates": [
      null,
      null,
      null,
      null
    ],
    "currency": "RUB",
    "cacheWriteKnown": false,
    "requiresManualRates": true,
    "longPricingUnknown": true,
    "checked": "2026-10-20",
    "source": "vsegpt-rates",
    "sourceUrl": "https://www.vsegpt.ru/Docs/Models",
    "notes": [
      "Public VseGPT documentation conflicts on characters versus tokens. Enter confirmed RUB prices per million tokens; no character conversion is assumed."
    ]
  },
  {
    "id": "vsegpt26-anthropic-claude-sonnet-5-5-medium",
    "name": "Anthropic: Claude Sonnet 5.5 (Thinking Medium) · VseGPT",
    "provider": "vsegpt",
    "upstreamModel": "anthropic/claude-sonnet-5.5-medium",
    "gatewayOnly": true,
    "allowedKinds": [
      "api"
    ],
    "requiredAccess": "professional",
    "rates": [
      null,
      null,
      null,
      null
    ],
    "currency": "RUB",
    "cacheWriteKnown": false,
    "requiresManualRates": true,
    "longPricingUnknown": true,
    "checked": "2026-10-20",
    "source": "vsegpt-rates",
    "sourceUrl": "https://www.vsegpt.ru/Docs/Models",
    "notes": [
      "Public VseGPT documentation conflicts on characters versus tokens. Enter confirmed RUB prices per million tokens; no character conversion is assumed."
    ]
  },
  {
    "id": "vsegpt26-z-ai-glm-5-3-low",
    "name": "Z.AI: GLM 5.3 (Thinking Low) · VseGPT",
    "provider": "vsegpt",
    "upstreamModel": "z-ai/glm-5.3-low",
    "gatewayOnly": true,
    "allowedKinds": [
      "api"
    ],
    "requiredAccess": "basic",
    "rates": [
      null,
      null,
      null,
      null
    ],
    "currency": "RUB",
    "cacheWriteKnown": false,
    "requiresManualRates": true,
    "longPricingUnknown": true,
    "checked": "2026-10-20",
    "source": "vsegpt-rates",
    "sourceUrl": "https://www.vsegpt.ru/Docs/Models",
    "notes": [
      "Public VseGPT documentation conflicts on characters versus tokens. Enter confirmed RUB prices per million tokens; no character conversion is assumed."
    ]
  },
  {
    "id": "vsegpt26-z-ai-glm-5-3-flash-low",
    "name": "Z.AI: GLM 5.3 Flash (Thinking Low) · VseGPT",
    "provider": "vsegpt",
    "upstreamModel": "z-ai/glm-5.3-flash-low",
    "gatewayOnly": true,
    "allowedKinds": [
      "api"
    ],
    "requiredAccess": "basic",
    "rates": [
      null,
      null,
      null,
      null
    ],
    "currency": "RUB",
    "cacheWriteKnown": false,
    "requiresManualRates": true,
    "longPricingUnknown": true,
    "checked": "2026-10-20",
    "source": "vsegpt-rates",
    "sourceUrl": "https://www.vsegpt.ru/Docs/Models",
    "notes": [
      "Public VseGPT documentation conflicts on characters versus tokens. Enter confirmed RUB prices per million tokens; no character conversion is assumed."
    ]
  }
];
