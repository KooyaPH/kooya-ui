# Themes

Kooya UI separates visual themes from component layout. Themes supply semantic
colors; compositions such as Mosaic, Orbit, Canvas, and Flow arrange the same
components differently. Import only the theme data or component families that
the application uses.

## Use a bundled theme

```tsx
import { KooyaProvider, Button } from "@kooyaph/ui";
import { signatureTheme } from "@kooyaph/ui/themes/signature";
import "@kooyaph/ui/styles.css";

export function App() {
  return (
    <KooyaProvider theme={signatureTheme} composition="mosaic">
      <Button variant="primary">Continue</Button>
    </KooyaProvider>
  );
}
```

Available individual imports are `@kooyaph/ui/themes/mosaic`,
`@kooyaph/ui/themes/signature`, `@kooyaph/ui/themes/canvas`, and
`@kooyaph/ui/themes/client`. `@kooyaph/ui/themes` exports the full catalog.
`KooyaProvider` also accepts a theme name such as `"mosaic"` for existing
integrations.

## Define a project theme

Start from a bundled theme so the required semantic tokens stay complete, then
pass the new palette directly to the provider:

```tsx
import { KooyaProvider, type KooyaTheme } from "@kooyaph/ui";
import { mosaicTheme } from "@kooyaph/ui/themes/mosaic";
import "@kooyaph/ui/styles.css";

const partnerTheme: KooyaTheme = {
  ...mosaicTheme,
  name: "Partner workspace",
  canvas: "#f3eff8",
  surface: "#ffffff",
  subtle: "#eee8f5",
  ink: "#30243d",
  muted: "#665b70",
  line: "#dfd5e8",
  focus: "#70479a",
  accent: "#70479a",
  accentInk: "#ffffff",
  highlight: "#e9ddf5",
  highlightInk: "#3e2c52",
  secondary: "#e5dceb",
  tertiary: "#f1e4dd",
};

export function PartnerApp() {
  return <KooyaProvider theme={partnerTheme}>...</KooyaProvider>;
}
```

The provider maps `name` to a safe `data-theme` value and applies the palette to
Kooya tokens, Ant Design components, and provider-scoped overlays. Use
`branding.scheme` for a small application-level adjustment when a complete new
theme is unnecessary. Keep success, warning, danger, and focus colors semantic;
check text and state contrast after every palette change.

## Add a bundled theme

1. Add an immutable `KooyaTheme` palette under
   `packages/ui/src/foundations/themes/`.
2. Export it and register it in `packages/ui/src/foundations/themes.ts` for the
   provider's named-theme catalog.
3. Add a Vite entry and package export so consumers can import it by path.
4. Add the palette to the playground's theme selector and Storybook catalog.
5. Check light/dark mode, all interactive states, semantic contrast, overlays,
   compact and comfortable density, and desktop/tablet/mobile compositions.

Components remain theme-agnostic. New palettes must not change the meaning of
success, warning, danger, selected, focused, disabled, or busy states.
