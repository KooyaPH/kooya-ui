import { useState } from "react";
import { Button, Segmented, Tag } from "@kooyaph/ui/components";
import { DataTable } from "@kooyaph/ui/organisms";
import { ApplicationAuthorization } from "@kooyaph/ui";
import { collections, countVariants, getEntries } from "../registry/catalog";
import type { Appearance } from "./model";
import "./marketing.css";
export const installSnippet =
  "pnpm add @kooyaph/ui@https://github.com/KooyaPH/kooya-ui/releases/download/v1.1.0/kooyaph-ui-1.1.0.tgz antd@6.6.5";
export const usageSnippet = `import '@fontsource-variable/dm-sans';\nimport '@kooyaph/ui/styles.css';\nimport { KooyaProvider } from '@kooyaph/ui';\nimport { Button, Input, Space } from '@kooyaph/ui/components';\n\nexport default function App() {\n  return (\n    <KooyaProvider mode="light" density="compact">\n      <Space>\n        <Input aria-label="Project name" placeholder="Project name" />\n        <Button type="primary">Create project</Button>\n      </Space>\n    </KooyaProvider>\n  );\n}`;
const records = [
  {
    id: "01",
    title: "A good place to begin",
    type: "Guide",
    status: "Published",
  },
  {
    id: "02",
    title: "The way we work together",
    type: "Company",
    status: "In review",
  },
  {
    id: "03",
    title: "Small details. Better days.",
    type: "Article",
    status: "Draft",
  },
];
export function Landing({
  appearance,
  onAppearance,
}: {
  appearance: Appearance;
  onAppearance: (value: Appearance) => void;
}) {
  const [scene, setScene] = useState("Editorial");
  const [loading, setLoading] = useState(false);
  const [palette, setPalette] = useState<string>(appearance.palette ?? "olive");
  const workspaceRecords =
    scene === "Editorial"
      ? records
      : [
          {
            id: "admin",
            title: "Workspace administrators",
            type: "Role",
            status: "Full access",
          },
          {
            id: "editors",
            title: "Content reviewers",
            type: "Role",
            status: "Review & publish",
          },
          {
            id: "guests",
            title: "Guest collaborators",
            type: "Role",
            status: "Read only",
          },
        ];
  return (
    <div className="kooya-marketing">
      <section className="mk-hero">
        <div className="mk-announcement">
          <span className="mk-dot" /> KOOYA UI / VERSION 1{" "}
          <span>Made for the way you work.</span>
        </div>
        <div className="mk-hero-grid">
          <div className="mk-hero-copy">
            <p className="mk-kicker">A LITTLE CHARACTER. A SOLID FOUNDATION.</p>
            <h1>
              Serious tools.
              <br />
              <em>Human by design.</em>
            </h1>
            <p className="mk-lead">
              Meet the interface system behind Kooya. Clear workspaces,
              considered components, and the small details that make everyday
              work feel better.
            </p>
            <div className="mk-actions">
              <Button type="primary" size="large" href="#/components">
                Explore the collection <span aria-hidden="true">↗</span>
              </Button>
              <Button size="large" href="#/workspace/cms">
                Try the workspace
              </Button>
            </div>
            <div className="mk-built">
              <span>React + TypeScript</span>
              <span>Built on Ant Design</span>
              <span>Ours to make yours.</span>
            </div>
          </div>
          <div className="mk-specimen">
            <div className="mk-specimen-cap">
              <span>THE KOOYA FEEL, IN PRACTICE</span>
              <span>01 — 03</span>
            </div>
            <div className="mk-note">
              <span className="mk-star" aria-hidden="true">
                ✳
              </span>
              <span>
                Room for focus.
                <br />
                <strong>A little room for personality.</strong>
              </span>
            </div>
            <div className="mk-mini-app">
              <div className="mk-mini-bar">
                <img src="/brand/kooya-wordmark.png" alt="Kooya" />
                <span>Editorial / Content library</span>
                <span className="mk-mini-avatar">JD</span>
              </div>
              <div className="mk-mini-body">
                <div className="mk-mini-rail">
                  <span className="is-current">Content</span>
                  <span>Projects</span>
                  <span>People</span>
                  <span>Settings</span>
                </div>
                <div className="mk-mini-content">
                  <div className="mk-mini-title">
                    <h2>Good work starts here.</h2>
                    <Tag>Kooya Olive</Tag>
                  </div>
                  <p>A clear view of what’s ready, and what’s next.</p>
                  <div className="mk-mini-metrics">
                    <div>
                      <small>Published</small>
                      <strong>
                        24<span>↗ 8 this week</span>
                      </strong>
                    </div>
                    <div>
                      <small>In review</small>
                      <strong>
                        06<span>Ready for a fresh eye</span>
                      </strong>
                    </div>
                  </div>
                  {records.map((row) => (
                    <div className="mk-mini-row" key={row.id}>
                      <span>{row.id}</span>
                      <strong>{row.title}</strong>
                      <small>{row.status}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mk-specimen-foot">
              <span>Quiet structure. Distinct character.</span>
              <span
                className="mk-swatch-strip"
                role="img"
                aria-label="Olive, sage and signature Kooya green"
              >
                <i />
                <i />
                <i />
                <i />
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="mk-proof" aria-label="Collection at a glance">
        <div>
          <strong>{countVariants().toLocaleString()}</strong>
          <span>working examples</span>
        </div>
        <div>
          <strong>{getEntries("components").length}</strong>
          <span>component categories</span>
        </div>
        <div>
          <strong>12 + yours</strong>
          <span>palettes, with a custom accent</span>
        </div>
        <div>
          <strong>One Kooya.</strong>
          <span>From the smallest control to the whole workspace.</span>
        </div>
      </section>
      <section className="mk-section mk-workspaces">
        <div className="mk-section-heading">
          <div>
            <p className="mk-kicker">STRUCTURE WITH A POINT OF VIEW</p>
            <h2>
              Less friction.
              <br />
              More good work.
            </h2>
          </div>
          <p>
            Editorial gives content room to breathe. Governance keeps decisions
            clear. Two expressions of one considered system.
          </p>
        </div>
        <div className="mk-workspace-grid">
          <div className="mk-workspace-copy">
            <Segmented
              aria-label="Workspace preview"
              value={scene}
              options={["Editorial", "Governance"]}
              onChange={setScene}
            />
            <h3>
              {scene === "Editorial"
                ? "A place for things to take shape."
                : "Clarity for the people in charge."}
            </h3>
            <p>
              {scene === "Editorial"
                ? "Content, projects and everyday work. A steady navigation rail, useful context, and a clear path to the next action."
                : "People, permissions and settings. Deliberate hierarchy, readable policies, and decisions that feel well considered."}
            </p>
            <a
              className="mk-text-link"
              href={
                scene === "Editorial"
                  ? "#/workspace/cms"
                  : "#/workspace/settings"
              }
            >
              Open {scene.toLowerCase()} workspace ↗
            </a>
          </div>
          <div className="mk-workspace-live">
            <div className="mk-live-heading">
              <span>
                {scene === "Editorial" ? "Content library" : "Access overview"}
              </span>
              <Tag>Live components</Tag>
            </div>
            <DataTable
              label={scene + " preview"}
              minWidth={420}
              rows={workspaceRecords}
              rowKey={(r) => r.id}
              columns={[
                {
                  key: "title",
                  title: scene === "Editorial" ? "Title" : "Policy",
                  render: (r) => r.title,
                },
                {
                  key: "status",
                  title: "Status",
                  render: (r) => <Tag>{r.status}</Tag>,
                },
              ]}
            />
            <div className="mk-live-caption">
              Compact by default. Every detail has a job.
            </div>
          </div>
        </div>
      </section>
      <section className="mk-section mk-collection">
        <div className="mk-section-heading">
          <div>
            <p className="mk-kicker">
              FROM THE SMALL PARTS TO THE WHOLE PICTURE
            </p>
            <h2>
              Your next interface,
              <br />
              already taking shape.
            </h2>
          </div>
          <a className="mk-text-link" href="#/components">
            Browse the collection ↗
          </a>
        </div>
        <div className="mk-collection-grid">
          {collections.map((item, index) => (
            <a href={`#/${item.id}`} key={item.id}>
              <span className="mk-index">
                0{index + 1} <span aria-hidden="true">↗</span>
              </span>
              <div
                className={`mk-collection-art mk-art-${index}`}
                aria-hidden="true"
              >
                {index === 0 ? (
                  <>
                    <i>Button</i>
                    <i>✓</i>
                    <i>Draft</i>
                  </>
                ) : index === 1 ? (
                  <>
                    <b>Project name</b>
                    <i>A good idea</i>
                    <i>Continue ↗</i>
                  </>
                ) : index === 2 ? (
                  <>
                    <b>Ready to connect?</b>
                    <i>Review permissions</i>
                    <i>Authorize</i>
                  </>
                ) : index === 3 ? (
                  <>
                    <b>Overview</b>
                    <div className="mk-art-bars">
                      <i />
                      <i />
                      <i />
                    </div>
                  </>
                ) : (
                  <>
                    <b>Kooya workspace</b>
                    <div className="mk-art-layout">
                      <i />
                      <i />
                    </div>
                  </>
                )}
              </div>
              <h3>{item.title}</h3>
              <p>
                {item.id === "components"
                  ? "The essentials, with every detail considered."
                  : item.id === "groups"
                    ? "Controls that belong together."
                    : item.id === "blocks"
                      ? "Useful patterns for real work."
                      : item.id === "sections"
                        ? "A complete thought, ready to compose."
                        : "A confident starting point."}
              </p>
              <small>{countVariants(item.id)} examples</small>
            </a>
          ))}
        </div>
      </section>
      <section className="mk-section mk-details">
        <div className="mk-section-heading">
          <div>
            <p className="mk-kicker">GOOD UI SHOWS UP IN THE DETAILS</p>
            <h2>
              Considered beyond
              <br />
              the first impression.
            </h2>
          </div>
          <p>
            Clear consent. Stable loading. Useful feedback. The moments between
            screens deserve the same care.
          </p>
        </div>
        <div className="mk-detail-grid">
          <article>
            <div className="mk-detail-label">01 / CONNECT WITH CONFIDENCE</div>
            <ApplicationAuthorization
              application={{
                name: "Kooya Projects",
                publisher: "Kooya",
                description: "Keep your projects and repositories in step.",
                verified: true,
              }}
              account="Jamie at Acme Studio"
              permissions={[
                {
                  id: "read",
                  title: "Read selected repositories",
                  description: "View repository names and project activity.",
                  access: "Read only",
                  required: true,
                },
              ]}
              state="review"
              onAuthorize={() => {
                location.hash = "/groups/application-authorization";
              }}
              onCancel={() => {
                location.hash = "/groups/application-authorization";
              }}
            />
            <a
              className="mk-text-link"
              href="#/groups/application-authorization"
            >
              Explore authorization patterns ↗
            </a>
          </article>
          <article>
            <div className="mk-detail-label">
              02 / KEEP THE STRUCTURE. LOAD THE DATA.
            </div>
            <div className="mk-loading-demo">
              <div className="mk-live-heading">
                <h3>Project activity</h3>
                <Button
                  aria-pressed={loading}
                  onClick={() => setLoading(!loading)}
                >
                  {loading ? "Show data" : "Preview loading"}
                </Button>
              </div>
              <p>Headers stay put. Only the values wait.</p>
              <DataTable
                label="Loading preview"
                loading={loading}
                rows={loading ? [] : records}
                rowKey={(r) => r.id}
                minWidth={360}
                columns={[
                  { key: "title", title: "Project", render: (r) => r.title },
                  { key: "status", title: "Status", render: (r) => r.status },
                ]}
              />
            </div>
            <a className="mk-text-link" href="#/groups/data-loading">
              Explore loading patterns ↗
            </a>
          </article>
        </div>
      </section>
      <section className="mk-section mk-personality">
        <div className="mk-personality-mark" aria-hidden="true">
          <img src="/brand/kooya-wordmark.png" alt="" />
        </div>
        <div>
          <p className="mk-kicker">STILL KOOYA. ALWAYS YOURS.</p>
          <h2>
            A familiar feel.
            <br />
            Your own expression.
          </h2>
          <p>
            Olive for a grounded start. A signature spark of Kooya green. Light
            or dark, compact or comfortable: the system adapts without losing
            its character.
          </p>
          <div
            className="mk-palette-options"
            role="group"
            aria-label="Preview palette"
          >
            {[
              { id: "olive", name: "Kooya Olive", color: "#45583D" },
              { id: "navy", name: "Navy", color: "#334E74" },
              { id: "plum", name: "Plum", color: "#76556D" },
              { id: "teal", name: "Teal", color: "#2D6A64" },
            ].map((p) => (
              <button
                key={p.id}
                aria-label={p.name}
                aria-pressed={palette === p.id}
                style={{ background: p.color }}
                onClick={() => {
                  setPalette(p.id);
                  onAppearance({
                    ...appearance,
                    palette: p.id as Appearance["palette"],
                  });
                }}
              >
                <span className="ku-visually-hidden">{p.name}</span>
                {palette === p.id && "✓"}
              </button>
            ))}
          </div>
          <div className="mk-actions">
            <Segmented
              aria-label="Marketing color mode"
              value={appearance.mode}
              options={[
                { label: "Light", value: "light" },
                { label: "Dark", value: "dark" },
              ]}
              onChange={(v) =>
                onAppearance({
                  ...appearance,
                  mode: v as Appearance["mode"],
                  preferredMode: v as Appearance["mode"],
                })
              }
            />
            <a className="mk-text-link" href="#/workspace/settings">
              Make it yours ↗
            </a>
          </div>
        </div>
      </section>
      <section className="mk-section mk-start">
        <p className="mk-kicker">LET’S MAKE SOMETHING GOOD.</p>
        <h2>
          Start small.
          <br />
          <em>Build something Kooya.</em>
        </h2>
        <div className="mk-actions">
          <Button type="primary" size="large" href="#/docs">
            Get started ↗
          </Button>
          <Button size="large" href="#/components">
            Find your first component
          </Button>
        </div>
        <p>React. TypeScript. Familiar APIs. A foundation to make your own.</p>
      </section>
    </div>
  );
}
export function Docs() {
  return (
    <article className="docs-page">
      <p className="eyebrow">KOOYA UI DOCUMENTATION</p>
      <h1>Make a good start.</h1>
      <p className="docs-lead">
        The Kooya foundation brings our brand to actual Ant Design components.
        Start with the provider, then compose using the controls you know.
      </p>
      <h2>1. Install</h2>
      <p>
        Use React 18.3 or 19 and install the Ant Design peer dependency
        alongside Kooya UI. Add the local font package for the interface
        typography.
      </p>
      <pre>
        <code>
          {installSnippet}
          {"\npnpm add @fontsource-variable/dm-sans"}
        </code>
      </pre>
      <h2>2. Add the provider</h2>
      <p>
        Import the stylesheet once. The provider defaults to Kooya Olive, light
        mode, and compact density. It also synchronizes menus, dialogs,
        notifications, and other Ant overlays.
      </p>
      <pre>
        <code>{usageSnippet}</code>
      </pre>
      <h2>3. Explore and compose</h2>
      <p>
        Import controls from <code>@kooyaph/ui/components</code>. These are
        actual Ant Design components, including their props, refs, and compound
        APIs. Browse a category, use a live example, then open its Code tab for
        adapted usage source.
      </p>
      <div className="docs-links">
        {collections.map((item) => (
          <Button key={item.id} href={`#/${item.id}`}>
            {item.title} ↗
          </Button>
        ))}
      </div>
      <h2>Appearance and density</h2>
      <p>
        Set <code>mode="light"</code> or <code>mode="dark"</code>, and{" "}
        <code>density="compact"</code> or <code>density="compact"</code> on
        KooyaProvider. Respect system reduced motion by leaving its automatic
        behavior enabled.
      </p>
      <h2>Examples and source</h2>
      <p>
        REUI examples are adapted to the Kooya foundation with Ant Design
        controls and their original specialized engines where needed. Each
        sourced example links to its upstream revision. REUI’s MIT attribution
        is preserved in the repository. All demos use fictional local data.
      </p>
      <p>
        <a
          href="https://ant.design/components/overview/"
          target="_blank"
          rel="noreferrer"
        >
          Ant Design component API reference ↗
        </a>
      </p>
    </article>
  );
}
