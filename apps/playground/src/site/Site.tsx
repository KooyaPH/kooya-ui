import { readLibraryAppearance, storeLibraryAppearance } from "./appearance";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { KooyaProvider } from "@kooyaph/ui";
import {
  Button,
  Drawer,
  Dropdown,
  Input,
  Menu,
  Modal,
  Segmented,
} from "@kooyaph/ui/components";
import { collections, entries, getEntries } from "../registry/catalog";
import {
  catalogHref,
  filterCatalog,
  parseRoute,
  type Appearance,
  type SiteRoute,
} from "./model";
import { CatalogPage, MissingPage } from "./CatalogPages";
import { Docs, Landing } from "./Landing";
import { PreviewRoute } from "./Preview";

function Brand() {
  return (
    <a className="site-brand" href="#/overview" aria-label="Kooya UI overview">
      <img src="/brand/kooya-wordmark.png" alt="Kooya" />
      <span>UI v1</span>
    </a>
  );
}
function CollectionNav({
  route,
  onNavigate,
}: {
  route: SiteRoute;
  onNavigate?: () => void;
}) {
  const [query, setQuery] = useState("");
  const kind = route.page === "collection" ? route.kind : "components";
  const categories = filterCatalog(getEntries(kind), query);
  return (
    <>
      <div className="rail-heading">The collection</div>
      <Menu
        aria-label="Collections"
        mode="inline"
        selectedKeys={[kind]}
        items={collections.map((item) => ({
          key: item.id,
          label: (
            <a href={catalogHref(item.id)} onClick={onNavigate}>
              {item.title}
              <span className="nav-count">{getEntries(item.id).length}</span>
            </a>
          ),
        }))}
      />
      <div className="rail-filter">
        <Input
          type="search"
          prefix={<SearchOutlined aria-hidden="true" />}
          aria-label="Filter categories"
          placeholder="Filter categories…"
          allowClear
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <nav aria-label={`${kind} categories`} className="category-navigation">
        {categories.map((entry) => (
          <a
            key={entry.id}
            href={catalogHref(kind, entry.id)}
            aria-current={
              route.page === "collection" && route.id === entry.id
                ? "page"
                : undefined
            }
            onClick={onNavigate}
          >
            <span>{entry.title}</span>
            <span>{entry.variants.length}</span>
          </a>
        ))}
        {categories.length === 0 && <p role="status">No matching categories</p>}
      </nav>
      <a className="rail-docs" href="#/docs" onClick={onNavigate}>
        Documentation ↗
      </a>
    </>
  );
}
function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const matches = filterCatalog(entries, query);
  const results = matches.slice(0, 40);
  return (
    <Modal
      title="Search the collection"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      afterOpenChange={(visible) => {
        if (!visible) setQuery("");
      }}
    >
      <Input
        type="search"
        prefix={<SearchOutlined aria-hidden="true" />}
        autoFocus
        aria-label="Search all collections"
        placeholder="Search components, blocks, examples…"
        allowClear
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="search-results">
        <p role="status">
          {query
            ? `${filterCatalog(entries, query).length} matching categories`
            : "Browse the collection"}
        </p>
        {matches.length > results.length && (
          <p>
            Showing the first {results.length} of {matches.length} matches.
            Refine your search to see more.
          </p>
        )}
        {results.map((entry) => (
          <a
            key={`${entry.kind}-${entry.id}`}
            href={catalogHref(entry.kind, entry.id)}
            onClick={onClose}
          >
            <span>
              <strong>{entry.title}</strong>
              <small>{entry.description}</small>
            </span>
            <span>{entry.kind} ↗</span>
          </a>
        ))}
        {!results.length && (
          <p>No matches. Try “button”, “calendar”, or “dashboard”.</p>
        )}
      </div>
    </Modal>
  );
}
export default function Site() {
  const [hash, setHash] = useState(location.hash);
  const [appearance, setAppearance] = useState<Appearance>(
    readLibraryAppearance,
  );
  useEffect(() => {
    storeLibraryAppearance(appearance);
  }, [appearance]);
  const [navigation, setNavigation] = useState(false);
  const [search, setSearch] = useState(false);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const route = parseRoute(hash);
  useEffect(() => {
    const update = () => {
      setHash(location.hash);
      setNavigation(false);
      setSearch(false);
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", update);
    const key = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setSearch((value) => !value);
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("hashchange", update);
      window.removeEventListener("keydown", key);
    };
  }, []);
  useEffect(() => {
    document.title = `${route.page === "collection" ? (route.id ?? route.kind).replace(/-/g, " ") : route.page === "overview" ? "Build with character" : route.page} · Kooya UI`;
  }, [hash]);
  if (route.page === "preview")
    return <PreviewRoute variantId={route.variantId} />;
  const closeNavigation = () => setNavigation(false);
  return (
    <KooyaProvider
      palette={appearance.palette ?? "olive"}
      customAccent={appearance.customAccent}
      mode={appearance.mode}
      density={appearance.density}
      className="catalog-site"
    >
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        Skip to content
      </a>
      <header className="site-header">
        <Button
          ref={mobileTrigger}
          className="mobile-navigation-trigger"
          aria-label="Open navigation"
          onClick={() => setNavigation(true)}
        >
          ☰
        </Button>
        <Brand />
        <nav className="header-links" aria-label="Main navigation">
          <a
            href="#/overview"
            aria-current={route.page === "overview" ? "page" : undefined}
          >
            Overview
          </a>
          <a
            href="#/components"
            aria-current={route.page === "collection" ? "page" : undefined}
          >
            Collection
          </a>
          <a href="#/workspace/cms">Workspaces</a>
          <a
            href="#/docs"
            aria-current={route.page === "docs" ? "page" : undefined}
          >
            Docs
          </a>
        </nav>
        <div className="header-actions">
          <Button
            className="search-trigger"
            onClick={() => setSearch(true)}
            aria-label="Search collection"
          >
            <span>Search</span>
            <kbd>⌘ K</kbd>
          </Button>
          <Dropdown
            trigger={["click"]}
            menu={{
              items: [
                { key: "light", label: "Light mode" },
                { key: "dark", label: "Dark mode" },
                { type: "divider" },
                { key: "comfortable", label: "Comfortable density" },
                { key: "compact", label: "Compact density" },
              ],
              selectedKeys: [appearance.mode, appearance.density],
              onClick: ({ key }) =>
                setAppearance((current) =>
                  key === "light" || key === "dark"
                    ? { ...current, mode: key, preferredMode: key }
                    : { ...current, density: key as Appearance["density"] },
                ),
            }}
          >
            <Button aria-label="Appearance settings">
              {appearance.mode === "light" ? "☀" : "☾"}
              <span className="appearance-label"> Appearance</span>
            </Button>
          </Dropdown>
        </div>
      </header>
      <div
        className={
          route.page === "collection" ? "catalog-layout" : "page-layout"
        }
      >
        {route.page === "collection" && (
          <aside className="catalog-sidebar">
            <CollectionNav route={route} />
          </aside>
        )}
        <main id="main-content" tabIndex={-1} className="site-main">
          {route.page === "overview" ? (
            <Landing appearance={appearance} onAppearance={setAppearance} />
          ) : route.page === "docs" ? (
            <Docs />
          ) : route.page === "collection" ? (
            <CatalogPage
              key={`${route.kind}/${route.id ?? ""}/${route.variantId ?? ""}`}
              route={route}
              appearance={appearance}
            />
          ) : (
            <MissingPage />
          )}
          <footer className="site-footer">
            <Brand />
            <p>A little character. A solid foundation.</p>
            <div>
              <a href="#/docs">Documentation</a>
              <a href="#/components">Collection</a>
              <a
                href="https://github.com/KooyaPH/kooya-ui"
                target="_blank"
                rel="noreferrer"
              >
                Source ↗
              </a>
            </div>
          </footer>
        </main>
      </div>
      <Drawer
        title="Explore Kooya UI"
        placement="left"
        size={300}
        open={navigation}
        onClose={closeNavigation}
        afterOpenChange={(open) => {
          if (!open) mobileTrigger.current?.focus();
        }}
      >
        <nav className="mobile-page-links" aria-label="Site navigation">
          <a href="#/overview" onClick={closeNavigation}>
            Overview
          </a>
          <a href="#/docs" onClick={closeNavigation}>
            Documentation
          </a>
          <a href="#/workspace/cms" onClick={closeNavigation}>
            Workspaces
          </a>
        </nav>
        <CollectionNav route={route} onNavigate={closeNavigation} />
        <div className="mobile-appearance">
          <Segmented
            aria-label="Color mode"
            value={appearance.mode}
            options={["light", "dark"]}
            onChange={(value) =>
              setAppearance({
                ...appearance,
                mode: value as Appearance["mode"],
                preferredMode: value as Appearance["mode"],
              })
            }
          />
        </div>
      </Drawer>
      <SearchDialog open={search} onClose={() => setSearch(false)} />
    </KooyaProvider>
  );
}
