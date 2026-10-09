# Integration guide

Kooya UI provides presentational React components and templates. The consuming
application owns routes, API clients, records, permissions, persistence, and
application-specific error mapping.

## Install peer dependencies

The package expects React 18.3 or 19, the matching React DOM version, and Ant
Design 6.6.5. Install these in the consuming application.

## Import only what a page uses

Import named components from the smallest relevant atomic family:

```tsx
import { Button, TextField } from "@kooyaph/ui/atoms";
import { MetricCard } from "@kooyaph/ui/molecules";
import { DataTable } from "@kooyaph/ui/organisms";
import { DashboardTemplate } from "@kooyaph/ui/templates";
import { KooyaProvider } from "@kooyaph/ui";
import { mosaicTheme } from "@kooyaph/ui/themes/mosaic";
import "@kooyaph/ui/styles.css";
```

Use a single provider near the application shell:

```tsx
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <KooyaProvider
      theme={mosaicTheme}
      composition="mosaic"
      density="comfortable"
      mode="light"
    >
      {children}
    </KooyaProvider>
  );
}
```

See [themes](themes.md) for custom palettes and [templates](templates.md) for
typed page structures.

## Keep data and decisions in the application

Pass records and callbacks into components. Resolve permissions before rendering
available actions. Map transport failures to safe UI codes and appropriate
status values in the application layer; never expose raw exception messages or
response bodies. Choose the caching, retry, preload, and persistence policy that
matches the sensitivity and freshness of each record.

## CSS and styling

Import `@kooyaph/ui/styles.css` once. Scope global application styles so they
do not override native controls or Kooya tokens. Use provider branding options
for coordinated Kooya and Ant styling. A custom theme or override needs its own
contrast and interaction-state review.

## Application metadata

Templates do not manage document titles, descriptions, canonical URLs, or Open
Graph tags. Public pages should provide route-specific metadata in the consuming
application; private pages should avoid exposing account or record data in
metadata.
