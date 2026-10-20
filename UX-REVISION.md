# Guided budget calculator UX revision

17 October 2026. Scope: the first-time and returning-user journey, based on fresh captures of the published calculator and the existing source. The financial catalogue and calculation rules were not repriced.

## Findings from the current product

1. **Entry / team setup — high friction.** In `qa/ux-before-01-budget.png`, global actions, six navigation tabs, the scenario strip, two template buttons and a migration message appear before the first meaningful input. Counts and token estimates are exposed together. The existing activity groups are useful; the priority of the controls is not clear.
2. **Plan setup — high friction.** In `qa/ux-before-02-plans.png`, the same global controls precede scenario management and six general settings. A new user cannot easily tell whether to edit a profile, a subscription, a scenario or a model first. Useful precision is presented before the user has a basic plan.
3. **Budget interpretation — moderate risk.** Fresh DOM inspection of the calculator confirms monthly equivalents, upfront cash, yearly projections and detailed plan editing share one long page. Cost ranges are explained, but the explanation competes with configuration controls. The original screenshots above capture the entry portion; they are not evidence for sections below the viewport.

![Original team entry](qa/ux-before-01-budget.png)
![Original calculator entry](qa/ux-before-02-plans.png)

## Implemented journey

1. **Team — simplified.** Three developer counts and one server-account count are the initial inputs. Token assumptions, schedule/currency/tax, and agent account rules are separate disclosures. A visible primary action leads to Plans. Defaults are explicitly estimates, not provider allowances.
2. **Plans — guided.** Empty scenarios offer three setups: team subscriptions, personal subscriptions plus API, or custom. A selected setup retains the entered people, tokens, exchange rate and calendars. Existing plans are collapsed rows. Opening one reveals its audience and billing first; model allocation and advanced financial controls are on demand. One modal adds either a subscription or an API account.
3. **Budget — focused.** Monthly USD and RUB are primary. First-month cash, including prepayment, is distinct from the 12-month forecast. Important quota, allocation and automation warnings remain visible. A separate comparison page treats saved scenarios as alternatives, not summed expenses.

The main navigation contains only Team, Plans and Budget. Scenario selection is a single dropdown; management and file operations use menus. Guide contains terminology and the original detailed research. Primary controls are English. Existing user-entered names and original Russian provider notes are retained, with the research language identified explicitly.

## Preservation and implementation decisions

- Storage key and version-3 JSON schema remain compatible. Fresh sessions start with one empty scenario; returning users keep their existing scenarios.
- Import/export of the actual seven-scenario user draft was checked with deep equality: scenarios, profiles, settings, migration notes and active selection survived unchanged.
- Migration notices move into Guide, without deleting their data.
- No change to catalogue prices, quota rules, discounts, credit assumptions or provider endpoint rates.
- Guided presets are a starting point, not a claim of globally optimal subscription allocation. Group allocations are checked for incomplete or duplicated workload.
- Existing manual workloads stay manual. Original scenarios that share a legacy global profile retain that relationship and disclose it; new and duplicated scenarios get their own profile.
- JSON, CSV, offline HTML, printing, exact model tokens, custom rates, account identities, discounts, grants, bundles, BYOK and provider references remain accessible.
- Build validation now parses the complete combined JavaScript before replacing the deployment artifact.

## Verification and limits

- 43 engine tests pass, including preservation of custom profiles by guided presets and the verified 18+1 managed-team budget.
- First-time browser flow tested: counts 3/5/10 + 1 agent → managed annual setup → $1,630.84–$1,932.68 monthly.
- Billing changes, invalid model shares, corrected shares, collapsed summary updates, adding/removing a DeepSeek API account, and USD/RUB conversion exercised through the UI.
- Currency conversion at 100 RUB/USD updated both summary and every budget line; restored to 95 afterward.
- Saved JSON imported and exported through the interface; exact equality verified outside the browser.
- Responsive flow checked at 390×844: Team, Plans, Budget and comparison; no horizontal page overflow on Team or Budget. Temporary viewport override reset.
- Browser console showed no errors during these checks. Native disclosure elements, labelled fields, focus restoration and an Escape-close menu path are implemented. Keyboard and screen-reader compliance has not been exhaustively audited; screenshots alone do not establish WCAG compliance.
- This revision does not validate current provider pricing or create any paid accounts or API calls.

![Narrow Team screen](qa/ux-mobile-team.png)
![Narrow Plans screen](qa/ux-mobile-plans.png)
![Narrow Budget screen](qa/ux-mobile-budget.png)

The screenshots are local QA evidence and are not included in the public web bundle. Some captures precede the final copy adjustment from “first payment” to “first month” and from “subscriptions” to “seats” for team plans.


## Plans choice and manual wizard · 20 October 2026

Opening Plans now presents two explicit routes: Use a recommendation or Build my own. Existing scenarios retain Edit saved setup. The Team action also goes to this choice, while Edit plans on Budget opens the existing editor directly.

Recommendation summaries show the cost, first payment and one short reason per group. Full reasoning and assumptions stay in expandable sections. Applying a recommendation to a populated scenario creates an alternative rather than replacing the saved plans.

The manual flow has four stages: People, Plan, Usage, Review. It supports subscriptions, direct API and OpenRouter; model choices follow the provider and plan. Billing periods, multiple model shares, caching, manual token inputs, custom rates, GLM fallback and optional team/workspace grouping are available where applicable. The review uses the same scenario calculation as the final budget, including router fees, shared team limits, quota gaps and uncertain allowances.

Drafts are kept separately in memory per scenario. Back navigation and language changes retain them; Add plan is the only write to the saved plan list. Cancel discards the draft, and a reload does not persist unconfirmed work. Existing edits and advanced billing remain available in the saved-plan editor.


### Previous selections

From the second wizard step onward, a “Your choices” summary shows earlier selections and links back to edit them. It includes the group and count, subscription/billing or API provider, team workspace, workload share or explicit tokens and period, model shares/cache, and GLM fallback choice. Review uses the same summary without repeating these details. Editing a previous step preserves the draft and still requires the normal validation before advancing.

## Live estimates and Budget overview · 20 October 2026

The wizard shows its current plan and, when applicable, the whole setup including that draft in USD and RUB. Numeric typing updates only the estimate region, retaining focus. Invalid or incomplete inputs suppress amounts; unknown quotas retain ranges, and uncovered usage remains explicit. The initial People step does not price an unseen plan. After Plan has been reached, the estimate remains available while editing earlier choices.

Budget now leads with monthly total and the 12-month forecast, followed by the first-month requirement. These represent subscription prepayments, modeled token usage and applicable fees; unused prepaid top-up balances are not counted as expenses. Plan detail, charts and assumptions are collapsed. Saved alternatives appear in an inline comparison, each with its own profile, dates and exchange rate; no cheapest label is assigned to potentially different workloads.

Manual API setup includes OpenRouter, ProxyAPI, Polza AI and VseGPT. Current routes and native-currency rates are explicit. OpenRouter funding can be grouped per account; saved per-line estimates remain historical until changed. VseGPT requires a token quote and models one paid account per selected user/agent, separate head/subaccount fees and actual 30-day renewals. Multiple access groups require distinct names; all models belonging to one VseGPT access group stay on one line.


## Annual totals while choosing plans · 20 October 2026

A compact 12-month total appears below monthly costs in the manual builder, recommendations and saved-plan summaries, in USD and RUB. The builder shows the draft and combined setup separately. It uses the existing forecast payment ledger, preserving discounts, prepayments, credit balances and 30-day renewals. The layout retains the current palette and adds no controls. Browser checks covered live usage/model changes without losing focus, annual billing, EN/RU, saved setup and recommendations, plus a 354px combined-setup footer without horizontal overflow.


## People-first cart and budget limit · 20 October 2026

Plans now opens directly on people groups and a cart. Each group has Add plan, a plan count and its allocated workload percentage. The same group can receive several items; explicit workload shares avoid treating several subscriptions as separate people. Combined and manual audiences remain available. The wizard ends with Add to cart, then returns to the cart; saved items expose Edit and Remove with existing Undo support. Recommendations fill an empty cart or create a separate alternative. A narrow-screen summary links to the cart and shows its budget state.

An optional limit is entered on Team, or edited from Plans/Budget. Monthly limits compare with the recurring monthly equivalent; 12-month limits compare with forecast payments including prepayments, discounts and renewal schedules. Limits use USD or RUB, preserve the entered native amount across FX changes, and convert the amount when its currency selector changes. The selected period changes the comparison horizon without multiplying the entered limit. Empty means unlimited; zero is an explicit zero budget.

States distinguish remaining balance, fully allocated, possible overspend and definite overspend. Uncertain costs retain their bounds. Invalid entries suppress balance feedback, while invalid budget-form drafts remain transient so they cannot corrupt saved scenarios. Limits persist per scenario through JSON/offline export, duplication and recommendations; older scenarios have no limit. The cart remains an estimate and does not charge providers.


## Shared workspace seats and early capacity checks · 20 October 2026

Team-plan shortcuts now expose Codex / ChatGPT Business, Claude Team / Claude Code and GLM Team at cart entry and in the Plan step. Workspace identity is visible rather than hidden in advanced settings. The capacity panel distinguishes unique members, paid seats and optional unused seats. Conflicting tiers/billing or a verified cap/minimum block Continue before Usage; a one-person group can explicitly purchase an unused seat.

Profile groups are merged by membership within each provider/workspace. Manual member-group names explicitly declare identity; old unnamed manual rows are not inferred to be duplicates. Shared line prices are labelled as allocated costs, and the cart displays the unique paid-seat total. Monthly totals remain above expanded workspace details. The published Claude cap is enforced; GLM has an explicitly unlimited seat count; OpenAI's unverified upper bound is visibly unknown rather than invented.
