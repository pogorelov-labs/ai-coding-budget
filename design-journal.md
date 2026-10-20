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
