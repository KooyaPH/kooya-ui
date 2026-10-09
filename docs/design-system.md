# Kooya UI design system

## Required control boundaries

`--ku-control-border` defaults to the resolved muted color, independently of
decorative `--ku-line`. Input, textarea, select, date/number fields and unchecked
checkbox/radio controls use this required-cue token through owned CSS and public
Ant component tokens. Hover must not weaken an empty field or unchecked cue;
active fields retain the focus token. Enabled field placeholders and date/select suffix cues use the muted text role through scoped Ant component tokens. Card/divider borders keep the decorative
line token. Custom branding/control-border overrides must retain at least 3:1
against adjacent surfaces for enabled required cues; disabled controls are
exempt from that threshold. This is scoped to information required to identify
the control, not every border. See [WCAG non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

## Ownership and layers

1. Foundations: semantic tokens, typography, spacing, interaction states.
2. Components: buttons, chips, fields, tables, tabs, overlays, modules.
3. Compositions: the bento sidebar, modular header, and page arrangements.
4. Product templates: Business, Console, and Client workflows using mock data.

Themes change identity. Compositions change arrangement. Product names,
records, permissions, and API behavior belong to the consuming application.

## Semantic tokens

The typed source is `packages/ui/src/foundations/theme.tsx` and the named
palettes are `packages/ui/src/foundations/themes.ts`. Provider values become CSS
variables; the stylesheet is scoped to Kooya elements. Ant overlays mount within the provider root and retain the active theme,
density, font and inline `--ku-*` overrides.
Pass `fontFamily` to KooyaProvider for project fonts; supply font assets locally.
Use typed branding options or provider style variables to synchronize tokens
across owned components, Ant controls and overlays.

| Token                         | Use                                                   |
| ----------------------------- | ----------------------------------------------------- |
| `canvas`, `surface`, `subtle` | Page, modules, and nested surfaces                    |
| `ink`, `muted`                | Primary and secondary text                            |
| `line`                        | Borders and separation                                |
| `focus`                       | Visible keyboard focus, independent of a light accent |
| `accent`, `accentInk`         | Primary actions and their text                        |
| `highlight`, `highlightInk`   | Selected navigation and emphasized summaries          |
| `secondary`, `tertiary`       | Supporting bento cards                                |

Initial themes: Mosaic (soft green), Kooya Signature (brand paper/charcoal/lime),
Canvas (warm editorial), Client (blue). Add project themes as a reviewed token
set rather than recoloring individual components. Keep success/warning/danger
meaning separate from a project's accent.

## Geometry

- Spacing scale: 4, 8, 12, 16, 20, 24, 32px. Optical adjustments may be 2px.
- Card radius: 22px; overlay radius: 24px; control radius: 12px.
- Card content padding: 24px; compact density: 20px. Mobile card content: 16px.
- Primary button: 44px minimum height, 10px vertical / 16px horizontal padding; leading/trailing icon
  18px; icon-to-label gap 8px. Long labels wrap inside the available width with
  centered icons and vertical padding. Small button: 36px, increasing to 44px for
  coarse pointers. Large button: 52px.
- IconButton: 44×44px; icon: 20px. Dense view controls may use 34×36px.
- Status chip: 28px, padding 4×8px, 13px icon, 4px icon-to-label gap; long labels wrap.
- Filter chip: 40px, increasing to 44px for coarse pointers, 8px content gap.
- Default data rows: 16px vertical cell padding; compact: 10px.

Do not confuse a glyph's visual size with its click target. Keep icon and label
alignment centered through one flex container rather than independent margins.

## Typography

Interface text uses Inter, supplied by the consuming app or system fallback.
The Signature playground uses locally bundled DM Sans to echo the brand site.
Body: 14px; table/action text: 12–13px; secondary details: 10–12px;
page headings: 29–30px; summary values: 34–39px. Display wordmarks retain
their proportions. Marketing-scale headings are not navigation labels.

## Motion and responsive behavior

Use short transitions for state feedback, a 250ms page entry, and a 300ms
navigation width change with `cubic-bezier(.22,1,.36,1)`. Hover lift is 1–2px
on interactive actions. Static statuses do not imply clickability. Reduced
motion removes travel, spin repetition, and entrance movement. Transition duration
is zero under reduced motion: a nonzero global duration can activate transitions
on Ant popup measurement elements and break their placement.

At 1100px navigation becomes a compact rail with a labelled drawer; at 640px
header modules become compact route controls and adaptive tables become labelled
record cards. Explicit comparison mode retains horizontal scroll. See
[Experience](experience.md) for the implemented device and state contract.
`--ku-chrome-height` defaults to 0; applications can set it for their own
sticky chrome. The playground uses one 64px library header at every width. BentoShell paints its sticky top and inter-module gaps with the opaque canvas surface; ordinary pages continue to scroll on the document.

Validate token changes in actual menus, dialogs, disabled states, table
headers, chips, and each page composition. See [live review](visual-review.md).

## Interactive foregrounds

The provider maps Button default/hover/active text to `ink`, outlined danger
states to `danger`, Breadcrumb ordinary text to `muted`, links to `focus`, and
Pagination current text/border to `focus` (hover text to `ink`). Ordinary link hover/active states use `ink`/`focus`. Accent remains
an action background role; its palette-derived shades are not navigation text.
Custom `branding.scheme` and inline `--ku-*` values still forward through the
provider. Callers must qualify their resolved text/background pairs at 4.5:1
and meaningful indicators at 3:1, including hover/pressed/selected states.
Selected checkbox/radio/switch cues use `focus` with `surface` marks/handles;
Progress uses `focus`, and selected tabs add an inset `focus` indicator without
changing their geometry. Brand accent backgrounds remain unchanged.
Arbitrary CSS colors, transparency and downstream component overrides cannot
be guaranteed by the built-in opaque theme qualification.

## Review and customization

Keep the four-pixel geometry, state contrast, and opaque bento chrome consistent
when adding components or themes. Consumer CSS can override those defaults, so
review the actual rendered result after each override. Follow the
[visual-review checklist](visual-review.md) for focus, contrast, spacing,
keyboard, overlay, and responsive checks.
