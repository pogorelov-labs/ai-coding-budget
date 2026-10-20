# Design journal

## Plans onboarding · 20 October 2026

The user requested an immediate recommendation/manual choice, shorter copy and a guided manual flow. Three directions considered: (1) a choice page followed by focused screens, (2) one long progressive form, (3) a modal wizard above the existing editor. Choose (1): it directly follows the requested journey, works on narrow screens and preserves the existing editor for returning users. No new visual system or motion is needed.

Palette: forest `#326451` for primary actions, slate `#48647d` for secondary hierarchy, amber `#996a2e` for warnings; ink `#203341`, muted `#5b6c79`, background `#f5f7f8`. Keep the existing system sans-serif stack and typography. Numeric costs use tabular figures. Existing reduced-motion handling remains; new screens have no entrance animation.

```
Plans → [Use a recommendation] [Build my own]
         concise estimate      People → Plan → Usage → Review → Add plan
         Use setup             saved setup → Add another / Review budget
         optional details
```

Existing scenarios retain a direct “Edit saved setup” action. Navigating to Plans shows the choice; explicit editing from Budget goes to saved plans. A manual draft is scoped to its scenario and stays out of saved budgets until Add plan. Back and language switching retain its values. The review shows line cost, first payment, quota gaps and combined team-seat errors using the existing engine.

The signature is the explicit two-route decision and four-step trail. Remove duplicate primary actions and the old competing preset selector. Keep warnings that affect costs; move full recommendation reasoning and modelling assumptions into expandable details.

### Verification and critique

Removed the extra captions from the two entry cards and the repeated recommendation eyebrow after screenshot review. No new decorative elements or colors were introduced. Desktop and 354px layouts retain a clear choice, readable controls and a visible primary action. Numeric inputs and navigation controls have 44px minimum heights; controls use native labels and semantics, the current wizard step has aria-current, invalid fields reference the error summary, and keyboard activation was checked. Existing focus and reduced-motion rules apply. Browser console: no errors/warnings. Automated suite: 72 passed. A temporary first-load lab probe recorded LCP 84ms, CLS 0; INP and field p75 are unmeasured. Temporary probes were removed.


## Selections across wizard steps · 20 October 2026

Add a compact “Your choices” summary below the step trail, using the existing slate surface and typography. Show only earlier steps: People on Plan, People + Plan on Usage, then People + Plan + Usage on Review. Each row has a keyboard-accessible Edit action that goes backward without clearing draft fields. Reuse the summary on Review instead of repeating the old details table. Model lists over two entries and custom token prices expand on demand. User-entered workspace names remain unmodified and escaped.

Verification: 72 existing tests passed; the standalone build succeeded. Browser checks verified selection retention when editing people, refreshed billing/provider values after switching to API, quota and model/cache details, manual input/output units and period, EN/RU, and a 354px viewport with no page overflow. No browser warnings or errors were captured. No calculation or persistence logic changed.


## Live pricing and simpler Budget · 20 October 2026

Keep the established palette and controls. Place the draft/combined monthly estimate in the wizard footer rather than adding another dashboard. At narrow widths the estimate sits above the navigation, and short viewports disable sticky positioning. Budget puts its two time horizons first and compares saved alternatives directly below; detailed assumptions and plots remain native disclosures. Gateway details belong beside provider selection and in an expandable research reference.

Verification covered live input focus, missing-value states, uncertainty/coverage notices, EN/RU and 354px mobile rendering. Numeric provider prices remain native-currency data; unknown billing units are visible limitations. No new motion or external UI dependency was introduced. Existing first-load performance checks remain historical; INP and field p75 are unmeasured.


## Annual totals while choosing plans · 20 October 2026

A compact 12-month total appears below monthly costs in the manual builder, recommendations and saved-plan summaries, in USD and RUB. The builder shows the draft and combined setup separately. It uses the existing forecast payment ledger, preserving discounts, prepayments, credit balances and 30-day renewals. The layout retains the current palette and adds no controls. Browser checks covered live usage/model changes without losing focus, annual billing, EN/RU, saved setup and recommendations, plus a 354px combined-setup footer without horizontal overflow.

## Plan cart and spending limit · 20 October 2026

Keep forest #326451, slate #48647d, amber #996a2e, ink #203341, muted #5b6c79 and background #f5f7f8; existing system fonts, tabular prices, no new motion. Three directions considered: a provider store (obscures who needs access), a cart drawer (hides the total), and a people-first catalogue with a visible cart (chosen). Each group can add multiple subscriptions/APIs. The signature is the visible relationship between people, allocated workload and cart items, rather than another set of generic plan cards.

```
Team → optional monthly / 12-month limit, USD / RUB
Plans → people groups + Add plan | cart items + total + budget balance
        People → Plan → Usage → Add to cart
Budget → totals + remaining / over-budget amount
```

Budget belongs to each scenario, accepts an explicit zero, and compares monthly equivalents or actual 12-month forecast payments. Ranges distinguish possible from definite overspend; incomplete coverage remains visible. Adding to a cart saves an estimate only. Preserve existing saved scenarios and manual workloads.

Verification and critique: removed the old two-path entry cards and the sticky back-only footer, corrected default h4 margins, and kept recommendations as a secondary action. Added a compact mobile cart link so totals are visible before scrolling through groups. No new decorative icons, motion or colors were introduced. Tested group additions, repeated billing edits, limit changes, removal/undo, recommendations and EN/RU. The 354px cart and draft views have no horizontal overflow. Manual contrast/keyboard checks passed; local LCP 92ms, CLS 0, with INP/field p75 unmeasured.


## Workspace purchase identity · 20 October 2026

Reuse forest, slate and amber tokens and native labelled controls. Considered a separate workspace dashboard, a modal seat manager, and an inline capacity panel. Chose the inline panel: membership, billing and capacity are visible at the point where a plan is selected. Three compact provider shortcuts solve the discovery problem without another catalogue page. Shared seat totals are explicit in the cart; the same-member workload items remain independently editable.

Visual critique moved workspace detail below monetary totals and retained concise source links. Desktop and 354px checks confirmed visible error feedback and disabled Continue, with keyboard recovery to People. Existing touch targets, focus styling and contrast tokens are retained. There is no added motion. The local probe measured LCP 104ms and CLS 0; INP and field p75 are unmeasured.
