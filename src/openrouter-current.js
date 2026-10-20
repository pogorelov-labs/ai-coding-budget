// Public OpenRouter endpoint snapshot, checked 2026-10-20 (Europe/Moscow).
// Evidence: research/openrouter-2026-10-20.{md,json}. No runtime network calls.
// Standalone literals avoid a circular dependency when catalog.js appends them.
// Rates: [uncached input, cache write, cache read, billed output], USD / 1M.
// A null write rate is UNKNOWN, never zero. Require an explicit rate for writes.
// Route fields override model defaults, including timed:false and long:null.
// These model IDs are restricted to kind:"openrouter"; no subscription allowance,
// direct-provider speed multiplier, or direct API entitlement is inherited.

export const CURRENT_OR_MODELS=[
  {
    "id": "or26-sol",
    "name": "GPT-6.1 Sol · OpenRouter",
    "provider": "openrouter",
    "upstreamProvider": "openai",
    "gatewayOnly": true,
    "allowedKinds": [
      "openrouter"
    ],
    "baseModelId": "sol",
    "source": "or-current",
    "checked": "2026-10-20",
    "currency": "USD",
    "nativeCurrency": "USD",
    "orSlug": "openai/gpt-6.1-sol",
    "defaultRoute": "openai",
    "rates": [
      2.0,
      2.5,
      0.1,
      10.0
    ],
    "cacheWriteKnown": true,
    "speedModes": [
      "standard"
    ],
    "long": [
      2,
      2,
      2,
      1.5
    ],
    "threshold": 272000,
    "thresholdComparison": "gt",
    "timed": false
  },
  {
    "id": "or26-luna",
    "name": "GPT-6 Luna · OpenRouter",
    "provider": "openrouter",
    "upstreamProvider": "openai",
    "gatewayOnly": true,
    "allowedKinds": [
      "openrouter"
    ],
    "baseModelId": "luna",
    "source": "or-current",
    "checked": "2026-10-20",
    "currency": "USD",
    "nativeCurrency": "USD",
    "orSlug": "openai/gpt-6-luna",
    "defaultRoute": "openai",
    "rates": [
      0.1,
      0.125,
      0.01,
      0.5
    ],
    "cacheWriteKnown": true,
    "speedModes": [
      "standard"
    ],
    "long": [
      2,
      2,
      2,
      1.5
    ],
    "threshold": 272000,
    "thresholdComparison": "gt",
    "timed": false
  },
  {
    "id": "or26-sonnet",
    "name": "Claude Sonnet 5.5 · OpenRouter",
    "provider": "openrouter",
    "upstreamProvider": "anthropic",
    "gatewayOnly": true,
    "allowedKinds": [
      "openrouter"
    ],
    "baseModelId": "sonnet",
    "source": "or-current",
    "checked": "2026-10-20",
    "currency": "USD",
    "nativeCurrency": "USD",
    "orSlug": "anthropic/claude-sonnet-5.5",
    "defaultRoute": "anthropic",
    "rates": [
      2.0,
      2.5,
      0.1,
      10.0
    ],
    "cacheWriteKnown": true,
    "speedModes": [
      "standard"
    ],
    "write1h": 4.0,
    "timed": false
  },
  {
    "id": "or26-opus",
    "name": "Claude Opus 5.5 · OpenRouter",
    "provider": "openrouter",
    "upstreamProvider": "anthropic",
    "gatewayOnly": true,
    "allowedKinds": [
      "openrouter"
    ],
    "baseModelId": "opus",
    "source": "or-current",
    "checked": "2026-10-20",
    "currency": "USD",
    "nativeCurrency": "USD",
    "orSlug": "anthropic/claude-opus-5.5",
    "defaultRoute": "anthropic",
    "rates": [
      4.0,
      5.0,
      0.2,
      20.0
    ],
    "cacheWriteKnown": true,
    "speedModes": [
      "standard"
    ],
    "write1h": 8.0,
    "timed": false
  },
  {
    "id": "or26-glm",
    "name": "GLM-5.3 · OpenRouter",
    "provider": "openrouter",
    "upstreamProvider": "zai",
    "gatewayOnly": true,
    "allowedKinds": [
      "openrouter"
    ],
    "baseModelId": "glm",
    "source": "or-current",
    "checked": "2026-10-20",
    "currency": "USD",
    "nativeCurrency": "USD",
    "orSlug": "z-ai/glm-5.3",
    "defaultRoute": "z-ai/fp8",
    "rates": [
      1.4,
      null,
      0.26,
      4.4
    ],
    "cacheWriteKnown": false,
    "speedModes": [
      "standard"
    ],
    "timed": false
  },
  {
    "id": "or26-flash",
    "name": "GLM-5.3-Flash · OpenRouter",
    "provider": "openrouter",
    "upstreamProvider": "zai",
    "gatewayOnly": true,
    "allowedKinds": [
      "openrouter"
    ],
    "baseModelId": "flash",
    "source": "or-current",
    "checked": "2026-10-20",
    "currency": "USD",
    "nativeCurrency": "USD",
    "orSlug": "z-ai/glm-5.3-flash",
    "defaultRoute": "z-ai/fp8",
    "rates": [
      0.15,
      null,
      0.03,
      0.5
    ],
    "cacheWriteKnown": false,
    "speedModes": [
      "standard"
    ],
    "timed": false
  },
  {
    "id": "or26-dsflash",
    "name": "DeepSeek V4.1 Flash · OpenRouter",
    "provider": "openrouter",
    "upstreamProvider": "deepseek",
    "gatewayOnly": true,
    "allowedKinds": [
      "openrouter"
    ],
    "baseModelId": "dsflash",
    "source": "or-current",
    "checked": "2026-10-20",
    "currency": "USD",
    "nativeCurrency": "USD",
    "orSlug": "deepseek/deepseek-v4.1-flash",
    "defaultRoute": "sail-research/fp4",
    "rates": [
      0.101,
      null,
      0.006735,
      0.15
    ],
    "cacheWriteKnown": false,
    "speedModes": [
      "standard"
    ],
    "timed": false,
    "limitations": [
      "The original DeepSeek vendor route was absent from this snapshot. Default explicitly uses Sail Research FP4; it is a different host and quantization."
    ]
  },
  {
    "id": "or26-dspro",
    "name": "DeepSeek V4 Pro 0813 · OpenRouter",
    "provider": "openrouter",
    "upstreamProvider": "deepseek",
    "gatewayOnly": true,
    "allowedKinds": [
      "openrouter"
    ],
    "baseModelId": "dspro",
    "source": "or-current",
    "checked": "2026-10-20",
    "currency": "USD",
    "nativeCurrency": "USD",
    "orSlug": "deepseek/deepseek-v4-pro-0813",
    "defaultRoute": "deepseek",
    "rates": [
      1.32,
      null,
      0.044,
      3.96
    ],
    "cacheWriteKnown": false,
    "speedModes": [
      "standard"
    ],
    "timed": true,
    "off": [
      0.66,
      null,
      0.022,
      1.98
    ],
    "scheduleProvider": "deepseek"
  }
];

export const CURRENT_OR_ROUTES={
  "or26-sol": [
    {
      "id": "openai",
      "name": "OpenAI · openai",
      "rates": [
        2.0,
        2.5,
        0.1,
        10.0
      ],
      "currency": "USD",
      "nativeCurrency": "USD",
      "modelSlug": "openai/gpt-6.1-sol",
      "providerTag": "openai",
      "providerModelId": "openai/gpt-6.1-sol",
      "source": "https://openrouter.ai/api/v1/models/openai/gpt-6.1-sol/endpoints",
      "checked": "2026-10-20",
      "alternative": false,
      "regional": false,
      "quantization": "unknown",
      "cacheWriteKnown": true,
      "write1h": null,
      "timed": false,
      "long": [
        2,
        2,
        2,
        1.5
      ],
      "threshold": 272000,
      "speedModes": [
        "standard"
      ],
      "contextLength": 1050000,
      "maxOutputTokens": 128000,
      "status": 0,
      "thresholdComparison": "gt",
      "extraUnitPricesUsd": {
        "web_search": 0.01
      }
    },
    {
      "id": "azure/eu",
      "name": "Azure · azure/eu",
      "rates": [
        2.2,
        2.75,
        0.11,
        11.0
      ],
      "currency": "USD",
      "nativeCurrency": "USD",
      "modelSlug": "openai/gpt-6.1-sol",
      "providerTag": "azure/eu",
      "providerModelId": "openai/gpt-6.1-sol",
      "source": "https://openrouter.ai/api/v1/models/openai/gpt-6.1-sol/endpoints",
      "checked": "2026-10-20",
      "alternative": false,
      "regional": true,
      "quantization": "unknown",
      "cacheWriteKnown": true,
      "write1h": null,
      "timed": false,
      "long": [
        2,
        2,
        2,
        1.5
      ],
      "threshold": 272000,
      "speedModes": [
        "standard"
      ],
      "contextLength": 1050000,
      "maxOutputTokens": 128000,
      "status": 0,
      "region": "Europe",
      "requiresBusiness": true,
      "thresholdComparison": "gt",
      "extraUnitPricesUsd": {
        "web_search": 0.01
      }
    }
  ],
  "or26-luna": [
    {
      "id": "openai",
      "name": "OpenAI · openai",
      "rates": [
        0.1,
        0.125,
        0.01,
        0.5
      ],
      "currency": "USD",
      "nativeCurrency": "USD",
      "modelSlug": "openai/gpt-6-luna",
      "providerTag": "openai",
      "providerModelId": "openai/gpt-6-luna",
      "source": "https://openrouter.ai/api/v1/models/openai/gpt-6-luna/endpoints",
      "checked": "2026-10-20",
      "alternative": false,
      "regional": false,
      "quantization": "unknown",
      "cacheWriteKnown": true,
      "write1h": null,
      "timed": false,
      "long": [
        2,
        2,
        2,
        1.5
      ],
      "threshold": 272000,
      "speedModes": [
        "standard"
      ],
      "contextLength": 1050000,
      "maxOutputTokens": 128000,
      "status": 0,
      "thresholdComparison": "gt",
      "extraUnitPricesUsd": {
        "web_search": 0.01
      }
    }
  ],
  "or26-sonnet": [
    {
      "id": "anthropic",
      "name": "Anthropic · anthropic",
      "rates": [
        2.0,
        2.5,
        0.1,
        10.0
      ],
      "currency": "USD",
      "nativeCurrency": "USD",
      "modelSlug": "anthropic/claude-sonnet-5.5",
      "providerTag": "anthropic",
      "providerModelId": "anthropic/claude-sonnet-5.5",
      "source": "https://openrouter.ai/api/v1/models/anthropic/claude-sonnet-5.5/endpoints",
      "checked": "2026-10-20",
      "alternative": false,
      "regional": false,
      "quantization": "unknown",
      "cacheWriteKnown": true,
      "write1h": 4.0,
      "timed": false,
      "long": null,
      "threshold": null,
      "speedModes": [
        "standard"
      ],
      "contextLength": 1000000,
      "maxOutputTokens": 128000,
      "status": 0,
      "extraUnitPricesUsd": {
        "web_search": 0.01
      }
    }
  ],
  "or26-opus": [
    {
      "id": "anthropic",
      "name": "Anthropic · anthropic",
      "rates": [
        4.0,
        5.0,
        0.2,
        20.0
      ],
      "currency": "USD",
      "nativeCurrency": "USD",
      "modelSlug": "anthropic/claude-opus-5.5",
      "providerTag": "anthropic",
      "providerModelId": "anthropic/claude-opus-5.5",
      "source": "https://openrouter.ai/api/v1/models/anthropic/claude-opus-5.5/endpoints",
      "checked": "2026-10-20",
      "alternative": false,
      "regional": false,
      "quantization": "unknown",
      "cacheWriteKnown": true,
      "write1h": 8.0,
      "timed": false,
      "long": null,
      "threshold": null,
      "speedModes": [
        "standard"
      ],
      "contextLength": 1000000,
      "maxOutputTokens": 128000,
      "status": 0,
      "extraUnitPricesUsd": {
        "web_search": 0.01
      }
    }
  ],
  "or26-glm": [
    {
      "id": "z-ai/fp8",
      "name": "Z.AI · z-ai/fp8",
      "rates": [
        1.4,
        null,
        0.26,
        4.4
      ],
      "currency": "USD",
      "nativeCurrency": "USD",
      "modelSlug": "z-ai/glm-5.3",
      "providerTag": "z-ai/fp8",
      "providerModelId": "z-ai/glm-5.3",
      "source": "https://openrouter.ai/api/v1/models/z-ai/glm-5.3/endpoints",
      "checked": "2026-10-20",
      "alternative": false,
      "regional": false,
      "quantization": "fp8",
      "cacheWriteKnown": false,
      "write1h": null,
      "timed": false,
      "long": null,
      "threshold": null,
      "speedModes": [
        "standard"
      ],
      "contextLength": 1048576,
      "maxOutputTokens": 131072,
      "status": 0,
      "limitations": [
        "No separate cache-write price is published. Enter an explicit write price before budgeting nonzero cache-write input; null must not be treated as zero or as a confirmed input-price tariff."
      ]
    },
    {
      "id": "relace",
      "name": "Relace · relace",
      "rates": [
        0.75,
        null,
        0.075,
        2.4
      ],
      "currency": "USD",
      "nativeCurrency": "USD",
      "modelSlug": "z-ai/glm-5.3",
      "providerTag": "relace",
      "providerModelId": "z-ai/glm-5.3",
      "source": "https://openrouter.ai/api/v1/models/z-ai/glm-5.3/endpoints",
      "checked": "2026-10-20",
      "alternative": true,
      "regional": false,
      "quantization": "unknown",
      "cacheWriteKnown": false,
      "write1h": null,
      "timed": false,
      "long": null,
      "threshold": null,
      "speedModes": [
        "standard"
      ],
      "contextLength": 1048576,
      "maxOutputTokens": 131072,
      "status": 0,
      "limitations": [
        "No separate cache-write price is published. Enter an explicit write price before budgeting nonzero cache-write input; null must not be treated as zero or as a confirmed input-price tariff."
      ]
    },
    {
      "id": "tenstorrent/fp8",
      "name": "Tenstorrent · tenstorrent/fp8",
      "rates": [
        0.6,
        null,
        0.1,
        2.5
      ],
      "currency": "USD",
      "nativeCurrency": "USD",
      "modelSlug": "z-ai/glm-5.3",
      "providerTag": "tenstorrent/fp8",
      "providerModelId": "z-ai/glm-5.3",
      "source": "https://openrouter.ai/api/v1/models/z-ai/glm-5.3/endpoints",
      "checked": "2026-10-20",
      "alternative": true,
      "regional": false,
      "quantization": "fp8",
      "cacheWriteKnown": false,
      "write1h": null,
      "timed": false,
      "long": null,
      "threshold": null,
      "speedModes": [
        "standard"
      ],
      "contextLength": 1044480,
      "maxOutputTokens": 131072,
      "status": 0,
      "limitations": [
        "No separate cache-write price is published. Enter an explicit write price before budgeting nonzero cache-write input; null must not be treated as zero or as a confirmed input-price tariff."
      ]
    }
  ],
  "or26-flash": [
    {
      "id": "z-ai/fp8",
      "name": "Z.AI · z-ai/fp8",
      "rates": [
        0.15,
        null,
        0.03,
        0.5
      ],
      "currency": "USD",
      "nativeCurrency": "USD",
      "modelSlug": "z-ai/glm-5.3-flash",
      "providerTag": "z-ai/fp8",
      "providerModelId": "z-ai/glm-5.3-flash",
      "source": "https://openrouter.ai/api/v1/models/z-ai/glm-5.3-flash/endpoints",
      "checked": "2026-10-20",
      "alternative": false,
      "regional": false,
      "quantization": "fp8",
      "cacheWriteKnown": false,
      "write1h": null,
      "timed": false,
      "long": null,
      "threshold": null,
      "speedModes": [
        "standard"
      ],
      "contextLength": 1048576,
      "maxOutputTokens": 131072,
      "status": 0,
      "limitations": [
        "No separate cache-write price is published. Enter an explicit write price before budgeting nonzero cache-write input; null must not be treated as zero or as a confirmed input-price tariff."
      ]
    },
    {
      "id": "streamlake/fp8",
      "name": "StreamLake · streamlake/fp8",
      "rates": [
        0.073845,
        null,
        0.014769,
        0.24615
      ],
      "currency": "USD",
      "nativeCurrency": "USD",
      "modelSlug": "z-ai/glm-5.3-flash",
      "providerTag": "streamlake/fp8",
      "providerModelId": "z-ai/glm-5.3-flash",
      "source": "https://openrouter.ai/api/v1/models/z-ai/glm-5.3-flash/endpoints",
      "checked": "2026-10-20",
      "alternative": true,
      "regional": false,
      "quantization": "fp8",
      "cacheWriteKnown": false,
      "write1h": null,
      "timed": false,
      "long": null,
      "threshold": null,
      "speedModes": [
        "standard"
      ],
      "contextLength": 1024000,
      "maxOutputTokens": 128000,
      "status": 0,
      "limitations": [
        "No separate cache-write price is published. Enter an explicit write price before budgeting nonzero cache-write input; null must not be treated as zero or as a confirmed input-price tariff."
      ],
      "publishedDiscountAlreadyApplied": 0.5077
    }
  ],
  "or26-dsflash": [
    {
      "id": "sail-research/fp4",
      "name": "Sail Research · sail-research/fp4",
      "rates": [
        0.101,
        null,
        0.006735,
        0.15
      ],
      "currency": "USD",
      "nativeCurrency": "USD",
      "modelSlug": "deepseek/deepseek-v4.1-flash",
      "providerTag": "sail-research/fp4",
      "providerModelId": "deepseek/deepseek-v4.1-flash",
      "source": "https://openrouter.ai/api/v1/models/deepseek/deepseek-v4.1-flash/endpoints",
      "checked": "2026-10-20",
      "alternative": true,
      "regional": false,
      "quantization": "fp4",
      "cacheWriteKnown": false,
      "write1h": null,
      "timed": false,
      "long": null,
      "threshold": null,
      "speedModes": [
        "standard"
      ],
      "contextLength": 1048576,
      "maxOutputTokens": 384000,
      "status": 0,
      "limitations": [
        "No separate cache-write price is published. Enter an explicit write price before budgeting nonzero cache-write input; null must not be treated as zero or as a confirmed input-price tariff."
      ]
    }
  ],
  "or26-dspro": [
    {
      "id": "deepseek",
      "name": "DeepSeek · deepseek",
      "rates": [
        1.32,
        null,
        0.044,
        3.96
      ],
      "currency": "USD",
      "nativeCurrency": "USD",
      "modelSlug": "deepseek/deepseek-v4-pro-0813",
      "providerTag": "deepseek",
      "providerModelId": "deepseek/deepseek-v4-pro-0813",
      "source": "https://openrouter.ai/api/v1/models/deepseek/deepseek-v4-pro-0813/endpoints",
      "checked": "2026-10-20",
      "alternative": false,
      "regional": false,
      "quantization": "unknown",
      "cacheWriteKnown": false,
      "write1h": null,
      "timed": true,
      "long": null,
      "threshold": null,
      "speedModes": [
        "standard"
      ],
      "contextLength": 1048576,
      "maxOutputTokens": 393216,
      "status": 0,
      "off": [
        0.66,
        null,
        0.022,
        1.98
      ],
      "scheduleProvider": "deepseek",
      "peakScheduleUTC": {
        "weekdays": [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday"
        ],
        "windows": [
          [
            100,
            400
          ],
          [
            600,
            1000
          ]
        ],
        "publicHolidayOverride": false
      },
      "note": "Peak base; off-peak applies outside weekday UTC 01:00–04:00 and 06:00–10:00. OpenRouter holiday discounts are not confirmed.",
      "limitations": [
        "No separate cache-write price is published. Enter an explicit write price before budgeting nonzero cache-write input; null must not be treated as zero or as a confirmed input-price tariff."
      ]
    },
    {
      "id": "streamlake",
      "name": "StreamLake · streamlake",
      "rates": [
        0.66,
        null,
        0.022,
        1.98
      ],
      "currency": "USD",
      "nativeCurrency": "USD",
      "modelSlug": "deepseek/deepseek-v4-pro-0813",
      "providerTag": "streamlake",
      "providerModelId": "deepseek/deepseek-v4-pro-0813",
      "source": "https://openrouter.ai/api/v1/models/deepseek/deepseek-v4-pro-0813/endpoints",
      "checked": "2026-10-20",
      "alternative": true,
      "regional": false,
      "quantization": "unknown",
      "cacheWriteKnown": false,
      "write1h": null,
      "timed": false,
      "long": null,
      "threshold": null,
      "speedModes": [
        "standard"
      ],
      "contextLength": 1024000,
      "maxOutputTokens": 384000,
      "status": 0,
      "limitations": [
        "No separate cache-write price is published. Enter an explicit write price before budgeting nonzero cache-write input; null must not be treated as zero or as a confirmed input-price tariff."
      ],
      "publishedDiscountAlreadyApplied": 0.5
    },
    {
      "id": "sail-research/fp4",
      "name": "Sail Research · sail-research/fp4",
      "rates": [
        0.896,
        null,
        0.187,
        0.582
      ],
      "currency": "USD",
      "nativeCurrency": "USD",
      "modelSlug": "deepseek/deepseek-v4-pro-0813",
      "providerTag": "sail-research/fp4",
      "providerModelId": "deepseek/deepseek-v4-pro-0813",
      "source": "https://openrouter.ai/api/v1/models/deepseek/deepseek-v4-pro-0813/endpoints",
      "checked": "2026-10-20",
      "alternative": true,
      "regional": false,
      "quantization": "fp4",
      "cacheWriteKnown": false,
      "write1h": null,
      "timed": false,
      "long": null,
      "threshold": null,
      "speedModes": [
        "standard"
      ],
      "contextLength": 1048576,
      "maxOutputTokens": 384000,
      "status": 0,
      "limitations": [
        "No separate cache-write price is published. Enter an explicit write price before budgeting nonzero cache-write input; null must not be treated as zero or as a confirmed input-price tariff."
      ]
    }
  ]
};
