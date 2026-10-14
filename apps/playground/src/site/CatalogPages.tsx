import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Alert, Button, Empty, Input, Select, Tag } from "@kooyaph/ui/components";
import { collections, getEntries, getEntry } from "../registry/catalog";
import type { CatalogEntry } from "../registry/types";
import {
  catalogHref,
  filterCatalog,
  type Appearance,
  type SiteRoute,
} from "./model";
import { LiveFrame, VariantCard } from "./Preview";

// Geometry and category/example hierarchy adapted from REUI components-category-grid,
// components-category-card, components-grid and components-layout-shell (MIT; see vendor/reui).
export function CategoryCard({
  entry,
  appearance,
}: {
  entry: CatalogEntry;
  appearance: Appearance;
}) {
  const [previewLoadState, setPreviewLoadState] = useState<"loading" | "ready" | "failed">("loading");
  const [previewReset, setPreviewReset] = useState(0);
  const browseLink = useRef<HTMLAnchorElement>(null);
  const exampleLabel = `${entry.variants.length} ${entry.variants.length === 1 ? "example" : "examples"}`;
  return (
    <article className="category-card">
      <a
        ref={browseLink}
        href={catalogHref(entry.kind, entry.id)}
        aria-label={`Browse ${entry.title}, ${exampleLabel}`}
      >
        <div className="category-image" aria-hidden="true">
          {entry.variants[0] && (
            <LiveFrame
              variant={entry.variants[0]}
              appearance={appearance}
              thumbnail
              reset={previewReset}
              onLoadStateChange={setPreviewLoadState}
            />
          )}
        </div>
        <div className="category-caption">
          <h2>{entry.title}</h2>
          <span>{exampleLabel}</span>
        </div>
      </a>
      {previewLoadState === "failed" && (
        <Alert
          className="category-preview-error"
          type="error"
          title="Preview could not be loaded"
          action={<Button aria-label={`Retry ${entry.title} preview`} onClick={event => {
            const restoreFocus = document.activeElement === event.currentTarget;
            setPreviewLoadState("loading");
            setPreviewReset(current => current + 1);
            if (restoreFocus) browseLink.current?.focus();
          }}>Retry preview</Button>}
        />
      )}
    </article>
  );
}
export function MissingPage() {
  return (
    <section className="missing-page">
      <Empty description="That page or example could not be found." />
      <Button type="primary" href="#/components">
        Browse components
      </Button>
    </section>
  );
}

export function CatalogPage({
  route,
  appearance,
}: {
  route: Extract<SiteRoute, { page: "collection" }>;
  appearance: Appearance;
}) {
  const collection = collections.find((item) => item.id === route.kind)!;
  const all = getEntries(route.kind);
  const entry = route.id ? getEntry(route.kind, route.id) : undefined;
  const [query, setQuery] = useState(route.query);
  const [sort, setSort] = useState("catalog");
  useEffect(() => {
    setQuery(route.query);
    setSort("catalog");
  }, [route.kind, route.id, route.query]);
  const search = (value: string) => {
    setQuery(value);
    const base = catalogHref(route.kind, route.id, route.variantId);
    history.replaceState(
      null,
      "",
      base + (value ? `?q=${encodeURIComponent(value)}` : ""),
    );
  };
  if (route.id && !entry) return <MissingPage />;
  if (
    route.variantId &&
    !entry?.variants.some((variant) => variant.id === route.variantId)
  )
    return <MissingPage />;
  const filtered = filterCatalog(all, query);
  if (sort === "az") filtered.sort((a, b) => a.title.localeCompare(b.title));
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const variants = entry?.variants.filter(
    (variant) =>
      (!route.variantId || variant.id === route.variantId) &&
      words.every((word) =>
        `${variant.title} ${variant.description} ${entry.title}`
          .toLocaleLowerCase()
          .includes(word),
      ),
  );
  if (sort === "az") variants?.sort((a, b) => a.title.localeCompare(b.title));
  const resultCount = entry ? (variants?.length ?? 0) : filtered.length;
  const resultLabel = entry ? (resultCount === 1 ? "example" : "examples") : (resultCount === 1 ? "category" : "categories");
  return (
    <>
      <div className="catalog-toolbar">
        <div className="breadcrumbs">
          <a href={catalogHref(route.kind)}>{collection.title}</a>
          {entry && (
            <>
              <span>/</span>
              <span>{entry.title}</span>
            </>
          )}
        </div>
        <span>
          {entry ? entry.variants.length : all.length}{" "}
          {entry ? "examples" : "categories"}
        </span>
      </div>
      <section className="catalog-content">
        <div className="catalog-intro">
          <div>
            <p className="eyebrow">THE KOOYA COLLECTION</p>
            <h1>{entry?.title ?? collection.title}</h1>
            <p>{entry?.description ?? collection.description}</p>
          </div>
          {entry && (
            <Button href={catalogHref(route.kind)}>
              All {collection.title.toLocaleLowerCase()}
            </Button>
          )}
        </div>
        {entry && (
          <div className="entry-meta">
            <Tag>{entry.importPath}</Tag>
            {entry.dependencies.map((dependency) => (
              <Tag key={dependency}>{dependency}</Tag>
            ))}
          </div>
        )}
        <div className="catalog-filters">
          <Input
            type="search"
            prefix={<SearchOutlined aria-hidden="true" />}
            aria-label={entry ? "Search examples" : "Search collection"}
            placeholder={
              entry ? "Search examples…" : "Find a category or example…"
            }
            allowClear
            value={query}
            onChange={(event) => search(event.target.value)}
          />
          <Select
            aria-label="Sort categories"
            value={sort}
            onChange={setSort}
            options={[
              { value: "catalog", label: "Catalog order" },
              { value: "az", label: "Alphabetical" },
            ]}
          />
          <Button
            onClick={() => {
              search("");
              setSort("catalog");
            }}
          >
            Reset filters
          </Button>
        </div>
        <p className="results-summary" role="status">
          {resultCount} {resultLabel}
          {query && ` matching “${query}”`}
        </p>
        {(entry ? variants?.length === 0 : filtered.length === 0) ? (
          <div className="empty-results">
            <Empty description="No matches. Try a different search." />
            <Button onClick={() => search("")}>Clear search</Button>
          </div>
        ) : entry ? (
          <div
            className={`variant-grid ${route.variantId ? "variant-grid-focused" : ""}`}
          >
            {variants?.map((variant) => (
              <VariantCard
                key={variant.id}
                variant={variant}
                appearance={appearance}
                href={catalogHref(entry.kind, entry.id, variant.id)}
              />
            ))}
          </div>
        ) : (
          <div className="category-grid">
            {filtered.map((item) => (
              <CategoryCard
                key={item.id}
                entry={item}
                appearance={appearance}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
