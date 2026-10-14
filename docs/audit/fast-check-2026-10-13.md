# Fast library check — 2026-10-13

Stephen requested faster checking after the exhaustive pilot strategy consumed excessive time. Execution changed to a full initial-render census with bounded focused repairs. The exhaustive quality contract is not claimed complete.

## Actual results

- Frozen candidate 5310 (`79ff95c094fff16c994f8b7c31a38c36f401fd239b94ca67a018a700aa66c675`): all 1,552 catalog variant routes rendered in desktop Chromium; zero captured page errors or example-load failures. Individual screenshots captured for all routes, but not all individually visually inspected.
- Same candidate: 278 representative catalog families rendered at 320px; zero captured page errors or example-load failures. This samples one variant per family, not every mobile variant.
- Full unit suite after repairs: 27 files / 215 tests pass, exit 0. An earlier run had one 5-second catalog timeout under parallel load; isolated rerun passed and the subsequent complete run with two workers passed.
- Workspace type checks pass after native pagination and layout repairs.
- Build 5311 (`5657d107f03f78d58403d23d321993ac9edad09c8e071041ade1a7e854ed8d91`): 11 of 13 detected overflow cases have zero document overflow in the bounded retest. Two medium-container steppers needed the additional native Divider visibility correction, pending next-build retest.
- Actual 5311 workbench collapsed plus and expanded minus independently rendered and visually inspected in Chromium, Firefox and Linux WebKit. The Firefox fractional stroke defect is fixed in this scenario.
- Actual 5311 calendar rendered and visually inspected at 320px and 1440px: seven columns, working next-month navigation, 36px narrow targets and preserved 44px wide targets.
- Actual 5311 pagination pages 1, 5 and 9 rendered and visually inspected at 320px; pointer Next and keyboard Previous work. Native targets remain 44px.
- Actual 5310 Landing critical checks at 320px/1440px: real child routes, fault/retry keyboard recovery, stale-message rejection, slider clearance and draft retention pass. Thirty original screenshots individually inspected. Rapid appearance-menu changes still need classification; settled actions pass.

## Evidence

`output/playwright/fast-sweep/results.json`, `mobile/results.json`, `repair-results.json`, unit/type/build logs and original PNGs retain exact results. Independent workbench, calendar, pagination and Landing directories retain screenshot hashes and actual browser metadata. Earlier artifacts remain preserved.

## Limits

A render census is not exhaustive interaction, API, accessibility or visual acceptance. Remaining original screenshots, all mobile variations, wider browser/platform coverage and the previously expanded per-item contracts remain unaccepted. No whole-library production-readiness percentage is inferred from this pass. Downloaded source bundle was regenerated with the actual fixes; latest standalone install/hydration acceptance remains pending.

## Final bounded repair checkpoint

Frozen review server: `http://localhost:5312`, artifact `e9cf79988a819b8d51f5a60b54bfc41c91f3b7f872dc0e21eccb18b90ccbff19`, source fingerprint `e3de99f6e04030e5c94b9457660158ae3e7247ec3b110b60f6d8ab87b7086cde`.

All 13 originally detected document-overflow cases now measure exactly the requested viewport width after fonts and layout settle, with zero captured page errors. Actual final medium-container stepper originals were visually inspected: complete labels and Previous/Next controls are restored. `output/playwright/fast-sweep/final-repair-results.json` supersedes the earlier 11-of-13 repair checkpoint for this bounded scenario. No exhaustive full-library acceptance is inferred.

Actual 5312 interaction follow-up also verifies the comparison and Gantt tables can scroll to their right-hand content (106px, 52px and 212px native table scroll offsets), while the document remains bounded. The date selector's native overflow menu reaches Year and sets the actual tab `aria-selected=true`; the year panel original was visually inspected. An initial driver used `menuitem` instead of native Tabs' actual `option` role, timed out and was corrected; its owned browser processes were explicitly closed. The final 320px Landing original was visually inspected and remains readable and bounded.
