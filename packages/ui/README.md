# `@kooyaph/ui`

An atomic React component and template library built on Ant Design. It separates
semantic themes from page composition, so applications can import the families
they use and select their own visual identity.

- React and React DOM peer versions: 18.3 or 19
- Ant Design peer version: 6.6.5
- Default theme and composition: Mosaic Bento, comfortable density
- Bundled themes: Mosaic, Kooya Signature, Canvas, and Client
- License: MIT; preserve the copyright and license notice

## Package access

The source repository is MIT licensed. Package releases currently use GitHub
Packages and require registry authentication. Until public package distribution
is enabled, build a tarball from the public source checkout:

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm --filter @kooyaph/ui build
corepack pnpm --filter @kooyaph/ui pack --out /tmp/kooyaph-ui.tgz
```

Install the resulting tarball alongside `react`, `react-dom`, and `antd@6.6.5`.
Never commit registry tokens. The [repository README](../../README.md) describes
the registry boundary and the [setup guide](../../docs/setup.md) covers local
development.

## Quick start

Import the stylesheet once at the application entry, then use named exports:

```tsx
import { Button, KooyaProvider, TextField } from "@kooyaph/ui";
import "@kooyaph/ui/styles.css";

export function WorkspaceSettings() {
  return (
    <KooyaProvider theme="mosaic" composition="mosaic" density="comfortable">
      <TextField label="Workspace name" defaultValue="Northstar Studio" />
      <Button variant="primary">Save changes</Button>
    </KooyaProvider>
  );
}
```

## Import only an atomic family or theme

The package also exposes family entry points and individual bundled palettes:

```tsx
import { Button, TextField } from "@kooyaph/ui/atoms";
import { RecordDetailTemplate } from "@kooyaph/ui/templates";
import { signatureTheme } from "@kooyaph/ui/themes/signature";
import { KooyaProvider } from "@kooyaph/ui";
import "@kooyaph/ui/styles.css";

export function DetailPage() {
  return (
    <KooyaProvider theme={signatureTheme} composition="orbit">
      <RecordDetailTemplate
        title="Account"
        fields={[{ id: "owner", label: "Owner", value: "Alex Stone" }]}
      />
      <TextField label="Contact name" />
      <Button variant="primary">Save</Button>
    </KooyaProvider>
  );
}
```

Available family paths: `/foundations`, `/atoms`, `/molecules`, `/organisms`,
and `/templates`. Available individual themes: `/themes/mosaic`,
`/themes/signature`, `/themes/canvas`, and `/themes/client`. Applications can
also pass a typed `KooyaTheme` object to `KooyaProvider` for a custom palette.

## Component states and accessibility

Use `TemplateFrame` with a structured state so cold reads show an appropriate
skeleton and error views show a safe public code and HTTP status, never raw
diagnostic text. Buttons and fields expose loading, disabled, invalid, focus,
and selected states. Provide visible labels, accessible names for icon-only
actions, meaningful image alt text, and logical keyboard order. Product routes,
permissions, persistence, fetch logic, and metadata remain application-owned.

Read the complete [component API](../../docs/components.md),
[theme guide](../../docs/themes.md), [experience and failure contracts](../../docs/experience.md),
[accessibility manual](../../docs/ui-ux.md), and [templates catalog](../../docs/templates.md).
The [third-party notices](THIRD_PARTY_NOTICES.md) identify dependency and
preview-asset licensing.
