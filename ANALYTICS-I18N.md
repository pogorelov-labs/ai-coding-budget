# Bilingual interface and budget analytics

Implemented 18 October 2026 in the existing standalone calculator. No provider prices, quotas, tax defaults or saved budget values changed.

## English and Russian

The EN/RU segmented toggle is in the top-right header. It translates the primary Team → Plans → Budget journey, recommendation copy, controls, dialogs, comparisons, chart descriptions and common validation messages. It updates document language, date and number presentation, and accessible labels. Language is stored separately in `ai-coding-budget-language`; changing it does not rewrite scenario names, custom plan labels, account identifiers, token amounts or prices. The same toggle covers the complete in-app research: pricing and offer tables, provider conditions, automation architecture, methodology, source labels, generated quota notes and validation messages. CSV headings, statuses and automation descriptions use the chosen language. External linked documents remain in their original language. New scenario labels use the selected interface language.

The translation layer keeps original UI text for repeatable switching and skips user-authored content. The offline HTML retains its document language and all inline code; JSON remains a budget-data format rather than a UI-preference format. Chart controls are session preferences, not changes to the scenario.

## Forecast and analytics contract

`forecast()` now returns the same twelve results it already used to calculate its annual total, including each forecast date and line details. Existing monthly, first-payment and yearly outputs are unchanged. This avoids a second simplified pricing model.

The Budget page adds:

- Monthly stacked bars or cumulative stacked areas across twelve forecast months.
- Breakdowns by user group, billing provider or model.
- USD/RUB display using the scenario exchange rate.
- Cash-payment timing (default) or monthly cost equivalents.
- A 12-month treemap, largest-category and highest-month summaries, exact monthly values, and allocation notes.

Cash payments include annual/quarterly prepayment, introductory subscription discounts, metered costs, paid bundles, credits, grants, fees and tax using the original engine ledger. Their final cumulative total equals the annual forecast. The monthly-equivalent view spreads subscription fees across their billing period; first-payment subscription discounts appear only in the cash view. These are scenario projections with unchanged workload and current catalogue rates, not observed expenses or predictions of future provider pricing. Each point represents one forecast billing month from the entered calculation date.

When allowance is uncertain, colored marks and treemap areas represent the upper estimate. The dashed line/markers represent the lower estimate. Inspectors show both values; this is a conditional cost range, not a confidence interval or guaranteed bill cap. Invalid inputs suppress the plots; zero spending gives an empty state; uncovered workloads retain a warning.

## Allocation and reconciliation

The original cost totals are authoritative. Category allocation explains them but is not a provider invoice:

- Fixed seat charges follow cohort head counts. Extra unused seats have their own category. Unlinked manual workloads remain manual rather than being inferred from the team profile.
- Metered costs follow each cohort/model's calculated price weight. GLM fallback uses the affected cohort's quota shortage; Codex uses its credit weights. Shared credits/fees are allocated proportionally, so category attribution is an estimate even when the total is exact.
- Fixed subscriptions, prepaid bundles and other fixed services remain in **Plan fees & shared costs** in the model view. No fictitious per-model price for included subscription usage is invented.
- OpenRouter hosted usage is billed by OpenRouter. BYOK metered usage is assigned to its upstream provider and platform fees to OpenRouter.
- Every month's categories add to both bounds of the same forecast result. Treemap tile areas are proportional to nonnegative twelve-month upper costs, including very small values; no minimum-area distortion is applied.

Group, provider and model identities retain their colors between views. Labels, inspectors and the data table provide alternatives to color. Month markers work with pointer selection, Tab, arrow keys, Home/End and Enter/Space. Treemap tiles support focus and selection. On narrow screens the timeline and exact-value table scroll within their own containers, while the treemap and header fit the page.

## Verification

64 automated tests pass. The analytics tests cover monthly/cumulative reconciliation in all three dimensions and both bases, annual and quarterly timing, month-end dates, tax, unknown allowances, combined cohorts, unused seats, shared model fees, GLM fallback, credit and bundle handling, BYOK fees, manual/technical/zero/invalid scenarios, treemap geometry, and translation round trips.

Browser checks covered EN→RU→EN, Russian persistence after reload, profile and recommendation flow, all three breakdowns, monthly and cumulative modes, both spending bases, USD/RUB, FX95→100→95, month pointer/keyboard inspection, treemap selection, exact-value table, and actual 354px and approximately 845px layouts. Small treemap labels were revised after the narrow-screen inspection. No JavaScript errors were observed in those checks. A color-vision simulation was not performed; identity is also expressed in text and the table.

JSON exports before/after a language switch were compared for exact equality. Exported HTML's embedded scenario matches its JSON; all inline scripts parse and there are no external script dependencies. The exported file was inspected structurally rather than reopening file://, which is unavailable under the browser policy. QA screenshots and downloaded drafts stay outside the published bundle.

Published draft preservation was verified by strict equality of JSON exports before and after the upgrade: all seven scenarios, settings and active view were unchanged. A saved GLM Team + Codex scenario was also inspected to verify the displayed uncertainty range.


## Palette and full reference localization · 18 October 2026

The UI and analytics use forest green (`#326451`) and slate blue (`#48647d`), with muted amber (`#996a2e`) as the only accent. Additional categories use darker/lighter shades of these families. Pale forest/slate surfaces and slate text support the hierarchy. Warnings and invalid states use amber shades with explicit labels; meaning does not rely on color alone. All chart tile fills have at least 4.71:1 contrast against white labels. User activity dots match the group chart colors.

`research-i18n.js` supplies complete text-fragment pairs and anchored message templates. Interpolated figures, dates, model names and saved user labels are preserved. Reference sections are no longer excluded from localization, and their `lang` attribute follows the toggle. A stale claim that all scenarios always share one profile was removed; the existing scenario-specific/shared-legacy behavior is unchanged. Prices, quota formulas, eligibility claims and source URLs retain the 17 October catalogue snapshot.

Four additional automated tests check rendered research coverage in both number locales, every automation path and route label, static and dynamic calculation notes, nested validation errors, preservation of interpolated amounts and migration names, and unchanged budget data. Browser checks verify the reference tabs, expanded provider notes, EN→RU→EN and reload persistence, localized CSV, chart colors and 390px layout without horizontal page overflow.
