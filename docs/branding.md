# Branding, themes and fonts

Mosaic is the default; Signature, Canvas and Client remain available. Identity
(theme) and arrangement (mosaic/orbit/canvas/flow composition) are independent.
Comfortable is the default density; compact changes information spacing.
Light/dark mode resolves semantic surfaces, text, statuses and focus.

```tsx
import { KooyaProvider } from "@kooyaph/ui";
// At the app entry: import "@kooyaph/ui/styles.css" once.

<KooyaProvider
  theme="client"
  composition="mosaic"
  mode="dark"
  density="comfortable"
  fontFamily='"Your Local Font", system-ui, sans-serif'
  branding={{ accent: "#355d45", scheme: { highlight: "#dbe8d4" } }}
>
  <YourWorkspace />
</KooyaProvider>;
```

Supply local font assets in the app entry. The package never fetches a font.
Preview Inter and DM Sans are bundled in the preview apps only. Branding accent
resolves a contrasting accentInk. Semantic focus/success/warning/danger tokens
fall back to readable values against custom surfaces. Validate all supplied
colors; an override can still harm hierarchy or non-text contrast.

Provider `style` supports scoped `--ku-*` overrides; typed branding is preferred
when Ant needs the same value. Only Kooya token variables propagate to overlays,
not arbitrary inline layout styles. Use `useKooyaFeedback()` for contextual
message/notification/modal APIs instead of Ant static global calls.

To add a named theme, define the token set in foundations, qualify light/dark
and accent contrast, add its preview options and docs, and review menus,
select popups, dialogs, tables and disabled/read-only states in the browser.
Avoid individual page color patches. Organization logo, company name, assets,
permissions and URLs are application supplied slots and data.

Opaque 3/6-digit RGB hex semantic pairs are the built-in contrast qualification
scope. Arbitrary CSS colors, transparency, downstream overrides and every text
role cannot be guaranteed. Required control cues use `--ku-control-border`
separately from decorative `--ku-line`; qualify 3:1 non-text cues and 4.5:1
ordinary text across actual states/surfaces. Use [token contracts](design-system.md)
and [visual review](visual-review.md); package publication alone is not a theme
or accessibility certification. Keep the dated [brand reference](brand-reference.md)
historical until an authorized asset/reference update verifies new source.
