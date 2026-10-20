import {RESEARCH_TRANSLATIONS,RESEARCH_EN,translateResearchTemplate} from './research-i18n.js';
// UI copy is separate from budgets. Never translate user-entered names or values.
export const UI_TRANSLATIONS = Object.fromEntries(`
Agents|Агенты
My team budget|Бюджет моей команды
New team budget|Новый бюджет команды
Skip to calculator|К калькулятору
Plan your team’s AI spend|Планируйте расходы команды на AI
Guide|Справка
File|Файл
Export JSON backup|Сохранить JSON
Import JSON|Импортировать JSON
Export spreadsheet (CSV)|Скачать таблицу (CSV)
Download offline calculator|Скачать автономный калькулятор
Print current view|Печать текущего экрана
Scenario|Сценарий
Current scenario|Текущий сценарий
Manage|Управление
New scenario|Новый сценарий
Rename|Переименовать
Duplicate|Дублировать
Undo last removal|Отменить последнее удаление
Delete scenario|Удалить сценарий
Team|Команда
Plans|Планы
Budget|Бюджет
Budget setup|Расчёт бюджета
Budget editor|Редактор бюджета
Step 1 of 3|Шаг 1 из 3
Step 2 of 3|Шаг 2 из 3
Step 3 of 3|Шаг 3 из 3
Who will use AI?|Кто будет пользоваться AI?
Count your developers by activity. We’ll use editable token estimates to get you started.|Укажите число разработчиков по активности. Для начала мы предложим редактируемую оценку расхода токенов.
Power users|Суперактивные
Regular users|Обычные
Light users|Малоактивные
Power + regular users|Суперактивные и обычные
All developers|Все разработчики
Manual workload|Ручной расход
Unused seats|Неиспользуемые места
Long agent runs, large codebases|Долгие агентские задачи, большие кодовые базы
Daily coding with an AI assistant|Ежедневный кодинг с AI-помощником
Occasional questions and small edits|Редкие вопросы и небольшие правки
Server agents|Серверные агенты
Shared bots, CI and unattended coding|Общие боты, CI и автономный кодинг
Agent accounts|Учётные записи агентов
Adjust token estimates|Изменить расход токенов
Example workloads, not provider allowances. Enter millions of tokens per person per working day. Input includes cached tokens; output includes billable reasoning.|Это пример нагрузки, а не лимиты провайдера. Введите миллионы токенов на человека за рабочий день. Вход включает кеш, выход — оплачиваемые токены рассуждений.
Input M / person / day|Вход, млн / человек / день
Output M / person / day|Выход, млн / человек / день
Input M / agent / day|Вход, млн / агент / день
Output M / agent / day|Выход, млн / агент / день
Schedule, currency & tax|Расписание, валюта и налог
Agent schedule & account rules|Расписание и правила учёток агентов
RUB per US dollar|Рублей за доллар США
RUB per $1|Рублей за $1
Working days / month|Рабочих дней в месяце
Working days / week|Рабочих дней в неделю
Start hour|Начало работы
End hour|Конец работы
Time zone · UTC offset|Часовой пояс · смещение UTC
Tax / surcharge, %|Налог / надбавка, %
Calculation date|Дата расчёта
Peak-hour assumptions|Параметры пиковых часов
Usage distribution|Распределение нагрузки
Evenly across working hours|Равномерно в рабочие часы
Custom peak share|Задать долю пика
Tokens used at peak time, %|Токены в пиковые часы, %
Defaults: 09:00–18:00 Moscow, Monday–Friday. Equal start/end means 24 hours. Peak-hour discounts affect usage, not the subscription price.|По умолчанию: 09:00–18:00 МСК, понедельник–пятница. Одинаковое время начала и конца означает 24 часа. Скидки по часам влияют на расход, а не на цену подписки.
Separate from developers. Default: 24/7, 30 days. A shared server normally needs API billing or an explicitly eligible service account.|Отдельно от разработчиков. По умолчанию: 24/7, 30 дней. Общему серверу обычно нужен API или разрешённая сервисная учётная запись.
Agent days / month|Дней работы агента в месяце
Agent days / week|Дней работы агента в неделю
Agent start hour|Начало работы агента
Agent end hour|Конец работы агента
Concurrent workers / account|Параллельных процессов на учётку
Account purpose|Назначение учётной записи
Shared team service|Общий сервис команды
Owner’s personal automation|Личная автоматизация владельца
Agent usage distribution|Распределение нагрузки агента
Evenly across schedule|Равномерно по расписанию
Agent tokens at peak, %|Токены агента в пик, %
Daily tokens already include all workers. Worker count does not multiply the bill or guarantee throughput.|Дневной расход уже включает все процессы. Их количество не умножает счёт и не гарантирует пропускную способность.
This saved scenario includes manually entered workloads. Changing this profile affects only plans linked to a team group.|В сценарии есть расход, введённый вручную. Изменение профиля влияет только на планы, связанные с группой команды.
This legacy profile is shared by your original scenarios. New scenarios have their own profile.|Старые сценарии используют общий профиль. Новые сценарии имеют собственный профиль.
You can adjust these estimates later.|Эти оценки можно изменить позже.
See recommendation|Посмотреть рекомендацию
Choose how your team works.|Выберите подходящий набор планов.
We’ve compared eligible plans for your team. Review the reasons, then use the recommendation.|Мы сравнили подходящие планы для команды. Посмотрите объяснения и примените рекомендацию.
Your current setup is saved. Open a plan to edit it, or compare a recommended alternative.|Текущий набор сохранён. Откройте план для изменения или посмотрите рекомендуемую альтернативу.
Find a cost-effective alternative|Подобрать более выгодный вариант
Recommended setup|Рекомендуемый набор
Recommended for your profile|Рекомендация для вашего профиля
First month, including prepayment|Первый месяц с учётом предоплаты
Subscription commitment|Период подписки
Annual · lower monthly rate, paid upfront|Год · дешевле в месяц, оплата вперёд
Monthly · no annual commitment|Месяц · без годового обязательства
Adjust models & requirements|Модели и требования
Developer model mix|Соотношение моделей для разработчиков
Server model|Модель для сервера
Expected cached input, %|Ожидаемый кеш входа, %
Require GLM Team seats for every developer|GLM Team для каждого разработчика
Keep Codex Business for power + regular users (10% of their workload)|Codex Business для активных разработчиков (10% их нагрузки)
Allow paid overage or switching to a separate API key after quota|Разрешить доплату или отдельный API после исчерпания квоты
The comparison uses your team profile and this model mix. It does not import existing custom allocations, negotiated prices or discounts.|Сравнение использует профиль команды и выбранные модели. Ручное распределение, договорные цены и скидки текущего сценария не переносятся.
Direct API|Прямой API
No purchase. Everything stays editable.|Без покупки. Все параметры можно изменить.
Save as a new scenario|Сохранить новым сценарием
Your current scenario stays unchanged.|Текущий сценарий останется без изменений.
How this recommendation is chosen|Как выбрана рекомендация
Choose a setup manually|Выбрать планы вручную
Use recommended setup|Применить рекомендацию
Back to team|Назад к команде
Let’s check the requirements.|Проверьте требования.
Edit team profile|Изменить профиль команды
This group’s subscription is part of the least-cost eligible combination and fits its own weekly and 5-hour quotas.|Этот план входит в самый выгодный допустимый набор и покрывает недельную и пятичасовую нагрузку группы.
The least-cost eligible team combination meeting your seat requirement. This group fits its own weekly and 5-hour quotas.|Самый выгодный командный набор с нужными местами. Группа укладывается в недельные и пятичасовые квоты.
At this group’s token volume, direct API costs less than the cheapest eligible personal subscription, including any modeled fallback.|При таком расходе прямой API дешевле самой доступной подходящей личной подписки с учётом доплат.
A separate API account funds unattended work without sharing a developer’s subscription. Uses the agent’s own schedule.|Отдельный API оплачивает автономную работу без общей подписки разработчика. Используется расписание агента.
The subscription plus separate API fallback is cheaper in the selected combination. When quota runs out, switch to a Standard API key; this is not automatic overage.|Подписка с отдельным API выгоднее в выбранном наборе. После исчерпания квоты нужно переключиться на Standard API key; автоматической доплаты нет.
The seat plus enabled Team overage is cheaper in the selected combination. Extra usage is budgeted at API list rates.|Место с включённой доплатой Team выгоднее в выбранном наборе. Перерасход рассчитан по опубликованным API-тарифам.
Kept because you requested Codex: 10% of active users’ workload, with 90% left on the selected model mix. Included allowance is unknown, so cost remains a range.|Codex добавлен по вашему выбору: 10% нагрузки активных пользователей, остальные 90% — выбранные модели. Включённая квота неизвестна, поэтому стоимость показана диапазоном.
Direct API has a published token price. Subscription allowances for this model are not fixed token quotas, so they cannot be ranked reliably from the profile alone.|У прямого API опубликована цена токена. Квота подписки для этой модели не фиксирована в токенах, поэтому одного профиля недостаточно для надёжного сравнения.
Codex allowance is unknown. The range uses the existing $0.04/credit assumption, not a guaranteed spending cap.|Квота Codex неизвестна. Диапазон рассчитан с допущением $0.04 за credit и не является гарантированным потолком счёта.
OpenAI / Claude subscriptions may be cheaper if they cover your workload. Their included token allowances are unknown, so we do not rank them as guaranteed savings.|Подписки OpenAI / Claude могут быть выгоднее, если покрывают нагрузку. Их токенные квоты неизвестны, поэтому гарантированную экономию мы не обещаем.
Team management is required; direct API may cost less.|Выбрано командное управление; прямой API может быть дешевле.
Direct API is already the lowest priced eligible option.|Прямой API уже является самым дешёвым подходящим вариантом.
Start with a setup|Выберите начальный набор
Team subscriptions|Командные подписки
GLM Team for developers, Codex for power and regular users. Server agents use API.|GLM Team разработчикам, Codex — активным. Серверные агенты используют API.
Lower-cost hybrid|Экономный гибрид
Personal GLM for frequent coding, API for light users and server agents.|Личный GLM для частого кодинга, API — малоактивным и серверам.
Build your own|Собрать свой набор
Choose subscriptions and API accounts individually.|Выберите подписки и API по отдельности.
Subscription billing|Оплата подписки
Annual · lower monthly equivalent, paid upfront|Год · ниже стоимость в месяц, предоплата
Monthly · no annual prepayment|Месяц · без годовой предоплаты
Choose first plan|Выбрать первый план
Use this setup|Применить набор
Uses your team profile. You can edit every plan before reviewing the budget.|Используется профиль команды. Любой план можно изменить перед просмотром бюджета.
Add a subscription or API|Добавить подписку или API
Back|Назад
Review budget|Посмотреть бюджет
Edit|Изменить
Label (optional)|Название (необязательно)
Who uses this?|Кто использует?
Subscription|Подписка
API billing|Оплата API
Direct provider API|API напрямую у провайдера
Billing period|Период оплаты
Monthly|Ежемесячно
Quarterly|Ежеквартально
Annual · paid upfront|Ежегодно · предоплата
Share of this group’s workload, %|Доля нагрузки группы, %
Subscriptions|Количество подписок
Users / accounts|Пользователи / учётки
One subscription per person. This manual workload is independent of the team profile.|Одна подписка на человека. Ручной расход не зависит от профиля команды.
Each seat has its own quota. All GLM seats in one team must use the same tier.|У каждого места своя квота. Все места одной GLM Team должны иметь одинаковый тариф.
Token period|Период расхода токенов
Per person / day|На человека в день
Per person / month|На человека в месяц
Whole line / month|На всю позицию в месяц
Total input, M tokens|Всего входа, млн токенов
Total output, M tokens|Всего выхода, млн токенов
Models & token allocation|Модели и распределение токенов
Input includes cache. Shares must total 100%.|Вход включает кеш. Сумма долей должна быть 100%.
Model shares|Доли моделей
Exact tokens|Точные токены
Add model|Добавить модель
Limits, discounts & advanced billing|Лимиты, скидки и параметры оплаты
Quota check & calculation detail|Проверка квот и детали расчёта
Duplicate plan|Дублировать план
Remove plan|Удалить план
Done|Готово
Model|Модель
Share, %|Доля, %
Input, M tokens|Вход, млн токенов
Output, M tokens|Выход, млн токенов
Cached input, %|Кешированный вход, %
API equivalent / month|Эквивалент API в месяц
Provider route|Маршрут провайдера
Cache, speed & custom rates|Кеш, скорость и свои тарифы
Cache writes, % of misses|Запись кеша, % промахов
Claude cache TTL|Время хранения кеша Claude
5 minutes|5 минут
1 hour|1 час
Processing mode|Режим обработки
Standard|Стандартный
Selected route rate|Тариф выбранного маршрута
Long context, % (no surcharge)|Длинный контекст, % (без надбавки)
US-only inference surcharge, %|Надбавка за обработку только в США, %
Regional surcharge, %|Региональная надбавка, %
Input includes cache. Output includes billable reasoning. Long-context share applies to tokens in individual requests above the threshold.|Вход включает кеш, выход — оплачиваемые рассуждения. Доля длинного контекста относится к токенам в запросах выше порога.
Input $/M|Вход, $/млн
Cache write $/M|Запись кеша, $/млн
Cache read $/M|Чтение кеша, $/млн
Output $/M|Выход, $/млн
Reset rates|Сбросить тарифы
Custom rates replace catalogue prices; time discounts are not applied again.|Свои тарифы заменяют каталог; скидки по часам повторно не применяются.
Billing type|Способ оплаты
Subscription / Codex workspace|Подписка / рабочее пространство Codex
Account / organisation / team|Аккаунт / организация / команда
Other services, $/month|Другие сервисы, $/месяц
Confirmed credit, $/month|Подтверждённый кредит, $/месяц
All direct DeepSeek usage falls on a confirmed Chinese public holiday|Весь расход прямого DeepSeek приходится на подтверждённый праздник в Китае
Extra subscriptions with no usage|Дополнительные подписки без расхода
Of total subscriptions: unused|Из всех подписок: неиспользуемые
Custom seat price, $/month equivalent|Своя цена места, $/месяц
Catalogue price|Цена из каталога
Additional recurring discount, %|Дополнительная постоянная скидка, %
First-payment discount, %|Скидка первого платежа, %
First-payment discount expiry|Окончание скидки первого платежа
First-purchase eligibility and discount stacking confirmed at checkout|Право на первую покупку и суммирование скидок подтверждены при оплате
Annual and quarterly discounts are already in the seat price. Custom prices are monthly equivalents; upfront payment is multiplied by the billing period.|Скидка за год или квартал уже учтена в цене места. Свои цены задаются за месяц; предоплата умножается на период оплаты.
USD / Codex credit · contract rate|USD / Codex credit · по договору
Credit rate confirmed for this workspace|Цена credit подтверждена для этого пространства
Service-account PAYG has no included allowance. Enter any contractual fixed fee separately.|У сервисного PAYG нет включённой квоты. Фиксированный платёж по договору задаётся отдельно.
When quota is exceeded|При превышении квоты
Stop · no paid fallback|Остановка · без платного продолжения
Team overage enabled|Доплата Team включена
Separate PAYG fallback|Отдельный API при перерасходе
Other credits / person / week|Прочие credits / человек / неделя
Apply current 10% Team overage offer (no announced end date)|Применить скидку 10% на перерасход Team (дата окончания неизвестна)
Coding Plan keys use seat quotas. Standard API keys bill separately. Quota is shared across models within one seat, not between people.|Ключи Coding Plan используют квоту места. Standard API оплачивается отдельно. Модели одного места делят квоту, разные люди — нет.
Included usage|Включённый расход
Unknown · show cost range|Неизвестен · показать диапазон
Use measured coverage|Использовать измеренное покрытие
Workload covered by subscription, %|Нагрузка, покрытая подпиской, %
USD / Codex credit · assumption|USD / Codex credit · допущение
Codex credit price confirmed for my account|Цена Codex credit подтверждена для моего аккаунта
Coverage is your measurement for this workload, not a provider guarantee.|Покрытие — ваш замер для этой нагрузки, а не гарантия провайдера.
Claude paid usage bundles|Платные пакеты расхода Claude
$50 bundles purchased for $45|Пакеты $50 за $45
$250 bundles purchased for $200|Пакеты $250 за $200
$1,000 bundles purchased for $700|Пакеты $1 000 за $700
Balance carryover, months · assumption|Перенос остатка, месяцев · допущение
Purchase this number of bundles every month|Покупать столько пакетов каждый месяц
OpenRouter plan|План OpenRouter
BYOK · own provider keys|BYOK · свои ключи провайдеров
Top-ups / month|Пополнений в месяц
Minimum fee / top-up, $|Минимальная комиссия пополнения, $
Unconfirmed|Не подтверждено
BYOK provider discount, %|Скидка провайдера BYOK, %
Other BYOK list-price usage / month, $|Другой BYOK-расход по прайсу за месяц, $
Startup programme approved for this account|Программа Startup одобрена для аккаунта
Startup approval date|Дата одобрения Startup
Remaining Startup grant, $|Остаток гранта Startup, $
Integration · Claude bonus eligibility|Интеграция · применимость бонуса Claude
Own API / SDK / headless with API key|Свой API / SDK / headless с API-ключом
Official Claude Code GitHub Action|Официальный Claude Code GitHub Action
Claude API bonus source|Источник бонуса Claude API
Do not apply|Не применять
Claim, 7-day wait and linked Console eligibility confirmed|Активация, ожидание 7 дней и связь Console подтверждены
Confirmed one-time credit, $|Подтверждённый разовый кредит, $
One-time credit expiry|Срок разового кредита
Without an expiry, one-time credit is used only in the first month. Unused balances are not cash refunds.|Без срока разовый кредит применяется только в первом месяце. Неиспользованный остаток не является возвратом денег.
Your budget, explained.|Ваш бюджет в деталях.
See the monthly estimate, the first-month cash requirement, and the assumptions that affect both.|Посмотрите месячную стоимость, первый платёж и влияющие на них допущения.
Estimated monthly budget|Оценка бюджета в месяц
Annual subscriptions shown as a monthly equivalent.|Годовые подписки показаны в пересчёте на месяц.
First month · includes prepayment|Первый месяц · с предоплатой
12-month forecast · current rates|Прогноз на 12 месяцев · текущие тарифы
What you’re paying for|Из чего складывается бюджет
Edit plans|Изменить планы
Schedule, currency & calculation assumptions|Расписание, валюта и допущения
Back to plans|Назад к планам
Compare saved scenarios|Сравнить сценарии
Why a range?|Почему диапазон?
Included subscription usage is not published as a fixed token allowance. The upper estimate adds the entered workload at your overage rates; it is not a guaranteed bill cap.|Квота подписки не опубликована в токенах. Верхняя оценка добавляет весь введённый расход по тарифу доплаты; это не гарантированный потолок счёта.
Check inputs|Проверьте ввод
Check inputs before using this budget.|Проверьте параметры перед использованием бюджета.
The full workload is not covered.|Не вся нагрузка покрыта.
A quota is exceeded without a paid fallback. This total does not fund all entered work.|Квота превышена, платное продолжение не включено. Итог не покрывает всю введённую работу.
A server account needs a different billing route.|Для серверной учётки нужен другой способ оплаты.
The selected subscription does not establish eligibility for a shared team bot. Review its account rules.|Выбранная подписка не подтверждает право на общего бота команды. Проверьте правила учётной записи.
Review workload allocation.|Проверьте распределение нагрузки.
Your budget needs a plan.|Добавьте план для расчёта бюджета.
Add a subscription or API account to calculate costs.|Добавьте подписку или API для расчёта стоимости.
Choose plans|Выбрать планы
Compare alternatives|Сравнение вариантов
Which setup fits your budget?|Какой набор подходит по бюджету?
Each scenario is a separate alternative. Check the people, workload and models before comparing prices.|Каждый сценарий — отдельный вариант. Перед сравнением цен проверьте людей, нагрузку и модели.
No plans yet|Планы не добавлены
Incomplete|Неполный
Invalid input|Ошибка ввода
Workload not covered|Нагрузка не покрыта
Quota uncertain|Квота неизвестна
Estimate|Оценка
Open budget|Открыть бюджет
Back to budget|Назад к бюджету
Create another scenario|Создать ещё сценарий
Reference|Справочник
Details when you need them.|Детали, когда они нужны.
The core calculation is unchanged. Provider research and original notes remain available below.|Формулы расчёта сохранены. Ниже доступны исследование провайдеров и исходные заметки.
Quick guide|Краткая инструкция
Prices & offers|Цены и акции
Server accounts|Серверные учётки
Method & sources|Методика и источники
Three steps to a useful estimate|Три шага к полезной оценке
Team:|Команда:
Plans:|Планы:
Budget:|Бюджет:
count people and agents. Default token workloads are examples; replace them with measured usage when available.|укажите людей и агентов. Расход по умолчанию — пример; замените его замерами, когда они появятся.
choose a starting setup, then edit the groups, billing and models.|выберите набор, затем настройте группы, оплату и модели.
review monthly cost and upfront cash. Compare alternatives separately.|проверьте месячную стоимость и предоплату. Сравнивайте варианты отдельно.
Three terms to know|Три основных понятия
Subscription:|Подписка:
a recurring plan per person, with its own usage limits.|регулярный платёж на человека со своими лимитами.
metered input and output tokens, plus applicable fees.|оплата входных и выходных токенов с комиссиями.
Workload share:|Доля нагрузки:
how much of a group’s usage goes to a plan. Across plans, aim for 100% for each group.|какая часть расхода группы идёт на план. Сумма по всем планам группы должна составлять 100%.
Saved in this browser. Use File → Export JSON for a backup, or Download offline calculator for a standalone copy.|Данные сохраняются в браузере. Сделайте копию через «Файл → Сохранить JSON» или скачайте автономный калькулятор.
Notes about older saved scenarios|Заметки о старых сценариях
Estimates only. No API keys or paid requests.|Только оценка. Без API-ключей и платных запросов.
Add a plan|Добавить план
Close dialog|Закрыть окно
Close|Закрыть
Who is it for?|Для кого?
How do you want to pay?|Как оплачивать?
By usage (API)|По расходу (API)
Plan or provider|План или провайдер
Subscriptions are per person. A shared server generally needs an API account.|Подписка оформляется на человека. Общему серверу обычно нужен API.
Add plan|Добавить план
Rename scenario|Переименовать сценарий
Scenario name|Название сценария
Custom API rates|Свои тарифы API
Scenarios imported|Сценарии импортированы
Offline calculator downloaded with your scenarios|Автономный калькулятор скачан вместе со сценариями
Local saving is unavailable. Export a JSON backup.|Локальное сохранение недоступно. Скачайте JSON-копию.
Recommended setup added. Review the budget and assumptions.|Рекомендация добавлена. Проверьте бюджет и допущения.
Check your team profile first.|Сначала проверьте профиль команды.
Check your profile and requirements first.|Сначала проверьте профиль и требования.
You can save up to 30 scenarios.|Можно сохранить до 30 сценариев.
A scenario can contain up to 50 plans.|В сценарии может быть до 50 планов.
Choose a supported model mix.|Выберите допустимый набор моделей.
Choose monthly or annual billing.|Выберите месячную или годовую оплату.
Cache must be between 0 and 100%.|Доля кеша должна быть от 0 до 100%.
Choose a supported server model.|Выберите доступную модель сервера.
Add at least one developer or server agent.|Добавьте хотя бы одного разработчика или агента.
GLM Team requires a GLM model mix.|Для GLM Team нужны модели GLM.
Codex Business needs 2–200 power and regular users. Change the profile or turn off Keep Codex.|Codex Business требует от 2 до 200 активных разработчиков. Измените профиль или отключите Codex.
No eligible setup covers this workload with these requirements. Allow API fallback or relax the team-seat requirement.|Ни один подходящий набор не покрывает эту нагрузку. Разрешите отдельный API или снимите требование командных мест.
Budget analytics|Аналитика бюджета
12-month spending|Расходы за 12 месяцев
Cumulative|Накопительно
By month|По месяцам
Break down by|Разбивка
User groups|Группы пользователей
Providers|Провайдеры
Models|Модели
Currency|Валюта
Spending basis|Основа расчёта
Cash payments|Денежные платежи
Monthly equivalent|Стоимость за месяц
Spending map|Карта расходов
12-month total|Итого за 12 месяцев
Largest category|Самая большая категория
Highest payment month|Месяц максимального платежа
Annual subscriptions are paid upfront. This chart follows payment timing.|Годовые подписки оплачиваются вперёд. График показывает сроки платежей.
Subscription fees are spread over their billing period; this is not a payment schedule.|Плата за подписку распределена по периоду; это не график платежей.
Colored areas use the upper estimate. The dashed line shows the lower estimate, not a confidence interval.|Цветные области показывают верхнюю оценку, пунктир — нижнюю. Это не доверительный интервал.
Tile area shows each category’s share of the 12-month upper estimate.|Площадь блока соответствует доле категории в верхней оценке за 12 месяцев.
Plan fees & shared costs|Плата за планы и общие расходы
Custom provider|Свой провайдер
Other services|Другие сервисы
No spending to plot.|Нет расходов для графика.
Fix the inputs to see analytics.|Исправьте ввод для просмотра аналитики.
The charts include only costs currently funded by this setup; some workload is uncovered.|Графики показывают только оплаченный этим набором расход; часть нагрузки не покрыта.
View monthly data|Таблица по месяцам
Month|Месяц
Monthly total|Итого за месяц
Cumulative total|Накопительный итог
Total|Итого
How costs are allocated|Как распределяются расходы
Seat charges follow user counts; metered costs follow each group’s modeled usage. Manual workloads remain separate. Unused seats are shown separately.|Плата за места распределена по числу пользователей, переменные затраты — по расходу групп. Ручная нагрузка и неиспользуемые места показаны отдельно.
Fixed subscription fees, prepaid bundles and other services stay in “Plan fees & shared costs”; they are not claimed as model-specific usage.|Фиксированная плата, предоплаченные пакеты и другие сервисы остаются в категории «Плата за планы и общие расходы» и не выдаются за расход отдельных моделей.
Category allocation is an estimate: credits and shared fees are distributed in proportion to modeled costs. Totals exactly match the forecast; no future price changes or workload growth are assumed.|Разбивка оценочная: кредиты и общие комиссии распределяются пропорционально расходам. Итоги совпадают с прогнозом; изменение тарифов и рост нагрузки не предполагаются.
OpenRouter is the billing provider for hosted routes; BYOK usage is assigned to the upstream provider and platform fees to OpenRouter.|Для маршрутов OpenRouter плательщик видит OpenRouter; BYOK-расход относится к исходному провайдеру, комиссия — к OpenRouter.
Use the month markers or a tile to inspect amounts. Exact values are in the table.|Выберите отметку месяца или блок, чтобы увидеть суммы. Точные значения доступны в таблице.
Upper estimate|Верхняя оценка
Lower estimate|Нижняя оценка
of 12-month spending|расходов за 12 месяцев
Forecast source: this scenario’s saved inputs and the pricing catalogue.|Источник прогноза: параметры этого сценария и каталог тарифов.
Check this plan’s inputs.|Проверьте параметры этого плана.
Unable to calculate|Не удалось рассчитать
No users in this group. This plan adds no cost.|В группе нет пользователей. План не добавляет расходов.
Group|Группа
Credits / week|Credits в неделю
Peak 5-hour window|Пиковое пятичасовое окно
Status|Статус
Over quota|Квота превышена
Within quota|В пределах квоты
Included quota unknown|Включённая квота неизвестна
Based on entered assumptions|По введённым допущениям
Token cost breakdown · API equivalent|Стоимость токенов · эквивалент API
API equivalent is a comparison. These tokens are not charged again on top of an included subscription allowance.|Эквивалент API нужен для сравнения. Эти токены не оплачиваются повторно сверх включённой квоты подписки.
Input|Вход
Output|Выход
Cache write|Запись кеша
Cache read|Чтение кеша
Enter people and usage manually|Задать людей и расход вручную
Separate API billing for automation.|Отдельная оплата API для автоматизации.
Check the account and billing conditions.|Проверьте условия учётки и оплаты.
Check subscription automation eligibility.|Проверьте допустимость автоматизации на подписке.
This route is not established for a shared team bot.|Этот способ не подтверждён для общего бота команды.
Account guide|Правила учётных записей
Provider account rules & sources|Правила провайдера и источники
Other models are compared through their own API prices. Models are never swapped to claim savings. OpenRouter first-party routes add fees to the same rates; discounted alternative hosts are outside this comparison because quality, quantization and availability can differ. Claude/OpenAI included quotas are not treated as free unlimited tokens.|Другие модели сравниваются по их собственным API-тарифам. Модели не подменяются ради экономии. Прямые маршруты OpenRouter добавляют комиссии к тем же ставкам. Другие хосты со скидками не сравниваются: качество, квантизация и доступность могут отличаться. Квоты Claude/OpenAI не считаются бесплатными безлимитными токенами.
Lowest modeled recurring cost among the eligible combinations checked, for the selected models and billing period. Not a model-quality or throughput ranking. Compares GLM Lite/Pro/Max, Team Standard/Premium and direct API where compatible. Seat minima, one tier per GLM team, weekly and 5-hour quotas are enforced. Over-quota plans need the fallback option.|Минимальная расчётная стоимость среди проверенных допустимых наборов для выбранных моделей и периода оплаты. Это не рейтинг качества или скорости. Сравниваются совместимые GLM Lite/Pro/Max, Team Standard/Premium и прямой API. Учитываются минимум мест, единый тариф GLM Team, недельные и пятичасовые квоты. При превышении нужна платная альтернатива.
GLM quota & seat rules|Квоты и места GLM
GLM API prices|Цены GLM API
DeepSeek rates & hours|Тарифы и часы DeepSeek
Bonus excludes OAuth headless, interactive Code, the official Code GitHub Action and subscription overage. Team grants cap at $500/org; personal grants are not automatically multiplied by seats.|Бонус не покрывает OAuth headless, интерактивный Code, официальный Code GitHub Action и перерасход подписки. Лимит Team — $500 на организацию; личные бонусы не умножаются автоматически на места.
Counts are for this whole plan. Personal discounted face-value cap: $2,000/account/month; Team: $3,000/workspace/month. Unused credit is not a cash refund. Default carryover is one month; confirm your account terms.|Количество задаётся на весь план. Лимит номинала со скидкой: $2 000 на личный аккаунт в месяц, $3 000 на Team в месяц. Остаток не возвращается деньгами. Перенос по умолчанию — один месяц; проверьте условия аккаунта.
BYOK’s $25,000 threshold is shared by lines with the same organisation. Endpoint rates already include published route discounts.|Порог BYOK $25 000 общий для позиций одной организации. Ставки endpoint уже включают опубликованные скидки маршрута.
Grant usually lasts 6 months; fee waiver lasts 12. The grant does not pay an external BYOK provider invoice.|Грант обычно действует 6 месяцев, отмена комиссии — 12. Грант не оплачивает счёт внешнего BYOK-провайдера.
You can save up to 30 scenarios. Export or remove an alternative first.|Можно сохранить до 30 сценариев. Сначала экспортируйте или удалите лишний вариант.
Scenario removed. Restore it with Manage → Undo last removal.|Сценарий удалён. Восстановите его через «Управление → Отменить последнее удаление».
Plan removed. Restore it with Manage → Undo last removal.|План удалён. Восстановите его через «Управление → Отменить последнее удаление».
Exact tokens use manual workload. To reconnect the profile, choose a team group.|Точные токены используют ручной расход. Для привязки профиля выберите группу команды.
Shares are based on input tokens. Review the new input/output mix.|Доли рассчитаны по входным токенам. Проверьте соотношение входа и выхода.
Some inputs need attention. Open the affected plan or review the budget.|Некоторые параметры требуют проверки. Откройте соответствующий план или бюджет.
Try fewer GLM seats|Попробовать меньше мест GLM
Create a separate scenario with the same workload. Your current budget stays saved.|Создайте отдельный сценарий с той же нагрузкой. Текущий бюджет останется сохранённым.
GLM API for light users|GLM API для малоактивных
All GLM through API|Весь GLM через API
Highest monthly cost|Самая высокая стоимость месяца
First-payment subscription discounts appear only in Cash payments.|Скидки первого платежа за подписку отражены только в денежных платежах.
Custom model / rates|Своя модель / тариф
Custom / Enterprise / legacy subscription|Своя / Enterprise / legacy подписка
Model shares must total exactly 100%|Доли моделей должны давать ровно 100%
Add at least one model|Добавьте хотя бы одну модель
People and subscriptions must be whole numbers|Количество людей и подписок должно быть целым
More active users than paid seats|Активных пользователей больше оплаченных мест
Seat price must be nonnegative|Цена места должна быть неотрицательной
This plan does not support the selected billing period|У плана нет выбранного периода оплаты
Minimum fee must be nonnegative|Minimum fee должен быть неотрицательным
Model not found in the catalogue|Модель отсутствует в каталоге
Enter manual rates for a custom model.|Для своей модели заполните ручные ставки.
Invalid scenario|Некорректный сценарий
Invalid line|Некорректная позиция
File exceeds 2 MB|Файл больше 2 MB
Invalid JSON key|Недопустимый ключ в JSON
Source|Источник
Choose plans|Выбрать планы
Choose your setup|Выберите подход
Get a recommendation or build one plan at a time.|Получите рекомендацию или добавляйте планы по одному.
Use a recommendation|Использовать рекомендацию
We compare costs for your team and suggest a setup.|Сравним стоимость для вашей команды и предложим набор планов.
Review the price, then apply.|Посмотрите цену и примените.
Build my own|Собрать самостоятельно
Choose people, plans and models in four steps.|Выберите людей, планы и модели за четыре шага.
Add one plan at a time.|Добавляйте по одному плану.
Saved setup|Сохранённый набор
Edit saved setup|Редактировать планы
Your plans|Ваши планы
Edit a plan or add another.|Измените план или добавьте ещё один.
Change setup|Выбрать подход
Add another plan|Добавить ещё план
Lowest modeled cost for the selected models and workload.|Минимальная расчётная стоимость для выбранных моделей и нагрузки.
Save alternative|Сохранить альтернативу
Build your setup|Соберите набор
People|Люди
Usage|Нагрузка
Review|Проверка
Plan setup steps|Шаги настройки плана
Team group|Группа команды
People / accounts|Люди / аккаунты
agent accounts|аккаунтов агентов
people from your team|человек из вашей команды
Each plan covers one group. You can add more plans later.|Каждый план покрывает одну группу. Позже можно добавить другие.
How will you pay?|Как будете платить?
Payment type|Тип оплаты
Per person, with usage limits|За человека, с лимитами расхода
Pay for tokens used|За использованные токены
Provider|Провайдер
Monthly price / seat, USD|Цена места в месяц, USD
/ person / month|/ человек / месяц
Paid upfront for the billing period.|Предоплата за весь период.
Shared agents usually need API billing. Check this plan’s account rules before using it.|Общим агентам обычно нужен API. Проверьте правила аккаунта для этого плана.
Set the workload|Укажите нагрузку
Token estimates come from your team profile.|Расход токенов берётся из профиля команды.
Model shares must total 100%. All token volumes are in millions.|Сумма долей моделей — 100%. Объёмы токенов указаны в миллионах.
When the quota runs out|Когда закончится квота
Paid Team overage|Платный перерасход Team
Advanced rates and discounts are available after adding the plan.|Расширенные тарифы и скидки доступны после добавления плана.
Review this plan|Проверьте план
Estimated monthly cost|Расчётная стоимость в месяц
First payment|Первый платёж
This plan does not cover all entered usage. Go back and enable paid fallback or choose a larger plan.|План не покрывает весь расход. Вернитесь и включите платный перерасход или выберите план с большей квотой.
Included quota is unknown; this is a cost range.|Включённая квота неизвестна; показан диапазон стоимости.
Some workload is counted more than once. Adjust each plan’s workload share.|Часть нагрузки учтена повторно. Измените долю нагрузки в каждом плане.
Personal GLM fallback needs a separate API key and manual switching.|Для перерасхода личного GLM нужен отдельный API-ключ и ручное переключение.
Quota and provider details|Квота и условия провайдера
Continue|Продолжить
Cancel|Отмена
Plan added.|План добавлен.
Choose a group with people, or enter a positive whole number.|Выберите непустую группу или укажите положительное целое количество.
Choose a provider.|Выберите провайдера.
Choose a subscription.|Выберите подписку.
Choose a supported billing period.|Выберите доступный период оплаты.
Enter a nonnegative monthly seat price.|Укажите неотрицательную цену места в месяц.
Complete the usage fields.|Заполните поля расхода.
Enter model shares and cache percentages.|Укажите доли моделей и процент кеша.
Enter all four custom token prices.|Укажите все четыре цены токенов.
Separate API billing for unattended work.|Отдельная оплата API для автономной работы.
Codex for active users; allowance varies.|Codex для активных; квота зависит от расхода.
Pay only for this group’s usage.|Оплата только за расход этой группы.
Team seats plus paid overage.|Места Team и платный перерасход.
Subscription plus separate API fallback.|Подписка и отдельный API для перерасхода.
Fits this group’s weekly and 5-hour quotas.|Укладывается в недельную и пятичасовую квоты группы.
Subscription quotas for these models are unknown; API is used for comparison.|Квоты подписок для этих моделей неизвестны; сравнение проводится по API.
Saves as a new scenario.|Сохранится отдельным сценарием.
Why these plans?|Почему эти планы?
Remove model|Удалить модель
Custom|Свой вариант
Metered workspace credits. Confirm the credit price in your contract.|Расход по credits рабочего пространства. Проверьте цену credit в договоре.
Codex · service account PAYG|Codex · сервисный аккаунт PAYG
Workspace settings|Настройки рабочего пространства
Team / workspace name|Название команды / рабочего пространства
Use the same name for seats in one team.|Для мест одной команды используйте одинаковое название.
Your choices|Ваш выбор
Edit people|Изменить людей
Edit plan|Изменить план
Edit usage|Изменить нагрузку
people / accounts|чел. / аккаунтов
of group workload|нагрузки группы
Cache|Кеш
All model details|Все параметры моделей
Metered workspace credits|Расход по credits рабочего пространства
Workspace|Рабочее пространство
`.trim().split('\n').map(line=>line.split('|')));
Object.assign(UI_TRANSLATIONS,RESEARCH_TRANSLATIONS);
const UI_REVERSE=Object.fromEntries(Object.entries(UI_TRANSLATIONS).map(([en,ru])=>[ru,en]));
export function translateUI(text,language='en'){
 const raw=String(text),trim=raw.trim();if(!trim)return raw;
 let translated=language==='ru'?UI_TRANSLATIONS[trim]:(RESEARCH_EN[trim]??UI_REVERSE[trim]);
 if(translated===undefined)translated=translateResearchTemplate(trim,language);
 if(translated===undefined){
  for(const [en,ru] of [['Import rejected: ','Импорт отклонён: '],['Saved scenario could not be loaded: ','Не удалось загрузить сценарий: ']]){const prefix=trim.startsWith(en)?en:trim.startsWith(ru)?ru:null;if(prefix){translated=(language==='en'?en:ru)+translateUI(trim.slice(prefix.length),language);break;}}
 }
 if(translated===undefined){
  const wrappers=language==='en'?[[/^Позиция (\d+): (.+)$/,(m)=>'Line '+m[1]+': '+translateUI(m[2],language)],[/^Позиция содержит ошибки: (.+)$/,(m)=>'Line contains errors: '+translateUI(m[1],language)]]:[[ /^Line (\d+): (.+)$/,(m)=>'Позиция '+m[1]+': '+translateUI(m[2],language)],[/^Line contains errors: (.+)$/,(m)=>'Позиция содержит ошибки: '+translateUI(m[1],language)]];
  for(const [pattern,replace] of wrappers){const match=trim.match(pattern);if(match){translated=replace(match);break;}}
 }
 if(translated===undefined){translated=trim;
  if(language==='ru'){
   const rules=[
    [/^Check your entries: /,'Проверьте параметры: '],
    [/^Saved in this browser · Pricing snapshot (.+)$/,'Сохранено в браузере · Тарифы на $1'],
    [/^Estimated monthly usage: (.+)M input · (.+)M output$/,'Расход в месяц: $1 млн входа · $2 млн выхода'],
    [/(\d[\d., \u00a0]*)% of the profile workload is assigned\./g,'распределено $1% нагрузки профиля.'],
    [/This counts some usage more than once\./g,'Часть расхода учитывается повторно.'],[/Some usage is unassigned; manual plans may cover it separately\./g,'Часть нагрузки не распределена; её могут покрывать ручные планы.'],
    [/^(.+) (people|agent accounts?) from your profile\. Seat count follows the group; workload share only changes tokens\.$/,'$1 из профиля. Число мест соответствует группе; доля нагрузки меняет только токены.'],
    [/^Team size: (\d+) minimum/,'Размер команды: минимум $1'],[/ · (\d+) maximum/g,' · максимум $1'],[/ · no published upper seat limit/g,' · верхний предел не опубликован'],
    [/^Saves (.+)\/month vs (.+)\.$/,'Экономия $1/месяц относительно $2.'],[/same models via direct api/g,'тех же моделей через прямой API'],[/selected mix via api \+ same codex seats/g,'выбранных моделей через API с теми же местами Codex'],
    [/^(\d+) valid combinations checked · annual monthly equivalents$/,'Проверено вариантов: $1 · годовая цена в пересчёте на месяц'],[/^(\d+) valid combinations checked · monthly billing$/,'Проверено вариантов: $1 · месячная оплата'],
    [/Same group via API: /g,'Та же группа через API: '],[/Personal-plan comparison: /g,'Личная подписка: '],[/\/month\./g,'/месяц.'],
    [/^Uses your schedule, tax and FX, with the catalogue snapshot (.+)\. No unconfirmed promotion, grant or negotiated discount is assumed\. Quotas assume evenly spread usage; bursts, rate limits, coding quality and country\/account eligibility still need checking\. Infrastructure, tools and future search fees are not automatically included\.$/,'Используются расписание, налог и курс профиля, каталог на $1. Неподтверждённые акции, гранты и договорные скидки не предполагаются. Квоты рассчитаны для равномерной нагрузки; всплески, лимиты запросов, качество и доступность в стране требуют проверки. Инфраструктура, инструменты и будущие сборы за поиск не включены автоматически.'],
    [/^Per person: (.+) credits per week; (.+) in the busiest 5-hour window\.$/,'На человека: $1 credits в неделю; $2 в самое загруженное пятичасовое окно.'],[/^Direct API equivalent: /,'Эквивалент прямого API: '],[/^Fully metered workload: (.+) Codex credits\.$/,'Полный расход по счётчику: $1 Codex credits.'],
    [/^Catalogue snapshot: (.+)$/,'Каталог на $1'],[/^Tokens in requests > (.+), %$/,'Токены в запросах > $1, %'],
    [/^Pricing snapshot: (.+)\. Taxes: (.+)%\. Cache and quota assumptions are editable inside each plan\. Infrastructure and tool fees are included only when entered explicitly\.$/,'Тарифы на $1. Налог: $2%. Кеш и квоты изменяются в каждом плане. Инфраструктура и инструменты учитываются только при явном вводе.'],
    [/^Remove model (.+)$/,'Удалить модель $1'],[/^Import rejected: /,'Импорт отклонён: '],[/^Saved scenario could not be loaded: /,'Не удалось загрузить сценарий: '],
    [/ · developers/g,' · разработчики'],[/\bdevelopers\b/g,'разработчиков'],[/\bagent accounts?\b/g,'учёток агентов'],[/\bagents?\b/g,'агентов'],[/\bpeople\b/g,'чел.'],[/\bsubscriptions?\b/g,'подписок'],[/\bseats?\b/g,'мест'],[/\busers?\b/g,'пользователей'],[/\baccounts?\b/g,'учёток'],[/\bplans?\b/g,'планов'],
    [/\/ month/g,'/ месяц'],[/\bannual\b/g,'ежегодно'],[/\bquarterly\b/g,'ежеквартально'],[/\bmonthly\b/g,'ежемесячно'],[/cached input/g,'входа из кеша'],[/Codex reserved for active users/g,'Codex для активных пользователей'],[/GLM Flash only/g,'Только GLM Flash']
   ];
   // Known group prefixes in generated descriptions; user labels are excluded in the DOM.
   for(const phrase of ['Power + regular users','Power + regular','All developers','Power users','Regular users','Light users','Server agents','Manual workload'])translated=translated.split(phrase).join((UI_TRANSLATIONS[phrase]||'Суперактивные и обычные'));
   for(const [pattern,replacement] of rules)translated=translated.replace(pattern,replacement);
   const plural=(n,forms)=>{const x=Number(n)%100;return forms[x>=11&&x<=14?2:x%10===1?0:x%10>=2&&x%10<=4?1:2];};
   for(const [word,forms] of Object.entries({'разработчиков':['разработчик','разработчика','разработчиков'],'агентов':['агент','агента','агентов'],'подписок':['подписка','подписки','подписок'],'мест':['место','места','мест'],'пользователей':['пользователь','пользователя','пользователей'],'учёток':['учётка','учётки','учёток'],'планов':['план','плана','планов']}))translated=translated.replace(new RegExp('(\\d+) '+word+'(?=$|[ \u00b7+.;])','g'),(_,n)=>n+' '+plural(n,forms));
   translated=translated.replace('17 Oct 2026','17 окт. 2026');
  }else{
   translated=translated.replace(/^Сохранено в браузере · Тарифы на (.+)$/,'Saved in this browser · Pricing snapshot $1').replace('17 окт. 2026','17 Oct 2026').replace(/^Некорректный общий параметр: /,'Invalid setting: ').replace(/: требуется целое число/g,': a whole number is required').replace(/: используйте шаг 0.25 часа \(15 минут\)/g,': use 0.25-hour (15-minute) increments').replace('Нужны три группы профиля команды','The team profile needs three activity groups').replace('Численность команды должна совпадать с суммой групп','Team size must match the sum of the groups').replace(/^Некорректный расход /,'Invalid token usage: ').replace('Некорректная дата','Invalid date').replace('Сумма долей моделей должна быть 100%','Model shares must total 100%').replace(/: требуется целое количество/g,': a whole number is required').replace(/ должен быть 0–100%/g,' must be 0–100%').replace(/: недопустимый /g,': invalid ').replace(/: некорректные ручные ставки/g,': invalid manual rates').replace(/ не входит в этот план/g,' is not included in this plan').replace(/: в группе минимум (\d+) места/g,': the group needs at least $1 seats').replace(/: превышен опубликованный максимум (\d+)/g,': exceeds the published maximum of $1').replace(/^В группе (.+) укажите целое количество от 0 до 10000$/,'Group $1 needs a whole number from 0 to 10000').replace(/^Технический профиль: некорректный /,'Invalid agent setting: ').replace(/^Технический профиль: (.+) должен быть целым$/,'Agent setting $1 must be a whole number');
  }
 }
 return raw.replace(trim,translated);
}
let uiLanguage='en';try{uiLanguage=(typeof document!=='undefined'&&typeof localStorage!=='undefined'&&localStorage.getItem('ai-coding-budget-language'))||(typeof document!=='undefined'&&document.documentElement.lang)||'en';}catch{}if(!['en','ru'].includes(uiLanguage))uiLanguage='en';
const uiOriginals=new WeakMap();
function tr(text){return translateUI(text,uiLanguage);}
function uiLocale(){return uiLanguage==='ru'?'ru-RU':'en-US';}
function localizeUI(root=document.body){
 const skip='script,style,textarea,[data-user-content]';
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;
 while((node=walker.nextNode())){if(node.parentElement?.closest(skip))continue;const current=node.nodeValue;const record=uiOriginals.get(node);const original=record&&record.rendered===current?record.original:current;const rendered=tr(original);if(rendered!==current)node.nodeValue=rendered;uiOriginals.set(node,{original,rendered});}
 for(const el of root.querySelectorAll('[aria-label],[title],[placeholder]')){if(el.closest(skip)||el.matches('input[type=text]'))continue;for(const attr of ['aria-label','title','placeholder'])if(el.hasAttribute(attr)){const key='data-i18n-'+attr;const original=el.getAttribute(key)||el.getAttribute(attr);el.setAttribute(key,original);el.setAttribute(attr,tr(original));}}
 for(const el of root.querySelectorAll('[data-localized-content]'))el.lang=uiLanguage;
 document.documentElement.lang=uiLanguage;document.title=uiLanguage==='ru'?'Coding Budget · Команда, планы, бюджет':'Coding Budget · Team, plans, budget';
 for(const button of document.querySelectorAll('[data-language]')){button.setAttribute('aria-pressed',String(button.dataset.language===uiLanguage));button.classList.toggle('active',button.dataset.language===uiLanguage);}
}
function changeLanguage(language){if(!['en','ru'].includes(language))return;uiLanguage=language;try{localStorage.setItem('ai-coding-budget-language',language);}catch{}USD=new Intl.NumberFormat(uiLocale(),{style:'currency',currency:'USD',maximumFractionDigits:2});nf=new Intl.NumberFormat(uiLocale(),{maximumFractionDigits:2});render();document.querySelector(`[data-language="${language}"]`)?.focus({preventScroll:true});}
