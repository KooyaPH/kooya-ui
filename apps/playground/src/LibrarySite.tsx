import { ExperiencePage } from "./examples/experience";
import { useEffect, useRef, useState } from "react";
import {
  Menu as MenuIcon,
  Settings2,
  Search,
  ArrowRight,
  Blocks,
  LayoutTemplate,
  PanelsTopLeft,
} from "lucide-react";
import { Button, Dialog, IconButton, TextField } from "@kooyaph/ui";
import {
  ComponentDocs,
  componentEntries,
  componentGroups,
} from "./ComponentDocs";
import { TemplateCatalog } from "./TemplateCatalog";
import type { Composition } from "@kooyaph/ui";
import type { Route } from "./data";

export function useLibraryRoute() {
  const read = () => window.location.hash.replace(/^#\/?/, "") || "overview";
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const update = () => setRoute(read());
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      const heading = document.querySelector<HTMLElement>(
        "[data-route-heading], .ku-main h1",
      );
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [route]);
  return route;
}
const areas = [
  ["overview", "Overview"],
  ["components", "Components"],
  ["templates", "Templates"],
  ["examples", "Examples"],
  ["experience", "Experience"],
];
export function LibraryHeader({
  route,
  onAppearance,
}: {
  route: string;
  onAppearance: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const area = route.split("/")[0];
  useEffect(() => {
    let previousY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const currentY = window.scrollY;
      const delta = currentY - previousY;
      previousY = currentY;
      if (currentY <= 96 || delta < -2) {
        setHidden(false);
      } else if (
        currentY > 128 &&
        delta > 2 &&
        !headerRef.current?.contains(document.activeElement)
      ) {
        setHidden(true);
      }
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  const links = (
    <nav aria-label="Library sections" className="library-topnav">
      {areas.map(([id, title]) => (
        <a
          key={id}
          href={`#/${id}`}
          aria-current={area === id ? "page" : undefined}
          onClick={() => setOpen(false)}
        >
          {title}
        </a>
      ))}
    </nav>
  );
  return (
    <>
      <header
        ref={headerRef}
        className={`library-header${hidden ? " library-header--hidden" : ""}`}
        inert={hidden}
        onFocusCapture={() => setHidden(false)}
      >
        <a
          className="library-brand"
          href="#/overview"
          aria-label="Kooya UI overview"
        >
          <Blocks size={24} />
          <strong>Kooya UI</strong>
        </a>
        <div className="library-desktop-nav">{links}</div>
        <div className="library-header-actions">
          <IconButton label="Preview appearance" onClick={onAppearance}>
            <Settings2 />
          </IconButton>
          <span className="library-mobile-nav">
            <IconButton label="Browse library" onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          </span>
        </div>
      </header>
      <Dialog
        kind="navigation"
        title="Browse library"
        open={open}
        onOpenChange={setOpen}
      >
        {links}
      </Dialog>
    </>
  );
}
function ComponentBrowser({ selected }: { selected?: string }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const normalized = query.trim().toLowerCase();
  const browse = (
    <>
      <TextField
        label="Find a component"
        type="search"
        icon={<Search />}
        placeholder="Search components…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <nav aria-label="Component categories">
        {componentGroups.map((group) => {
          const items = group.items.filter(([id, title, description]) =>
            `${id} ${title} ${description} ${group.label}`
              .toLowerCase()
              .includes(normalized),
          );
          return (
            items.length > 0 && (
              <section className="browse-group" key={group.label}>
                <h2>{group.label}</h2>
                {items.map(([id, title]) => (
                  <a
                    key={id}
                    href={`#/components/${id}`}
                    onClick={() => setOpen(false)}
                    aria-current={selected === id ? "page" : undefined}
                  >
                    {title}
                  </a>
                ))}
              </section>
            )
          );
        })}
        {!componentEntries.some((x) =>
          `${x.id} ${x.title} ${x.description} ${x.category}`
            .toLowerCase()
            .includes(normalized),
        ) && <p role="status">No components found. Try another name.</p>}
      </nav>
    </>
  );
  return (
    <>
      <aside className="component-browser">{browse}</aside>
      <div className="component-browser-mobile">
        <Button leadingIcon={<Search />} onClick={() => setOpen(true)}>
          Browse components
        </Button>
      </div>
      <Dialog
        kind="navigation"
        title="Browse components"
        open={open}
        onOpenChange={setOpen}
      >
        <div className="mobile-component-browser">{browse}</div>
      </Dialog>
    </>
  );
}
function Overview() {
  return (
    <div className="overview-page">
      <div className="overview-hero-grid">
        <header className="library-hero">
          <p className="ku-eyebrow">THE KOOYA COMPONENT LIBRARY</p>
          <h1 data-route-heading tabIndex={-1}>
            One shared rhythm.
            <br />
            Room for every workspace.
          </h1>
          <p>
            Explore the building blocks behind Kooya: considered controls,
            flexible bento layouts and working examples for your next interface.
          </p>
          <div className="demo-actions">
            <a
              className="library-link library-link-primary"
              href="#/components/button"
            >
              Explore components <ArrowRight size={18} />
            </a>
            <a className="library-link" href="#/templates">
              Browse templates <ArrowRight size={18} />
            </a>
          </div>
        </header>
        <aside
          className="overview-hero-aside"
          aria-label="Kooya UI workspace themes"
        >
          <div className="overview-hero-brand">
            <span className="overview-hero-mark" aria-hidden="true">
              <Blocks size={24} />
            </span>
            <span>
              <strong>Kooya UI</strong>
              <small>One system, three workspaces</small>
            </span>
            <span className="overview-hero-version">ANT · MOSAIC</span>
          </div>
          <div className="overview-workspace-tiles">
            <div className="overview-workspace-tile overview-workspace-tile--business">
              <small>BUSINESS</small>
              <strong>Content & pages</strong>
              <span>Public and editorial</span>
            </div>
            <div className="overview-workspace-tile overview-workspace-tile--console">
              <small>CONSOLE</small>
              <strong>CRM & operations</strong>
              <span>Admin and settings</span>
            </div>
            <div className="overview-workspace-tile overview-workspace-tile--client">
              <small>CLIENT</small>
              <strong>Usage & account</strong>
              <span>Clear self-service</span>
            </div>
          </div>
          <div className="overview-hero-footnote">
            <span>Ant Design</span>
            <span>Mosaic Bento</span>
            <span>Comfortable</span>
          </div>
        </aside>
      </div>
      <section className="overview-section">
        <div className="section-heading">
          <p className="ku-eyebrow">FROM DETAIL TO WHOLE</p>
          <h2>Build at the right level</h2>
          <p>
            Start with a single control, compose a workflow, or explore a
            complete workspace.
          </p>
        </div>
        <div className="overview-start-grid">
          {[
            {
              title: "Components",
              path: "components",
              icon: <Blocks />,
              eyebrow: "FOUNDATIONS → ORGANISMS",
              text: "Browse foundations, atoms, molecules and organisms. Try their states and read the usage code.",
            },
            {
              title: "Templates",
              path: "templates",
              icon: <LayoutTemplate />,
              eyebrow: "17 PAGE FAMILIES",
              text: "17 presentational families for records, forms, collaboration and content.",
            },
            {
              title: "Examples",
              path: "examples",
              icon: <PanelsTopLeft />,
              eyebrow: "BUSINESS · CONSOLE · CLIENT",
              text: "Interactive Business, Console and Client workspaces with fictional local data.",
            },
          ].map((item) => (
            <a
              className={`destination-card overview-start-card overview-start-card--${item.path}`}
              data-overview-tile={item.path}
              href={`#/${item.path}`}
              key={item.path}
            >
              <div className="overview-start-card-head">
                {item.icon}
                <span>{item.eyebrow}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              {item.path === "components" && (
                <ol
                  className="overview-atomic-layers"
                  aria-label="Atomic design layers"
                >
                  {[
                    ["01", "Foundations"],
                    ["02", "Atoms"],
                    ["03", "Molecules"],
                    ["04", "Organisms"],
                  ].map(([number, label]) => (
                    <li key={number}>
                      <small>{number}</small>
                      <strong>{label}</strong>
                    </li>
                  ))}
                </ol>
              )}
              {item.path === "components" && (
                <div className="overview-control-motif" aria-hidden="true">
                  <span className="overview-control-motif-caption">
                    A FEW BUILDING BLOCKS
                  </span>
                  <span className="overview-control-motif-button">
                    <strong>Create a page</strong>
                    <ArrowRight size={16} />
                  </span>
                  <span className="overview-control-motif-field">
                    <Search size={16} /> Find a component
                  </span>
                  <span className="overview-control-motif-chip">
                    <span aria-hidden="true">✓</span> Selected state
                  </span>
                </div>
              )}
              <span className="overview-start-action">
                Explore <ArrowRight size={16} />
              </span>
            </a>
          ))}
        </div>
      </section>
      <section className="overview-section overview-foundations">
        <div className="section-heading">
          <p className="ku-eyebrow">A CONSISTENT FOUNDATION</p>
          <h2>
            Different identities.
            <br />
            The same considered details.
          </h2>
          <p>
            Theme sets the identity. Composition sets the arrangement. Explore
            both using Appearance in the header.
          </p>
          <a className="library-link" href="#/components/provider">
            Meet the provider →
          </a>
        </div>
        <dl className="principle-list">
          <div>
            <dt>4px rhythm</dt>
            <dd>Consistent spacing for controls, content and modules.</dd>
          </div>
          <div>
            <dt>44px actions</dt>
            <dd>Comfortable primary targets and deliberate icon spacing.</dd>
          </div>
          <div>
            <dt>Four themes, light and dark</dt>
            <dd>Mosaic, Signature, Canvas and Client share semantic roles.</dd>
          </div>
          <div>
            <dt>Built for interaction</dt>
            <dd>
              Keyboard navigation, focus, errors and feedback are part of each
              example.
            </dd>
          </div>
        </dl>
      </section>
      <section className="overview-section">
        <div className="section-heading">
          <p className="ku-eyebrow">START SMALL</p>
          <h2>A few useful places to begin</h2>
        </div>
        <div className="starter-links">
          {["button", "fields", "overlays", "workspace"].map((id) => {
            const entry = componentEntries.find((x) => x.id === id)!;
            return (
              <a href={`#/components/${id}`} key={id}>
                <span>
                  <strong>{entry.title}</strong>
                  <small>{entry.description}</small>
                </span>
                <ArrowRight size={20} />
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}
export function LibraryPages({
  route,
  onNavigate,
}: {
  route: string;
  onNavigate: (route: Route, composition?: Composition) => void;
}) {
  const [area, id] = route.split("/");
  if (area === "experience") return <ExperiencePage selected={id} />;
  if (area === "overview")
    return (
      <main id="library-main" className="library-main">
        <Overview />
      </main>
    );
  if (area === "templates")
    return (
      <main id="library-main" className="library-main">
        <TemplateCatalog onNavigate={onNavigate} selectedFamily={id} />
      </main>
    );
  if (area === "examples")
    return (
      <main id="library-main" className="library-main">
        <header className="document-heading">
          <p className="ku-eyebrow">COMPLETE WORKFLOWS</p>
          <h1 data-route-heading tabIndex={-1}>
            Workspace examples
          </h1>
          <p>
            Explore the bento header, sidebar and body together. All edits stay
            in this browser session.
          </p>
        </header>
        <div className="library-destination-grid">
          {[
            {
              area: "Business",
              title: "Content studio",
              route: "pages",
              text: "Create, edit and publish fictional pages.",
            },
            {
              area: "Console",
              title: "CRM & accounts",
              route: "crm",
              text: "Search, filter and manage fictional organizations.",
            },
            {
              area: "Client",
              title: "Usage dashboard",
              route: "usage",
              text: "Explore usage, summaries and local actions.",
            },
          ].map((x) => (
            <a
              className="destination-card"
              key={x.route}
              href={`#/examples/${x.route}`}
            >
              <p className="ku-eyebrow">{x.area}</p>
              <h2>{x.title}</h2>
              <p>{x.text}</p>
              <span>
                Open workspace <ArrowRight size={16} />
              </span>
            </a>
          ))}
        </div>
        <section className="docs-section">
          <h2>Shared workspace settings</h2>
          <p>
            Settings and fictional records are preserved when you move between
            library pages and examples. Reset dummy data from the workspace
            account menu to begin again.
          </p>
          <a className="library-link" href="#/examples/settings">
            Open settings →
          </a>
        </section>
      </main>
    );
  if (area === "components")
    return (
      <div className="library-docs-layout">
        <ComponentBrowser selected={id} />
        <main id="library-main" className="library-doc-content">
          {id ? (
            <ComponentDocs key={id} id={id} />
          ) : (
            <>
              <header className="document-heading">
                <p className="ku-eyebrow">ATOMIC COMPONENTS</p>
                <h1 data-route-heading tabIndex={-1}>
                  Component library
                </h1>
                <p>
                  Focused live examples and public usage guidance, organized
                  from foundations to complete interface structures.
                </p>
              </header>
              {componentGroups.map((group) => (
                <section className="docs-section" key={group.label}>
                  <h2>{group.label}</h2>
                  <div className="component-index">
                    {group.items.map(([id, title, description]) => (
                      <a href={`#/components/${id}`} key={id}>
                        <strong>{title}</strong>
                        <span>{description}</span>
                      </a>
                    ))}
                  </div>
                </section>
              ))}
            </>
          )}
        </main>
        {id && (
          <nav className="document-toc" aria-label="On this page">
            <strong>On this page</strong>
            {["preview", "usage", "api"].map((anchor) => (
              <a
                href={`#/components/${id}`}
                key={anchor}
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById(anchor);
                  section?.scrollIntoView();
                  section?.setAttribute("tabindex", "-1");
                  section?.focus({ preventScroll: true });
                }}
              >
                {anchor === "api"
                  ? "Key props"
                  : anchor === "preview"
                    ? "Interactive example"
                    : "Usage"}
              </a>
            ))}
          </nav>
        )}
      </div>
    );
  return (
    <main className="library-main" id="library-main">
      <h1 data-route-heading tabIndex={-1}>
        Page not found
      </h1>
      <a className="library-link" href="#/overview">
        Return to overview
      </a>
    </main>
  );
}
