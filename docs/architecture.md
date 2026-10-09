# Architecture

Kooya UI is a pnpm monorepo with a distributable component package, a fictional
interactive playground, and a Storybook catalog.

## Atomic layers

| Layer       | Owns                                                                             |
| ----------- | -------------------------------------------------------------------------------- |
| Foundations | Semantic tokens, theme palettes, typography, density, device behavior, motion    |
| Atoms       | Actions, fields, selections, status, progress, and other basic controls          |
| Molecules   | Labeled fields, cards, filters, headings, and small control groups               |
| Organisms   | Navigation, tables, data lists, overlays, and larger reusable modules            |
| Templates   | Typed arrangements for dashboards, collections, forms, inboxes, CMS, and portals |
| Pages       | Concrete playground and consuming-application screens                            |

Use named imports from the smallest suitable family: `/foundations`,
`/atoms`, `/molecules`, `/organisms`, or `/templates`. Theme palettes also
have separate `@kooyaph/ui/themes/<name>` imports. The package root offers
convenient named exports.

## Theme and layout model

One `KooyaProvider` connects semantic tokens to owned CSS, Ant Design, menus,
dialogs, notifications, and provider-scoped overlays. Its `theme` option accepts
a bundled theme name, a bundled palette, or a consumer-defined `KooyaTheme`
object. `composition` controls arrangement independently of theme. Density,
light/dark mode, font, branding overrides, and reduced motion are also provider
options.

See [theme authoring](themes.md) and [design tokens](design-system.md) for the
visual contract.

## Ownership boundary

The library renders data and invokes callbacks supplied by the consumer. It
does not fetch product APIs, resolve permissions, authenticate users, store
business records, or own product routes. The application provides routing,
validation, cache policy, retries, persistence, rich-text/media engines, and
public-page metadata.

The playground and Storybook use fictional records and local state. They are
documentation and development applications; their examples are not production
integrations.

## Runtime

React and React DOM are peers supporting 18.3 and 19. Ant Design 6.6.5 is an
external peer dependency. The distributable package ships ESM, declarations,
scoped CSS, its license, and package-specific third-party notices.
