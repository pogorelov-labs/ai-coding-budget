# AI Coding Budget

[Open the calculator](https://pogorelov-labs.github.io/ai-coding-budget/)

Compare AI coding subscriptions and API spending for a team. Describe power, regular and light users plus server agents. On **Plans**, choose **Use a recommendation** or **Build my own**. Manual setup follows **People → Plan → Usage → Review** and adds a plan only after confirmation. Inspect monthly costs and a 12-month forecast on Budget.

- English/Russian interface, research notes and provider conditions.
- Personal and team subscriptions, direct APIs and OpenRouter routes.
- Per-model input/output tokens, cache assumptions, workload allocation and scheduling.
- Billing periods, credits, overage, confirmed promotions and editable USD/RUB conversion (default 95).
- Live USD/RUB estimates during setup, a totals-first Budget page, inline scenario comparison, and expandable charts/assumptions.
- OpenRouter, ProxyAPI, Polza AI and VseGPT gateway options with dated model prices and provider conditions.
- JSON backup/import, CSV export and a downloadable offline calculator.

All calculations run in your browser. There is no backend, API key entry, paid API traffic or shared account database. Saved budgets stay in that browser’s local storage. When moving from another host, export JSON there and import it here; browsers do not share storage between site origins.

Core provider prices retain their **17 October 2026 snapshot**; OpenRouter and Russian gateway routes were researched on **20 October 2026**. These are dated snapshots, not live pricing. Check the linked provider terms before purchasing; estimates retain explicit assumptions about quotas, eligibility, discounts and future prices.

## Run locally

Requires Node.js 22 or later. There are no npm dependencies to install.

```sh
npm test
npm run build
python3 -m http.server 8767 --bind 127.0.0.1 --directory dist
```

Open `http://127.0.0.1:8767/`, or open the generated `dist/index.html` directly. The single HTML file contains all application code, styles and catalogue data.

## Deploy

GitHub Pages uses GitHub Actions. Every push to `main` runs the test suite, builds `dist/index.html`, uploads only `dist/`, and deploys the tested artifact. Pull requests run tests and builds without publishing. The workflow can also be run manually.

Set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. Deployment uses the built-in GitHub token and OIDC; no personal deployment token is needed. See [.github/workflows/pages.yml](.github/workflows/pages.yml).

## Source map

| Location | Purpose |
| --- | --- |
| `src/catalog.js` | Core provider prices, plans, offers and source links |
| `src/openrouter-current.js` / `src/gateway-catalog.js` | Dated gateway models, routes and native-currency tariffs |
| `src/gateway-billing.js` | Access plans and 30-day renewal accounting |
| `src/running-cost.js` | Validated live plan and setup estimates |
| `src/engine.js` | Token pricing, quotas, fees, credits and forecast ledger |
| `src/recommendations.js` | Comparable-model setup recommendations |
| `src/analytics.js` / `src/analytics-ui.js` | Cost allocation, charts and treemap |
| `src/i18n.js` / `src/research-i18n.js` | English/Russian copy |
| `src/journey.js` / `src/app.js` | Calculator journey, settings and exports |
| `scripts/build.mjs` | Dependency-free standalone HTML build |
| `tests/` | Calculation, recommendation, analytics and translation tests |
| `research/` | Dated research and worked scenarios with provider sources |

[Recommendation methodology](RECOMMENDATIONS.md) · [Analytics and localization](ANALYTICS-I18N.md) · [Validation record](VALIDATION.md) · [Research index](research/README.md)

The original implementation notes are retained in [docs/DEVELOPMENT-NOTES.md](docs/DEVELOPMENT-NOTES.md) as historical context; use the commands and workflow above for this repository.

## Gateway pricing boundaries

Russian gateway tariffs stay in native RUB; USD uses the scenario exchange rate. Provider repricing is separate from this display conversion. ProxyAPI prices include published 5% VAT; Polza VAT inclusion is unconfirmed. Unknown token categories cannot silently become free usage. VseGPT requires manually confirmed per-token rates because public billing units conflict; its access subscription is additional to usage.

Gateway selections are explicit manual choices. The existing recommendation search keeps its verified direct-provider/subscription scope, so discounted, asynchronous or quantized routes are never silently substituted. See the [gateway research index](research/README.md).
