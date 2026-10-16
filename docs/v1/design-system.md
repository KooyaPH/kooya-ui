# Kooya UI v1

The stable direction combines Editorial workspaces with Governance administration.
Default: Kooya Olive, Light, Compact. Appearance is independent of page composition.

## Foundations

- DM Sans interface typography; use a locally served product font when adopting.
- 14px body text, 12px secondary text, clear sentence-case headings.
- 4px spacing rhythm; 6px controls, 8px panels, 10px overlays.
- 36px compact desktop controls, 44px touch targets; text-bearing rows grow.
- Twelve restrained palettes and custom six-digit hex accents. Generated primary,
  selected, focus and semantic roles must remain readable in both modes.
- Workspace breakpoint seams: phone through 767px, tablet through 1279px,
  desktop from 1280px. Supporting context is secondary to the working canvas.

## Public interfaces

`KooyaProvider` defaults to Olive/Light/Compact and accepts `palette`,
`customAccent`, `mode`, `density`, `fontFamily` and reduced motion. `palettes`,
`workspacePalette`, `createPaletteFromAccent`, `normalizeAppearance` and
`defaultAppearance` are exported foundations. The provider receives resolved
light/dark mode; the product resolves a user's system preference.

`WorkspaceShell` provides Editorial/Governance composition with route-owned
navigation, optional section navigation and inspector slots. `AppearancePicker`
is controlled; applications own preview, persistence, errors and concurrency.

Canonical Ant components retain native props, refs and compound APIs. The
explicit `/legacy` entry is an application migration bridge, not the default
component API. Historical theme imports remain compatibility metadata; the
active review and product controls use v1 palettes and compositions.

## Catalogue and content

The generated component inventory accounts for every retained category and
example, including original attribution. Inventory disposition records source
retention and theme integration; the browser qualification ledger separately
records executed, passed and failed cases. Never equate the two.

Handle long labels, unbroken identifiers and descriptions through deliberate
wrapping, disclosed full values and region-scoped scrolling. Maintain text size
and usable targets. Validate hover, focus, pressed, selected, disabled, busy,
loading, empty, error, recovery and unsaved states.

## Overlays

Each provider owns a themed document-level overlay host. Applications may pass
`overlayClassName` to retain consumer-scoped popup styling without coupling the
host to page geometry. Popup positioning is
independent of clipped cards and scroll containers. Contextual dialogs and
feedback use this host while focus restoration retains the original provider
root. Test nested selectors in dialogs/drawers, viewport edges, scrolling,
Escape/outside dismissal, and removed triggers.

## Product adoption

Console and Headquarters share the package and product adapters. User appearance
is stored on the authenticated account; organization brand data stays separately
owned. The server record and its version govern cross-device persistence.
