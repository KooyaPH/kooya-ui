# Kooya UI local review handoff — 2026-10-14

The current build is served at **http://127.0.0.1:5825/** (audit fixture: `/audit.html`). This is the requested localhost review deployment; it is not a production release.

Artifact: `6cb835e0bab558d9db57dc60f20f8adb9b477ac6fcd87e194337126796af87a3`  
Source fingerprint: `605552c6ce4e0a2e4ed654f132618938d66f7e4cc593d4cb0fa91178b601493a`

## Done in this update

- Re-adapted 1,241 examples across 1,341 source modules and built an immutable review candidate.
- Playground typecheck and `git diff --check` pass. The production build succeeds; it emits known data-grid source-map/`use no memo` and large-bundle warnings.
- Root catalog and `/audit.html` both return HTTP 200.
- c-alert-18's updated active override returns explicit local feedback when “Explore features” is activated. Candidate smoke passed pointer/Enter feedback and independent dismissal in light/dark.
- A prior candidate rendered all 18 c-alert variants in light/dark under one constrained long-content stress scenario; all 36 passed geometry, browser-error and Axe checks, and the screenshots were visually inspected. The latest candidate fingerprint changed, so that finite evidence is historical and does not qualify the new candidate.

## Known defects and review gaps

- c-alert-19: current catalog render at a 180px preview wraps “Reply” vertically. The attempted source-only behavior changes did not feed the catalog runtime. Fix the active catalog override, rebuild, and verify narrow, keyboard and reply states.
- c-alert-20: its current catalog runtime still loads the upstream example; the expected local View status was absent in the smoke test. The attempted source-only fix is not integrated. Create the active override, rebuild, and verify action containment, View and Dismiss.
- c-alert-18 still needs Space/dark-mode source verification and complete item state coverage.
- All 2,561 items remain unaccepted (`acceptedLocal=0`). The complete remaining inventory is [pending-item-index.md](pending-item-index.md); campaign evidence and other known limits are in [progress.md](progress.md).
