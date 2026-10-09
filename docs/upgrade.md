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

Theme names remain supported. New releases may add independently importable
theme subpaths and named components; consumers can adopt those paths gradually.
