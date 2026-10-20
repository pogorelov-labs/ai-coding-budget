// Presentation layer for the three-step journey. The pricing engine stays independent.
const GROUP_COPY = {
  heavy: ["Power users", "Long agent runs, large codebases"],
  regular: ["Regular users", "Daily coding with an AI assistant"],
  light: ["Light users", "Occasional questions and small edits"],
};
let resourceTab = "overview";
function freshState() {
  const s = initialState();
  s.settings.profile.forEach((g) => (g.count = g.id === "regular" ? 10 : 0));
  s.scenarios = [
    {
      id: uid(),
      name: tr("My team budget"),
      settings: clone(s.settings),
      lines: [],
    },
  ];
  s.active = s.scenarios[0].id;
  return s;
}
function heading(k, title, body) {
  return `<div class="page-heading"><span class="eyebrow">${k}</span><h2 tabindex="-1" id="page-title">${title}</h2><p>${body}</p></div>`;
}
function stepFooter(previous, next, text, action = null) {
  return `<div class="step-footer">${previous ? `<button class="btn quiet" data-tab="${previous}">Back</button>` : '<span class="small muted">You can adjust these estimates later.</span>'}<button class="btn primary" ${action ? `data-action="${action}"` : `data-tab="${next}"`}>${text} <span aria-hidden="true">→</span></button></div>`;
}
function contextHTML() {
  return `<label class="scenario-picker"><span>Scenario</span><select id="scenario-picker" aria-label="Current scenario">${state.scenarios.map((s) => `<option data-user-content value="${s.id}" ${s.id === state.active ? "selected" : ""}>${esc(s.name)}</option>`).join("")}</select></label><details class="menu" id="scenario-menu"><summary>Manage</summary><div class="menu-panel"><button data-action="new-scenario">New scenario</button><button data-action="rename-scenario">Rename</button><button data-action="clone-scenario">Duplicate</button><button data-action="undo" ${pendingUndo ? "" : "disabled"}>Undo last removal</button><button class="danger" data-action="remove-scenario" ${state.scenarios.length === 1 ? "disabled" : ""}>Delete scenario</button></div></details>`;
}
function teamStepHTML() {
  const s = settings();
  return `${heading("Step 1 of 3", "Who will use AI?", "Count your developers by activity. We’ll use editable token estimates to get you started.")}<div class="profile-cards">${s.profile.map((g, i) => `<section class="profile-card"><div class="profile-card-head"><span class="activity-dot level-${i}" aria-hidden="true"></span><h3>${GROUP_COPY[g.id][0]}</h3></div><p class="small muted">${GROUP_COPY[g.id][1]}</p>${input("p." + g.id + ".count", GROUP_COPY[g.id][0] + " · developers", g.count, { max: 10000, step: 1 })}</section>`).join("")}</div><div class="agent-row"><div><h3>Server agents</h3><p class="small muted">Shared bots, CI and unattended coding</p></div>${input("t.count", "Agent accounts", s.technical.count, { max: 10000, step: 1 })}</div><div id="profile-stats" aria-live="polite">${teamStatsHTML()}</div>${detail("usage-estimates", "Adjust token estimates", `<p class="inline-help">Example workloads, not provider allowances. Enter millions of tokens per person per working day. Input includes cached tokens; output includes billable reasoning.</p><div class="estimate-grid">${s.profile.map((g) => `<section><h3>${GROUP_COPY[g.id][0]}</h3>${input("p." + g.id + ".input", "Input M / person / day", g.input)}${input("p." + g.id + ".output", "Output M / person / day", g.output)}</section>`).join("")}<section><h3>Server agents</h3>${input("t.input", "Input M / agent / day", s.technical.input)}${input("t.output", "Output M / agent / day", s.technical.output)}</section></div>`)}${detail("schedule-currency", "Schedule, currency & tax", globalSettingsHTML())}${detail("agent-settings", "Agent schedule & account rules", agentSettingsHTML())}${active().lines.some((l) => !profileLinked(l)) ? '<p class="compact-note">This saved scenario includes manually entered workloads. Changing this profile affects only plans linked to a team group.</p>' : ""}${!active().settings ? '<p class="compact-note">This legacy profile is shared by your original scenarios. New scenarios have their own profile.</p>' : ""}${stepFooter(null, "calculator", "Choose plans", "show-plans")}`;
}
function teamStatsHTML() {
  const p = profileTotals(settings()),
    t = technicalTotals(settings());
  const errors = settingsErrors(settings());
  return `<div class="team-tally"><strong>${p.count} developers${t.count ? " + " + t.count + " agent" + (t.count === 1 ? "" : "s") : ""}</strong><span>Estimated monthly usage: ${nf.format(p.input * settings().days + t.input)}M input · ${nf.format(p.output * settings().days + t.output)}M output</span></div>${errors.length ? `<div class="callout bad" role="alert">Check your entries: ${errors.map(x=>esc(tr(x))).join("; ")}</div>` : ""}`;
}
function globalSettingsHTML() {
  const s = settings();
  return `<div class="grid four">${input("g.fx", "RUB per US dollar", s.fx, { min: 0.001 })}${input("g.days", "Working days / month", s.days, { min: 1, max: 31, step: 1 })}${input("g.start", "Start hour", s.start, { max: 23.75, step: 0.25 })}${input("g.end", "End hour", s.end, { max: 23.75, step: 0.25 })}${input("g.utc", "Time zone · UTC offset", s.utc, { min: -12, max: 14, step: 0.25 })}${input("g.weekDays", "Working days / week", s.weekDays, { min: 1, max: 7, step: 1 })}${input("g.tax", "Tax / surcharge, %", s.tax, { max: 100 })}${input("g.date", "Calculation date", s.date, { type: "date" })}</div>${detail(
    "peak-settings",
    "Peak-hour assumptions",
    `<div class="grid">${select(
      "g.peakMode",
      "Usage distribution",
      s.peakMode,
      [
        ["schedule", "Evenly across working hours"],
        ["manual", "Custom peak share"],
      ],
    )}${input("g.peak", "Tokens used at peak time, %", s.peak, { max: 100 })}</div><p class="inline-help">Defaults: 09:00–18:00 Moscow, Monday–Friday. Equal start/end means 24 hours. Peak-hour discounts affect usage, not the subscription price.</p>`,
  )}`;
}
function agentSettingsHTML() {
  const t = settings().technical;
  return `<p class="inline-help">Separate from developers. Default: 24/7, 30 days. A shared server normally needs API billing or an explicitly eligible service account.</p><div class="grid four">${input("t.days", "Agent days / month", t.days, { min: 1, max: 31, step: 1 })}${input("t.weekDays", "Agent days / week", t.weekDays, { min: 1, max: 7, step: 1 })}${input("t.start", "Agent start hour", t.start, { max: 23.75, step: 0.25 })}${input("t.end", "Agent end hour", t.end, { max: 23.75, step: 0.25 })}${input("t.workers", "Concurrent workers / account", t.workers, { min: 1, max: 10000, step: 1 })}${select(
    "t.purpose",
    "Account purpose",
    t.purpose,
    [
      ["shared", "Shared team service"],
      ["personal", "Owner’s personal automation"],
    ],
  )}${select("t.peakMode", "Agent usage distribution", t.peakMode, [
    ["schedule", "Evenly across schedule"],
    ["manual", "Custom peak share"],
  ])}${input("t.peak", "Agent tokens at peak, %", t.peak, { max: 100 })}</div><p class="inline-help">Daily tokens already include all workers. Worker count does not multiply the bill or guarantee throughput.</p>`;
}
function compactPlanHTML(l, i, r, first) {
  const e = effectiveLine(l, settings()),
    p = PLAN[l.plan],
    subscription = l.kind === "subscription",
    quantity = subscription ? e.seats : e.users;
  const audience = audienceName(l.audience || "manual");
  const modelMix = l.rows
    .map(
      (row) =>
        `${MODEL[row.model]?.name || row.model}${l.volumeMode === "mix" ? " " + nf.format(row.share) + "%" : ""}`,
    )
    .join(" · ");
  return `<details class="plan-card" data-detail="plan-${l.id}" ${openDetails.has("plan-" + l.id) ? "open" : ""}><summary><span class="plan-index">${String(i + 1).padStart(2, "0")}</span><span class="plan-summary" data-plan-summary="${l.id}"><strong ${l.name?"data-user-content":""}>${esc(label(l))}</strong><small>${esc(audience)} · ${quantityText(l, quantity)}${subscription ? " · " + (l.billing === "annual" ? "annual" : l.billing === "quarterly" ? "quarterly" : "monthly") : ""}</small><small>${esc(modelMix)}</small></span><span class="plan-price" data-compact-price="${l.id}">${r?.valid ? priceRange(r.low, r.high) : "Check inputs"}<small>/ month</small></span><span class="plan-edit">Edit</span></summary><div class="plan-editor">${planEditorHTML(l, r, first)}</div></details>`;
}
function quantityText(l, count) {
  const word =
    l.audience === "technical" || l.consumerType === "technical"
      ? "account"
      : l.kind === "subscription"
        ? PLAN[l.plan]?.team
          ? "seat"
          : "subscription"
        : "user";
  return count + " " + word + (count === 1 ? "" : "s");
}
function audienceName(a) {
  return a === "all"
    ? "All developers"
    : a === "active"
      ? "Power + regular users"
      : a === "technical"
        ? "Server agents"
        : GROUP_COPY[a]?.[0] || "Manual workload";
}
function planEditorHTML(l, r, first) {
  const b = "l." + l.id + ".",
    p = PLAN[l.plan],
    e = effectiveLine(l, settings()),
    linked = profileLinked(l);
  const periods = [["monthly", "Monthly"]];
  if (p?.quarterly != null || l.unitPrice !== null)
    periods.push(["quarterly", "Quarterly"]);
  if (p?.annual != null || l.unitPrice !== null)
    periods.push(["annual", "Annual · paid upfront"]);
  return `<div class="grid">${input(b + "name", "Label (optional)", l.name, { type: "text", placeholder: label(l) })}${select(b + "audience", "Who uses this?", l.audience || "manual", audienceOptions())}${
    l.kind === "subscription"
      ? select(
          b + "plan",
          "Subscription",
          l.plan,
          PLANS.map((p) => [p.id, p.name]),
        )
      : select(b + "kind", "API billing", l.kind, [
          ["api", "Direct provider API"],
          ["openrouter", "OpenRouter"],
        ])
  }${l.kind === "subscription" ? select(b + "billing", "Billing period", l.billing, periods) : ""}${linked ? input(b + "profileShare", "Share of this group’s workload, %", l.profileShare ?? 100, { max: 100 }) : input(b + "quantity", l.kind === "subscription" ? "Subscriptions" : "Users / accounts", l.kind === "subscription" ? e.seats : e.users, { min: 1, max: 10000, step: 1 })}</div><p class="inline-help">${linked ? `${e.users} ${l.audience === "technical" ? (e.users === 1 ? "agent account" : "agent accounts") : "people"} from your profile. Seat count follows the group; workload share only changes tokens.` : "One subscription per person. This manual workload is independent of the team profile."}</p>${l.kind === "subscription" && p.team ? `<p class="compact-note">Team size: ${p.min || 2} minimum${p.max ? " · " + p.max + " maximum" : p.unlimitedSeats ? " · no published upper seat limit" : ""}. ${p.family === "glm" ? "Each seat has its own quota. All GLM seats in one team must use the same tier." : ""}</p>` : ""}<div class="callout-slot">${l.audience === "technical" || l.consumerType === "technical" ? automationCallout(l) : ""}</div>${
    !linked
      ? `<div class="grid manual-usage">${select(
          b + "period",
          "Token period",
          l.period,
          [
            ["person-day", "Per person / day"],
            ["person-month", "Per person / month"],
            ["team-month", "Whole line / month"],
          ],
        )}${l.volumeMode === "mix" ? input(b + "input", "Total input, M tokens", l.input) + input(b + "output", "Total output, M tokens", l.output) : ""}</div>`
      : ""
  }${detail("models-" + l.id, "Models & token allocation", `<div class="usage-head"><p class="small muted">Input includes cache. Shares must total 100%.</p><div class="segmented"><button class="${l.volumeMode === "mix" ? "active" : ""}" data-action="volume-mode" data-id="${l.id}" data-value="mix">Model shares</button><button class="${l.volumeMode === "explicit" ? "active" : ""}" data-action="volume-mode" data-id="${l.id}" data-value="explicit">Exact tokens</button></div></div>${l.rows.map((row, i) => rowHTML(l, row, i, r?.rows[i])).join("")}<button class="btn quiet" data-action="add-row" data-id="${l.id}">Add model</button>`)}${detail("line-extra-" + l.id, "Limits, discounts & advanced billing", lineExtra(l))}${detail("result-" + l.id, "Quota check & calculation detail", `<div data-line-result="${l.id}">${lineResultHTML(r, first)}</div>`)}<div class="editor-actions"><button class="btn quiet" data-action="clone-line" data-id="${l.id}">Duplicate plan</button><button class="btn quiet danger" data-action="remove-line" data-id="${l.id}">Remove plan</button><button class="btn" data-action="close-plan" data-id="${l.id}">Done</button></div>`;
}
function plansStepHTML() {
  const mode=planJourney().mode;
  return mode==='wizard'?planWizardHTML():mode==='recommend'?recommendationStepHTML():mode==='edit'&&active().lines.length?plansEditorHTML():plansChoiceHTML();
}
function planEstimateHTML(f) {
  return active().lines.length
    ? `<div class="estimate-strip"><span>${settings().team} developers${settings().technical.count ? " + " + settings().technical.count + " agent account" + (settings().technical.count === 1 ? "" : "s") : ""}</span><strong>${f.regular.valid ? priceRange(f.regular.low, f.regular.high) : "Check inputs"} <small>/ month</small></strong></div>${!f.regular.valid ? '<p class="callout bad" role="alert">Some inputs need attention. Open the affected plan or review the budget.</p>' : ""}`
    : "";
}
function coverageNotes(sc) {
  const s = settings(sc),
    notes = [];
  const groups = [
    ...s.profile.filter((g) => g.count),
    ...(s.technical.count
      ? [{ id: "technical", count: s.technical.count }]
      : []),
  ];
  for (const g of groups) {
    const linked = sc.lines.filter(
      (l) =>
        l.audience === g.id ||
        (g.id !== "technical" &&
          (l.audience === "all" ||
            (l.audience === "active" && g.id !== "light"))),
    );
    const share = linked.reduce((n, l) => n + (l.profileShare ?? 100), 0);
    if (Math.abs(share - 100) > 0.01)
      notes.push(
        `${audienceName(g.id)}: ${nf.format(share)}% of the profile workload is assigned. ${share > 100 ? "This counts some usage more than once." : "Some usage is unassigned; manual plans may cover it separately."}`,
      );
  }
  return notes;
}
function budgetNotices(f) {
  const r = f.regular,
    notices = [];
  if (!r.valid)
    notices.push([
      "bad",
      "Check inputs before using this budget.",
      r.errors.map(x=>esc(tr(x))).join("; "),
    ]);
  if (r.valid && !r.covered)
    notices.push([
      "bad",
      "The full workload is not covered.",
      "A quota is exceeded without a paid fallback. This total does not fund all entered work.",
    ]);
  if (
    r.lines.some(
      (x) =>
        !x.inactive &&
        automationAssessment(x.line, settings())?.level === "bad",
    )
  )
    notices.push([
      "bad",
      "A server account needs a different billing route.",
      "The selected subscription does not establish eligibility for a shared team bot. Review its account rules.",
    ]);
  if (r.range)
    notices.push([
      "warn",
      "Why a range?",
      "Included subscription usage is not published as a fixed token allowance. The upper estimate adds the entered workload at your overage rates; it is not a guaranteed bill cap.",
    ]);
  const allocation = coverageNotes(active());
  if (allocation.length)
    notices.push(["warn", "Review workload allocation.", allocation.join(" ")]);
  return notices
    .map(
      ([kind, title, text]) =>
        `<div class="callout ${kind}" ${kind === "bad" ? 'role="alert"' : ""}><strong>${title}</strong><p>${text}</p></div>`,
    )
    .join("");
}
function budgetSummaryHTML(f) {
  const r = f.regular;
  if (!active().lines.length)
    return '<div class="empty-state"><h3>Your budget needs a plan.</h3><p>Add a subscription or API account to calculate costs.</p><button class="btn primary" data-tab="calculator">Choose plans</button></div>';
  return `<section class="budget-hero" aria-live="polite"><div><span class="eyebrow">Estimated monthly budget</span><div class="budget-total">${r.valid ? priceRange(r.low, r.high) : "Check inputs"}</div><div class="budget-rubles">${r.valid ? priceRange(r.low, r.high, "rub") : ""}</div><p class="small muted">Annual subscriptions shown as a monthly equivalent.</p></div>${input("g.fx", "RUB per $1", settings().fx, { min: 0.001 })}</section><div class="cash-grid"><div><span>First month · includes prepayment</span><strong>${f.first.valid ? priceRange(f.first.cashLow, f.first.cashHigh) : "—"}</strong><small>${f.first.valid ? priceRange(f.first.cashLow, f.first.cashHigh, "rub") : ""}</small></div><div><span>12-month forecast · current rates</span><strong>${f.year.valid ? priceRange(f.year.low, f.year.high) : "—"}</strong><small>${f.year.valid ? priceRange(f.year.low, f.year.high, "rub") : ""}</small></div></div>${budgetNotices(f)}`;
}
function budgetStepHTML() {
  const sc = active(),
    f = forecast(sc, settings());
  return `${heading("Step 3 of 3", "Your budget, explained.", "See the monthly estimate, the first-month cash requirement, and the assumptions that affect both.")}<div id="summary">${budgetSummaryHTML(f)}</div>${sc.lines.length ? `${analyticsHTML(f)}<section class="budget-breakdown"><div class="section-heading"><h3>What you’re paying for</h3><button class="btn quiet" data-action="plan-edit-budget">Edit plans</button></div>${f.regular.lines.map((r, i) => `<div class="breakdown-row"><div><strong ${sc.lines[i].name?"data-user-content":""}>${esc(label(sc.lines[i]))}</strong><small>${audienceName(sc.lines[i].audience)} · ${quantityText(sc.lines[i], r.line.kind === "subscription" ? r.line.seats : r.line.users)}</small></div><div><strong>${r.valid ? priceRange(r.low, r.high) : "Check inputs"}</strong><small>${r.valid ? priceRange(r.low, r.high, "rub") : ""}</small></div></div>`).join("")}</section>${detail("budget-assumptions", "Schedule, currency & calculation assumptions", globalSettingsHTML() + `<p class="inline-help">Pricing snapshot: ${CHECKED}. Taxes: ${settings().tax}%. Cache and quota assumptions are editable inside each plan. Infrastructure and tool fees are included only when entered explicitly.</p>`)}${sc.preset === "team-standard" ? detail("alternatives", "Try fewer GLM seats", `<p class="inline-help">Create a separate scenario with the same workload. Your current budget stays saved.</p><div class="actions"><button class="btn" data-action="team-alternative" data-value="active">GLM API for light users</button><button class="btn" data-action="team-alternative" data-value="api">All GLM through API</button></div>`) : ""}<div class="step-footer"><button class="btn quiet" data-tab="calculator">Back to plans</button><button class="btn primary" data-tab="compare">Compare saved scenarios</button></div>` : ""}`;
}
function comparisonHTML() {
  return `${heading("Compare alternatives", "Which setup fits your budget?", "Each scenario is a separate alternative. Check the people, workload and models before comparing prices.")}<div class="comparison-list">${state.scenarios
    .map((sc) => {
      const f = forecast(sc, settings(sc)),
        r = f.regular,
        s = settings(sc);
      return `<article class="comparison-card ${sc.id === state.active ? "selected" : ""}"><div><h3 data-user-content>${esc(sc.name)}</h3><p class="small muted">${s.team} developers · ${s.technical.count} agent${s.technical.count === 1 ? "" : "s"} · ${sc.lines.length} plan${sc.lines.length === 1 ? "" : "s"}</p></div><div><strong>${sc.lines.length && r.valid ? priceRange(r.low, r.high) : sc.lines.length ? "Check inputs" : "No plans yet"}</strong><small>${sc.lines.length && r.valid ? priceRange(r.low, r.high, "rub", s.fx) + " / month" : ""}</small></div><span class="badge ${!r.covered || !r.valid ? "bad" : r.range ? "warn" : ""}">${!sc.lines.length ? "Incomplete" : !r.valid ? "Invalid input" : !r.covered ? "Workload not covered" : r.range ? "Quota uncertain" : "Estimate"}</span><button class="btn" data-action="open-budget" data-id="${sc.id}">Open budget</button></article>`;
    })
    .join(
      "",
    )}</div><div class="step-footer"><button class="btn quiet" data-tab="budget">Back to budget</button><button class="btn primary" data-action="new-scenario">Create another scenario</button></div>`;
}
function resourcesHTML() {
  return `${heading("Reference", "Details when you need them.", "Find provider prices, account conditions and the assumptions behind your estimate.")}<div class="resource-links">${[
    ["overview", "Quick guide"],
    ["catalog", "Prices & offers"],
    ["automation", "Server accounts"],
    ["method", "Method & sources"],
  ]
    .map(
      ([id, name]) =>
        `<button class="btn ${resourceTab === id ? "primary" : ""}" data-action="resource-page" data-value="${id}">${name}</button>`,
    )
    .join(
      "",
    )}</div>${resourceTab === "overview" ? `<div class="quick-guide"><h3>Three steps to a useful estimate</h3><ol><li><strong>Team:</strong> count people and agents. Default token workloads are examples; replace them with measured usage when available.</li><li><strong>Plans:</strong> choose a starting setup, then edit the groups, billing and models.</li><li><strong>Budget:</strong> review monthly cost and upfront cash. Compare alternatives separately.</li></ol><h3>Three terms to know</h3><p><strong>Subscription:</strong> a recurring plan per person, with its own usage limits.</p><p><strong>API:</strong> metered input and output tokens, plus applicable fees.</p><p><strong>Workload share:</strong> how much of a group’s usage goes to a plan. Across plans, aim for 100% for each group.</p><p>Saved in this browser. Use File → Export JSON for a backup, or Download offline calculator for a standalone copy.</p>${state.migrationNotes?.length ? detail("migration-notes", "Notes about older saved scenarios", `<div data-localized-content lang="${uiLanguage}">${state.migrationNotes.map((n) => `<p>${esc(n)}</p>`).join("")}</div>`) : ""}</div>` : `<p class="compact-note">Prices and assumptions are dated ${CHECKED}. Source pages may use their original language.</p><div class="reference-content" data-localized-content lang="${uiLanguage}">${resourceTab === "catalog" ? catalogHTML() : resourceTab === "automation" ? automationGuideHTML() : methodHTML()}</div>`}<div class="step-footer"><button class="btn" data-tab="budget">Back to budget</button></div>`;
}
function journeyRender() {
  const root = $("#workspace");
  document
    .querySelectorAll("details[data-detail]")
    .forEach((d) =>
      d.open
        ? openDetails.add(d.dataset.detail)
        : openDetails.delete(d.dataset.detail),
    );
  if (["catalog", "automation", "method"].includes(state.tab)) {
    resourceTab = state.tab;
    state.tab = "resources";
  }
  if (
    !["team", "calculator", "budget", "compare", "resources"].includes(
      state.tab,
    )
  )
    state.tab = "team";
  $("#scenario-context").innerHTML = contextHTML();
  document.querySelectorAll(".steps [data-tab]").forEach((b) => {
    const chosen = b.dataset.tab === state.tab;
    b.classList.toggle("active", chosen);
    if (chosen) b.setAttribute("aria-current", "step");
    else b.removeAttribute("aria-current");
  });
  root.innerHTML = `<div class="view">${state.tab === "team" ? teamStepHTML() : state.tab === "calculator" ? plansStepHTML() : state.tab === "budget" ? budgetStepHTML() : state.tab === "compare" ? comparisonHTML() : resourcesHTML()}</div>`;
  localizeUI();
  if (storageWarning) toast(storageWarning);
  save();
}
function journeyUpdate() {
  if (state.tab === "team") {
    if ($("#profile-stats")) $("#profile-stats").innerHTML = teamStatsHTML();
    localizeUI();
    save();
    return;
  }
  const f = forecast(active(), settings());
  if (state.tab === "calculator" && $("#summary"))
    $("#summary").innerHTML = planEstimateHTML(f);
  if (state.tab === "budget") {
    const focused = document.activeElement,
      bind = focused?.dataset?.bind;
    const fragment = document.createElement("div");
    fragment.innerHTML = budgetStepHTML();
    if (bind) {
      const replacement = fragment.querySelector(`[data-bind="${bind}"]`);
      if (replacement) replacement.replaceWith(focused);
    }
    $("#workspace").replaceChildren(...fragment.childNodes);
    if (bind) {
      focused.focus({ preventScroll: true });
    }
  }
  for (const r of f.regular.lines) {
    const source = active().lines.find((l) => l.id === r.line.id),
      copy = document.querySelector(`[data-plan-summary="${r.line.id}"]`);
    if (copy) {
      const count =
        r.line.kind === "subscription" ? r.line.seats : r.line.users;
      copy.innerHTML = `<strong ${source.name?"data-user-content":""}>${esc(label(source))}</strong><small>${esc(audienceName(source.audience || "manual"))} · ${quantityText(source, count)}${source.kind === "subscription" ? " · " + source.billing : ""}</small><small>${source.rows.map((row) => esc(MODEL[row.model].name) + (source.volumeMode === "mix" ? " " + nf.format(row.share) + "%" : "")).join(" · ")}</small>`;
    }
    const compact = document.querySelector(
      `[data-compact-price="${r.line.id}"]`,
    );
    if (compact)
      compact.innerHTML =
        (r.valid ? priceRange(r.low, r.high) : "Check inputs") +
        "<small>/ month</small>";
    const foot = document.querySelector(`[data-line-result="${r.line.id}"]`);
    if (foot)
      foot.innerHTML = lineResultHTML(
        r,
        f.first.lines.find((x) => x.line.id === r.line.id),
      );
    for (const row of r.rows) {
      const el = document.querySelector(`[data-row-price="${row.id}"]`);
      if (el)
        el.innerHTML =
          USD.format(row.cost) +
          '<div class="small muted">API equivalent / month</div>';
    }
  }
  localizeUI();
  save();
}

function focusPage() {
  window.scrollTo({ top: 0, behavior: "instant" });
  $("#page-title")?.focus({ preventScroll: true });
}
function journeyAction(b) {
  const act = b.dataset.action;
  if (plansAction(b) || recommendationAction(b)) return true;
  if(act === "plan-edit-budget"){enterPlans("edit");render();focusPage();return true;}
  if (act === "show-plans") {
    enterPlans();
    render();
    focusPage();
    return true;
  }
  if (act === "close-plan") {
    const d = document.querySelector(`[data-detail="plan-${b.dataset.id}"]`);
    if (d) {
      d.open = false;
      openDetails.delete(d.dataset.detail);
      d.querySelector("summary").focus();
    }
    return true;
  }
  if (act === "open-budget") {
    state.active = b.dataset.id;
    state.tab = "budget";
    render();
    focusPage();
    return true;
  }
  if (act === "resource-page") {
    resourceTab = b.dataset.value;
    render();
    focusPage();
    return true;
  }
  if (act === "rename-scenario") {
    const d = $("#add-dialog");
    d.innerHTML = `<div class="dialog-head"><h2>Rename scenario</h2><button class="btn quiet" data-action="close-dialog">Close</button></div>${input("scenario.name", "Scenario name", active().name, { type: "text" })}<div class="dialog-footer"><button class="btn primary" data-action="close-dialog">Done</button></div>`;
    localizeUI(d);
    d.showModal();
    return true;
  }
  return false;
}

const recommendationPreferences = new Map();
let recommendationMemo = null;
function currentRecommendationOptions() {
  if (recommendationPreferences.has(active().id)) return recommendationPreferences.get(active().id);
  const sc = active();
  if (sc.recommendation?.options) return recommendationOptions(sc.recommendation.options);
  const glmLines = sc.lines.filter(l => l.audience !== 'technical' && l.rows.every(r => MODEL[r.model]?.glm) && l.volumeMode === 'mix');
  const matched = Object.entries(RECOMMENDATION_MIXES).find(([,m]) => glmLines.length && glmLines.every(l => m.rows.every(([id,share]) => Math.abs(l.rows.filter(r=>r.model===id).reduce((n,r)=>n+r.share,0)-share)<.001) && l.rows.every(r=>r.share===0||m.rows.some(([id])=>id===r.model))));
  const caches = [...new Set(sc.lines.flatMap(l => l.rows.map(r=>r.cache)))];
  return recommendationOptions({mix: matched?.[0] || 'balanced',cache:caches.length===1?caches[0]:80,keepCodex:sc.lines.some(l=>l.kind==='subscription'&&['oai-business','oai-premium'].includes(l.plan))});
}
function currentRecommendation() {
  const options=currentRecommendationOptions(),key=JSON.stringify([settings(),options]);
  if(recommendationMemo?.key!==key)recommendationMemo={key,result:recommendSetup(settings(),options)};
  return recommendationMemo.result;
}
function recommendationControls(o) {
  const recSelect=(key,title,value,choices)=>`<label class="field"><span>${title}</span><select data-rec="${key}">${choices.map(([v,t])=>`<option value="${v}" ${v===value?'selected':''}>${t}</option>`).join('')}</select></label>`;
  const recCheck=(key,title)=>`<label class="check-row"><input type="checkbox" data-rec="${key}" ${o[key]?'checked':''}><span>${title}</span></label>`;
  return `<div class="recommend-billing">${recSelect('billing','Billing period',o.billing,[['annual','Annual · paid upfront'],['monthly','Monthly']])}</div>${detail('recommend-preferences','Adjust models & requirements',`<div class="grid">${recSelect('mix','Developer model mix',o.mix,Object.entries(RECOMMENDATION_MIXES).map(([id,m])=>[id,m.name]))}${recSelect('serverModel','Server model',o.serverModel,['dsflash','flash','sol','sonnet'].map(id=>[id,MODEL[id].name]))}<label class="field"><span>Expected cached input, %</span><input type="number" min="0" max="100" step="1" data-rec="cache" value="${esc(o.cache)}"></label></div>${recCheck('requireTeam','Require GLM Team seats for every developer')}${recCheck('keepCodex','Keep Codex Business for power + regular users (10% of their workload)')}${recCheck('allowFallback','Allow paid overage or switching to a separate API key after quota')}<p class="inline-help">The comparison uses your team profile and this model mix. It does not import existing custom allocations, negotiated prices or discounts.</p>`)}`;
}
function recommendationHTML() {
  const result=currentRecommendation(),o=result.options;
  if(!result.valid)return `<section class="recommendation"><h3>Let’s check the requirements.</h3><div class="callout warn" role="alert">${result.errors.map(esc).join('<br>')}</div>${recommendationControls(o)}<button class="btn" data-tab="team">Edit team profile</button></section>`;
  const f=result.forecast,r=f.regular,hasPlans=active().lines.length>0;
  return `<section class="recommendation" aria-label="Recommended setup"><div class="recommend-header"><div><h3>${priceRange(r.low,r.high)} <small>/ month</small></h3><p class="recommend-rubles">${priceRange(r.low,r.high,'rub')}</p></div><div class="recommend-cash"><span>First month, including prepayment</span><strong>${priceRange(f.first.cashLow,f.first.cashHigh)}</strong></div></div><p class="recommend-assumptions">${esc(RECOMMENDATION_MIXES[o.mix].name)} · ${o.cache}% cached input${o.keepCodex?' · Codex reserved for active users':''}</p>${recommendationControls(o)}<div class="recommend-reasons">${result.reasons.map((reason,index)=>`<article><div><h4>${esc(reason.name)}</h4><span class="small muted">${reason.count} ${reason.group==='technical'?'agent account'+(reason.count===1?'':'s'):'people'}</span></div><strong class="recommend-line-price">${priceRange(reason.low,reason.high)}</strong><p>${shortRecommendationReason(result.forecast.regular.lines[index])}</p></article>`).join('')}</div><div class="recommend-comparison"><span>${result.saving>.005?`Saves ${USD.format(result.saving)}/month vs ${result.baselineName.toLowerCase()}.`:o.requireTeam?'Team management is required; direct API may cost less.':'Direct API is already the lowest priced eligible option.'}</span></div>${r.range?'<p class="callout warn">Codex allowance is unknown. The range uses the existing $0.04/credit assumption, not a guaranteed spending cap.</p>':''}${result.unknownSubscriptions?'<p class="compact-note">Subscription quotas for these models are unknown; API is used for comparison.</p>':''}${hasPlans?'<p class="compact-note">Saves as a new scenario.</p>':''}${detail('recommend-reasons','Why these plans?',result.reasons.map(reason=>`<h4>${esc(reason.name)}</h4><p class="inline-help">${esc(reason.reason)}${reason.alternative!==undefined?` <span>${reason.name.includes('Direct API')?'Personal-plan comparison':'Same group via API'}: ${USD.format(reason.alternative)}/month.</span>`:''}</p>`).join(''))}${detail('recommend-method','How this recommendation is chosen',`<p class="inline-help">${result.scope} Compares GLM Lite/Pro/Max, Team Standard/Premium and direct API where compatible. Seat minima, one tier per GLM team, weekly and 5-hour quotas are enforced. Over-quota plans need the fallback option.</p><p class="inline-help">Other models are compared through their own API prices. Models are never swapped to claim savings. OpenRouter first-party routes add fees to the same rates; discounted alternative hosts are outside this comparison because quality, quantization and availability can differ. Claude/OpenAI included quotas are not treated as free unlimited tokens.</p><p class="inline-help">Uses your schedule, tax and FX, with the catalogue snapshot ${CHECKED}. No unconfirmed promotion, grant or negotiated discount is assumed. Quotas assume evenly spread usage; bursts, rate limits, coding quality and country/account eligibility still need checking. Infrastructure, tools and future search fees are not automatically included.</p><p class="inline-help"><a href="https://docs.z.ai/devpack/teamplan" target="_blank" rel="noopener noreferrer">GLM quota & seat rules</a> · <a href="https://docs.z.ai/guides/overview/pricing" target="_blank" rel="noopener noreferrer">GLM API prices</a> · <a href="https://api-docs.deepseek.com/quick_start/pricing/" target="_blank" rel="noopener noreferrer">DeepSeek rates & hours</a></p>`)}</section>`;
}
function updateRecommendationOption(el) {
  const options={...currentRecommendationOptions()};
  options[el.dataset.rec]=el.type==='checkbox'?el.checked:el.type==='number'?(el.value===''?NaN:Number(el.value)):el.value;
  recommendationPreferences.set(active().id,options);recommendationMemo=null;
  render();document.querySelector(`[data-rec="${el.dataset.rec}"]`)?.focus({preventScroll:true});
}
function recommendationAction(b) {
  if(b.dataset.action!=='use-recommendation')return false;
  const result=currentRecommendation();if(!result.valid){toast('Check your profile and requirements first.');return true;}
  if(active().lines.length&&state.scenarios.length>=30){toast('You can save up to 30 scenarios. Export or remove an alternative first.');return true;}
  pendingUndo=clone(state);const sc=clone(result.scenario);sc.id=uid();sc.recommendation={options:clone(result.options),catalogDate:CHECKED};
  if(active().lines.length){sc.name=(tr('Recommended')+' · '+active().name).slice(0,120);state.scenarios.push(sc);state.active=sc.id;}
  else{const current=active();current.lines=sc.lines;current.settings=sc.settings;current.recommendation=sc.recommendation;delete current.preset;}
  state.tab='budget';openDetails.clear();render();focusPage();toast('Recommended setup added. Review the budget and assumptions.');return true;
}
