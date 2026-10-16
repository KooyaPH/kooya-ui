# Corporate Design Lab POC

The Design Lab opens at `#/overview`. Twelve original corporate/CMS layouts
share twelve restrained palettes, two modes and two densities. Workbench,
Olive, Light, Comfortable is the default. Shape and arrangement vary by recipe;
color, density and data remain independent. These layouts follow the current
user brief and independent design judgment.

## Review

- `#/explore/workbench/cms?palette=olive&mode=light&density=comfortable`
  opens an exact selection. Invalid values normalize to safe defaults.
- Compare isolates the two previews in same-origin frames, with shared scene
  navigation and independently selectable appearances. On a narrow screen,
  use the A/B switch. Full device widths can scroll inside the preview.
- Favorites store complete combinations in `kooya-ui.poc.favorites.v1`;
  appearance uses `kooya-ui.poc.selection.v1`. Storage failure falls back to
  an in-memory session. Shared links restore appearance, not edited records.
- Six shared work areas cover dashboard filters, CMS CRUD/publishing, task
  assignment and state changes, directory/profile/invitations, workspace
  preferences, and real component/overlay states. There is no backend.
- Loading, empty and failure demonstrations live in the preview-state control.
  Reset explicitly clears fictional records but retains appearance/favorites.
- The original catalogue remains available at `#/components` and related
  routes. Its provider and example frames use the current POC palette.

## Implementation

Recipes, selection validation, colors and the six scenes live under the
playground `src/poc` folder. Stable package exports remain unchanged. The
provider adds documented radius-token mapping; the matching Storybook example
is Foundations / Provider and branding / Corporate geometry.

## Qualification and delivery

Run `pnpm validate` plus
`node --experimental-strip-types scripts/poc.browser.mjs` against the frozen
build. The browser script records a 576-combination CMS smoke matrix, a
72-page responsive matrix at three widths, original captures, and interaction
results. `POC_BASE_URL` selects the origin; `POC_PHASE` selects `matrix`,
`interactions`, `screenshots` or `all`.

The supervised origin uses loopback port 5825. Existing WireGuard/Nginx/socat
routing exposes https://ui.test.kooyaai.com. A frozen copied build and
build-provenance.json identify the served source and asset bytes. Retain the
previous snapshot and service configuration when switching the origin.
