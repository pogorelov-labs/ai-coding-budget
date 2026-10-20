# OpenRouter: технические потребители, ключи, BYOK и concurrency

Проверено **17.10.2026**. Только официальные документы OpenRouter; платные вызовы, создание ключей и изменения сайта не выполнялись. Результат: bounded research complete, с явно отмеченными неизвестными. Exa `sources_reviewed = sum(numResults) = 30` для шести успешных поисков; это объём поисковой выдачи, не количество независимых подтверждений. Первые три вызова были отклонены схемой до выполнения поиска и не включены. Часть полных Markdown-страниц сохранена в `/tmp/technical-openrouter-raw.json`.

## 1. Серверы, CI и агенты поддерживаются как технические потребители

**Подтверждено.** Каждый inference API key относится к workspace. Участник создаёт собственные ключи в доступных ему workspace; администратор организации может создавать **workspace-owned/system keys**, не принадлежащие человеку. Общий billing остаётся на уровне аккаунта. Это штатная модель для команд и разных окружений. Отдельной числовой квоты concurrency у такого ключа документы не обещают. [Workspaces](https://openrouter.ai/docs/guides/features/workspaces)

| Потребитель/ключ | Подтверждённая роль | Особенность |
|---|---|---|
| Member-owned inference key | Персональная атрибуция запросов в org/workspace | Расход относится к создателю, а не фактическому держателю ключа |
| Workspace-owned/system key | Агенты, CI jobs, service accounts | Нет `creator_user_id`; member guardrail к нему не применяется |
| Management API key | Provisioning, rotation, управление keys/workspaces/budgets | Не используется для completions; в org создаёт org admin; полномочия на уровне аккаунта |
| Federated access token | Серверный workload без долгоживущего OpenRouter secret в среде | Business/Enterprise; права и атрибуция целевого ключа |

System key создаётся через Owner=Workspace либо `POST /api/v1/keys` с `workspace_id` и без `creator_user_id`. Самостоятельного дополнительного service-account продукта для этого не требуется. Ключ, созданный человеком и затем переданный серверу, продолжит расходовать бюджет создателя. Для отдельного учёта пользователей каждому нужен свой ключ; общий system key подходит для учёта сервиса. [Capping Shared Agent Keys](https://openrouter.ai/docs/guides/best-practices/capping-shared-agent-keys), [Create API key](https://openrouter.ai/docs/api/api-reference/api-keys/create-keys)

Management key позволяет автоматически создавать, отключать и менять inference keys; его нельзя выдавать обычному coding agent как рабочий inference credential. Он действует по всем workspace аккаунта. [Management API Keys](https://openrouter.ai/docs/guides/overview/auth/management-api-keys)

**Keyless вариант:** Workload Identity Federation обменивает JWT от IdP на OpenRouter access token сроком не более 15 минут и не дольше исходного JWT. Политика указывает workspace key либо management key организации; personal keys не подходят. Целевой тип определяет `inference` или `management` scope. Пауза federation policy останавливает новые обмены, но ранее выданный токен живёт до expiry; для немедленного отключения надо отключить целевой ключ. Доступность: Business и Enterprise. [Workload Identity Federation](https://openrouter.ai/docs/guides/overview/auth/workload-identity-federation)

## 2. Бюджет ключа — не rate limit

**Подтверждено.** `limit`, `limit_reset`, `include_byok_in_limit` ограничивают деньги, а не RPM/TPM/concurrency. Per-key cap и BYOK toggle доступны на всех планах. По умолчанию BYOK inference не учитывается; для него нужен `include_byok_in_limit=true`. Для system keys подходят прямой key guardrail, default workspace guardrail, собственный key limit и общий workspace budget; member budget не подходит. [Capping Shared Agent Keys](https://openrouter.ai/docs/guides/best-practices/capping-shared-agent-keys)

**Общий pooled budget workspace — Enterprise.** Возможны daily/weekly/monthly/lifetime; дневной reset в 00:00 UTC, недельный — понедельник 00:00 UTC, месячный — первое число. При нескольких интервалах лимиты должны строго уменьшаться от длинного окна к короткому. Администратор управляет бюджетами; остальные участники могут смотреть расход. Включение BYOK для workspace — отдельный флаг `include_byok_in_budgets`; настройка key не включает workspace автоматически. В BYOK учитывается эквивалентный расход по ставкам OpenRouter, а не гарантированно фактический счёт провайдера с его скидками. [Workspace Budgets](https://openrouter.ai/docs/guides/features/workspaces/workspace-budgets)

Guardrails дополнительно ограничивают модели, провайдеров и data policies. Их бюджеты действуют независимо: более строгий cap продолжает блокировать запрос. Создать guardrail недостаточно — его надо назначить, либо настроить default workspace guardrail. [Guardrails](https://openrouter.ai/docs/guides/features/guardrails)

**Документальный конфликт:** [Spend Controls](https://openrouter.ai/docs/guides/best-practices/spend-controls) описывает workspace-first, а актуальный [Limits](https://openrouter.ai/docs/api_reference/limits) — guardrails → workspace → own key limit. Действие всех caps подтверждено; точный приоритет одновременно исчерпанных caps нельзя обещать без проверки. Клиент должен читать `error.metadata.limit_source`, а не угадывать причину по HTTP-коду. Точная гарантия отсутствия overshoot при одновременных запросах не установлена.

## 3. Можно ли отдать в BYOK именно подписку ChatGPT / Claude / GLM?

**Задокументированный путь:** BYOK принимает upstream provider API credential; провайдерские rate limits и расходы остаются связанными с соответствующим provider account. BYOK не описан как перенос подписочных seats/allowance в общий пул OpenRouter. Provider credential API содержит провайдеров `openai`, `anthropic`, `z-ai`, но наличие провайдера не подтверждает поддержку каждого его продукта или специального ключа. [BYOK](https://openrouter.ai/docs/guides/overview/auth/byok), [Create BYOK provider credential](https://openrouter.ai/docs/api/api-reference/byok/create-a-byok-provider-credential)

| Исходный ресурс | Что подтверждено документами OpenRouter |
|---|---|
| OpenAI/Anthropic/Z.ai стандартный API credential | BYOK-механизм и соответствующие provider slugs подтверждены |
| Подписка ChatGPT/Codex с входом через пользовательскую сессию | Поддержка как BYOK credential не найдена |
| Подписка Claude Pro/Max/Team, cached login/OAuth session | Поддержка как BYOK credential не найдена |
| GLM Coding Plan personal/team key | Поддержка специального coding-plan key/endpoint через BYOK не найдена; не приравнивать к стандартному Z.ai API key |

Это **ограниченный отрицательный результат**, не доказательство технического отказа и не анализ правил внешних провайдеров. В архитектуре и калькуляторе нельзя считать эти подписки подтверждённым источником BYOK inference. Для положительного обещания нужны provider-specific support и условия соответствующего подписочного продукта.

OpenRouter integration для Claude Code использует **OpenRouter API key** и `ANTHROPIC_BASE_URL=https://openrouter.ai/api`. Документ отдельно требует очистить старый cached Anthropic login при конфликте; GitHub Action тоже получает OpenRouter secret. Значит, «Claude Code умеет работать через OpenRouter» не означает «Claude subscription оплачивает OpenRouter». [Claude Code integration](https://openrouter.ai/docs/cookbook/coding-agents/claude-code-integration)

OpenRouter OAuth PKCE выдаёт приложению OpenRouter API key. Это не OAuth-подключение подписки другого поставщика. [OAuth](https://openrouter.ai/docs/guides/overview/auth/oauth)

## 4. Что ограничивает параллельную работу

**Подтверждено.** У paid models нет общего platform request cap, но остаются upstream capacity/rate limits и DDoS protection. Дополнительные OpenRouter keys/accounts не увеличивают глобальную capacity. Введён **in-flight spending budget** для части prepaid accounts: оценивается input + разрешённый `max_tokens`, средства удерживаются на running и недавно завершённых запросах. Поэтому возможен `402` при положительном балансе. Размер — доля баланса с потолком; конкретные fraction/threshold/ceiling/settlement window не опубликованы. Механизм касается части низкобалансовых/new accounts при rollout; не применяется к free requests, полностью BYOK без paid plugins, enterprise/paid-subscription/invoice-billed accounts. Не следует автоматически отождествлять эти категории с каждым Business account. [Limits](https://openrouter.ai/docs/api_reference/limits)

| Ситуация | Реакция клиента |
|---|---|
| `429` / временная перегрузка | Backoff; учитывать `Retry-After` |
| `402`, `limit_source=openrouter_in_flight_budget` | Явно повторить после `Retry-After`; SDK не делает такой retry автоматически |
| `402`, single request exceeds budget / нет средств | Уменьшить запрос/`max_tokens` либо пополнить баланс; бесконечный retry не поможет |
| Budget cap exhausted | Проверить budget metadata/reset; не повторять немедленно |
| Ошибка после начала stream | Проверить SSE error: HTTP уже может быть200; прозрачный failover после частичного вывода невозможен |

[Errors and debugging](https://openrouter.ai/docs/api_reference/errors-and-debugging)

BYOK может пробовать несколько matching keys по priority order, затем shared OpenRouter capacity. Shared fallback тратит OpenRouter credits. Для исключительно собственного счёта нужно выключить shared capacity для нужных моделей/провайдера и ограничить остальные провайдеры. Filters позволяют раздать provider credentials конкретным моделям, OR keys и members. Несколько ключей не доказывают наличие нескольких независимых провайдерских квот. [BYOK](https://openrouter.ai/docs/guides/overview/auth/byok)

На стороне поставщика capacity может отдельно задаваться как request/token rates и **concurrency**; отсутствие поля означает undeclared capacity, а не нулевой или бесконечный лимит. OpenRouter рекомендует provider backend возвращать early429 под перегрузкой, а не копить очередь. Это указание поставщикам, не SLA клиентам и не обещание встроенной очереди команды. [Provider Integration](https://openrouter.ai/docs/guides/providers/integration)

Routing умеет fallback и предпочтения latency/throughput. `preferred_min_throughput`/`preferred_max_latency` прямо не гарантируют соответствующее качество обслуживания. Фиксация узкого provider/region набора уменьшает варианты fallback. [Provider Routing](https://openrouter.ai/docs/guides/routing/provider-selection)

## 5. Архитектурный вывод и неизвестные

**Инженерная рекомендация, не заявленная функция OpenRouter:** разные member keys для разработчиков; system key на каждый CI/agent service; общая org/workspace политика. Для server workloads поставить ограниченную очередь, per-provider/model semaphore, deadline/cancellation, backoff с jitter и retry budget. Контролировать p95 TTFT/latency, RPM/TPM, in-flight,429/402/403 и стоимость. Не выполнять заново побочные tool actions только потому, что потребовался повтор LLM-запроса.

Число разработчиков само по себе не определяет нагрузку. Планировать по количеству одновременно активных агентов, частоте вызовов, длине input/output, времени stream и конкретному provider route. «Один ключ обслуживает10/20 разработчиков» технически допустимая схема API, но опубликованной гарантии concurrency для такого числа нет; общий key ухудшает атрибуцию и per-person budgets.

Не установлены: числовая guaranteed concurrency/RPM/TPM для платного account+endpoint; параметры in-flight бюджета; customer-managed server queue API с гарантированной ёмкостью/SLA; точное поведение budget overshoot; entitlement system keys вне явно описанной организации; поддержка подписочных credentials. Для production capacity нужен согласованный endpoint/contract либо измерение разрешённой репрезентативной нагрузки. Исследование такую нагрузку не генерировало.
