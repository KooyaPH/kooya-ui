import type { CatalogEntry, CollectionKind } from "../registry/types";
export type Appearance = {
  mode: "light" | "dark";
  density: "comfortable" | "compact";
};
export type SiteRoute =
  | { page: "overview" | "docs" | "missing" }
  | { page: "preview"; variantId: string }
  | {
      page: "collection";
      kind: CollectionKind;
      id?: string;
      variantId?: string;
      query: string;
    };
const kinds: CollectionKind[] = [
  "components",
  "groups",
  "blocks",
  "sections",
  "templates",
];
export function parseRoute(hash: string): SiteRoute {
  try {
    const [path, search = ""] = hash.replace(/^#/, "").split("?");
    const [page = "overview", id, variantId, extra] = path
      .split("/")
      .filter(Boolean)
      .map(decodeURIComponent);
    if (extra) return { page: "missing" };
    if ((page === "overview" || page === "docs") && !id) return { page };
    if (page === "preview" && id && !variantId)
      return { page: "preview", variantId: id };
    if (kinds.includes(page as CollectionKind))
      return {
        page: "collection",
        kind: page as CollectionKind,
        id,
        variantId,
        query: new URLSearchParams(search).get("q") ?? "",
      };
  } catch {
    /* Malformed URLs recover through the same visible route. */
  }
  return { page: "missing" };
}
export function filterCatalog(entries: CatalogEntry[], query: string) {
  const words = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return entries.filter((entry) => {
    const text = [
      entry.title,
      entry.description,
      ...entry.tags,
      ...entry.variants.flatMap((v) => [v.title, v.description]),
    ]
      .join(" ")
      .toLocaleLowerCase();
    return words.every((word) => text.includes(word));
  });
}
export function isPreviewSettings(
  value: unknown,
): value is Appearance & { type: "kooya-preview-settings" } {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    v.type === "kooya-preview-settings" &&
    (v.mode === "light" || v.mode === "dark") &&
    (v.density === "comfortable" || v.density === "compact")
  );
}
export function catalogHref(
  kind: CollectionKind,
  id?: string,
  variantId?: string,
) {
  return (
    "#/" +
    [kind, id, variantId]
      .filter(Boolean)
      .map((value) => encodeURIComponent(value!))
      .join("/")
  );
}
