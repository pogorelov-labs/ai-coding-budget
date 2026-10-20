# Profile-based recommendations

Implemented 18 October 2026. Prices retain the catalogue snapshot dated 17 October 2026; the GLM subscription checkout observations are older and retain their original dates.

## Journey

1. Enter the number of power, regular and light developers, plus server agents. Token estimates and schedules remain editable.
2. Select **See recommendation**. A single suggested setup shows a monthly USD/RUB estimate, first-month cash including annual prepayment, and one brief reason for each group.
3. Annual billing is the default. Monthly billing is visible; model mix, cache assumption, mandatory GLM Team seats, optional Codex Business and paid fallback are under **Adjust models & requirements**.
4. **Use recommended setup** fills an empty scenario and opens its budget. For an existing scenario, **Find a cost-effective alternative → Save as a new scenario** creates an independent alternative; it never overwrites the original.

No purchases, provider connections, API calls or account changes occur. Exchange rate, tax, human/agent calendars and token estimates come from the current profile. Recommendation preferences are temporary until applied; applied options are saved with the new scenario. Existing custom prices, discounts and allocations are not silently imported into the automatic comparison.

## Optimization contract

For each populated human activity group, compare direct API against compatible GLM Lite, Pro, Max, Team Standard and Team Premium subscriptions. Enumerate combinations, then reject invalid or uncovered results using the existing calculation engine. Enforce per-person weekly and rolling five-hour quotas, seat minima, one GLM Team tier per organization and Codex Business seat boundaries. Unused quota is not transferred from light users to heavy users.

Rank by recurring monthly upper estimate, then first-month cash, then subscription charges. Annual cost is a monthly equivalent, with full prepayment separately displayed. The engine preserves cache pricing, scheduled peak/off-peak factors, tax and FX. Plans that exceed quota are excluded unless paid fallback is allowed; personal GLM requires a separate Standard API key and an actual switch, while GLM Team can use enabled overage. These alternatives are explicitly explained.

Savings compare the same model mix, token quantities, schedule and optional Codex seats against direct API. Model quality is not assigned a monetary score. The default developer mix is 80% GLM Flash / 20% GLM-5.3, at 80% cache hits. This is an editable assumption, not a measured cache rate. Other choices are Flash-only, 20% Flash / 80% GLM, DeepSeek Flash, OpenAI Sol and Claude Sonnet.

Server agents use a separate metered API identity with their own calendar. DeepSeek Flash is the default server model and can be changed. Its model is held constant in both sides of the comparison. Server subscription/headless alternatives remain available in the manual calculator; they are not ranked automatically because their suitability depends on ownership, supported clients and account rules.

**Keep Codex** reserves 10% of power/regular users’ workload for ChatGPT Business Standard, leaving 90% on the selected developer mix. Light users retain 100% on that mix. This avoids counting the same token workload twice. The 2–200 active-user condition is enforced. No fixed included token allowance is assumed: the existing subscription-to-full-metered range and unconfirmed $0.04/credit assumption remain visible. The same Codex allocation is present in every candidate and in its comparison baseline.

## Boundaries

This is the lowest modeled cost among the combinations checked, not a claim of the cheapest possible service worldwide. It does not optimize different model qualities, quantizations, host latency, throughput or failure rates. OpenAI and Claude subscriptions may be cheaper for a measured workload, but their undocumented token allowances cannot win as supposedly unlimited usage. Selecting those models therefore recommends their direct API with an explicit uncertainty note.

OpenRouter first-party routes add platform/funding fees to the same upstream prices; alternative-host discounts are outside this equal-model comparison. They remain configurable manually. No speculative promotion, startup grant, API bonus, negotiated price or unverified overage discount is assumed. Annual discounts and documented hourly effects are included through the catalogue/engine. Tools, infrastructure, future search charges, country eligibility and KYC are not automatically priced or approved. Quota estimates assume the entered repeatable schedule; bursts and provider rate limits can change practical capacity.

## Reference example

For 3 power, 5 regular and 10 light developers, plus one server agent; humans 22 days/month, 09:00–18:00 Moscow; server 30 days/month, 24/7; 80% cached input; FX95 and no tax:

| Choice | Annual monthly equivalent |
|---|---:|
| 3 GLM Pro personal subscriptions | $168.00 |
| 5 GLM Lite personal subscriptions | $63.00 |
| Light users: same 80/20 GLM mix via API | $90.112 |
| Server: DeepSeek Flash API | $45.24 |
| Total | $366.352 / ₽34,803.44 |

Annual first-month cash is $2,907.352. The same models entirely via API cost $766.136/month, giving modeled savings of $399.784/month. Monthly subscriptions instead total $465.352. Requiring all 18 developers to use GLM Team changes the recommendation to Team Standard and totals $1,470.84 including the agent. Keeping Codex Business for the 8 active developers gives $526.352–$828.192/month, reflecting unknown included Codex coverage rather than a guaranteed spending ceiling. These are calculation examples, not purchase quotes.

## Sources and verification

The following primary pages were reread on 18 October 2026 for quota rules, API rates and hourly effects. Subscription list prices were retained from the existing catalogue rather than relabelled as newly verified:

- https://docs.z.ai/devpack/teamplan
- https://docs.z.ai/guides/overview/pricing
- https://api-docs.deepseek.com/quick_start/pricing/

`npm test`: 52 tests pass, including nine new recommendation tests. They cover the reference costs, token conservation, no mutation of the input, monthly/annual cash timing, tax, low usage, hourly/cache-dependent plan changes, combined seat constraints, extreme workloads and paid fallback, Codex uncertainty, non-GLM comparisons, server-only profiles, invalid inputs and JSON compatibility.

Browser QA exercised profile entry, annual/monthly updates, optional Codex, applying a recommendation, saving an independent alternative, and the resulting budget. No console errors were observed. Layouts were inspected at actual 390px, 723px and 1280px browser widths. The 390px viewport took effect after reloading the published tab; the recommendation and expanded controls had no horizontal overflow. Local screenshots and draft backups are excluded from publication.

Publication verification: the seven saved scenarios and settings were exported immediately before and after the upgrade and compared with strict deep equality. The draft was unchanged.
