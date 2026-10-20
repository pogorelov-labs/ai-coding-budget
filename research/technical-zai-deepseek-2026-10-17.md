# Z.ai / DeepSeek: серверные агенты, ключи и границы использования

Проверено 17.10.2026. Ограниченное исследование для архитектуры и калькулятора; сайт не менялся, аккаунты не открывались, платных вызовов не было. Использованы текущие официальные международные страницы. Exa search: 4 запроса, `sources_reviewed = 6 + 6 + 5 + 5 = 22` (число запрошенных результатов, не число независимо подтверждающих источников). Значимые страницы прочитаны через fetch; квоты personal дополнительно сверены с официальным Markdown, полученным 17.10.2026.

## Решение для проектирования

| Сценарий | Подтверждённая граница |
|---|---|
| Разработчик использует свой Coding Plan Key в поддерживаемом coding tool, в том числе его subagents | Поддержано в пределах персональной/seat-квоты и динамических concurrency limits. [Usage Policy](https://docs.z.ai/devpack/usage-policy), [Team FAQ](https://docs.z.ai/devpack/teamplan) |
| Личный OpenClaw с daemon и bot channel | Официально документировано, включая ключи personal и Team. Best effort, ниже coding agents по приоритету. [OpenClaw](https://docs.z.ai/devpack/tool/openclaw) |
| Свой Python/Node SDK-бот, backend, SaaS, серверный агент на Coding Plan Key | Условия прямо исключают такой general-purpose API use вне поддерживаемых tools; исключение — отдельное письменное соглашение с Z.ai. [Subscription Terms §4.2](https://docs.z.ai/legal-agreement/subscription-terms) |
| Один personal account / один Team seat / его key обслуживает всю команду | Sharing запрещён; Team — один member на одно seat. [Subscription Terms §4.3](https://docs.z.ai/legal-agreement/subscription-terms), [Team Seat Rules](https://docs.z.ai/devpack/teamplan) |
| Собственная командная система через DeepSeek PAYG API | Open Platform явно предназначена для разработчиков, включая enterprise, и downstream-систем для внутренних и внешних пользователей. Секретный API key не раздаётся пользователям. [Open Platform Terms, вводная, §§1.1, 2.2](https://cdn.deepseek.com/policies/en-US/deepseek-open-platform-terms-of-service.html) |

Headless — не самостоятельный критерий разрешения. Поддерживаемый продукт может работать daemon; наличие API-совместимого endpoint не разрешает произвольную автоматизацию. Пример OpenClaw не даёт разрешения превратить одно место в общий бот для сотрудников.

## Z.ai: что именно установлено

### Условия важнее протокола

[Subscription Terms §4](https://docs.z.ai/legal-agreement/subscription-terms) ограничивает quota официально поддерживаемыми инструментами. SDK-based access и сторонние неподдерживаемые интеграции приведены среди оснований ограничения benefits. Для собственных apps/bots/websites/SaaS и других систем, вызывающих модель напрямую, требуется отдельное письменное соглашение. Запрещены resale, repackaging, aggregation/proxy и предоставление Coding Plan третьим лицам, включая бесплатное. Personal license связана с конкретным физическим лицом; запрещены sharing и автоматизация от имени других пользователей. Это относится к доступу/квоте, а не означает запрет обычной профессиональной работы разработчика над кодом компании.

Team имеет собственные [Account Usage Rules](https://docs.z.ai/devpack/teamplan), которые явно отсылают к Subscription Terms и также ограничивают использование поддерживаемыми инструментами. Поэтому Team subscription или включение overage сами по себе не превращают план в универсальный серверный API.

[Список supported tools](https://docs.z.ai/devpack/tool/others) включает Claude Code, Codex, OpenCode, Pi, Cursor, Cline, TRAE, Qoder, Droid, Kilo Code, Roo Code, Crush, Goose, Eigent, ZCode; отдельно — AutoClaw, OpenClaw, Hermes Agent, SillyTavern. General-purpose agents обслуживаются best effort. Следовательно, формулировка «только редакторы/только coding» чрезмерно узкая, а «любая OpenAI-compatible программа подходит» чрезмерно широкая.

В [официальном OpenClaw guide](https://docs.z.ai/devpack/tool/openclaw) присутствуют `openclaw onboard --install-daemon`, gateway и подключение bot channels; показан выбор Coding-Plan-Global и получение personal/Team key. Coding agents имеют преимущество при планировании, OpenClaw может получать очередь и ограничения при нагрузке. Это прямое подтверждение daemon-сценария данного поддерживаемого продукта. Для произвольного собственного headless worker такого разрешения нет.

### Ключ, billing identity и seat

[API Key Management Guide от 16.10.2026](https://docs.z.ai/devpack/notice/api-key-management): новые Standard API Keys оплачиваются балансом/API bundles; Personal Coding Plan Keys — personal quota; Team Plan Keys — назначенным Team seat. Для новых ключей billing определяет тип ключа на поддерживаемых endpoints; смена URL не меняет тип оплаты. Для старых Compatible keys сохраняется зависимость от endpoint/history. Это руководство о классификации и оплате, а не отмена ограничений сценариев. Standard API Key — правильный отдельный тип ключа для PAYG; истёкший plan key не превращается в PAYG автоматически.

[Team Seat Rules и FAQ](https://docs.z.ai/devpack/teamplan): минимум два места; соответствие member:seat = 1:1; после приглашения и назначения места member получает собственный Team Plan Key; в одной Team у одного member может быть только одно активное место. Администратор без места quota не получает. Quota учитывается раздельно по seat; персональный и Team планы могут сосуществовать. Официальная модель — named member, не shared machine seat. Возможность нескольких ключей на seat и formal service-account role в изученных публичных страницах не установлена.

### Concurrency и quota не равны

[Personal Usage Policy](https://docs.z.ai/devpack/usage-policy): concurrency динамическая, зависит от ресурсов и tier, Max > Pro > Lite; subagents с параллельными вызовами прямо допускаются. Рекомендации: Lite — один проект, Pro — 1–2, Max — 2+ одновременно. Это число проектов, не гарантированные concurrent HTTP requests. Off-peak concurrency может динамически увеличиваться.

[Team concurrency FAQ](https://docs.z.ai/devpack/teamplan): Standard — рекомендуется 1–2 concurrent development projects, Premium — 2+; внутри проекта допустимы subagents. Числа RPM/TPM или фиксированных concurrent requests/seat не опубликованы на этих страницах. Abnormally high-frequency calls могут вызвать risk controls. Из количества seats нельзя вывести точный RPS/SLA.

| План | Credits / rolling 5h | Credits / 7-day period |
|---|---:|---:|
| Personal Lite | 2 000 | 10 000 |
| Personal Pro | 12 000 | 60 000 |
| Personal Max | 28 000 | 140 000 |
| Team Standard, на seat | 15 000 | 66 000 |
| Team Premium, на seat | 35 000 | 155 000 |

[Personal quotas](https://docs.z.ai/devpack/overview), [Team quotas](https://docs.z.ai/devpack/teamplan): 5h восстановление через пять часов после расходования, weekly reset каждые семь дней с активации. Все поддерживаемые tools расходуют общую quota подписки ([FAQ](https://docs.z.ai/devpack/faq)); дополнительные tools/ключи не обосновывают новые quota pools. Personal quota исчерпана — ожидание восстановления; Team может заранее включить платный overage с member spend limits. Overage — продолжение разрешённого использования, не отдельное разрешение любого backend use.

### Неопределённости и противоречия документации

- Нет прямого публичного разрешения любого remote/cloud CI runner даже при запуске поддерживаемого CLI. Документированный daemon OpenClaw подтверждает этот конкретный продукт и личный сценарий; shared CI/service identity, batch на пользу других лиц и длительная unattended production-нагрузка требуют отдельного уточнения условий.
- Не установлены фиксированные per-key/per-seat concurrency цифры, максимум одновременных машин/IP, порог high-frequency risk control или гарантия доступности при запасе credits.
- [FAQ](https://docs.z.ai/devpack/faq) ещё содержит общее утверждение об отсутствии API calls outside plan для подписчиков. Более новый [key guide 16.10](https://docs.z.ai/devpack/notice/api-key-management) прямо описывает создание отдельного Standard key и PAYG. Последний применим к billing; ограничения Coding Plan use остаются в Terms и Team rules.
- Формулировка примера OpenAI-compatible configuration в [tool guide](https://docs.z.ai/devpack/tool/others) не отменяет whitelist в начале той же страницы. OpenClaw guide содержит старые model-name примеры, поэтому они не использованы как актуальные модельные тарифы.

## DeepSeek: машинные вызовы и ограничения

[Open Platform Terms](https://cdn.deepseek.com/policies/en-US/deepseek-open-platform-terms-of-service.html), выпущены 22.04.2026, действуют с 29.04.2026: enterprise developer и внутренние/внешние downstream users прямо предусмотрены. §2.2 требует хранить API key в тайне, не делиться им с другими и не размещать его в client-side коде. Это различает доступ пользователей к приложению и передачу самого credential. Архитектурный вывод: серверный broker/gateway с собственными пользовательскими identities соответствует назначению API; раздача одного vendor key всем сотрудникам не подтверждается этими условиями.

Общие [Terms of Use, Account §§2.2–2.3](https://cdn.deepseek.com/policies/en-US/deepseek-terms-of-use.html) запрещают передачу/одалживание аккаунта другим; специальные API Terms явно допускают действия enterprise developer и имеют приоритет при конфликте. Формальная отдельная сущность «service account», org RBAC, lifecycle machine identities, scopes отдельных keys и разрешение совместно использовать login владельца в изученных международных публичных документах не найдены. Нельзя утверждать наличие этих функций или отсутствие KYC по этому поиску. Не переносить возможности китайского enterprise-account flow из архивных zh-CN документов на международный интерфейс.

[Rate Limit & Isolation](https://api-docs.deepseek.com/quick_start/rate_limit): Pro — 500, Flash — 2500 in-flight requests на account; key не создаёт отдельный pool. Request занимает slot от отправки до завершения ответа, включая streaming. Превышение даёт HTTP 429; увеличение capacity рассматривается по запросу без отдельной платы. Поддерживается `user_id` для safety/cache/scheduling isolation: у обычного API account все значения суммируются при проверке concurrency. У расширенной capacity могут существовать и общий account limit, и лимиты каждого `user_id`. `user_id` — метка конечного пользователя, не новая machine credential/квота; её формат `[a-zA-Z0-9_-]+`, до 512 символов, без private data. Документация не задаёт фиксированную RPM/TPM-таблицу.

[Текущий quick start](https://api-docs.deepseek.com/) уже рекомендует `deepseek-flash`, обслуживаемый DeepSeek-V4.1-Flash-1017; старые `deepseek-v4-flash` и `deepseek-v4-flash-vision-exp` остаются aliases, прежние модели retired. Rate-limit страница ещё перечисляет старые названия с 2500. Поэтому не считать Flash alias/vision-exp отдельным дополнительным 2500-pool. Сохранность общей Flash capacity 2500 следует из rate page + alias mapping; точные детали совместного счётчика aliases отдельно не объяснены.

Практический расчёт для 10 разработчиков — инженерная оценка: при 10 параллельных запросах на человека получится 100 активных requests, ниже опубликованных 500 Pro/2500 Flash. Это проверка лимита, не нагрузочный тест или гарантия latency. Нужны очередь, общий account-level limiter и retries с backoff; новый key и `user_id` лимит не умножают. После десяти минут ожидания без старта inference соединение закрывается; keep-alive/пустые строки не означают готовый ответ ([Rate Limit & Isolation](https://api-docs.deepseek.com/quick_start/rate_limit)).

## Закрытый и открытый вопрос

Закрыто: Coding Plan нельзя моделировать как универсальный shared server API; персональные supported tools/subagents допустимы в рамках именованного пользователя, а OpenClaw daemon — явно поддержанный частный случай. DeepSeek API предназначен для собственной серверной интеграции и публикует account-level concurrency.

Открыто: договорное разрешение конкретного unattended CI/workflow на Z.ai Coding Plan, formal service-account lifecycle и точные machine/key limits. Их могло бы закрыть письменное разъяснение Z.ai/DeepSeek для конкретной архитектуры или authenticated enterprise-console документация. Никаких обращений провайдерам в рамках исследования не отправлялось.
