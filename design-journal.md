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
