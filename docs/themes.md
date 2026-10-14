# Kooya brand foundations

`KooyaProvider` defaults to Kooya Signature light: paper `#f2eee3`, ink
`#13120f`, lime `#d7f20f`, and DM Sans interface text. Dark mode uses charcoal
canvas `#13120f`, elevated surface `#1f1e19`, paper text and lime actions. The
showcase exposes these two brand modes. Composition is independent of color.

```tsx
import { KooyaProvider, useKooyaFeedback } from "@kooyaph/ui/foundations";
import { Button } from "@kooyaph/ui/components";
import "@kooyaph/ui/styles.css";

function LocalAction() {
  const { message } = useKooyaFeedback();
  return (
    <Button type="primary" onClick={() => message.success("Saved locally")}>
      Save
    </Button>
  );
}

export function App() {
  return (
    <KooyaProvider mode="dark" density="comfortable">
      <LocalAction />
    </KooyaProvider>
  );
}
```

The provider synchronizes CSS variables and Ant configuration for controls,
menus, Select/DatePicker popups, native Modal/Drawer portals, and contextual
messages, notifications and confirmations. Popup containers default to the
provider root. Explicit consumer `getContainer`/`getPopupContainer` overrides
retain native Ant behavior and take responsibility for CSS variable inheritance.
Use `useKooyaFeedback()` inside the provider for scoped imperative feedback.
Ant static `message`, `notification` and `Modal.confirm` remain canonical exports,
but Ant static calls do not receive React provider context; use the contextual
hook for brand synchronization.

`density="comfortable"` uses 44px controls; `density="compact"` uses 36px controls
and smaller table/card padding. The stylesheet maintains 44px button targets for
coarse pointers. `reducedMotion` overrides the OS preference; otherwise the
provider follows live `prefers-reduced-motion` changes. Ant motion and wave effects
and scoped CSS animation/transitions follow the same setting.

`kooyaBrand` exposes the official paper, ink, lime, deep green, yellow, blue and
red palette. `resolveThemeScheme()` resolves contrast-qualified semantic roles,
including info blue and independent focus/selected indicators. Brand accent is
an action background, while links, menu/tab text, checkbox/radio/switch marks and
other selected cues use their own legible pairs. Solid danger actions resolve
their foreground against semantic red, and tooltips use the elevated surface/text
pair independently of primary-action text. Selected-option hover backgrounds
are explicitly mapped to preserve the selected foreground contrast in both modes.

`kooyaTypography` exposes DM Sans and Syncopate stacks; CSS variables are
`--ku-font-sans` and `--ku-font-display`. Serve font assets locally in the consuming
application; the package does not fetch fonts. `fontFamily`, `branding.scheme`,
`branding.accent` and inline `--ku-*` overrides retain the existing customization
contract. Qualify overridden colors at 4.5:1 for ordinary text and 3:1 for meaningful
control indicators in every state. Opaque hex semantic status/focus colors get a
black/white fallback against the resolved surface; arbitrary CSS colors and
consumer overrides cannot be automatically guaranteed.

The existing Mosaic, Canvas and Client palette source and individual imports
remain during the template/test migration. They are compatibility data, outside
the new showcase's light/dark brand selector. New integrations should consume the
Signature defaults through `/foundations` and canonical controls through
`/components`.
