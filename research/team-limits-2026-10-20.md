# Workspace seats and provider limits · 20 October 2026

## Verified rules

| Provider | Seat rule | Treatment |
| --- | --- | --- |
| GLM Team | Minimum 2, explicitly no upper seat limit; one member per seat; Standard/Premium cannot mix inside one team | Enforce minimum and same-tier rule. Shared workload items do not multiply seats or quota. |
| Claude Team | 2–150 seats; Standard/Premium can be assigned to different members | Enforce combined workspace cap and reject assigning overlapping members to different tiers. |
| ChatGPT Business / Codex | Minimum 2 confirmed; the fetched current pricing page does not establish the former 200 maximum | Show upper capacity as unverified; remove the unsupported hard stop and recommender ceiling. This is not a claim of unlimited capacity. |
| OpenRouter | Default 10 organisation members; support can expand | Retain informational account-member guidance, separate from API consumers and keys. |

Sources fetched: [GLM seat rules](https://docs.z.ai/devpack/teamplan), [Claude Team](https://support.claude.com/en/articles/9266767-what-is-the-team-plan), [OpenAI pricing](https://learn.chatgpt.com/docs/pricing), [OpenRouter organisation management](https://openrouter.ai/docs/cookbook/administration/organization-management). Core token prices are still the 17 October snapshot. This change verifies seat rules, not a new exhaustive pricing review.

VseGPT's Tariffs and Tariffs/Ext pages timed out in this recheck. The previously sourced 20 October gateway snapshot and its head/subaccount calculation are retained without a new verification claim. No provider checkout, member invitation or paid request was performed.

## Membership and billing model

A workspace is provider family plus its entered name (trimmed, case-sensitive). Profile cohorts identify the same people across `all`, `active`, specific developer groups and technical groups. Their union determines members; workload percentages do not multiply or reduce seats. A separately named workspace or different provider retains a separate purchase.

Manual workloads cannot establish identity from a number alone. Matching explicit `memberGroup` names within a workspace identify the same people and must have matching counts. Existing unnamed manual rows remain distinct. Use a profile audience to reference people already in the profile; a manual group is not automatically matched to a similarly named profile group.

Overlapping members must have the same tier, billing term, unit price and seat discounts. Conflicting terms block the quote rather than selecting the cheaper declaration. GLM also forbids mixed tiers across disjoint members in the same workspace. Shared seat costs, prepaid cash and first-payment discounts are allocated across participating items; the workspace total pays once. Each item's displayed cost is an allocation, not necessarily the incremental cost of adding it.

Unused seats are a pool for matching workspace/tier/purchase terms. The largest declared unused count is used instead of summing repeated declarations. Explicit extras, purchased bundles and manually entered grants remain per-item entries; do not repeat a single account-wide purchase across items.

GLM's per-member weekly/five-hour usage is combined across shared items before overage is priced. No quota is borrowed from other members or unused seats. Claude's derived API-credit allowance uses allocated paid seats so reused purchases cannot multiply that allowance. Category analytics allocate seat fees to the corresponding unique cohorts and reconcile with the forecast.

## UX and compatibility

Codex / ChatGPT Business, Claude Team / Claude Code and GLM Team have direct entry buttons on Plans and the Plan step. Workspace name and member grouping are visible alongside capacity. Verified-cap, minimum, member-tier and billing conflicts are evaluated on the Plan step and disable Continue; the commit check remains a final guard. A one-person group can explicitly buy an unused seat to meet a minimum. The calculator does not silently create extra workspaces to bypass a cap.

Capacity shows unique members, paid seats, unused seats, published limits and dated source links. Invalid Review states do not show a prominent valid-looking price. Existing editor changes update capacity and budget feedback immediately. Shared purchases and manual member-group names persist through JSON/offline export using optional fields in the existing version-3 format.
