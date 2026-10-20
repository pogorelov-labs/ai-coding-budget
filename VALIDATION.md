# Проверка 17.10.2026

- 19 математических тестов пройдены: независимые тарифные примеры, кеш, long context, московское расписание, GLM weekly/5h, прямой PAYG, DeepSeek peak/off-peak, фиксированные ручные ставки, комиссия OpenRouter, общий BYOK-порог и минимум, Startup expiry, annual/intro, bundles/остатки/Team sharing, API bonus linkage/caps, RUB/налог и валидация импорта.
- 24 проверки в Chromium пройдены: живое изменение курса, localStorage, годовой первый платёж, разовая скидка, ошибка суммы долей, сохранение объёма mix→explicit, выбор endpoint, неизвестная квота, покупка bundle, клонирование/удаление/отмена сценария, JSON roundtrip, CSV, все вкладки, импорт недопустимого JSON.
- Экспортированный из приложения HTML открыт отдельно с отключённой сетью: сценарии и параметры совпали.
- Скриншоты desktop 1440 px и mobile 390 px просмотрены. Нет горизонтального переполнения страницы; широкие таблицы имеют собственную прокрутку.
- Ошибок JavaScript при проверенных сценариях нет.
- Нагрузочных запросов к платным провайдерам не выполнялось. Проверка формул не подтверждает доступность конкретного аккаунта, промо, KYC, качество модели или SLA.

Локальные browser-артефакты находятся в игнорируемой папке `qa/`. Исходники тестов сохранены в `tests/engine.test.mjs` и `scripts/browser-qa.mjs`.

## Обновление: профиль команды

- Всего 28 расчётных тестов пройдены. Новые проверки: суммирование групп, связь количества/расхода, GLM без передачи квот между группами, эквивалентность отдельных позиций, неактивная пустая группа, отключение связи без потери суммарных токенов, миграция v1→v2 и валидация профиля.
- В браузере проверены: профиль 3/5/2; живой пересчёт 3→4 личных Pro ($240→$320); ручные 7 подписок ($560); отдельные weekly/5h для трёх групп; Lite для двух малоактивных ($36); группа 0 без расходов; сохранение после reload; импорт старого бюджета (6 оплаченных, 4 с расходом, $480 сохраняются); явное подключение профиля.
- Проверены адаптивная раскладка и границы контента на узком экране, недопустимых полей и JavaScript-ошибок в проверенных сценариях нет.
- HTML и JSON выгружены из интерфейса. В обоих сохранён одинаковый профиль v2 и сценарии; встроенный JavaScript проходит синтаксическую проверку. Повторное браузерное открытие через file:// не выполнено: браузерная политика запрещает этот протокол. Веб-превью нового профиля проверено; предыдущая автономная версия проверялась офлайн отдельно.

Дополнительно проверен перенос некорректного старого черновика (5 оплаченных, 10 активных): сохраняются три строки моделей и все прочие параметры, используется единое количество 5, отображается уведомление об исправлении. Проверено в браузере и отдельным тестом.

## Technical consumers update · 17.10.2026

- `node --test tests/engine.test.mjs`: 35/35 pass. Added independent technical calendar and token-volume cases, workers do not multiply quotas, 24/7 GLM/DeepSeek time pricing, v2→v3 unchanged forecast, zero-human automation, validation, Codex service PAYG with zero included allowance and exclusion of official Claude Code Action from API bonus.
- Manual math: 2 identities × (20M input + 1M output)/day × 30 days = 1200M / 60M. With 80% cached input: GLM API $849.60; OpenAI Sol API $1296; DeepSeek Flash 24/7 with 35/168 peak-hours $90.48. Native Codex at assumed $0.04/credit: 29400 credits = $1176 (not a quoted universal rate).
- CUA localhost UI: create technical group2, workers5; human count stays10; add direct API, choose DeepSeek Flash and observe $90.48. Add native Codex service account and observe full metered spend. Change to GLM Pro shared-bot scenario; source-linked restriction shown in line, summary and comparison. Automation guide renders all six options. Reload retains edited values. No browser console errors.
- Responsive QA: requested390px viewport produced actual354px content width; scrollWidth354 (no page overflow). Viewport restored. Default715px layout inspected visually.
- JSON and standalone HTML downloaded through UI; embedded v3 state equals JSON and reproduces forecasts; every inline script parses. Offline file navigation was not retried due the browser security limitation documented above. HTML verified structurally, existing webpreview verifies interactions.
- New identities default to0 on migration; existing public draft is not replaced with QA example. Source notes saved under research/technical-*. No API/provider calls, credentials or bot deployments were made.


## Гибрид 18 + 1 — 17.10.2026

- 38/38 engine tests pass. New checks: exact $311 / $410, first-month $2,852, year $3,732, same-token API $1,596.416; 4,120M/206M totals; GLM 5h/weekly windows; Lite shortfall at lower cache / higher flagship share.
- Preset settings are separate; adding/editing profile or FX preserves original forecasts; JSON snapshots round-trip and invalid local FX is rejected.
- Browser QA on localhost: add preset, switch monthly/annual, FX95→100→95, profile heavy3→4→3, comparison, persistence after reload, JSON export. No JS error logs.
- Responsive checked at 390×844: document width390 (no page overflow); tables scroll internally. Viewport reset afterwards.
- Existing published draft exported before deployment: three budgets $400 / $880 / $1,280.84. Backup remains in user Downloads; it is not included in deployment.
- Public prices read-only verified in Z.ai UI: annual Lite12.6/Pro56; monthly18/80. No purchases or inference calls.


## Team Standard18 + Business8 — 17.10.2026

41/41 engine tests passed, including exact annual/monthly totals, unknown Codex coverage range, total4120M/206M conserved across providers, subgroup active3+5, alternatives preserving mix/cache and combined Business200-seat boundary. GLM300seats valid, single seat invalid, mixed GLMtiers invalid. JSON profileShare bounds validated; old tests/budgets pass. Browser: create preset, toggle billing, double Codex allocation10→20 (increment doubles), restore10, create8-seat GLMalternative and verify928.952base; publication draft preserved separately. UI shows unconfirmed$.04/credit and no guaranteed token allowance.

### Guided UX revision, 17 October 2026

43 engine tests pass. New coverage verifies guided presets retain edited counts, tokens, calendars and currency, isolate their settings, preserve the 18+1 reference budget and handle dormant zero-user groups. Browser verification covers the three-step flow, annual/monthly editing, model-share validation, API addition/removal, live FX updates, import/export preservation of seven saved scenarios, and 390px responsive layouts. See `UX-REVISION.md`. Build now syntax-checks the entire inline JavaScript before producing its output.


### Profile recommendations · 18 October 2026

52/52 tests pass. Nine new tests verify dynamic recommendation ranking, identical-model API baselines, token conservation, annual cash, tax/cache/hour changes, GLM seat rules, fallback for exceeded quotas, Codex uncertainty, server-only cases and JSON compatibility. The standalone build syntax-checks successfully. Browser checks cover annual/monthly recommendations, Codex selection, applying to an empty scenario and saving an independent alternative with both scenarios retained. See `RECOMMENDATIONS.md` for scope, exact reference costs and responsive verification limits.


### Bilingual analytics · 18 October 2026

60 tests pass, including eight new analytics/localization cases. Monthly categories and cumulative totals reconcile in all dimensions and both cost bases. Browser verification covers EN/RU switching and persistence, profile/recommendation flow, chart controls, live FX, keyboard month inspection, treemap selection, monthly table, and narrow 354px layout. JSON and offline HTML preserve budget data. See `ANALYTICS-I18N.md`.


### Palette and complete reference localization · 18 October 2026

64/64 automated tests pass. Research rendering has no untranslated Russian fragments in EN, using either English or Russian number formatting. Every subscription/API automation condition and route name is covered. Dynamic notes preserve amounts, labels and eligibility caveats. Browser checks cover all reference tabs, expanded provider notes, language persistence after reload, English CSV export and 390px layout (page scroll width = viewport width). Chart tile white-text contrast is 4.71:1 or higher. Source prices and calculation engine are unchanged.


### Plans choice and wizard · 20 October 2026

72 tests pass. Eight added cases cover draft isolation, commit copying, technical schedules, provider/method transitions, missing inputs, model shares, custom rates, combined team seat minima, GLM tier separation, OpenRouter fees, quota fallback and the plan count limit.

Browser checks cover both entry routes, four manual stages, invalid model-share recovery, Back navigation, EN/RU draft retention, adding multiple plans, saving a recommended alternative, and restoring the original preview data. A draft exported before confirmation contained no new plan; original scenarios matched their pre-test copies, and the restored JSON matched exactly. No browser errors or warnings were captured. A 354px iframe viewport verified real responsive layout without horizontal overflow in the choice, usage and review screens; desktop checks used 1280px.

A temporary local performance probe measured initial Plans LCP at 84ms and CLS at 0 in one lab run. INP and field p75 were not measured. The probe and responsive harness are not shipped. Palette and calculation catalogue remain unchanged.


### Live totals, Budget overview and gateway tariffs · 20 October 2026

108 tests pass. New tests cover live changes to volume/cache/model, invalid input handling, uncertain quota ranges, shared team constraints, exact OpenRouter endpoint rates, cache-write unknowns, time/context/TTL overrides, mixed PAYG/BYOK account funding, legacy price preservation, native RUB conversion, VAT, Polza route/Flex pricing, VseGPT manual quotes and access eligibility, head/subaccount fees, 30-day renewals, duplicate access-group prevention, and analytics reconciliation.

Browser checks verified input focus while typing, clearing input without stale prices, monthly USD/RUB updates, native-RUB cost invariance when FX changes, independent scenario FX comparisons, collapsed Budget details, real OpenRouter route changes, VseGPT's manual-price guard, EN/RU and 354px layouts without horizontal page overflow. No provider inference or credential-bearing request was made. Public metadata and documentation were the research inputs; no throughput load test or KYC approval was performed.
