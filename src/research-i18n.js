// Research translations preserve the catalogue snapshot, quantities and eligibility caveats.
const RESEARCH_ENTRIES = [
  ["Research notes and account eligibility", "Исследование и условия аккаунтов"],
  ["Worked calculations and scenarios", "Расчёты и сценарии"],
  [
    "Checked 17 October 2026",
    "Проверено 17 октября 2026"
  ],
  [
    "How to connect server agents",
    "Как подключить серверных агентов"
  ],
  [
    "Run mode, identity and billing are three separate choices. Headless does not mean API billing, and an API-compatible URL does not mean that a subscription permits any bot.",
    "Режим запуска, identity и способ оплаты — три разных решения. Headless не означает API-billing, а API-совместимый URL не означает, что подписка разрешает любой бот."
  ],
  [
    "Back to team profile",
    "К профилю"
  ],
  [
    "A practical setup for a team of 10 developers",
    "Практический вариант для команды из 10 разработчиков"
  ],
  [
    "Named subscriptions for people. Shared CI, overnight reviews and bots use separate API service accounts or system keys, with budgets and a queue. Personal headless work can use the owner’s subscription where product terms allow it; usage shares the owner’s interactive allowance.",
    "Именные подписки — для людей. Общие CI, ночные проверки и боты — отдельные API service accounts / system keys с бюджетами и очередью. Личный headless можно оставить на подписке владельца, если это допускают правила продукта; расход объединяется с его интерактивной работой."
  ],
  [
    "01 · general purpose",
    "01 · универсальный"
  ],
  [
    "Shared agent through an API",
    "Общий агент через API"
  ],
  [
    "Your own worker, Agent SDK or CLI with API authentication. OpenAI and Anthropic document service accounts; OpenRouter documents workspace system keys. For Z.ai and DeepSeek, use a standard API key on the server; a formal service identity was not established in the international documentation reviewed.",
    "Свой worker, Agent SDK или CLI с API-авторизацией. OpenAI и Anthropic документируют service accounts; OpenRouter — workspace system keys. Для Z.ai и DeepSeek используйте стандартный API key на сервере; формальная service identity в изученных международных документах не установлена."
  ],
  [
    "Benefits:",
    "Плюсы:"
  ],
  [
    "a separate workload owner, token accounting, and separate development/production access and budgets.",
    "отдельный владелец нагрузки, токенный учёт, разделение dev/prod и бюджетов."
  ],
  [
    "Trade-offs:",
    "Цена:"
  ],
  [
    "a variable bill, rate limits and runner costs.",
    "переменный счёт, rate limits и стоимость раннера."
  ],
  [
    "02 · personal automation",
    "02 · личная автоматизация"
  ],
  [
    "Headless under an employee’s account",
    "Headless под учёткой сотрудника"
  ],
  [
    "with ChatGPT login or",
    "с ChatGPT login или"
  ],
  [
    "with subscription OAuth use the owner’s access. Claude also documents a personal Agent SDK and",
    "с subscription OAuth используют доступ владельца. Claude также документирует личный Agent SDK и"
  ],
  [
    "requires API credentials.",
    "требует API credentials."
  ],
  [
    "can use an already-paid subscription.",
    "можно использовать уже оплаченную подписку."
  ],
  [
    "limits shared with the person, dependence on their access and credential rotation, and no guaranteed worker count. This mode does not turn a personal allowance into a pool for colleagues.",
    "общие лимиты с человеком, зависимость от его доступа и ротации credentials, отсутствие гарантированного числа workers. Этот режим не превращает личную квоту в пул для всех коллег."
  ],
  [
    "Claude usage boundaries",
    "Границы использования Claude"
  ],
  [
    "Access token or native service account",
    "Access token или native service account"
  ],
  [
    "A Business/Enterprise personal access token runs Codex on behalf of a user. A native service account is a separate non-human identity, available",
    "Business/Enterprise personal access token запускает Codex от имени пользователя. Native service account — отдельная нечеловеческая identity; доступна"
  ],
  [
    "only on PAYG plans",
    "только на PAYG-планах"
  ],
  [
    ", CLI ≥ 0.142.0. These are different mechanisms.",
    ", CLI ≥ 0.142.0. Это разные механизмы."
  ],
  [
    "built-in permissions, groups and audit trails; a native service account does not depend on a shared personal login.",
    "штатные права, группы и аудит, без «фамильной» учётки для native service account."
  ],
  [
    "workspace metered billing and plan eligibility; confirm the credit price in your contract. Codex WIF is an opt-in workspace beta, not an automatic feature of every subscription.",
    "workspace metered billing и доступность нужного плана; цену credit проверяют по договору. WIF для Codex — beta по включению workspace, не автоматическая функция любой подписки."
  ],
  [
    "In this calculator: “Codex · service account PAYG”, with 0 included allowance. The fixed fee and credit conversion rate come from your contract. This calculation is separate from a Platform API invoice.",
    "В калькуляторе: «Codex · service account PAYG», включённая квота 0. Фиксированная плата и курс credit — по вашему договору. Этот расчёт не равен Platform API invoice."
  ],
  [
    "Supported tool with a Plan Key",
    "Поддерживаемый инструмент с Plan Key"
  ],
  [
    "A Coding Plan Key uses a personal or Team seat. Headless is not inherently prohibited: Z.ai documents the OpenClaw daemon and bot channels. However, §4 limits use to supported tools and the individual user.",
    "Coding Plan Key расходует personal или Team seat. Headless не запрещён сам по себе: Z.ai документирует OpenClaw daemon и bot channels. Однако §4 ограничивает использование поддерживаемыми инструментами и конкретным пользователем."
  ],
  [
    "a fixed price and reduced credit consumption off-peak.",
    "фиксированная цена и скидки расхода credits вне пика."
  ],
  [
    "separate seat allowances, dynamic concurrency and best-effort priority for general-purpose agents. Your own SDK, backend, bot, proxy or service for other users requires a separate written agreement; Team does not remove this restriction.",
    "отдельные квоты seat, динамический параллелизм, best-effort приоритет general-purpose agents. Свой SDK/backend/бот, proxy и обслуживание других пользователей требуют отдельного письменного соглашения; Team это ограничение не снимает."
  ],
  [
    "Key type and billing",
    "Тип ключа и оплата"
  ],
  [
    "05 · multiple models",
    "05 · несколько моделей"
  ],
  [
    "One endpoint with several provider routes, and a separate system key per service. BYOK connects upstream API credentials; transferring ChatGPT, Claude or GLM Coding Plan subscriptions into this pool is",
    "Один endpoint и несколько provider routes, отдельный system key на сервис. BYOK подключает upstream API credentials; перенос подписок ChatGPT, Claude или GLM Coding Plan в такой пул"
  ],
  [
    "not confirmed",
    "не подтверждён"
  ],
  [
    "routing, fallback, budgets and unified accounting.",
    "маршрутизация, fallback, бюджеты и единый учёт."
  ],
  [
    "fees, different endpoint prices and upstream limits. A system key does not inherit the member’s budget: set its own cap. On some prepaid accounts, requests reserve funds and can return 402 even with a positive balance.",
    "комиссии, отличие endpoint-цен и upstream limits. System key не подчиняется member budget: задайте его собственный cap. У части prepaid-аккаунтов запросы резервируют средства и могут получить 402 даже при положительном балансе."
  ],
  [
    "Limits",
    "Лимиты"
  ],
  [
    "06 · hybrid",
    "06 · гибрид"
  ],
  [
    "Subscriptions for people + APIs for automation",
    "Подписки людям + API автоматизации"
  ],
  [
    "Keep familiar tools for people and give services separate identities. Eligible Claude Max/Team plans may provide a monthly API bonus in a linked Console organisation. This is a separate credit, not the pooled remaining allowance of seats.",
    "Сохраните привычный инструмент людям, а сервисам выдайте отдельные identities. Подходящие Max/Team планы Claude могут дать monthly API bonus в связанном Console org. Это отдельный кредит, не общий остаток квот seats."
  ],
  [
    "separate responsibilities and personal limits; the bonus can fund your own headless tool or SDK with an API key.",
    "разделение ответственности и личных лимитов, можно направить бонус на собственный headless/SDK с API key."
  ],
  [
    "two billing systems. The bonus excludes OAuth headless, interactive Code and the official Claude Code GitHub Action, even when the Action uses",
    "два контура оплаты. Бонус не покрывает OAuth-headless, interactive Code и официальный Claude Code GitHub Action — даже если Action использует"
  ],
  [
    "Exact API bonus conditions",
    "Точные условия API bonus"
  ],
  [
    "Avoid double billing and double-counting allowances",
    "Как считать без двойной оплаты и двойной квоты"
  ],
  [
    "The number of server accounts represents independent identities, not processes. Profile input/output is the combined daily usage of all workers for one identity. Worker count only describes desired concurrency; it does not increase allowances or multiply tokens again.",
    "Количество технических учёток задаёт независимые identities, а не процессы. Вход/выход в профиле — совокупный дневной расход всех workers одной identity. Число workers только описывает желаемый параллелизм: оно не увеличивает квоты и не умножает токены повторно."
  ],
  [
    "If a server uses an employee’s existing paid account, do not add it again as a new subscription. Combine the human and server workload for that identity in one manual line, account for shared allowance windows, and remove duplicate charges and allowances from other lines. Allowances are not automatically pooled across lines. For multiple schedules or bursts, enter measured coverage; average daily usage does not guarantee that a burst fits.",
    "Если сервер использует уже оплаченную учётку сотрудника, не добавляйте её ещё раз как новую подписку. Объедините человеческую и серверную нагрузку этой identity в одной ручной позиции, учтите общие окна квот, а из остальных позиций исключите её повторную оплату. Автоматического объединения квот между позициями здесь нет. Для нескольких расписаний или всплесков укажите измеренное покрытие; средняя дневная нагрузка не гарантирует прохождения burst."
  ],
  [
    "The server profile has its own working days and hours; DeepSeek and GLM time discounts use that schedule. The human profile stays separate. No keys are entered into this calculator and no requests are sent to providers. Add the runner, VM and observability costs under “Other services, $/month”.",
    "Технический профиль имеет собственные дни и часы; временные скидки DeepSeek и GLM пересчитываются по нему. Human-профиль остаётся отдельно. Ключи не вводятся в калькулятор и запросы провайдерам не отправляются. Раннер, VM и наблюдаемость добавляются в «Другие сервисы, $/месяц»."
  ],
  [
    "Can it serve the whole team?",
    "Выдержит ли всю команду?"
  ],
  [
    "Estimate simultaneous calls and tokens per minute. An engineering example: 10 developers × 3 simultaneous calls + 2 agents × 5 =",
    "Считать надо одновременно активные вызовы и токены в минуту. Пример инженерной оценки: 10 разработчиков × 3 одновременных вызова + 2 агента × 5 ="
  ],
  [
    "40 in-flight requests",
    "40 in-flight запросов"
  ],
  [
    ". This is below the published DeepSeek account caps of 500 Pro / 2500 Flash, but does not guarantee the desired latency. Aliases, keys and user_id do not add capacity.",
    ". Это ниже опубликованных DeepSeek account caps 500 Pro / 2500 Flash, но не обещает нужную задержку. Aliases, keys и user_id не добавляют ёмкость."
  ],
  [
    "For similar calls: allowed starts/min ≈ min(RPM, ITPM / input, OTPM / output); average allowed in-flight requests ≈ starts/min × duration in minutes, subject to any separate concurrency cap. Cache reads follow each provider’s rules. Check subscription allowances and spending caps separately.",
    "Ориентир для однородных вызовов: допустимые starts/min ≈ min(RPM, ITPM / input, OTPM / output); допустимое среднее число in-flight ≈ starts/min × длительность в минутах, с учётом отдельного concurrency cap. Cache reads считаются по правилам конкретного провайдера. Подписочные квоты и лимит расходов проверяются отдельно."
  ],
  [
    "Route",
    "Путь"
  ],
  [
    "What limits it",
    "Что ограничивает"
  ],
  [
    "What to measure",
    "Что измерить"
  ],
  [
    "Organisation/project and model limits, spending tier",
    "Лимиты организации/проекта и модели, spend tier"
  ],
  [
    "RPM/TPM, current tier and 429 responses",
    "RPM/TPM, текущий tier и 429"
  ],
  [
    "Org RPM / ITPM / OTPM, spending cap, acceleration limits; new organisations may be on Evaluation",
    "Org RPM / ITPM / OTPM, spend cap, acceleration limits; новые org могут быть Evaluation"
  ],
  [
    "Uncached/write input, output and actual tier",
    "Uncached/write input, output, фактический tier"
  ],
  [
    "Personal 5-hour / weekly credits, dynamic concurrency",
    "Личные 5h / weekly credits, динамический concurrency"
  ],
  [
    "Peak windows and queues; projects ≠ HTTP requests",
    "Пиковые окна и очередь; проекты ≠ HTTP requests"
  ],
  [
    "Account in-flight: Pro 500 / Flash 2500 in the current docs",
    "Account in-flight: Pro 500 / Flash 2500 по текущим docs"
  ],
  [
    "Latency/queue, 429 responses and total usage across all keys",
    "Latency/queue, 429, общий расход всех keys"
  ],
  [
    "Upstream limits, balance/guardrails, possible in-flight spending budget",
    "Upstream limits, balance/guardrails, возможный in-flight spend budget"
  ],
  [
    "402/429 responses, max_tokens, route and available fallback",
    "402/429, max_tokens, маршрут и доступный fallback"
  ],
  [
    "Codex / Claude subscription",
    "Codex / Claude с подпиской"
  ],
  [
    "Shared identity allowance; guaranteed headless concurrency is not established",
    "Общая квота identity; гарантированный headless concurrency не установлен"
  ],
  [
    "Actual remaining allowance, stop/retry and combined human usage",
    "Фактический остаток, stop/retry, совместный расход человека"
  ],
  [
    "Minimal architecture for a shared agent",
    "Минимальная архитектура общего агента"
  ],
  [
    "Task queue → bounded worker pool → CLI/SDK/API → result and spending log. Each service gets its own credential, budget and repository permissions. Handle 429 with backoff; classify 402 before retrying. Retrying an LLM call must not repeat completed external actions. For code changes, produce a patch/PR for review.",
    "Очередь задач → ограниченный worker pool → CLI/SDK/API → результат и журнал расходов. На каждый сервис — собственный credential, отдельный бюджет и права репозитория. Ошибки 429 обрабатываются с backoff; 402 сначала классифицируются. Повторы LLM-вызова не должны повторно выполнять уже завершённые внешние действия. Для изменений кода результатом служит patch/PR на проверку."
  ],
  [
    "WIF reduces dependence on long-lived secrets: OpenAI API and Anthropic API have their own mechanisms; OpenRouter supports it on Business/Enterprise. Codex WIF requires separate beta enablement. Neither WIF nor a new key creates a new allowance.",
    "WIF снижает зависимость от долгоживущих секретов: OpenAI API и Anthropic API имеют собственные механизмы, OpenRouter — Business/Enterprise; доступность Codex WIF требует отдельного включения beta. Ни WIF, ни новый ключ не создают новую квоту."
  ],
  [
    "Not established: universal subscription SLA/concurrency, permission to use a Claude Primary Owner service account as a shared coding pool, or arbitrary CI on GLM Coding Plan. Check server, user and payment locations separately from cost and citizenship; a service account does not remove availability or KYC requirements.",
    "Не установлены: универсальная SLA/concurrency подписок, право использовать Claude Primary Owner service account как общий coding pool и право произвольного CI на GLM Coding Plan. Страна серверов, пользователей и оплаты проверяется отдельно от стоимости и гражданства; создание техучётки не отменяет требования доступности/KYC."
  ],
  [
    "Prices and offers",
    "Тарифы и акции"
  ],
  [
    "Snapshot 2026-10-17. GLM personal, GLM Team and Business rechecked on 17 October. Edit rates inside each model.",
    "Срез 2026-10-17. GLM personal, GLM Team и Business перепроверены 17.10. Ручные изменения делаются внутри модели."
  ],
  [
    "API · USD per million tokens",
    "API · USD за миллион токенов"
  ],
  [
    "Model",
    "Модель"
  ],
  [
    "Conditions",
    "Особенности"
  ],
  [
    "Per-request threshold 272,000",
    "Порог отдельного запроса 272,000"
  ],
  [
    "Standard mode",
    "Стандартный режим"
  ],
  [
    "Per-request threshold 100,000",
    "Порог отдельного запроса 100,000"
  ],
  [
    "Peak price; off-peak ×0.5",
    "Peak цена; вне пика ×0.5"
  ],
  [
    "DeepSeek · prices and hours",
    "DeepSeek · цены и часы"
  ],
  [
    "Subscriptions and Codex workspace",
    "Подписки и Codex workspace"
  ],
  [
    "DeepSeek is listed as direct API. OpenRouter Standard/Business includes a fee, with no published seat charge. GLM Team cannot mix tiers; OpenAI and Claude allow Standard/Premium in one group. Do not share a single personal account across the team.",
    "DeepSeek представлен прямым API; у OpenRouter Standard/Business учитывается комиссия, без опубликованной платы за seat. GLM Team не смешивает уровни; OpenAI и Claude допускают Standard/Premium в одной группе. Не передавайте один личный аккаунт всей команде."
  ],
  [
    "Plan",
    "План"
  ],
  [
    "Quarterly / month",
    "Quarterly / месяц"
  ],
  [
    "Annual / month",
    "Annual / месяц"
  ],
  [
    "Seats / allowances",
    "Места / квоты"
  ],
  [
    "Personal account per person",
    "Личный аккаунт на человека"
  ],
  [
    "From 2 seats · no upper seat limit",
    "От 2 мест · без верхнего предела мест"
  ],
  [
    "Fixed token allowance is not published",
    "Фиксированная токенная квота не опубликована"
  ],
  [
    "From 2 seats · up to 200",
    "От 2 мест · до 200"
  ],
  [
    "From 2 seats · up to 150",
    "От 2 мест · до 150"
  ],
  [
    "Metered",
    "По расходу"
  ],
  [
    "Non-human identity; PAYG",
    "Нечеловеческая identity; PAYG"
  ],
  [
    "No included allowance · Codex service accounts · PAYG only",
    "Нет включённой квоты · Codex service accounts · только PAYG"
  ],
  [
    "Offers and eligibility",
    "Акции и условия применения"
  ],
  [
    "Offer",
    "Предложение"
  ],
  [
    "Status",
    "Статус"
  ],
  [
    "How it is calculated",
    "Как считается"
  ],
  [
    "GLM · time of day",
    "GLM · часы"
  ],
  [
    "Active",
    "Действует"
  ],
  [
    "New plans: weekdays 09:00–13:00 Moscow ×1, off-peak ×0.5. Legacy V2: ×3/×1 in legacy units. GLM API has no time-of-day discount.",
    "Новые планы: 09–13 МСК по будням ×1, вне пика ×0.5. Legacy V2: ×3/×1 в старых единицах. К API GLM скидка часов не применяется."
  ],
  [
    "GLM · billing period",
    "GLM · период оплаты"
  ],
  [
    "In the catalogue",
    "В каталоге"
  ],
  [
    "Personal: quarterly −20%, annual −30%; Team annual −10%. Personal and Team rechecked on 17 October; allowance formulas checked on 17 October.",
    "Personal: quarterly −20%, annual −30%; Team annual −10%. Personal и Team перепроверены 17.10; формулы квот — 17.10."
  ],
  [
    "Z.ai · personal subscription prices",
    "Z.ai · цены личных подписок"
  ],
  [
    "Subject to confirmation",
    "По подтверждению"
  ],
  [
    "10% off the first eligible order. Renewals/upgrades are excluded. Do not assume it stacks with annual pricing or is guaranteed for Team.",
    "10% первого подходящего заказа. Renewals/upgrades исключены. Не считать автоматическим stacking с annual или гарантией для Team."
  ],
  [
    "No end date announced",
    "Дата конца не объявлена"
  ],
  [
    "Team on-demand is currently 90% of API list price. Personal needs a separate PAYG profile/key; switching is not automatic.",
    "Team on-demand сейчас 90% API list. Personal требует отдельного PAYG-профиля/ключа; автоматического перехода нет."
  ],
  [
    "GLM · Team and overage",
    "GLM · Team и overage"
  ],
  [
    "GLM · overnight Flash",
    "GLM · ночной Flash"
  ],
  [
    "Ended 7 October 2026",
    "Завершено 07.10.2026"
  ],
  [
    "Free overnight Flash and higher limits from the old campaign do not apply.",
    "Бесплатный ночной Flash и повышенные лимиты старой кампании не применяются."
  ],
  [
    "GLM · formula and allowances",
    "GLM · формула и квоты"
  ],
  [
    "Peak: weekdays 01:00–04:00 and 06:00–10:00 UTC, excluding Chinese public holidays; other hours ×0.5. Holidays are set manually because calendar eligibility needs confirmation.",
    "Peak будни 01–04 и 06–10 UTC, кроме китайских праздников; остальные часы ×0.5. Праздник задаётся вручную: календарная неоднозначность не скрывается."
  ],
  [
    "At least through 21 November 2026",
    "Как минимум до 21.11.2026"
  ],
  [
    "The promotion is already included in the price. After this date, the forecast keeps the latest rate with a warning; the renewal price is unknown.",
    "Promo уже отражён в цене. После этой даты прогноз использует последнюю ставку с предупреждением, не выдумывает цену renewal."
  ],
  [
    "Until 29 October 2026, if eligible",
    "До 29.10.2026 для eligible"
  ],
  [
    "The higher legacy allowance cannot be promised to a new buyer. The USD price is unchanged; the exact allowance is not published.",
    "Старый повышенный allowance нельзя обещать новому покупателю. Долларовая цена та же, точная квота не опубликована."
  ],
  [
    "Codex · subscriptions, credits and limits",
    "Codex · подписки, credits и ограничения"
  ],
  [
    "Processing mode",
    "Режим обработки"
  ],
  [
    "API Batch/Flex ×0.5; Fast ×2, Ultrafast ×6. Included subscription allowance: Fast ×2.5 / Ultra ×8. These are usage multipliers, not equivalent speed increases.",
    "API Batch/Flex ×0.5; Fast ×2, Ultrafast ×6. Included subscription allowance Fast ×2.5 / Ultra ×8; это не скорость в столько же раз."
  ],
  [
    "Max $100/$200; Team $20/$100 per seat, capped at $500/org. After 7 days and a claim; eligible API/headless only, not interactive Claude Code.",
    "Max $100/$200; Team $20/$100 за seat, максимум $500/org. После 7 дней и claim; только eligible API/headless, не interactive Claude Code."
  ],
  [
    "Ended; not for Code",
    "Завершено; не для Code"
  ],
  [
    "The October reduction in artifact usage does not apply to Code/API and is excluded from the calculation.",
    "Октябрьское снижение artifact usage не относится к Code/API и не применяется к расчёту."
  ],
  [
    "Claude · subscriptions",
    "Claude · подписки"
  ],
  [
    "OpenRouter · fees",
    "OpenRouter · комиссии"
  ],
  [
    "Standard 5.5%, minimum $0.80 per top-up; Business 8%. A separate Business minimum is unconfirmed and must be entered explicitly.",
    "Standard 5.5%, минимум $0.80 за пополнение; Business 8%. Минимум Business отдельно не подтверждён — задаётся явно."
  ],
  [
    "The first $25,000 of list-price inference per month has no platform fee, then 5% on the excess. Inference itself is not free. The threshold is shared across the account.",
    "Первые $25,000 list-price inference/month без платформенного сбора, далее 5% превышения. Это не бесплатный inference. Порог общий по аккаунту."
  ],
  [
    "Approved accounts only",
    "Только одобренным"
  ],
  [
    "Up to $3,000 in credits (usually 6 months), with 0% fees for 12 months. Enter the confirmed start date and remaining grant; disabled by default.",
    "До $3,000 credits (обычно 6 месяцев), комиссии 0% на 12 месяцев. Введите подтверждённую дату и остаток grant; по умолчанию выключено."
  ],
  [
    "OpenRouter · region",
    "OpenRouter · регион"
  ],
  [
    "Route restriction",
    "Ограничение маршрута"
  ],
  [
    "Europe = EU/EEA + UK + Switzerland; this is not an automatic strict EU-only guarantee. The chosen endpoint may have a different price.",
    "Europe = EU/EEA + UK + Switzerland; это не автоматическая гарантия strict EU-only. Выбранный endpoint может иметь другую цену."
  ],
  [
    "User choice",
    "Выбор пользователя"
  ],
  [
    "$50 for $45; $250 for $200; $1,000 for $700. Purchases and remaining balances are tracked separately.",
    "$50 за $45; $250 за $200; $1,000 за $700. Покупка и остаток считаются отдельно."
  ],
  [
    "Source",
    "Источник"
  ],
  [
    "Sources",
    "Источники"
  ],
  [
    "Checked: 2026-10-17",
    "Проверено: 2026-10-17"
  ],
  [
    "ChatGPT Business · seats and annual billing",
    "ChatGPT Business · seats и annual"
  ],
  [
    "Business · 2–200 seats and legacy plans",
    "Business · 2–200 seats и legacy"
  ],
  [
    "Z.ai · key type and billing",
    "Z.ai · тип ключа и биллинг"
  ],
  [
    "Full research and KYC",
    "Полное исследование и KYC"
  ],
  [
    "Checked: 2026-10-15",
    "Проверено: 2026-10-15"
  ],
  [
    "Original calculations and scenarios",
    "Исходные расчёты и сценарии"
  ],
  [
    "Codex service accounts · PAYG only",
    "Codex service accounts · только PAYG"
  ],
  [
    "How the calculation works",
    "Как устроен расчёт"
  ],
  [
    "The calculator estimates the cost of the usage you enter. It does not buy subscriptions, call paid APIs or promise equal model quality. The 95 RUB/USD exchange rate is your setting, not a live market quote.",
    "Калькулятор оценивает стоимость заданного расхода. Он не покупает подписки, не вызывает платные API и не обещает равное качество моделей. Курс 95 ₽/$ — ваша настройка, не текущая биржевая котировка."
  ],
  [
    "1. Scenarios, lines and users",
    "1. Сценарии, позиции, пользователи"
  ],
  [
    "A scenario is a purchasing alternative. Its lines add up, for example: 7 Standard + 3 Premium + a separate API. Totals are not added across scenarios. A developer can use several subscriptions; seat count is not the number of unique people. A line’s workload share applies to the selected group’s input/output without reducing paid seats. For GLM + Codex, allocate a total of 100% of the group’s workload; model shares within each line must also total 100%. New scenarios, including the hybrid preset, save their own profile, exchange rate and schedule. Older scenarios without their own profile keep using the shared profile; adding a hybrid does not change them. The profile has three groups, headcounts and daily tokens per person. Team size is the sum of the groups. A line can take people and usage from the whole team or one group; manual mode has one count of subscriptions/seats. Unused purchases are in advanced settings.",
    "Сценарий — альтернатива закупки. Внутри него позиции складываются: например, 7 Standard + 3 Premium + отдельный API. Между сценариями суммы не складываются. Один разработчик может пользоваться несколькими подписками; число seats не равно уникальному числу людей. Доля нагрузки позиции применяется к input/output выбранной группы, но не уменьшает количество оплаченных мест. Для GLM + Codex распределяйте суммарно 100% нагрузки группы; доли моделей внутри каждой позиции тоже должны составлять 100%. Новые сценарии, включая готовый гибрид, сохраняют собственные профиль, курс и расписание. Исходные сценарии без собственного профиля продолжают использовать общий; добавление гибрида их не меняет. В профиле задаются три группы, количество людей и токены на человека в день. Команда — сумма групп. Позиция может получать людей и расход из всей команды или одной группы; в ручном режиме вводится одно количество подписок/мест. Неиспользуемые покупки скрыты в дополнительных настройках."
  ],
  [
    "Annual and quarterly plans show both the monthly equivalent and the actual upfront payment for the first period. A one-time discount applies only to the first invoice; it does not become a recurring monthly discount. The annual forecast assumes unchanged base rates and usage.",
    "Annual и quarterly показываются одновременно как месячный эквивалент и реальная предоплата первого периода. Разовая скидка применяется только к первому invoice; она не превращается в постоянный monthly discount. Годовой прогноз предполагает неизменные базовые тарифы и объём."
  ],
  [
    "Linked lines update their headcounts and usage automatically. GLM allowances and overage are calculated separately for each group, without averaging limits. For other subscriptions, the manual coverage percentage applies to all selected people; use separate group lines for different percentages. Assigning several lines to the whole team includes the full profile in each: these are separate subscriptions/workloads, not automatic splitting of a single workload.",
    "Количество и расход связанных позиций меняются автоматически. Для GLM квота и перерасход считаются отдельно по группам, без усреднения лимитов. Для других подписок ручной процент покрытия относится ко всем выбранным людям; чтобы указать разные проценты, создайте позиции по группам. Подключение нескольких позиций к полной команде учитывает полный профиль в каждой: это несколько отдельных подписок/нагрузок, а не автоматическое деление одного расхода между ними."
  ],
  [
    "Old JSON files and saved drafts are migrated without changing usage: their lines stay manual. Entering exact tokens by model also switches to manual mode and preserves total tokens using a per-person average. Reconnect the profile explicitly in “Who uses this?”.",
    "Старые JSON и сохранения преобразуются без изменения расходов: их позиции остаются ручными. Переход к вводу токенов по моделям также включает ручной режим и сохраняет суммарные токены через среднее на человека. Возврат к профилю выбирается явно в поле «Для кого»."
  ],
  [
    "2. Tokens without double counting",
    "2. Токены без двойного счёта"
  ],
  [
    "All volumes are in millions. Output includes billable reasoning. Cached input is already part of total I and is not added again. Write is a separate category, not standard input plus the full write price. In share mode, each percentage applies to both input and output; use exact tokens by model for different ratios. Shares must total 100%.",
    "Все объёмы в миллионах. Выход включает billable reasoning. Cached input не добавляется повторно поверх общего I. Write — отдельная категория, не обычный input плюс ещё полная цена записи. В режиме долей процент применяется к input и output; для разных соотношений используйте явные токены по моделям. Сумма процентов должна равняться 100%."
  ],
  [
    "3. Schedule and GLM windows",
    "3. Расписание и окна GLM"
  ],
  [
    "By default, usage is spread evenly across Monday–Friday working hours. The calculation uses 15-minute steps and handles the UTC offset, overnight schedules and weekends. GLM peak is 06:00–10:00 UTC (09:00–13:00 Moscow); DeepSeek peak is 01:00–04:00 and 06:00–10:00 UTC. A manual peak share specifies the percentage of tokens. Direct DeepSeek has a manual Chinese public holiday switch; confirm calendar eligibility separately.",
    "По умолчанию равномерное распределение по рабочим часам понедельник–пятница. Расчёт использует шаг 15 минут, учитывает UTC-сдвиг, переход через полночь и выходные. GLM peak 06–10 UTC (09–13 Москва), DeepSeek 01–04 и06–10 UTC. Ручная доля пика задаёт процент токенов. Для direct DeepSeek есть ручной переключатель китайского праздника; применимость календаря нужно подтвердить отдельно."
  ],
  [
    "New GLM plans:",
    "Новые планы GLM:"
  ],
  [
    ", with volumes in millions; GLM-5.3 a/c/b = 6.9/1.7/24, Flash = 2.3/0.56/8; time = 1 at peak, 0.5 off-peak. Cache writes count as uncached in the plan. Models share one seat allowance. Weekly and maximum rolling 5-hour windows are checked with a constant daily model mix. The 5-hour estimate is approximate when peak share is entered manually.",
    ", когда объёмы в миллионах; GLM-5.3 a/c/b=6.9/1.7/24, Flash=2.3/0.56/8; time=1 в пик,0.5 вне пика. Запись кеша в плане входит в uncached. Модели делят одну квоту seat. Проверяются weekly и максимальные rolling5h при постоянном ежедневном mix. Для ручной доли пика 5h оценка приближённая."
  ],
  [
    "Overage is estimated as a proportional share of a constant model mix. This is not an exact invoice: model changes, bursts and reset timing affect the result. Unused seats do not transfer allowance to active users. Personal plans without a selected fallback show unserved workload; Team overage must be enabled. The legacy 3× multiplier is not applied to new-plan allowances.",
    "Превышение оценивается пропорциональной долей постоянного mix. Это не точный invoice: изменение моделей, bursts и момент reset меняют результат. Неиспользованные seats не передают квоту активным. Personal без выбранного fallback показывает необслуженный объём; Team overage должен быть включён. Legacy3× не умножается на квоты новых планов."
  ],
  [
    "4. OpenAI and Anthropic",
    "4. OpenAI и Anthropic"
  ],
  [
    "Public subscription multipliers do not disclose a fixed token allowance. The default range therefore runs from seat prices to seats plus the full metered workload. This is a conditional estimate using the selected credit conversion rate, not a guaranteed bill ceiling. You can enter measured coverage as a percentage; it is explicitly treated as a user assumption.",
    "Публичные множители подписок не раскрывают фиксированную токенную квоту. Поэтому по умолчанию виден диапазон от цены seats до seats плюс полный платный расход. Это условная оценка при выбранном курсе credits, а не верхняя гарантия счёта. Можно задать измеренное покрытие в процентах — оно явно считается допущением пользователя."
  ],
  [
    "Codex metered credits have no separate cache-write price. Confirm USD/credit at checkout or in your contract; the default 0.04 is an editable assumption. Included Fast/Ultra usage has different multipliers from paid credits. API Batch/Flex should not be treated as an interactive service at the same speed.",
    "Codex metered credits не имеют отдельной цены записи кеша. USD/credit подтверждается checkout/контрактом; 0.04 в настройке — редактируемое предположение. Included Fast/Ultra расходуются иначе, чем оплаченные credits. API режима Batch/Flex не следует считать интерактивным сервисом той же скорости."
  ],
  [
    "Claude API bonus applies only to a separate eligible API line after confirmation of the claim and Console linkage. Team is capped at $500/org; personal bonuses are not automatically multiplied by user count. Bundle balance lifetime is explicit, defaulting to 1 month without carryover. This is a conservative assumption, not a confirmed provider rule. Interactive usage bundles are a different mechanism: you pay for face value; unused balance is shown but not deducted as a refund. Team limits apply per group and personal limits per account; even allocation across personal accounts is a user assumption.",
    "Claude API bonus применяется только к отдельной eligible API-позиции после подтверждения claim и Console linkage. Team максимум$500/org, personal не умножается автоматически на число пользователей. Срок остатка bundles задаётся явно, по умолчанию 1 месяц без переноса. Это консервативное допущение, а не подтверждённое правило провайдера. Интерактивные usage bundles — другой механизм: вы платите за номинал; неиспользованный остаток показывается, но не вычитается как возврат. Лимит Team по одной группе, личный лимит на аккаунт; равномерное распределение между личными аккаунтами предполагается пользователем."
  ],
  [
    "Each model row uses a consistent endpoint: do not combine one host’s cheapest input with another host’s output. Alternative route rates may already include promotions. A weekend DeepSeek snapshot may contain an off-peak base; built-in rates are normalised to explicit peak/off-peak overrides, so the discount is not applied twice.",
    "Каждая строка модели использует согласованный endpoint: нельзя комбинировать минимальный input одного хоста и output другого. Ставки альтернативных маршрутов могут уже включать промо. DeepSeek snapshot в выходной может содержать off-peak base: встроенные цены нормализованы к явным peak/off-peak overrides, скидка не применяется дважды."
  ],
  [
    "A standard OpenRouter bill = inference + max(percentage fee, top-up count × minimum), when a top-up is actually needed. This estimate assumes buying exactly enough credit for usage, with no existing prepaid balance or rounding to a minimum principal purchase. The Business minimum is unconfirmed and entered manually. For several budgets within one OpenRouter account, prefer one line with multiple models.",
    "Обычный OR счёт = inference + max(процент комиссии, число пополнений × минимум), если действительно нужно пополнение. Это оценка при пополнении ровно под расход, без старого prepaid balance и без округления минимального principal purchase. Business minimum не подтверждён — вводится вручную. Для нескольких бюджетов одного OR аккаунта лучше одна позиция с несколькими моделями."
  ],
  [
    "BYOK keeps the provider invoice separate; 5% applies above the shared $25,000 list-price threshold. Lines in one group share that threshold. Funding the OpenRouter fee itself has a 5.5% top-up fee with a $0.80 minimum (editable), charged once per BYOK group. A Startup grant does not pay an external provider invoice. The 12-month fee waiver and usually 6-month grant are separate benefits.",
    "BYOK: provider invoice остаётся отдельно; 5% применяется к превышению общего list-price порога$25,000. Позиции одной группы делят порог. Пополнение OR для самой комиссии имеет сбор 5.5% с минимумом $0.80 (можно изменить); по BYOK-группе он считается один раз. Startup grant не оплачивает внешний provider invoice. Fee waiver12месяцев и grantобычно6месяцев различаются."
  ],
  [
    "6. Context, cache, geography and quality",
    "6. Контекст, кеш, география и качество"
  ],
  [
    "Long-context surcharges depend on individual requests. For the listed OpenAI families above 272k: input/read/write ×2 and output ×1.5; for Haiku 5.5 above 100k: all categories ×5. The long-context share field assumes the same share in every token category. Split the model into several rows for a different distribution.",
    "Надбавка long context определяется отдельными запросами. Для OpenAI указанных семейств выше272k: input/read/write×2 иoutput×1.5; Haiku5.5 выше100k — все категории×5. Поле доли длинного контекста предполагает одинаковую долю по категориям. Для другого распределения разделите модель на несколько строк."
  ],
  [
    "Geographic surcharges are entered explicitly. Anthropic’s first-party +10% applies to US-only inference, not European citizenship. A regional OpenRouter endpoint may already include a surcharge; do not count it twice. Europe routing includes EU/EEA, UK and Switzerland; this calculator does not create a legal strict EU-only guarantee.",
    "Поля геонаценки вводятся явно. Anthropic first-party +10% относится к US-only inference, не европейскому гражданству. Regional OpenRouter endpoint уже может содержать надбавку; не включайте её дважды. Europe routing включает EU/EEA, UK и Switzerland; юридическую strictEU-only гарантию калькулятор не создаёт."
  ],
  [
    "An 80% cache-hit rate is not guaranteed by the provider. Tokenizers, reasoning effort, retries, tools and speed change total usage. KYC, location and payment eligibility cannot be inferred from a price or passport; see Full research and KYC.",
    "Cache hit80% не гарантируется провайдером. Разные tokenizer, reasoning effort, число повторов, инструменты и скорость меняют итоговый расход. KYC, страна нахождения и допустимость оплаты не выводятся из цены или паспорта; см. Полное исследование и KYC."
  ],
  [
    "7. Saved data and exclusions",
    "7. Что сохраняется и чего здесь нет"
  ],
  [
    "Settings are saved in this browser’s localStorage and are not synced with the team. JSON saves scenarios; the downloadable HTML saves the entire calculator, catalogue and current scenario and works offline. There are no API keys or background provider requests. Source links open only when clicked.",
    "Настройки сохраняются в localStorage этого браузера, не синхронизируются с командой. JSON сохраняет сценарии; скачиваемый HTML сохраняет весь калькулятор, каталог и текущий сценарий и работает офлайн. Здесь нет API-ключей и фоновых запросов к провайдерам. Ссылки на источники открываются только по нажатию."
  ],
  [
    "Country taxes, bank exchange spreads, tools/containers/Actions/search, SLA and throughput are not included automatically. Add them as manual charges. The calculator does not turn annual prepayment into a monthly contract. Unconfirmed discounts are disabled by default. Future prices and offers need rechecking.",
    "Не включены автоматически налоги страны, валютный спред банка, tools/containers/Actions/поиск, SLA и throughput. Их можно добавить как ручной платёж. Калькулятор не превращает годовую предоплату в помесячный договор. Неподтверждённые скидки по умолчанию выключены. Будущие цены и акции требуют перепроверки."
  ],
  [
    "Worked example",
    "Контрольный пример"
  ],
  [
    "GPT-6.1 Sol, 20M input + 1M output, 80% cache, 100% of cache misses written:",
    "GPT-6.1 Sol,20Minput+1Moutput,80%cache,100%промахов в запись:"
  ],
  [
    ". GLM-5.3 for the same volume: API $14.16; 7,880 plan credits at peak or 5,691.11 for 09:00–18:00 Moscow. With five such days, GLM Pro uses 28,455.56 of its 60,000 weekly credits; the most expensive 5-hour window, 09:00–14:00, uses 3,940 credits.",
    ". GLM-5.3 для того же объёма: API$14.16; план7,880credits в пик или5,691.11 при09–18МСК. GLM Pro 60,000 credits/week при пяти таких днях расходует 28,455.56 credits; самое дорогое 5h окно 09–14 —3,940credits."
  ],
  [
    "API · shared server agent",
    "API · общий серверный агент"
  ],
  [
    "Use a separate workspace system key and spending cap. BYOK uses a paid provider API key, not access to a personal subscription. Concurrency is limited by the route and balance; some prepaid accounts reserve funds for in-flight requests.",
    "Используйте отдельный workspace system key и лимит расходов. BYOK — ключ оплачиваемого API провайдера, не доступ к личной подписке. Параллелизм ограничен маршрутом и балансом; для части prepaid-аккаунтов действует резервирование средств на запросы в полёте."
  ],
  [
    "API · suitable for automation",
    "API · подходит для автоматизации"
  ],
  [
    "Tokens are billed separately from subscriptions. Keep the key on the server; processes share organisation/project limits. OpenAI and Anthropic support service accounts. For Z.ai/DeepSeek, check the key type and available permissions.",
    "Оплата токенов отдельно от подписок. Ключ хранится на сервере; процессы используют общие лимиты организации/проекта. OpenAI и Anthropic поддерживают service accounts. У Z.ai/DeepSeek проверьте тип ключа и доступные права."
  ],
  [
    "Codex service account · PAYG only",
    "Codex service account · только PAYG"
  ],
  [
    "A non-human identity in a ChatGPT workspace, requiring CLI ≥ 0.142.0. Availability requires an eligible PAYG plan and an administrator. Billing uses workspace metered credits, not the Plus/Pro/Business allowance or Platform API. Confirm the credit price; included allowance is zero.",
    "Нечеловеческая identity в ChatGPT workspace, CLI ≥ 0.142.0. Доступность требует подходящего PAYG-плана и администратора. Это workspace metered credits, а не квота Plus/Pro/Business и не Platform API. Подтвердите цену credit; включённая квота равна нулю."
  ],
  [
    "Coding Plan does not license a shared custom bot",
    "Coding Plan не лицензирует общий самописный бот"
  ],
  [
    "Coding Plan · supported tools only",
    "Coding Plan · только поддерживаемые инструменты"
  ],
  [
    "A Coding Plan Key uses the subscription; a Standard API Key uses PAYG. The subscription is personal: your own SDKs, apps, bots, SaaS and requests outside supported tools require a written agreement. A supported headless tool does not make a seat available to the whole team. Choose API for a shared service.",
    "Coding Plan Key расходует подписку, Standard API Key — PAYG. Подписка персональная: собственные SDK/apps/bots/SaaS и запросы вне поддерживаемых инструментов требуют письменного соглашения. Поддерживаемый headless-инструмент не делает seat общекомандным. Для общего сервиса выберите API."
  ],
  [
    "A Claude subscription does not cover a shared team bot",
    "Подписка Claude не покрывает общий бот команды"
  ],
  [
    "Claude Code headless · within personal use",
    "Claude Code headless · в пределах личного использования"
  ],
  [
    "The official CLI and Agent SDK allow ordinary personal automation with subscription authentication. The allowance is shared with interactive work; a Team seat belongs to a person. Use API for a shared agent or other people’s tasks. The --bare mode requires API credentials. API bonus applies only to separately accounted eligible API/headless usage.",
    "Официальные CLI и Agent SDK допускают обычную личную автоматизацию с авторизацией подписки. Общая квота с интерактивной работой; Team seat закреплён за человеком. Для общего агента и чужих задач используйте API. Режим --bare требует API credentials. API bonus применяется только к отдельно учтённому eligible API/headless расходу."
  ],
  [
    "Codex headless · on behalf of the owner",
    "Codex headless · от имени владельца"
  ],
  [
    "codex exec supports saved ChatGPT authentication. A Business/Enterprise access token represents a user and requires workspace permissions. Limits are shared with that person’s regular work. For an independent shared bot, prefer API or a native PAYG service account; a named personal subscription is not treated as a separate bot licence.",
    "codex exec поддерживает сохранённую ChatGPT-авторизацию. Business/Enterprise access token представляет пользователя и требует разрешений workspace. Лимит общий с его обычной работой. Для независимого общего бота предпочтительны API или native service account на PAYG; обычную именную подписку не считаем отдельной bot-лицензией."
  ],
  [
    "Automation conditions are unconfirmed",
    "Условия автоматизации не подтверждены"
  ],
  [
    "Enter the agreed rates and check the contract for machine identity, authentication methods and shared allowance rules.",
    "Введите согласованные ставки и проверьте в договоре машинную identity, способы авторизации и совместное использование квоты."
  ],
  [
    "Azure · Europe (+10% already included)",
    "Azure · Europe (+10% уже в цене)"
  ],
  [
    "Relace · alternative host",
    "Relace · альтернативный хост"
  ],
  [
    "DeepSeek · time-of-day rates",
    "DeepSeek · тариф по часам"
  ],
  [
    "Streamlake · fixed price",
    "Streamlake · фиксированная цена"
  ],
  [
    "Many agent tasks and large contexts",
    "Много агентских задач и больших контекстов"
  ],
  [
    "Small tasks and occasional assistance",
    "Небольшие задачи и эпизодическая помощь"
  ],
  [
    "Server accounts",
    "Технические учётки"
  ],
  [
    "subscription",
    "подписки"
  ],
  [
    "GLM · personal",
    "GLM · личные"
  ],
  [
    "GLM · team",
    "GLM · команда"
  ],
  [
    "Same mix · API",
    "Тот же mix · API"
  ],
  [
    "Hybrid · 18 developers + server",
    "Гибрид · 18 разработчиков + сервер"
  ],
  [
    "Power users · GLM Pro",
    "Суперактивные · GLM Pro"
  ],
  [
    "Regular users · GLM Lite",
    "Обычные · GLM Lite"
  ],
  [
    "Light users · Z.ai Flash API",
    "Малоактивные · Z.ai Flash API"
  ],
  [
    "Server agent · DeepSeek Flash API",
    "Серверный агент · DeepSeek Flash API"
  ],
  [
    "GLM Team Standard · 8 active users",
    "GLM Team Standard · 8 активных"
  ],
  [
    "GLM Team Standard · 10 light users",
    "GLM Team Standard · 10 малоактивных"
  ],
  [
    "Codex Business Standard · 8 active users",
    "Codex Business Standard · 8 активных"
  ],
  [
    "Server · DeepSeek Flash API",
    "Сервер · DeepSeek Flash API"
  ],
  [
    "light users",
    "малоактивные"
  ],
  [
    "active users",
    "активные"
  ],
  [
    "GLM API · light users",
    "GLM API · малоактивные"
  ],
  [
    "Unknown model",
    "Неизвестная модель"
  ],
  [
    "Profile workload share must be between 0 and 100%",
    "Доля нагрузки профиля должна быть от 0 до 100%"
  ],
  [
    "Unknown profile group",
    "Неизвестная группа профиля"
  ],
  [
    "Team profile is missing",
    "Профиль команды отсутствует"
  ],
  [
    "Unknown API integration",
    "Неизвестная API-интеграция"
  ],
  [
    "Unused count must be a nonnegative whole number",
    "Неиспользуемое количество должно быть целым и неотрицательным"
  ],
  [
    "Unknown line type",
    "Неизвестный тип позиции"
  ],
  [
    "Bundle lifetime: 1–36 months",
    "Срок bundles: 1–36 месяцев"
  ],
  [
    "Unknown plan",
    "Неизвестный план"
  ],
  [
    "Go: only Luna is available in the subscription calculation",
    "Go: в расчёте подписки доступна только Luna"
  ],
  [
    "Unknown model mode",
    "Неизвестный режим модели"
  ],
  [
    "Subscription Ultrafast is available only on Pro 500 among the listed plans",
    "Ultrafast подписки доступен только Pro 500 из представленных планов"
  ],
  [
    "Batch/Flex applies to API, not the included subscription allowance",
    "Batch/Flex применяются к API, не к included subscription allowance"
  ],
  [
    "OpenRouter: use a separate route with its own rates for other speeds; select Standard in this form",
    "OpenRouter: для иных скоростей задайте отдельный маршрут с его ставками, Standard в этой форме"
  ],
  [
    "The selected group has no users; this line has no charge or token usage.",
    "В выбранной группе нет потребителей; позиция не оплачивается и не расходует токены."
  ],
  [
    "A separate line assumes a separate paid account. If using an employee’s account, combine all its usage in one line and remove duplicate charges and allowances.",
    "Отдельная позиция предполагает отдельную оплачиваемую учётку. При использовании учётки сотрудника объедините весь её расход в одной позиции и исключите повторную оплату и квоту."
  ],
  [
    "Usage and user count are linked to the team profile. All groups use this line’s selected model mix and cache settings.",
    "Расход и количество потребителей связаны с профилем команды. Все группы используют выбранный mix моделей и параметры кеша этой позиции."
  ],
  [
    "Per person",
    "На одного человека"
  ],
  [
    "Overage is estimated separately for each group with a constant model mix; the actual bill depends on request order.",
    "Перерасход оценён отдельно по каждой группе, при постоянном mix; фактический счёт зависит от порядка запросов."
  ],
  [
    "The cost of MCP/other credit overage is unknown and excluded. Add the confirmed cost under other services; the total is incomplete until then.",
    "Стоимость перерасхода MCP/прочих credits неизвестна и не включена. Добавьте подтверждённую стоимость в другие сервисы; итог пока неполный."
  ],
  [
    "Personal: PAYG fallback requires a separate Standard API Key and switching; there is no automatic overage.",
    "Personal: PAYG fallback требует отдельного Standard API Key и переключения; автоматического overage нет."
  ],
  [
    "The allowance is insufficient: the displayed price does not cover all entered usage.",
    "Квоты не хватает: показанная цена не обеспечивает весь введённый объём."
  ],
  [
    "Allowance is per person; unused balances are not pooled. This models an evenly distributed week, not exact calendar resets.",
    "Квота на человека, остатки не объединяются. Модель равномерной недели, не точные календарные reset."
  ],
  [
    "Additional credits are spread across working days, but all daily usage is counted within the busiest 5 hours as a conservative assumption.",
    "Дополнительные credits равномерны по рабочим дням, но весь дневной расход считается внутри худших 5 часов — консервативное допущение."
  ],
  [
    "The 5-hour estimate with manual peak share is approximate; the exact distribution is unknown.",
    "Пятичасовая оценка при ручной доле пика приближённая; точное распределение неизвестно."
  ],
  [
    "−10% Team overage: no promotion end date is published; future pricing may change.",
    "−10% Team overage: срок акции не опубликован; будущая цена может измениться."
  ],
  [
    "USD/credit is your assumption. Confirm the package price at checkout; it is not a universal conversion rate.",
    "USD/credit — ваше допущение. Подтвердите цену пакета в checkout; это не универсальный курс."
  ],
  [
    "Fast/Ultrafast consumes included allowance at ×2.5/×8 and paid credits at ×2/×6. Enter coverage for the selected speed.",
    "Fast/Ultrafast расходуют included allowance ×2.5/×8; paid credits ×2/×6. Процент покрытия задаётся с учётом выбранной скорости."
  ],
  [
    "Codex service account: PAYG with no included subscription allowance; workspace credits differ from Platform API. The credit price needs confirmation.",
    "Codex service account: PAYG, без включённой квоты подписки; workspace credits отличаются от Platform API. Цена credit требует подтверждения."
  ],
  [
    "The included token allowance is unknown. Range: seats → seats plus all metered overage, under the selected assumptions.",
    "Включённая токенная квота неизвестна. Диапазон: seats → seats + весь расход сверх квоты, при выбранных допущениях."
  ],
  [
    "The first-order discount is excluded because eligibility is unconfirmed.",
    "Скидка первого заказа не включена: применимость не подтверждена."
  ],
  [
    "The one-time discount applies to the full first-period payment. The user confirms whether it stacks with annual/quarterly pricing.",
    "Разовая скидка применяется к полному первому платежу за период. Stacking с annual/quarterly подтверждает пользователь."
  ],
  [
    "Custom rates replace the published prices.",
    "Есть ручные тарифы: они заменяют опубликованные ставки."
  ],
  [
    "The geographic surcharge is entered separately; do not apply it again to a regional endpoint price.",
    "Географическая надбавка задана отдельно; не применяйте повторно к цене regional endpoint."
  ],
  [
    "Alternative host: equivalent quality, speed and tool support are not guaranteed.",
    "Альтернативный хост: эквивалентность качества, скорости и tool support не гарантирована."
  ],
  [
    "Europe routing includes EU/EEA, UK and Switzerland; this does not confirm strict EU-only processing.",
    "Europe routing включает EU/EEA, UK и CH; это не подтверждение strict EU-only."
  ],
  [
    "The direct DeepSeek holiday discount is unconfirmed on OpenRouter and is not applied here.",
    "Праздничная скидка direct DeepSeek не подтверждена в OpenRouter: здесь не применяется."
  ],
  [
    "A Chinese public holiday is set manually for direct DeepSeek only; the calendar is not checked automatically.",
    "Китайский праздник задан вручную только для direct DeepSeek; календарь не проверяется автоматически."
  ],
  [
    "Business: a separate minimum fee is unconfirmed; the model uses 0, which you can change.",
    "Business: отдельный minimum fee не подтверждён; в модели 0, можно изменить."
  ],
  [
    "BYOK: the provider invoice is separate; the platform threshold is shared by the group. OpenRouter credits cover only the platform fee. Funding that fee costs 5.5%, minimum $0.80, unless changed.",
    "BYOK: provider invoice отдельно; порог платформы общий по группе. OR credits оплачивают только platform fee. Пополнение для fee: 5.5%, minimum $0.80, если не изменён."
  ],
  [
    "Startup is enabled with confirmed eligibility; the waiver lasts 12 months and the grant usually 6.",
    "Startup включён как подтверждённая eligibility; waiver 12 месяцев, grant обычно 6."
  ],
  [
    "Monthly credits are a manual assumption; do not count them again alongside a linked API bonus.",
    "Ежемесячные credits — ручное допущение; не суммируйте повторно со связанным API bonus."
  ],
  [
    "The monthly Claude API bonus does not apply to the official Claude Code GitHub Action.",
    "Monthly Claude API bonus не применяется к официальному Claude Code GitHub Action."
  ],
  [
    "Claude API bonus: an eligible source subscription is missing.",
    "Claude API bonus: подходящая подписка-источник отсутствует."
  ],
  [
    "Claude API bonus: one plan/Team links to one Console organisation, and one Console organisation links to one source.",
    "Claude API bonus: один план/Team связывается с одним Console org, и один Console org — с одним источником."
  ],
  [
    "Claude API bonus applies only to eligible Anthropic API usage; the user has confirmed the claim, 7-day requirement and linked organisation.",
    "Claude API bonus применён только к eligible Anthropic API; claim/7 дней и связанный org подтверждены пользователем."
  ],
  [
    "GLM: Standard and Premium cannot be mixed in one Team group.",
    "GLM: Standard и Premium нельзя смешивать в одной Team-группе."
  ],
  [
    "The team profile needs three activity groups",
    "Нужны три группы профиля команды"
  ],
  [
    "Team size must match the sum of the groups",
    "Численность команды должна совпадать с суммой групп"
  ],
  [
    "Invalid server profile",
    "Некорректный технический профиль"
  ],
  [
    "Invalid date",
    "Некорректная дата"
  ],
  [
    "Unknown schedule mode",
    "Неизвестный режим расписания"
  ],
  [
    "Server schedule: use 15-minute increments",
    "Техническое расписание: шаг 15 минут"
  ],
  [
    "Server profile: unknown schedule",
    "Технический профиль: неизвестное расписание"
  ],
  [
    "Unknown server account purpose",
    "Неизвестное назначение технических учёток"
  ],
  [
    "A version 1, 2 or 3 scenario file is required, with no more than 30 scenarios.",
    "Нужен файл сценариев версии 1, 2 или 3, не более 30 сценариев."
  ],
  [
    "Team profile is missing",
    "Отсутствует профиль команды"
  ],
  [
    "Server profile is missing",
    "Отсутствует технический профиль"
  ],
  [
    "Incomplete scenario profile",
    "Неполный профиль сценария"
  ],
  [
    "Invalid model ID",
    "Некорректный ID модели"
  ],
  [
    "No included allowance ·",
    "Нет включённой квоты · "
  ],
  [
    "Ended",
    "Завершено"
  ],
  [
    "Line",
    "Позиция"
  ],
  [
    "Monthly USD minimum",
    "Месяц USD минимум"
  ],
  [
    "Monthly USD maximum",
    "Месяц USD максимум"
  ],
  [
    "Monthly RUB minimum",
    "Месяц RUB минимум"
  ],
  [
    "Monthly RUB maximum",
    "Месяц RUB максимум"
  ],
  [
    "First payment USD min",
    "Первый платёж USD min"
  ],
  [
    "First payment USD max",
    "Первый платёж USD max"
  ],
  [
    "Input M",
    "Вход M"
  ],
  [
    "Output M",
    "Выход M"
  ],
  [
    "Automation eligibility",
    "Применимость автоматизации"
  ],
  [
    "Based on assumptions",
    "По допущениям"
  ],
  [
    "Not all usage covered",
    "Не весь объём"
  ],
  [
    "People / manual scenario",
    "Люди / ручной сценарий"
  ],
  [
    "Provider calculation notes",
    "Расчёт и условия провайдера"
  ],
  [
    "No included allowance ·",
    "Нет включённой квоты ·"
  ],
  [
    "An 80% cache-hit rate is not guaranteed by the provider. Tokenizers, reasoning effort, retries, tools and speed change total usage. KYC, location and payment eligibility cannot be inferred from a price or passport; see",
    "Cache hit80% не гарантируется провайдером. Разные tokenizer, reasoning effort, число повторов, инструменты и скорость меняют итоговый расход. KYC, страна нахождения и допустимость оплаты не выводятся из цены или паспорта; см."
  ],
  [
    "Write",
    "Запись"
  ],
  [
    "Read",
    "Чтение"
  ],
  [
    "Monthly",
    "В месяц"
  ],
  [
    "External sources open in their original language.",
    "Внешние источники открываются на языке оригинала."
  ],
["Find provider prices, account conditions and the assumptions behind your estimate.", "Цены провайдеров, условия аккаунтов и допущения, на которых основан расчёт."],
["OpenAI · API pricing", "OpenAI · цены API"],
["Z.ai · API pricing", "Z.ai · цены API"],
["Anthropic · API pricing", "Anthropic · цены API"],
["Z.ai · referral", "Z.ai · реферальная программа"],
["Z.ai · legacy/current usage", "Z.ai · расход старых и новых планов"],
["OpenRouter · Europe routing", "OpenRouter · маршрутизация в Европе"],
["OpenRouter · Startup", "OpenRouter · программа Startup"],
["Claude · API bonus", "Claude · бонус API"]
];
export const RESEARCH_TRANSLATIONS=Object.fromEntries(RESEARCH_ENTRIES);
export const RESEARCH_EN=Object.fromEntries(RESEARCH_ENTRIES.map(([en,ru])=>[ru,en]));
const RESEARCH_TEMPLATES=[
 ["Prices and assumptions are dated {0}. Source pages may use their original language.","Цены и допущения — на {0}. Внешние источники могут быть на языке оригинала."],
 ["Snapshot {0}. GLM personal, GLM Team and Business rechecked on 17 October. Edit rates inside each model.","Срез {0}. GLM personal, GLM Team и Business перепроверены 17.10. Ручные изменения делаются внутри модели."],
 ["Checked: {0}","Проверено: {0}"],
 ["Per-request threshold {0}","Порог отдельного запроса {0}"],
 ["From {0} seats · up to {1}","От {0} мест · до {1}"],
 ["From {0} seats · no upper seat limit","От {0} мест · без верхнего предела мест"],
 ["From {0} seats · upper limit not published","От {0} мест · верхний предел не опубликован"],
 ["From {0} seats · upper limit unverified","От {0} мест · верхний предел не подтверждён"],
 ["From {0} seats","От {0} мест"],
 ["Server workload: {0} days/month, {1} days/week; parallel processes per account: {2}. Usage includes all processes: concurrency does not multiply volume or allowance.","Техническая нагрузка: {0} дней/месяц, {1} дней/неделю; {2} параллельных процессов на учётку. Расход включает все процессы: параллелизм не умножает объём или квоту."],
 ["Subscription coverage of {0}% is entered by the user, not a published allowance.","Покрытие подпиской {0}% задано пользователем, не является опубликованной квотой."],
 ["{0}: the promotion is confirmed only through {1}; the latest price is retained and future pricing is unknown.","{0}: промо подтверждено только до {1}; сохранена последняя цена, будущая неизвестна."],
 ["Bundle lifetime in the forecast: {0} months. This is a selected assumption; the provider’s expiry terms are unconfirmed. Team balance is shared within the group; personal balances are allocated evenly across accounts.","Перенос bundles в прогнозе: {0} мес. Это выбранное допущение, срок провайдера не подтверждён. Team баланс общий в группе; personal — равномерно между аккаунтами."],
 ["Up to ${0} in credits applied to eligible usage/fees.","Применено credits до ${0} к eligible расходу/комиссии."],
 ["Monthly discounted Claude bundle limit exceeded: {0} face value for {1}","Превышен monthly лимит discounted Claude bundles: {0} номинала для {1}"],
 ["BYOK group {0}: {1} must match across all lines.","BYOK группа {0}: {1} должен совпадать во всех позициях."],
 ["{0}: the group needs at least {1} seats","{0}: в группе минимум {1} места"],
 ["{0}: exceeds the published maximum of {1}","{0}: превышен опубликованный максимум {1}"],
 ["Invalid setting: {0}","Некорректный общий параметр: {0}"],
 ["Invalid value: {0}","Некорректное значение {0}"],
 ["Unknown mode: {0}","Неизвестный режим {0}"],
 ["Invalid date: {0}","Некорректная дата {0}"],
 ["{0}: a whole number is required","{0}: требуется целое число"],
 ["{0}: a whole count is required","{0}: требуется целое количество"],
 ["{0}: use 0.25-hour (15-minute) increments","{0}: используйте шаг 0.25 часа (15 минут)"],
 ["{0} must be 0–100%","{0} должен быть 0–100%"],
 ["{0}: invalid {1}","{0}: недопустимый {1}"],
 ["{0}: invalid manual rates","{0}: некорректные ручные ставки"],
 ["{0} is not included in this plan","{0} не входит в этот план"],
 ["{0}: Ultrafast is not supported","{0}: Ultrafast не поддержан"],
 ["{0}: Fast is not supported","{0}: Fast не поддержан"],
 ["{0}: Flex is not supported","{0}: Flex не поддержан"],
 ["{0}: Batch is not confirmed","{0}: Batch не подтверждён"],
 ["{0}: choose a verified route or enter custom rates","{0}: выберите проверенный маршрут или введите свои цены"],
 ["Group {0} needs a whole number from 0 to 10000","В группе {0} укажите целое количество от 0 до 10000"],
 ["Invalid token usage: {0}","Некорректный расход {0}"],
 ["Invalid agent setting: {0}","Технический профиль: некорректный {0}"],
 ["Agent setting {0} must be a whole number","Технический профиль: {0} должен быть целым"],
 ["In scenario “{0}”, {1} had {2} paid subscriptions/seats and {3} active users. Migration set a single count of {4}. Other settings were preserved.","В сценарии «{0}» у {1} было {2} оплаченных подписок/мест и {3} активных пользователей. При переносе установлено единое количество {4}. Остальные параметры сохранены."],
 ["Per person: {0} / {1} credits per week; {2} / {3} in the busiest 5-hour window.","На человека: {0} / {1} credits в неделю; {2} / {3} в самое загруженное пятичасовое окно."],
 ["First-month bundles: {0} face value purchased for {1}. Remaining balance: {2}.","Пакеты первого месяца: номинал {0} куплен за {1}. Остаток: {2}."],
 ["Recurring bundles: {0} face value for {1}. Remaining balance: {2}.","Регулярные пакеты: номинал {0} за {1}. Остаток: {2}."],
 ["Forecast source: this scenario’s saved inputs and the pricing catalogue. {0}.","Источник прогноза: сохранённые параметры этого сценария и каталог цен. {0}."],
 ["{0} credits / week · {1} / 5h","{0} credits в неделю · {1} за 5 ч"]
];
// Match complete messages, keeping interpolated amounts, model names and user labels intact.
const researchRules=RESEARCH_TEMPLATES.map(pair=>pair.map(source=>{
 const slots=[];let last=0,pattern='';const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 for(const match of source.matchAll(/\{(\d+)\}/g)){pattern+=escape(source.slice(last,match.index))+'(.+?)';slots.push(Number(match[1]));last=match.index+match[0].length;}
 return {pattern:new RegExp('^'+pattern+escape(source.slice(last))+'$'),slots};
}));
export function translateResearchTemplate(text,language){
 const source=language==='en'?1:0,target=1-source;
 for(let i=0;i<researchRules.length;i++){const rule=researchRules[i][source],match=text.match(rule.pattern);if(!match)continue;const values={};rule.slots.forEach((slot,j)=>values[slot]=match[j+1]);return RESEARCH_TEMPLATES[i][target].replace(/\{(\d+)\}/g,(_,slot)=>values[slot]);}
 return undefined;
}
