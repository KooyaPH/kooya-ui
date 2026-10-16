# Kooya UI v1

Editorial workspaces and Governance administration, with Kooya Olive, Light and
Compact defaults. Twelve palettes, custom accents, reusable compositions and a
complete interactive component catalogue. [V1 design system](docs/v1/design-system.md).

## V1 review

Open https://ui.test.kooyaai.com or http://localhost:5825. Review the Editorial workspace, Governance settings, Components, Documentation and Content checks. Appearance offers twelve palettes, a custom accent, Light/Dark/System and Compact/Comfortable. All preview records are fictional.

The earlier corporate comparison is historical source; v1 uses the selected Editorial/Governance direction. See [v1 contracts](docs/v1/design-system.md) and [migration](docs/v1/migration.md).

The canonical controls are the actual Ant Design exports. Their props, refs, generic types and compound APIs retain Ant identity. KooyaProvider applies the brand, light/dark mode, comfortable/compact density and contextual feedback. The collection includes all 1,241 examples from the attributed REUI source revision, additional native Ant examples, reusable groups, blocks, sections, advanced tools and complete templates.

```tsx
import { KooyaProvider, Button, Form, Input } from "@kooyaph/ui";
import "@kooyaph/ui/styles.css";

export function Example() {
  return (
    <KooyaProvider>
      <Form layout="vertical" onFinish={(values) => console.log(values)}>
        <Form.Item
          name="name"
          label="Project name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Create project
        </Button>
      </Form>
    </KooyaProvider>
  );
}
```

Use `@kooyaph/ui/components` for canonical native controls, `@kooyaph/ui/compositions` for reusable compositions, and `@kooyaph/ui/foundations` for the provider and brand tokens. The previous root controls are isolated under `@kooyaph/ui/legacy` for archived fixtures. New consumers should use the canonical Ant API.

## Local development

Use Node22 and Corepack pnpm10.18.3.

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm build
corepack pnpm dev
```

The development catalog uses `http://127.0.0.1:5194`. `corepack pnpm preview` serves the built catalog at `http://127.0.0.1:5193`. Both use strict ports. Existing comparison previews on other ports are separate.

Run `corepack pnpm validate` for package/catalog builds, typechecks, behavior tests and Storybook. The isolated packed-package consumer checks also qualify React18.3.1 and React19.2.0, including NodeNext declaration resolution and native Ant identity.

## Source recipes

Original REUI files remain byte-preserved under `vendor/reui/source`, with MIT attribution and per-file hashes in `vendor/reui/manifest.json`. The approved source is commit `3b67464bcad3c29fbdb12437afb70153384eee19` of `keenthemes/reui`.

`node scripts/reui-adapt.mjs` regenerates the adapted runtime and code-tab recipes. `node scripts/reui-assets.mjs` discovers public sample assets from the original source and keeps a reusable local mapping. It records replacements for upstream404 images. Emoji data and Excalidraw fonts are served locally.

After building the library, run `node scripts/reui-bundle.mjs` to generate the complete download offered by the Code tab. That standalone bundle includes the packed Kooya library, dependency manifest, Vite/Tailwind configuration, local assets, supporting modules and collection sources. An adapted REUI example uses its local recipe API; installing Ant alone and pasting one isolated example is insufficient.

The gallery lazy-loads individual examples and heavy engines. Previews run in isolated frames; appearance changes use an origin-checked parent message so local demo state survives theme and density changes. All application data and workflows are fictional local demonstrations.

The implementation and acceptance requirements are in [the approved plan](docs/superpowers/plans/2026-10-13-ant-reui-kooya-ui.md). See [REUI attribution](vendor/reui/README.md) and [third-party notices](packages/ui/THIRD_PARTY_NOTICES.md).
