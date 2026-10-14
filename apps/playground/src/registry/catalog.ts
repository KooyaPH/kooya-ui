import type { ComponentType } from "react";
import { nativeEntries } from "./native";
import { compositionEntries } from "./compositions";
import manifest from "./reui-manifest.json";
import runtimeDependencies from "./reui-runtime-dependencies.json";
import type { CatalogEntry, CatalogVariant, CollectionKind } from "./types";

const previews = import.meta.glob<ComponentType>(
  "../reui/runtime/examples/**/*.jsx",
  { import: "default" },
);
const codes = import.meta.glob<string>("../reui/code/examples/**/*.tsx", {
  query: "?raw",
  import: "default",
});

export const reuiRevision = manifest.revision;
export const collections: {
  id: CollectionKind;
  title: string;
  description: string;
}[] = [
  {
    id: "components",
    title: "Components",
    description: "Actual Ant Design controls and adapted REUI examples.",
  },
  {
    id: "groups",
    title: "Groups",
    description: "Related controls that work together.",
  },
  {
    id: "blocks",
    title: "Blocks",
    description: "Working application and product compositions.",
  },
  {
    id: "sections",
    title: "Sections",
    description: "Complete sections for your next page.",
  },
  {
    id: "templates",
    title: "Templates",
    description: "Full pages built from the shared collection.",
  },
];

export const reuiEntries: CatalogEntry[] = manifest.categories.map(
  (category) => ({
    id: category.id,
    kind: "components",
    category: category.id,
    title: category.title,
    description: category.description.replace(
      "Open-source shadcn",
      "Adapted REUI",
    ),
    tags: [category.id, "Ant Design", "REUI"],
    exportName: "Pattern",
    importPath: `./reui/code/examples/${category.id}`,
    dependencies: [
      ...new Set(
        manifest.examples
          .filter((example) => example.category === category.id)
          .flatMap(
            (example) =>
              runtimeDependencies.examples[
                example.id as keyof typeof runtimeDependencies.examples
              ],
          ),
      ),
    ],
    variants: manifest.examples
      .filter((example) => example.category === category.id)
      .sort((a, b) => a.order - b.order)
      .map(
        (example) =>
          ({
            id: example.id,
            title: example.title,
            description: example.description,
            previewHeight: example.previewHeight,
            load: async () => {
              const loader =
                previews[
                  `../reui/runtime/examples/${category.id}/${example.id}.jsx`
                ];
              if (!loader)
                throw new Error(
                  `The adapted source for ${example.id} is unavailable`,
                );
              return { default: await loader() };
            },
            loadCode: async () => {
              const loader =
                codes[`../reui/code/examples/${category.id}/${example.id}.tsx`];
              if (!loader)
                throw new Error(
                  `The adapted usage source for ${example.id} is unavailable`,
                );
              return loader();
            },
            source: {
              repository: manifest.repository,
              revision: manifest.revision,
              path: example.files[0].sourcePath,
              sha256: example.files[0].sha256,
            },
          }) satisfies CatalogVariant,
      ),
  }),
);

// Additional native controls and composed collections are registered by their owning modules.
export const entries: CatalogEntry[] = [
  ...reuiEntries,
  ...nativeEntries,
  ...compositionEntries,
];
export function getEntries(kind: CollectionKind) {
  return entries.filter((entry) => entry.kind === kind);
}
export function getEntry(kind: CollectionKind, id: string) {
  return entries.find((entry) => entry.kind === kind && entry.id === id);
}
export function getVariant(id: string) {
  for (const entry of entries) {
    const variant = entry.variants.find((item) => item.id === id);
    if (variant) return { entry, variant };
  }
}
export function countVariants(kind?: CollectionKind) {
  return entries
    .filter((entry) => !kind || entry.kind === kind)
    .reduce((total, entry) => total + entry.variants.length, 0);
}
