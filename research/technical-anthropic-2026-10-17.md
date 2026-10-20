# Anthropic: headless, API, OAuth и командный бот

Проверено **17.10.2026**: свежий fetch официальных страниц Anthropic; сайт проекта не изменялся. Exa sources_reviewed = **16** (четыре поиска × numResults4). Ниже различаются подтверждённые правила и архитектурные выводы. Нельзя переносить старое утверждение «Agent SDK всегда запрещён под подпиской» на текущие документы.

## 1. Режим запуска и источник оплаты

| Режим | Авторизация | Откуда расход | API bonus Max/Team |
|---|---|---|---|
| Личный interactive Claude Code | Собственная subscription OAuth | Лимиты Pro/Max/Team, затем отдельно включённые usage credits | Нет |
| Собственный `claude -p` без `--bare`, личная автоматизация | Subscription login или `CLAUDE_CODE_OAUTH_TOKEN` | Лимиты того же человека; не отдельный запас для headless | Нет |
| Собственный Agent SDK под Claude plan | Subscription credentials, обычное индивидуальное использование | Лимиты плана; факт такого режима прямо описан в FAQ | Нет |
| Собственный `claude -p` / Agent SDK с API key связанного Console org | Console API key | API usage, затем purchased balance/инвойс | Да, при выполнении eligibility |
| `claude -p --bare` | API key/`apiKeyHelper` либо credentials поддержанного cloud provider | API/cloud billing; subscription OAuth не читается | Да для подходящего собственного first-party API запуска |
| Официальный Claude Code GitHub Action | Subscription OAuth или API key / WIF | OAuth → подписка; API credentials → API billing | **Нет**, даже если внутри используется `-p` |
| Общий внутренний бот через Messages API/Agent SDK | Console service account key или WIF | API organization; workspace budgets | Да для eligible API/SDK; не для специального исключённого Code Action |

**Billing определяется credentials и продуктом, а не только наличием флага `-p`.** Свежий [FAQ monthly API credits](https://support.claude.com/en/articles/17154008-monthly-api-credits-for-max-and-team-plans) явно различает собственный headless SDK, interactive Code и GitHub Action/IDE/desktop. Последние три исключены из бонуса даже с `-p`.

Короткая цитата FAQ: “API credits cover `claude -p` and the Claude Agent SDK when you run them yourself with an API key”.

Max5x получает $100/month, Max20x $200; Team $20/Standard + $100/Premium, pooled cap $500/org/month. Claim после7дней, активный план, один план↔один Console org; остаток бонуса не переносится. Это **новый отдельный баланс**, а не увеличение лимита подписки и не разрешение общего OAuth-прокси. Общая [Platform-страница бонуса](https://platform.claude.com/docs/en/about-claude/api-credits-for-subscribers) сокращённо пишет Code=No; более конкретный FAQ раскрывает headless-исключение.

## 2. Подписочная автоматизация действительно документирована

[Authentication Claude Code](https://code.claude.com/docs/en/authentication) описывает `claude setup-token`: браузерный Anthropic flow выдаёт OAuth token на1год для CI/scripts; token выводится, автоматически не сохраняется. Используется `CLAUDE_CODE_OAUTH_TOKEN`, требуется Pro/Max/Team/Enterprise. Он делает model requests, но не устанавливает Remote Control и не получает claude.ai connectors; локальные MCP работают.

Цитата: “This token authenticates with your Claude subscription and requires a Pro, Max, Team, or Enterprise plan.”.

[Headless docs](https://code.claude.com/docs/en/headless) прямо описывают `claude -p` для scripts/CI. `--bare` **не читает OAuth/keychain**, поэтому требует API key/helper или провайдерские credentials. Bare рекомендован для scripted/SDK calls и заявлен будущим default для `-p`; **сейчас нельзя считать, что default уже изменён**. Без bare CLI загружает проектные hooks/MCP и конфигурацию даже без интерактивного trust-диалога. Для unattended jobs есть bounded permissions, `--max-turns`, `--max-budget-usd` и timeouts; это обычные средства контроля, не обход ограничений.

[Legal and compliance](https://code.claude.com/docs/en/legal-and-compliance) подтверждает обычное индивидуальное использование и Code, и SDK. Цитата: “Advertised usage limits for Pro and Max plans assume ordinary, individual usage of Claude Code and the Agent SDK.”.

В то же время developers, создающие собственные продукты/сервисы, должны использовать API credentials. Нельзя предлагать claude.ai login внутри собственного приложения, собирать/посредничать claude.ai credentials либо гонять запросы своих пользователей через Free/Pro/Max credentials. Отдельно разрешено размещать **неизменённый официальный Claude Code binary** с собственным Anthropic login каждого конечного пользователя; требуется Commercial Terms, нельзя убирать способы авторизации, перепродавать или оплачивать inference за чужих end users. Это узкое исключение для размещения CLI, не разрешение своего OAuth API gateway.

[Agent SDK quickstart](https://code.claude.com/docs/en/agent-sdk/quickstart) рекомендует API key/cloud credentials и отдельно запрещает third-party developers предлагать claude.ai login/лимиты в своём продукте без предварительного согласования. Это не противоречит личному SDK-режиму, описанному в FAQ.

[Consumer Terms](https://www.anthropic.com/legal/consumer-terms) запрещают sharing аккаунта и автоматический доступ **с оговоркой для API либо явно разрешённых случаев**. Цитата из исключения: “Except when you are accessing our Services via an Anthropic API Key or where we otherwise explicitly permit it”. Поэтому поддержанный `claude -p` нельзя объявлять запрещённым только на основании общего пункта об automation; но он не отменяет запрет совместного аккаунта.

## 3. Named human и service account — важная граница

[Team seat rules](https://support.claude.com/en/articles/12004354-purchase-and-manage-seats-on-team-plans): seat закреплён за одним named individual. Нельзя передавать login, направлять работу коллеги через чужой seat ради его остатка или ротировать seat между активными людьми.

Цитата: “Users can't route their work through another user's account to use that user's remaining usage.”.

При этом [Roles and permissions](https://support.claude.com/en/articles/9267276-roles-and-permissions) прямо разрешает **Primary Owner как service account**, и он занимает лицензию.

Цитата: “Your organization's Primary Owner can be a service account that isn't tied to an individual user.”.

**Неопределённость:** это исключение для Primary Owner существует, поэтому утверждение «никаких service accounts в Team» неверно. Но страница не говорит, что один такой account получает право обслуживать coding-запросы всех людей вместо их seats. Поддержка общего coding-bot seat и его границы в этих источниках не установлены. Для такого bespoke варианта нужно письменное уточнение Anthropic; до него не обещать покупателю единый shared subscription pool.

Для API неопределённости нет: [API Authentication](https://platform.claude.com/docs/en/manage-claude/authentication) рекомендует service account для общей/автоматической нагрузки. Personal key связан с человеком и перестаёт работать после удаления его доступа; service account key — с workload identity и её workspace permissions.

Цитата: “For shared or automated workloads (CI, production services), have an organization admin create a service account so the workload has its own identity.”.

[WIF](https://platform.claude.com/docs/en/manage-claude/workload-identity-federation) меняет доверенный OIDC JWT на короткоживущий API token service account. Поддержаны AWS/GCP и стандартные OIDC issuers, включая GitHub Actions/Kubernetes/Entra/Okta. Это способ API-аутентификации, не подписка и не новый бесплатный лимит. Для произвольного CLI-раннера интеграцию token delivery нужно проверить отдельно; native WIF inputs **явно** есть у официального GitHub Action.

## 4. GitHub-бот: официально поддержан, но привязка не исчезает

[GitHub Actions docs](https://code.claude.com/docs/en/github-actions) поддерживают OAuth Pro/Max/Team/Enterprise, API key и WIF. OAuth runs расходуют subscription; API runs оплачиваются API, плюс отдельные GitHub runner minutes.

Для общей организации docs рекомендуют API key вместо person-bound OAuth; WIF позволяет не хранить долгоживущий secret. Цитата: “For a secret shared across repositories, authenticate with an API key from the Claude Console rather than an OAuth token”.

**Вывод:** нельзя утверждать, что любой subscription-backed GitHub bot запрещён — он документирован. Но техническая поддержка OAuth в Action не превращает один seat в общий запас нескольких разработчиков. Для личного repo workflow это документированный вариант; для общего company bot API service account имеет наиболее ясные условия, жизненный цикл и учёт. Бонус Max/Team официальному Code Action не применяется — это отдельное исключение из «SDK покрывается».

## 5. Concurrency: что подтверждено

[Cloud Code docs](https://code.claude.com/docs/en/claude-code-on-the-web) разрешают параллельные сессии, но они делят лимиты аккаунта. Цитата: “Running multiple tasks in parallel consumes more rate limits proportionately.”. Фиксированное гарантированное число одновременных личных headless runs в проверенных страницах не опубликовано. Несколько CLI-процессов не создают независимые allowances.

[API rate limits](https://platform.claude.com/docs/en/api/rate-limits) задаются на организацию, не на ключ; workspace limits могут снижать их. Текущие Sonnet5.5/Opus5.5:

| Tier | RPM | ITPM | OTPM | Monthly spend cap |
|---|---:|---:|---:|---:|
| Start | 1000 | 2,000,000 | 400,000 | $500 |
| Build | 5000 | 5,000,000 | 1,000,000 | $1000 |
| Scale | 10000 | 10,000,000 | 2,000,000 | $200,000 |

Новые организации могут начать в **Evaluation** ниже опубликованного Start. Для этих моделей cache reads не расходуют ITPM, cache writes/uncached расходуют; OTPM включает фактический output. Есть burst/acceleration limits; Fast имеет отдельные limits. Это ceilings, не гарантия. Цитата: “All limits described here represent maximum allowed usage, not guaranteed minimums.”.

Количество одновременно обслуживаемых разработчиков зависит от turns/min, prompt misses, output и latency; нужны фактический tier и нагрузочное измерение. Разделение workload на service account keys полезно для доступа/аудита, не увеличивает org limits. Использовать очередь, ограниченный worker pool и штатный retry-after/backoff; не ротацию аккаунтов ради лимитов.

## Варианты для решения

1. **Каждому человеку собственный Pro/Max/Team seat + личный headless.** Фиксированная подписка, удобно для собственных задач; shared quota с чатом/Code, неизвестный абсолютный запас и person-bound OAuth.
2. **Общий bot/CI через API service account + Agent SDK/свой headless.** Прозрачные токенные ставки, workspace budgets, официальный общий workload identity; variable bill и org rate/spend caps. Monthly bonus может покрывать eligible собственные API/SDK runs.
3. **Официальный GitHub Action с API key/WIF.** Готовые repo workflows и controls; переменный API bill + runner minutes, бонус на Code Action не рассчитывать.
4. **Гибрид:** seats для людей, отдельный API service account для автоматизации; Team bonus pooled в одном связанном org. Это не суммирование включённых seat allowances.

Неразрешённое: точная допустимая нагрузка service-account Primary Owner на Code, гарантированная concurrency подписки, индивидуальные исключения контрактов. Для продаваемого third-party продукта нужен отдельный разбор условий; текущая заметка не превращает внутреннюю автоматизацию в право перепродажи.
