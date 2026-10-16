# Upgrade guide

Kooya UI follows semantic versioning for its distributable package.

- **Patch:** compatible corrections and documentation changes.
- **Minor:** backward-compatible components, props, templates, or import paths.
- **Major:** breaking API or styling changes.

Check the package peer requirements before upgrading. Kooya UI supports React
18.3 and React 19, and requires Ant Design 6.6.5. Keep a matched React and React
DOM version in the consuming application.

## Upgrade checklist

1. Read the release notes and Changeset summary.
2. Update the exact package version and retain the Ant Design peer version.
3. Import `@kooyaph/ui/styles.css` once from the application entry point.
4. Check provider props, theme tokens, templates, and callback types.
5. Run the application's typecheck and affected tests.
6. Review the actual interface at desktop, tablet, and phone widths, including
   keyboard focus, overlays, loading, empty, error, and reduced-motion states.

## Ant-first candidate migration

The rebuilt root and `/components` expose actual Ant Design values, props, refs and compound APIs. Import KooyaProvider from `@kooyaph/ui` and controls from `@kooyaph/ui/components`. Use Ant props such as Button `type`, `variant`, `color`, Input `onChange(event)`, and Form `items`/fields rather than old Kooya wrapper contracts. Default appearance is Kooya Signature; light/dark and comfortable/compact are the catalog controls.

Prior wrapper contracts are explicitly isolated under `@kooyaph/ui/legacy`; existing atomic subpaths remain available for migration. Legacy theme presets are compatibility exports and are not catalog design choices. `/compositions` provides reusable Ant-backed action, field, metric, status and page groups. The comprehensive REUI recipes and composed page source are available from the catalog's runnable source download.

This is a breaking API candidate with a major Changeset. No package has been published and no consuming application is migrated by this work.
