# V1 qualification ledger — 2026-10-16

The catalogue retains 278 entries and 1,552 variants. Source inventory is distinct from executed browser evidence.

## Executed browser coverage

Frozen candidate fingerprint: `b09441e981ce4e5275c40ff97a3f4a0e9ed2c82f3abf8edf53e571900e3856b1`.
Reports and screenshots are local artifacts under `output/playwright/v1/`.

- 13,344 family render combinations: first example in each of 278 entries, twelve palettes, two modes, two densities; all pass, zero runtime errors.
- 3,104 catalogue renders: all 1,552 variants in Olive/Compact Light and Dark. Initial last two Dark assertions encountered an ambiguous nested loading selector; the four-case targeted rerun passes after scoping the selector to the example loader.
- 348 workspace cases: six scenes across the palette/mode/density matrix and five viewport widths; all pass without page overflow.
- Four clipped-container and nested modal/drawer popup workflows at 320, 390, 768 and 1440px; all pass. Escape dismisses the topmost popup before its parent.

Render coverage establishes loading, runtime stability, theme propagation and page fit. It does not establish every control interaction in every combination. Targeted behavior tests cover focus restoration, hover/focus/disabled/busy semantics and owned control interactions. Product authentication, persistence and deployment acceptance belong to the consumer release ledger.

Final source includes scoped overlay class support, System preference preservation in catalogue navigation, a fresh Editorial landing default and current installation docs. These deltas require final public smoke checks; the matrix above identifies the frozen candidate it actually exercised.

## Limits

Automated browser checks use Linux Chromium. Native Windows rendering and a full manual assistive-technology audit are not claimed. Complex component areas may intentionally scroll inside a labeled region; global page overflow is rejected.

Additional accessibility pass: Editorial content and Governance settings were scanned in Olive/Compact Light and Dark against WCAG 2 A/AA and 2.1 AA rules. Avatar foreground/background, selected navigation text and tab ID issues were corrected; all four scans now have zero detected violations. This is an automated subset, not a complete accessibility certification.
