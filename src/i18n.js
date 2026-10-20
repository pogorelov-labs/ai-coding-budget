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
Unique members|Уникальные участники
Unused seats|Неиспользуемые места
Unused seats for this tier|Неиспользуемые места этого уровня
Reuse a member-group name only for the same people. Choose a profile group to reuse its members.|Повторяйте имя группы только для тех же людей. Для участников профиля выберите соответствующую группу.
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
Lowest modeled recurring cost among the eligible combinations checked, for the selected models and billing period. Not a model-quality or throughput ranking. Compares GLM Lite/Pro/Max, Team Standard/Premium and direct API where compatible. Gateway routes are available in manual setup and are not silently substituted into recommendations. Seat minima, one tier per GLM team, weekly and 5-hour quotas are enforced. Over-quota plans need the fallback option.|Минимальная расчётная стоимость среди проверенных допустимых наборов для выбранных моделей и периода оплаты. Это не рейтинг качества или скорости. Сравниваются совместимые GLM Lite/Pro/Max, Team Standard/Premium и прямой API. Маршруты шлюзов доступны в ручной настройке и не подменяют варианты в рекомендациях. Учитываются минимум мест, единый тариф GLM Team, недельные и пятичасовые квоты. При превышении нужна платная альтернатива.
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
Draft plan / month|Добавляемый план / месяц
Setup with this plan / month|С этим планом / месяц
Complete plan details|Заполните параметры плана
Not all usage is covered. Add fallback or change plans.|Не вся нагрузка покрыта. Добавьте резерв или измените планы.
Review account rules before using this route.|Проверьте правила аккаунта для этого способа подключения.
Upfront billing, shown per month.|Оплата вперёд, сумма в пересчёте на месяц.
Gateways: plans, models and conditions|Шлюзы: планы, модели и условия
Checked 20 October 2026|Проверено 20 октября 2026
A researched shortlist, not a popularity ranking. Expand a provider to see native-currency prices and conditions. A dash means unverified, not free.|Подборка по результатам исследования, а не рейтинг популярности. Раскройте провайдера, чтобы увидеть цены в валюте расчётов и условия. Прочерк означает отсутствие подтверждения, а не бесплатное использование.
RUB per million tokens|RUB за миллион токенов
USD per million tokens|USD за миллион токенов
Model / route|Модель / маршрут
Confirmed quote required|Нужен подтверждённый тариф
Batch|Пакетная обработка
Alternative host|Другой хостинг
USD usage + funding fee|Расход в USD + комиссия пополнения
Standard: no seat fee; 5.5% credit-purchase fee. Business: no seat fee; 8%. Taxes are separate.|Standard: без платы за место, комиссия покупки кредитов 5,5%. Business: без платы за место, комиссия 8%. Налоги отдельно.
Organizations: 10 members by default; request more. Standard has 5 workspaces, Business 1,000; workspaces are not seats.|В организации по умолчанию 10 участников; расширение — по запросу. Standard включает 5 рабочих пространств, Business — 1 000; это не количество мест.
Members|Участники
Standard card funding: minimum $0.80 per purchase, once per shared funding account. Business minimum and crypto/Business interaction are unconfirmed.|Пополнение Standard картой: минимум $0,80 за покупку, один раз для общего счёта. Минимум Business и сочетание его комиссии с криптооплатой не подтверждены.
Funding|Пополнение
BYOK still pays the upstream provider. OpenRouter charges 5% above $25,000/month of list-price-equivalent usage; this is not free inference.|При BYOK запросы по-прежнему оплачиваются поставщику модели. OpenRouter берёт 5% сверх $25 000 в месяц расхода по прейскуранту; бесплатного использования моделей это не даёт.
BYOK|BYOK
Startup awards are conditional: up to $3,000 and 12 months without platform fees; most awarded credits expire after 6 months.|Гранты стартапам выдаются при одобрении: до $3 000 и 12 месяцев без комиссий платформы; большинство выданных кредитов сгорает через 6 месяцев.
Startup offer|Программа для стартапов
Prices exclude funding fees and paid tools. Pin the route; alternative hosts may differ in quantization, latency and availability.|Цены не включают комиссии пополнения и платные инструменты. Закрепите маршрут; у других хостингов могут отличаться квантизация, задержки и доступность.
Cache, timing and capacity|Кэш, расписание цен и пропускная способность
GPT long-context prices apply above 272,000 input tokens per request: input and cache ×2; output ×1.5. Claude one-hour cache writes have separate prices.|Повышенные цены GPT действуют при входе свыше 272 000 токенов на запрос: вход и кэш ×2, выход ×1,5. Для записи кэша Claude на один час действуют отдельные цены.
Price rules|Правила цены
DeepSeek Pro on the deepseek route is half price off-peak. Peak: weekdays 01:00–04:00 and 06:00–10:00 UTC. During 09:00–18:00 Moscow, uniform weekday usage is 4/9 peak.|DeepSeek Pro на маршруте deepseek вне пика стоит вдвое дешевле. Пик: будни 01:00–04:00 и 06:00–10:00 UTC. При равномерной работе по будням с 09:00 до 18:00 по Москве на пик приходится 4/9 расхода.
Timed route|Маршрут с расписанием цен
Paid tiers have no published plan-based request cap, but upstream capacity, balance holds and protection limits still apply. Extra keys do not multiply capacity.|Для платных планов не опубликован лимит запросов самого плана, но действуют ограничения поставщика, резервирование баланса и защитные лимиты. Дополнительные ключи не увеличивают пропускную способность.
Capacity|Пропускная способность
Europe routing requires Business or Enterprise and includes the UK and Switzerland. Account-specific identity checks and country eligibility remain subject to confirmation.|Маршрутизация по Европе требует Business или Enterprise и включает Великобританию и Швейцарию. Проверки личности и доступность в конкретной стране нужно подтверждать для аккаунта.
Regions|Регионы
RUB usage · 5% VAT included|Расход в RUB · НДС 5% включён
No mandatory model-API subscription or seat fee. Top up any amount by card, SBP or business invoice.|Нет обязательной подписки на API моделей или платы за место. Пополнение на любую сумму: карта, СБП или счёт для организации.
Billing|Оплата
Up to 10 API keys by default; request more. This is a key limit, not a team-member limit. A key’s monthly budget is compared with total account usage.|По умолчанию до 10 API-ключей; больше — по запросу. Это лимит ключей, а не участников команды. Месячный бюджет ключа сравнивается с расходом всего аккаунта.
Keys|Ключи
Prices include 5% VAT. Do not add it again. Published Batch prices are separate asynchronous tariffs.|Цены включают НДС 5%; не добавляйте его повторно. Опубликованные цены Batch — отдельные тарифы асинхронной обработки.
Tariffs|Тарифы
GPT-6.1 Sol has a 272K+ tier: input and cache ×2; output ×1.5. Other unpublished long-context or one-hour cache-write prices need confirmation.|Для GPT-6.1 Sol есть уровень 272K+: вход и кэш ×2, выход ×1,5. Другие неопубликованные цены длинного контекста и записи кэша на час требуют подтверждения.
Capacity and account conditions|Пропускная способность и условия аккаунта
No fixed customer concurrency guarantee was verified. Twenty 4xx errors per key per minute can trigger a temporary pause; retry only suitable transient errors.|Гарантированное число параллельных запросов клиента не подтверждено. Двадцать ошибок 4xx за минуту на одном ключе могут вызвать временную блокировку; повторяйте только запросы с подходящими временными ошибками.
Business invoices require contract registration. Universal per-member passport checks and UK/KZ/RU citizenship-specific eligibility were not established; upstream terms still apply.|Для счёта организации нужна регистрация договора. Обязательная проверка паспорта каждого участника и доступность по гражданству UK/KZ/RU не установлены; условия поставщиков моделей также действуют.
Terms|Условия
RUB usage · choose an exact route|Расход в RUB · выберите точный маршрут
No mandatory API seat fee. Shared organization balance, separate employee keys; minimum card top-up 100 RUB.|Нет обязательной платы за место для API. Общий баланс организации и отдельные ключи сотрудников; минимальное пополнение картой — 100 RUB.
No standard volume discount is published. Enterprise starts at 100,000 RUB monthly usage, which is an eligibility threshold, not an extra fee.|Стандартная скидка за объём не опубликована. Enterprise доступен от 100 000 RUB расхода в месяц; это условие подключения, а не дополнительная плата.
Enterprise|Enterprise
Discounts|Скидки
Pin provider.only and disable fallbacks to reproduce the selected tariff. A “from” price can use Flex or a different host.|Для расчёта по выбранному тарифу закрепите provider.only и отключите резервные маршруты. Цена «от» может относиться к Flex или другому хостингу.
Routing|Маршрутизация
VAT inclusion, long-context premiums and unlisted cache-write prices are unconfirmed. The displayed RUB snapshot may change; your display exchange rate does not set the provider’s prices.|Включение НДС, надбавки за длинный контекст и неопубликованные цены записи кэша не подтверждены. Показанные цены в RUB могут меняться; курс отображения не задаёт цены провайдера.
Team roles are advertised, but a numeric member cap and fixed customer concurrency entitlement were not verified.|Заявлены роли в команде, но числовой лимит участников и гарантированное число параллельных запросов клиента не подтверждены.
Teams|Команды
Registration asks for name, email and phone. Further information may be requested within 5 business days. Worldwide terms do not confirm every payment method or upstream model in every country.|При регистрации нужны имя, email и телефон. Дополнительные сведения могут запросить со сроком ответа 5 рабочих дней. Условия использования по всему миру не подтверждают доступность каждого способа оплаты или модели в любой стране.
Access fee + usage · confirmed token quote needed|Плата за доступ + расход · нужен подтверждённый токенный тариф
Each selected developer or server agent is counted as a paid account. Team access includes the head account; every added subaccount needs its own Basic or Professional subscription. Usage is always extra.|Каждый выбранный разработчик или серверный агент считается отдельным платным аккаунтом. Team включает головной аккаунт; каждому подаккаунту нужна своя подписка Basic или Professional. Расход всегда оплачивается отдельно.
Access fees in RUB; generation costs are extra|Плата за доступ в RUB; генерации оплачиваются отдельно
Basic|Basic
Professional|Professional
Professional · 3 days|Professional · 3 дня
Team 4|Team 4
Team 10|Team 10
FAST|FAST
Fee|Плата
Period|Период
Account coverage|Аккаунты
days|дней
3 days|3 дня
30 days|30 дней
Per account|За аккаунт
Head account + up to 4 separately subscribed subaccounts|Головной аккаунт + до 4 подаккаунтов с отдельными подписками
Head account + up to 10 separately subscribed subaccounts|Головной аккаунт + до 10 подаккаунтов с отдельными подписками
Individual plans|Личные планы
Team and FAST plans|Планы Team и FAST
Team billing example|Пример оплаты команды
Team and FAST need requested activation. Team activation requires at least 1,500 RUB on balance. Larger teams need a quote; no annual discount was verified.|Team и FAST подключаются по запросу. Для подключения Team нужно не менее 1 500 RUB на балансе. Для больших команд нужен отдельный расчёт; годовая скидка не подтверждена.
Activation|Подключение
These are 30-day periods, not calendar months. The 3-day pass is listed for reference; renewals follow the selected period.|Период составляет 30 дней, а не календарный месяц. Пропуск на 3 дня приведён для справки; продления следуют выбранному периоду.
Public documentation conflicts on character versus token billing. Enter a confirmed RUB-per-million-token quote; the calculator does not convert character prices.|Публичная документация противоречива: цены указаны то за символы, то за токены. Введите подтверждённую цену в RUB за миллион токенов; калькулятор не пересчитывает цены за символы.
Billing units|Единицы тарификации
Standard rate limits conflict: 1 request/second on the tariff page versus 1 every 2 seconds in API errors. FAST’s 10–20 RPS statement is not a guaranteed concurrency allowance.|Лимиты стандартного плана противоречивы: на странице тарифов 1 запрос/с, в документации ошибок — 1 запрос за 2 секунды. Заявление о 10–20 RPS для FAST не гарантирует число параллельных запросов.
Claude Code uses an Anthropic-compatible beta. Responses API is not supported; current Codex compatibility is not established.|Claude Code использует бета-версию Anthropic-совместимого API. Responses API не поддерживается; совместимость с актуальным Codex не установлена.
API support|Поддержка API
Consumer plans are for individuals. VAT, enterprise terms and citizenship-specific eligibility need confirmation; no universal passport-check guarantee is made.|Потребительские планы предназначены для физических лиц. НДС, условия для организаций и доступность по гражданству нужно подтвердить; единые правила паспортной проверки не установлены.
GPT-6.1 Sol · ProxyAPI · Batch|GPT-6.1 Sol · ProxyAPI · Пакетная обработка
Claude Sonnet 5.5 · ProxyAPI · Batch|Claude Sonnet 5.5 · ProxyAPI · Пакетная обработка
OpenAI: GPT-6.1 Sol (Thinking Medium) · VseGPT|OpenAI: GPT-6.1 Sol (среднее рассуждение) · VseGPT
Anthropic: Claude Sonnet 5.5 (Thinking Medium) · VseGPT|Anthropic: Claude Sonnet 5.5 (среднее рассуждение) · VseGPT
Z.AI: GLM 5.3 (Thinking Low) · VseGPT|Z.AI: GLM 5.3 (лёгкое рассуждение) · VseGPT
Z.AI: GLM 5.3 Flash (Thinking Low) · VseGPT|Z.AI: GLM 5.3 Flash (лёгкое рассуждение) · VseGPT
Upstream route|Маршрут провайдера
Input RUB/M|Вход, RUB/млн
Cache write RUB/M|Запись кэша, RUB/млн
Cache read RUB/M|Чтение кэша, RUB/млн
Output RUB/M|Выход, RUB/млн
Enter confirmed prices per million tokens. Character prices are not equivalent.|Введите подтверждённые цены за миллион токенов. Цены за символы им не эквивалентны.
access plus usage|доступ плюс расход
Account and funding|Аккаунт и пополнение
Funding-fee scope|Как объединять комиссии
Shared billing account|Общий платёжный аккаунт
Per line · legacy estimate|Отдельно по позициям · прежний расчёт
Card top-ups are assumed. Use the same account name and funding settings to charge one purchase fee across models.|Расчёт предполагает пополнение картой. Укажите одинаковое имя аккаунта и параметры пополнения, чтобы комиссия учитывалась один раз для всех моделей.
10 organisation members by default; support approval is needed for more. Workspaces and API consumers are separate counts.|По умолчанию доступно 10 участников организации; больше — по согласованию с поддержкой. Рабочие пространства и потребители API считаются отдельно.
Current routes: 20 Oct 2026. Original saved route prices remain unchanged.|Текущие маршруты проверены 20 октября 2026. Цены в ранее сохранённых маршрутах не изменены.
Native RUB tariffs. USD is converted at your scenario exchange rate.|Исходные тарифы указаны в RUB. Пересчёт в USD использует курс сценария.
Access-account group|Группа аккаунтов доступа
VseGPT access plan|План доступа VseGPT
Subaccount access|Доступ подаккаунтов
basic · 199 RUB / 30 days|Basic · 199 RUB / 30 дней
professional · 399 RUB / 30 days|Professional · 399 RUB / 30 дней
team4 · 699 RUB / 30 days|Team 4 · 699 RUB / 30 дней
team10 · 999 RUB / 30 days|Team 10 · 999 RUB / 30 дней
fast · 999 RUB / 30 days|FAST · 999 RUB / 30 дней
Basic · 199 RUB / 30 days|Basic · 199 RUB / 30 дней
Professional · 399 RUB / 30 days|Professional · 399 RUB / 30 дней
Access is charged per user or agent. Team head fees and member subscriptions are both included; usage is extra.|Доступ оплачивается за каждого пользователя или агента. Учтены плата за головные аккаунты Team и подписки участников; расход оплачивается отдельно.
/ 30 days · access only|/ 30 дней · только доступ
Token prices require a manual quote: public VseGPT pages disagree on characters versus tokens.|Введите подтверждённый тариф вручную: на публичных страницах VseGPT расход указан то в символах, то в токенах.
PAYG with no mandatory access subscription. Published prices include 5% VAT.|Оплата по расходу без обязательной подписки на доступ. Опубликованные цены включают НДС 5%.
PAYG with no mandatory access subscription. Pin the selected route; VAT inclusion is unconfirmed.|Оплата по расходу без обязательной подписки на доступ. Закрепите выбранный маршрут; включение НДС не подтверждено.
Gateway conditions|Условия шлюза
Model availability, capacity and account eligibility must be confirmed with the gateway. Upstream subscriptions do not fund these API requests.|Подтвердите у шлюза доступность моделей, пропускную способность и требования к аккаунту. Подписки исходных провайдеров не оплачивают эти API-запросы.
Access renews every 30 days; the forecast counts actual renewal dates. Team plans include 4 or 10 subaccounts, each with a separate subscription.|Доступ продлевается каждые 30 дней; прогноз учитывает даты продлений. Планы Team допускают 4 или 10 подаккаунтов, каждый с отдельной подпиской.
A top-up minimum is prepaid balance, not an extra monthly fee. No unconfirmed annual or volume discount is applied.|Минимальное пополнение — аванс на баланс, а не дополнительная месячная плата. Неподтверждённые годовые скидки и скидки за объём не применяются.
Provider documentation|Документация провайдера
Tariff currency|Валюта тарифа
Cache-write pricing is unconfirmed; the default assumes no separately billed writes. Edit rates to budget them.|Цена записи кэша не подтверждена; по умолчанию отдельно оплачиваемых записей нет. Укажите тарифы, чтобы учесть их.
This processing tier may have different latency from interactive coding.|Задержка этого режима обработки может отличаться от интерактивного кодинга.
Alternative host: quality, quantization and availability may differ.|Альтернативный хостинг: качество, квантование и доступность могут отличаться.
Custom endpoint — enter rates|Свой endpoint — введите тарифы
Long context, % (quote required)|Длинный контекст, % (нужен тариф)
API · direct or gateway|API · напрямую или через шлюз
Token usage cost:|Стоимость токенов:
Direct API equivalent:|Эквивалент прямого API:
Choose a supported API provider.|Выберите поддерживаемого API-провайдера.
Choose a recurring VseGPT access plan.|Выберите возобновляемый план доступа VseGPT.
Choose Basic or Professional access for subaccounts.|Выберите Basic или Professional для доступа подаккаунтов.
This model requires Professional access for every account using it.|Для этой модели каждому использующему её аккаунту нужен доступ Professional.
Choose a valid funding-fee scope.|Выберите допустимый способ объединения комиссий за пополнение.
This model is only available through its listed gateway.|Эта модель доступна только через указанный для неё шлюз.
Select the matching API gateway for this model.|Выберите API-шлюз, указанный для этой модели.
Models in this line must belong to the selected API provider.|Модели в этой позиции должны принадлежать выбранному API-провайдеру.
Gateway token rates cannot be used as a coding subscription.|Токенные тарифы шлюза нельзя использовать как подписку для кодинга.
Enter a verified token-rate quote for this gateway. Character prices cannot be converted automatically.|Введите подтверждённый токенный тариф этого шлюза. Цены за символы не пересчитываются автоматически.
A price for the selected token category is unconfirmed. Set its usage to zero or enter explicit rates.|Цена выбранной категории токенов не подтверждена. Обнулите её расход или введите тариф вручную.
One-hour cache-write pricing is unconfirmed for this route. Use the default TTL or enter explicit rates.|Цена записи кэша на один час для этого маршрута не подтверждена. Используйте стандартный TTL или введите тариф вручную.
Long-context pricing is unconfirmed for this route. Enter explicit rates.|Цена длинного контекста для этого маршрута не подтверждена. Введите тариф вручную.
Gateway prices are quoted in RUB and converted to USD using the scenario exchange rate; changing FX does not change the native RUB token bill.|Тарифы шлюзов заданы в RUB и пересчитываются в USD по курсу сценария; изменение курса не меняет исходный рублёвый счёт за токены.
Gateway estimates use dated route prices. Extra tools, search and provider-specific fees are included only when entered explicitly.|Расчёты шлюзов используют тарифы маршрутов на указанную дату. Инструменты, поиск и дополнительные сборы провайдеров учитываются только при явном вводе.
Legacy funding estimate: fees are charged per line. Choose shared account funding to combine top-ups across lines.|Прежний расчёт пополнений: комиссия начисляется отдельно по каждой позиции. Выберите общий платёжный аккаунт, чтобы объединить пополнения.
OpenRouter documents a default limit of 10 organisation members; support approval is needed for more. Invited members and API consumers are different counts.|OpenRouter указывает лимит 10 участников организации по умолчанию; больше — по согласованию с поддержкой. Приглашённые участники и потребители API считаются отдельно.
VseGPT access renews every 30 days, not every calendar month. Each user or agent is budgeted as a paid account; Team subaccounts also pay a subscription. A 12-month cash forecast can contain 13 renewals.|Доступ VseGPT продлевается каждые 30 дней, а не каждый календарный месяц. Каждый пользователь или агент учитывается как платный аккаунт; подаккаунтам Team тоже нужна подписка. Прогноз платежей на 12 месяцев может включать 13 продлений.
ProxyAPI token prices include 5% VAT; the scenario tax field is an additional surcharge, not the included VAT.|Токенные тарифы ProxyAPI включают НДС 5%; поле налога в сценарии задаёт дополнительную надбавку, а не уже включённый НДС.
Polza prices require the listed route to be pinned with fallback disabled. VAT inclusion is unconfirmed; no extra VAT is assumed.|Тарифы Polza требуют закрепить указанный маршрут и отключить резервные маршруты. Включение НДС не подтверждено; дополнительный НДС не предполагается.
Use the same funding-fee scope for all lines sharing an OpenRouter account.|Выберите одинаковый способ объединения комиссий для всех позиций одного аккаунта OpenRouter.
An OpenRouter Startup grant is capped at $3,000 per account; do not repeat it across lines.|Грант OpenRouter Startup ограничен $3,000 на аккаунт; не дублируйте его в нескольких позициях.
OpenRouter lines sharing an account must use the same funding settings.|Для позиций одного аккаунта OpenRouter должны совпадать параметры пополнения.
Use one VseGPT line per access-account group, with all its models in that line. A separate purchase needs a different account-group name.|Для каждой группы аккаунтов VseGPT используйте одну позицию со всеми её моделями. Для отдельной покупки задайте другое имя группы аккаунтов.
Gateway API account|API-аккаунт шлюза
Use a separate gateway API key and server-side budget. Upstream subscription allowances and service-account privileges do not transfer. Confirm the selected model, automation terms and rate limits with the gateway.|Используйте отдельный API-ключ шлюза и серверный бюджет. Квоты подписок и права сервисных аккаунтов исходных провайдеров не переносятся. Подтвердите у шлюза выбранную модель, условия автоматизации и лимиты запросов.
OpenRouter · routes and terms · 20 Oct 2026|OpenRouter · маршруты и условия · 20 октября 2026
ProxyAPI · RUB prices and conditions|ProxyAPI · рублёвые тарифы и условия
Polza AI · pinned model routes|Polza AI · закреплённые маршруты моделей
VseGPT · access plans and usage units|VseGPT · планы доступа и единицы расхода
Saved in this browser · Core prices 17 Oct · Gateways 20 Oct 2026|Сохранено в браузере · Основные тарифы на 17 октября · Шлюзы на 20 октября 2026
GPT-6.1 Sol · 17 Oct snapshot|GPT-6.1 Sol · тарифы на 17 октября
GPT-6 Luna · 17 Oct snapshot|GPT-6 Luna · тарифы на 17 октября
Claude Sonnet 5.5 · 17 Oct snapshot|Claude Sonnet 5.5 · тарифы на 17 октября
Claude Opus 5.5 · 17 Oct snapshot|Claude Opus 5.5 · тарифы на 17 октября
GLM-5.3 · 17 Oct snapshot|GLM-5.3 · тарифы на 17 октября
GLM-5.3-Flash · 17 Oct snapshot|GLM-5.3-Flash · тарифы на 17 октября
DeepSeek V4.1 Flash · 17 Oct snapshot|DeepSeek V4.1 Flash · тарифы на 17 октября
DeepSeek V4 Pro 0813 · 17 Oct snapshot|DeepSeek V4 Pro 0813 · тарифы на 17 октября
ProxyAPI prices include 5% VAT. Do not add that VAT again.|Тарифы ProxyAPI включают НДС 5%. Не добавляйте его повторно.
Batch prices are for asynchronous processing, not an interactive coding latency guarantee.|Тарифы Batch относятся к асинхронной обработке и не гарантируют задержку интерактивного кодинга.
Pin the displayed upstream route and disable fallbacks to reproduce this tariff.|Закрепите показанный маршрут провайдера и отключите резервные маршруты, чтобы получить этот тариф.
VAT inclusion is unconfirmed; add only a confirmed extra tax or surcharge.|Включение НДС не подтверждено; добавляйте только подтверждённый дополнительный налог или надбавку.
Flex processing is a separate service tier; latency differs from standard interactive requests.|Flex — отдельный режим обработки; его задержка отличается от стандартных интерактивных запросов.
Alternative host: model quality, quantization, availability and latency may differ.|Альтернативный хостинг: качество модели, квантование, доступность и задержка могут отличаться.
Public VseGPT documentation conflicts on characters versus tokens. Enter confirmed RUB prices per million tokens; no character conversion is assumed.|Публичная документация VseGPT противоречива: цены указаны то за символы, то за токены. Введите подтверждённую цену в RUB за миллион токенов; пересчёт символов не предполагается.
API provider|API-провайдер
Mixed direct APIs / legacy|Разные прямые API / прежний расчёт
Direct API equivalent:|Эквивалент прямого API:
Core prices are dated 2026-10-17; gateway tariffs are dated 2026-10-20. Source pages may use their original language.|Основные тарифы — на 17.10.2026, тарифы шлюзов — на 20.10.2026. Внешние источники могут быть на языке оригинала.
Monthly equivalent at current usage.|Месячный эквивалент при текущем расходе.
30 days|30 дней
Team 4 · 699 RUB / 30 days|Team 4 · 699 RUB / 30 дней
Team 10 · 999 RUB / 30 days|Team 10 · 999 RUB / 30 дней
FAST · 999 RUB / 30 days|FAST · 999 RUB / 30 дней
Lowest cost among the compared direct-provider options.|Минимальная стоимость среди сравниваемых прямых вариантов провайдеров.
head accounts|головных аккаунтов
paid subaccounts|платных подаккаунтов
Plan prepayments and modeled usage.|Предоплата планов и расчётный расход.
person|человек
person / account|чел. / аккаунт
agent account|аккаунт агента
Build your plan cart|Соберите корзину планов
Choose a group, add a plan, repeat. Each group can use different subscriptions and APIs.|Выберите группу и добавьте план. Для каждой группы можно сочетать разные подписки и API.
Choose a group|Выберите группу
View cart|Открыть корзину
Your cart|Ваша корзина
Your cart is empty.|Ваша корзина пуста.
Choose a group and add its first plan.|Выберите группу и добавьте первый план.
Remove|Удалить
Items|Позиции
Plans added|Добавлено планов
item|позиция
items|позиций
workload assigned|нагрузки распределено
Add plan for|Добавить план для
Add people on Team, or enter a manual workload.|Добавьте людей в разделе «Команда» или задайте нагрузку вручную.
Use more than one plan for a group? Split its workload between them.|При нескольких планах для группы распределите между ними её нагрузку.
Add for all developers|Для всех разработчиков
Enter people manually|Указать людей вручную
Need a starting point?|С чего начать?
Get a suggested cart for your team.|Подберите корзину для своей команды.
Recommend plans|Подобрать планы
Compare recommendation|Сравнить с рекомендацией
Edit your cart|Редактирование корзины
Adjust a plan’s people, models or usage.|Измените пользователей, модели или нагрузку плана.
Back to cart|К корзине
Add another item|Добавить позицию
Add setup to cart|Добавить в корзину
Save alternative cart|Сохранить другую корзину
One cart item for this group. Add more plans for the same or other people later.|Эта позиция — для выбранной группы. Затем можно добавить планы для неё или других людей.
Add a cart item|Добавление в корзину
Choose who uses this plan, then its subscription or API.|Выберите пользователей плана, затем подписку или API.
Already in your cart|Уже в корзине
Add to cart|Добавить в корзину
Added to cart.|Добавлено в корзину.
Recommended setup added to cart.|Рекомендуемые планы добавлены в корзину.
This item / month|Эта позиция / месяц
Cart with this item / month|Корзина с позицией / месяц
Spending limit|Лимит бюджета
Set spending limit|Задать лимит бюджета
Edit spending limit|Изменить лимит бюджета
Optional|Необязательно
Budget limit|Лимит бюджета
Budget period|Период бюджета
Budget currency|Валюта бюджета
No limit|Без лимита
12 months|12 месяцев
Optional. Leave blank for no limit.|Необязательно. Пустое поле — без лимита.
Invalid budget limit.|Некорректный лимит бюджета.
Enter a budget from 0 to 1 trillion, or leave it blank.|Укажите бюджет от 0 до 1 триллиона или оставьте поле пустым.
Choose monthly or 12-month budgeting.|Выберите бюджет на месяц или на 12 месяцев.
Choose USD or RUB for the budget.|Выберите USD или RUB для бюджета.
Complete plan details to check the budget.|Заполните параметры планов для проверки бюджета.
Budget not checked|Бюджет не проверен
Remaining budget|Остаток бюджета
Budget fully allocated|Бюджет распределён полностью
May exceed budget|Возможно превышение бюджета
Over budget|Превышение бюджета
Up to|До
including this item|с учётом этой позиции
Some usage is not covered by this estimate.|Часть нагрузки не покрыта этой оценкой.
Monthly equivalent; upfront payments may be higher.|В пересчёте на месяц; предоплата может быть выше.
add plans to your cart for each group. Split a group’s workload across plans when needed.|добавьте планы в корзину для каждой группы. При необходимости распределите нагрузку группы между планами.
Unique members|Уникальные участники
Unused seats|Неиспользуемые места
Unused seats for this tier|Неиспользуемые места этого уровня
Reuse a member-group name only for the same people. Choose a profile group to reuse its members.|Повторяйте имя группы только для тех же людей. Для участников профиля выберите соответствующую группу.
Team subscriptions|Командные подписки
Codex / ChatGPT Business|Codex / ChatGPT Business
Claude Team · Claude Code|Claude Team · Claude Code
Workspace & members|Пространство и участники
Workspace seats|Места в пространствах
minimum seats|минимум мест
maximum|максимум
paid seats|оплаченных мест
unique members|уникальных участников
unused seats|неиспользуемых мест
No upper seat limit|Без верхнего предела мест
Upper limit unverified|Верхний предел не подтверждён
Confirm workspace capacity with OpenAI before purchase.|Подтвердите вместимость пространства у OpenAI перед покупкой.
Shared members are charged once; their usage is combined.|Места одних и тех же участников оплачиваются один раз; их нагрузка суммируется.
Shared seat purchase|Общая покупка мест
Allocated item cost / month|Доля стоимости позиции / месяц
Shared seats are charged once in the cart.|Общие места оплачиваются в корзине один раз.
Member group · same people|Группа участников · те же люди
Separate group unless named|Без имени — отдельная группа
Reuse a member-group name only for the same people. Different names mean separate members.|Одно имя группы — одни и те же люди. Разные имена означают разных участников.
Profile groups identify the same people across items in this workspace.|Группы профиля обозначают одних и тех же людей в разных позициях этого пространства.
Additional unused seats|Дополнительные неиспользуемые места
Add unused seats|Добавить пустые места
Change people|Изменить участников
Provider seat rules|Правила мест у провайдера
Member group must be a name of at most 100 characters.|Имя группы участников должно содержать не более 100 символов.
Enter a nonnegative whole number of unused seats.|Укажите целое неотрицательное число неиспользуемых мест.
GLM Standard and Premium cannot be mixed.|GLM Standard и Premium нельзя смешивать.
The same members cannot hold different team tiers. Use disjoint member groups.|Одним участникам нельзя назначить разные уровни команды. Выберите непересекающиеся группы.
Shared seats must use the same billing period, seat price and discounts.|У общих мест должны совпадать период оплаты, цена места и скидки.
A reused manual member group must have the same number of people.|Для одной ручной группы участников должно совпадать количество людей.
Check member allocation.|Проверьте распределение участников.
These workload items share one seat purchase. Seat fees are allocated across items; usage is added together.|Эти позиции используют одну покупку мест. Плата за места распределяется между позициями, а нагрузка суммируется.
GLM quota is checked against the combined workload of the same members in this workspace.|Квота GLM проверяется по суммарной нагрузке одних и тех же участников пространства.
Combined member usage exceeds the shared seat quota. Enable paid fallback or reduce usage.|Суммарная нагрузка участников превышает квоту общих мест. Включите платный резерв или уменьшите нагрузку.
Codex Business needs at least 2 power and regular users. Change the profile or turn off Keep Codex.|Для Codex Business нужны минимум 2 активных разработчика. Измените профиль или отключите Codex.
Business · seat minimum; upper limit unverified|Business · минимум мест; верхний предел не подтверждён
`.trim().split('\n').map(line=>line.split('|')));
Object.assign(UI_TRANSLATIONS,RESEARCH_TRANSLATIONS);
const UI_REVERSE=Object.fromEntries(Object.entries(UI_TRANSLATIONS).map(([en,ru])=>[ru,en]));
export function translateUI(text,language='en'){
 const raw=String(text),trim=raw.trim();if(!trim)return raw;
 let translated=language==='ru'?UI_TRANSLATIONS[trim]:(RESEARCH_EN[trim]??UI_REVERSE[trim]);
 if(translated===undefined){
  const prefix=trim.match(/^Workspace "(.+)": (.+)$/);
  if(prefix)translated=language==='ru'?'Рабочее пространство «'+prefix[1]+'»: '+translateUI(prefix[2],language):trim;
  const reverse=trim.match(/^Рабочее пространство «(.+)»: (.+)$/);
  if(reverse)translated=language==='en'?'Workspace "'+reverse[1]+'": '+translateUI(reverse[2],language):trim;
  const cap=trim.match(/^(\d+) paid seats; limit (\d+); (\d+) over\. Reduce seats or choose Enterprise\/API\.$/);
  if(cap&&language==='ru')translated=cap[1]+' оплаченных мест; лимит '+cap[2]+'; превышение на '+cap[3]+'. Уменьшите число мест или выберите Enterprise/API.';
  const min=trim.match(/^(\d+) paid seats; minimum (\d+); add (\d+) seats\.$/);
  if(min&&language==='ru')translated=min[1]+' оплаченных мест; минимум '+min[2]+'; добавьте '+min[3]+'.';
 }
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
