# Running estimate · 20 October 2026

The manual wizard now has a monthly estimate in its existing sticky footer. The primary value is the draft plan; when saved lines exist, a secondary value shows the full setup with this draft included. Both use USD and RUB at the current scenario's rate.

The estimate starts when the user first reaches Plan, where the current default selection is visible. It is absent on the initial People step and stays visible when returning to People after choosing a plan. This visibility flag belongs to the temporary draft and never enters a saved budget.

`runningPlanCost` validates complete draft fields, then uses the existing candidate scenario and preview calculations. Fees, tax, shared account rules, credits and subscription billing remain engine responsibilities. Missing shares or rates, invalid quantities and combined team errors suppress both prices rather than displaying zero. Unknown allowances retain ranges; uncovered usage and unsuitable account routes remain visible warnings.

Number and text inputs update only the footer's estimate region, preserving the active field and caret. Structural selections rebuild the existing wizard as before. The footer's native buttons and earlier selection summaries are unchanged.

Desktop places cost beside navigation; narrow screens put it above Back/Continue. Colors and typography reuse the existing palette, with amber warnings and a polite live region. Short viewports disable sticky positioning to avoid covering the form.

## Build integration

- Include `running-cost.js` after `plan-builder.js`, before `plans-ui.js`.
- Append `running-cost.css` after existing styles.
- All module imports are single-line for the standalone bundler.

## New EN/RU dictionary entries

```text
Draft plan / month|Добавляемый план / месяц
Setup with this plan / month|С этим планом / месяц
Complete plan details|Заполните параметры плана
Not all usage is covered. Add fallback or change plans.|Не вся нагрузка покрыта. Добавьте резерв или измените планы.
Review account rules before using this route.|Проверьте правила аккаунта для этого способа подключения.
Upfront billing, shown per month.|Оплата вперёд, сумма в пересчёте на месяц.
```

Existing dictionary entry reused: `Included quota is unknown; this is a cost range.`

## Verification

New tests cover changing volume, model and cache; annual equivalent and tax; incomplete fields; unknown quota ranges; uncovered work and fallback; combined team minima/tier conflicts; existing setup costs, funding fees and tax. Saved scenarios are checked for mutation.

Root owns integrated build, browser QA and deployment. Browser cases: type and clear usage values without losing focus, change model/provider/billing, backtrack to People, change manual quantity, check custom rates and shares, verify USD/RUB and unknown ranges, and inspect narrow/short viewports. No browser performance or accessibility certification is claimed here.
