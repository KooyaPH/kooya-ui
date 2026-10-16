# Kooya UI marketing, consent and data loading review

As of 2026-10-16. Scope: library source and the public tunneled review.

## Changes

- The default URL and Overview open a branded product marketing site. Explicit workspace URLs retain Editorial and Governance previews. Collection, docs, search and content checks remain available.
- Official Kooya wordmark, restrained Olive and signature green, human copy, live component previews, dynamic palette controls and a clear route into the collection.
- New controlled `ApplicationAuthorization` composition: permissions, optional access, repository scope, progress, approval, cancellation, recovery and long-text examples. No OAuth or real GitHub access is implemented by this presentational library.
- New `DataValue` and scoped loading context. Tables retain columns and filters; initial cell values become placeholders. Mobile cards retain field labels. Cached data remains visible on refresh. Metric labels and containers stay mounted. Action progress uses the existing busy button contract.
- Shared composition demo loading and ten retained skeleton recipe previews follow the data-only contract. The recipe originals remain preserved for attribution; the active catalogue uses corrected adaptations.
- 280 categories and 1,563 examples retained or added. Seven authorization examples and four loading pattern examples are directly accessible.

## Verification

- 60 focused tests pass across routing, authorization, loading, templates, catalogue and experience demos.
- Workspace type checks and Storybook build pass. Production build passes with existing large-chunk and adapted third-party directive warnings.
- Browser matrix and public snapshot provenance are recorded in `output/playwright/marketing/` and the runtime `/build-provenance.json`.
- Manual rendering review includes desktop, tablet and phone, Light/Dark, long application names, long repository labels, loading phases, consent actions and clipping behavior. One genuine long-text phone overflow was found and fixed with explicit width/minimum-width and wrapped action labels.

## Delivery boundary

The review source includes a minor changeset. New component exports and the loading behavior change are not claimed to exist in the immutable v1.0.0 release archive. The adopting staging products continue to use that published archive; this review does not deploy a replacement package to them. Consumers of BusyBoundary must wrap custom dynamic fields with DataValue; the deprecated skeleton argument no longer replaces the full child tree.

Automated Chromium checks and axe scans are bounded evidence, not native Windows or manual assistive-technology certification. Prior snapshots, immutable releases and unrelated working copies are preserved.
