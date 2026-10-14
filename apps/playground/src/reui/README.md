# Adapted Kooya recipes

These examples derive from the attributed MIT REUI source at revision 3b67464bcad3c29fbdb12437afb70153384eee19. Native controls use actual Ant Design through the adapters. Shared REUI engines remain for richer capabilities.

The source tab shows the adapted recipe with real local module paths. Keep this whole `reui` directory when copying a recipe: examples depend on the `adapters` and `runtime/source` modules. It is not sufficient to paste an example and install Ant alone. Use the dependency versions in the playground package manifest. Kooya's canonical controls are separately available at `@kooyaph/ui/components`; composed source recipes use their own APIs.

Public sample images and emoji datasets are served from `/reui-assets`. Keep those assets with the copied recipes. Original upstream files and license remain unmodified under `vendor/reui/source`. Generated files are recreated with `node scripts/reui-adapt.mjs` from the committed source inventory.
