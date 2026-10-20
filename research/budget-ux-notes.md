# Budget simplification · 20 October 2026

## Implementation

The Budget page leads with monthly cost and 12-month payments, both in USD and RUB. The first-month payment stays visible below them so annual prepayments are not hidden. Both headline values use the existing forecast engine; the annual value remains cash payments, not monthly cost multiplied by 12.

Saved scenarios now appear directly below the summary, with aligned monthly and 12-month columns, the current scenario highlighted, and an Open budget action for each alternative. Each scenario retains its own exchange rate, schedule and workload. No cheapest label or savings claim is attached to potentially different workloads. Invalid inputs, uncovered usage, uncertain quotas, questionable server-account routes and allocation gaps are surfaced in comparison status labels. An empty scenario is never displayed as a free option.

Plan breakdown, charts and calculation assumptions are separate native disclosures, closed initially. Existing disclosure-state behavior and all budget data are preserved. Critical notices remain outside disclosures, including errors or uncovered workload in a future forecast month. Currency editing is available within calculation assumptions; the duplicate top-level currency field has been removed.

`src/budget-ui.css` must be appended after the existing stylesheet in the standalone build. It uses only existing forest, slate and neutral tokens; warnings retain the existing amber treatment. No dependencies or persistence fields were added.

## Design choices

Three directions considered: an executive summary with an inline comparison table; an analytics-first dashboard with filters; a comparison drawer requiring an extra action. Choose the executive summary because the user explicitly wants totals first and easier comparison. The table keeps both time horizons aligned on desktop and places them side by side within each scenario on small screens. Native disclosures keep the advanced tools reachable without competing with the totals.

Typography, palette and focus styles are inherited. No motion is introduced. The comparison action and disclosure targets have at least 44 px height. The visible Current marker and text statuses make selection and uncertainty independent of color.

## Localization additions

Add these exact entries to the EN/RU dictionary. `Monthly total` already exists.

```text
Annual plans averaged monthly.|Годовые планы усреднены по месяцам.
12-month forecast|Прогноз на 12 месяцев
Cash payments at current rates.|Платежи по текущим тарифам.
Your budget|Ваш бюджет
Monthly cost and the year ahead.|Расходы за месяц и прогноз на год.
Plan breakdown|Расходы по планам
Charts & spending|Графики и структура расходов
Edit team|Изменить команду
Compare setups|Сравнение вариантов
Save another scenario to compare costs here.|Сохраните ещё один сценарий, чтобы сравнить расходы здесь.
Duplicate scenario|Создать копию
Saved scenarios|Сохранённые сценарии
Each scenario uses its own workload, dates and exchange rate.|Для каждого сценария используются его нагрузка, даты и валютный курс.
Setup|Вариант
Review account rules|Проверьте правила аккаунта
Review allocation|Проверьте распределение
Current|Текущий
Monthly costs and forecast payments, side by side.|Сравнение месячных расходов и прогнозируемых платежей.
A quota is exceeded without paid fallback. Add coverage before relying on this total.|Квота превышена, а платный резерв не задан. Добавьте покрытие, прежде чем использовать эту сумму.
Subscription token allowances are unknown. The upper estimate prices the entered workload as overage; it is not a spending cap.|Токенные квоты подписок неизвестны. Верхняя оценка считает указанную нагрузку как доплату сверх квоты; это не лимит расходов.
```

## Verification

- Existing automated suite: 72 tests pass.
- Temporary Node VM presentation checks passed for headline order, default disclosures, independent scenario FX, user-name escaping, navigation targets, empty states, future-month errors and future quota gaps.
- Root agent owns the integrated build, final browser review, EN/RU verification and deployment.
- Required browser cases: desktop and narrow comparison layout; valid, invalid and uncertain totals; disclosures; editing the exchange rate inside assumptions; opening and duplicating scenarios; chart controls within the disclosure.
- INP and field p75 are unmeasured. No browser or performance claims are made by this implementation subtask.
