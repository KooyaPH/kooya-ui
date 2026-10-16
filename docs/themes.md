# Palettes and appearance

Kooya UI v1 defaults to **Kooya Olive, Light, Compact**, with neutral work surfaces, DM Sans typography and restrained 6/8/10px control, panel and overlay radii.

```tsx
import {
  KooyaProvider,
  AppearancePicker,
  defaultAppearance,
} from "@kooyaph/ui";
import { Button } from "@kooyaph/ui/components";
import "@kooyaph/ui/styles.css";

<KooyaProvider palette="olive" mode="light" density="compact">
  <Button type="primary">Save changes</Button>
</KooyaProvider>;
```

## Independent choices

- Composition: Editorial for work/content; Governance for administration.
- Palette: Olive, Slate, Navy, Graphite, Warm Stone, Deep Teal, Indigo, Steel Blue, Sage, Plum, Cocoa or Forest.
- Custom accent: `palette="custom" customAccent="#45583D"`. Generated roles adjust contrast for the selected mode.
- Appearance: Light or Dark. A product resolves a user's System preference before passing `mode`.
- Density: Compact or Comfortable. Touch targets stay usable in both.

`AppearancePicker` receives `value` and `onChange`. The library does not store account settings. Products own drafts, save/cancel, errors and cross-device persistence.

The provider themes native Ant components and creates a themed document-level overlay host. Popups can escape clipped cards and scroll regions. Consumer-specific popup classes belong in `overlayClassName`; page layout belongs on `className`.

Use `workspacePalette`, `createPaletteFromAccent` and `normalizeAppearance` for consistent semantic roles. Status colors remain independent of an account accent. Do not replace success/warning/error meaning with palette colors.

Historical `KooyaTheme` imports remain available for compatibility. They are not active v1 review presets. Prior wrapper contracts are explicitly exported through `/legacy`; canonical Ant controls use `/components`.

See [v1 design contracts](v1/design-system.md) and [migration guidance](v1/migration.md).
