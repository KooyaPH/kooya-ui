import { useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  Progress,
  Segmented,
  Select,
  Slider,
  Switch,
  Tag,
} from "@kooyaph/ui/components";
import { collections, countVariants, getEntries } from "../registry/catalog";
import { type Appearance } from "./model";
import { CategoryCard } from "./CatalogPages";
export const installSnippet =
  "pnpm add @kooyaph/ui@https://github.com/KooyaPH/kooya-ui/releases/download/v1.0.0/kooyaph-ui-1.0.0.tgz antd@6.6.5";
export const usageSnippet = `import '@fontsource-variable/dm-sans';\nimport '@kooyaph/ui/styles.css';\nimport { KooyaProvider } from '@kooyaph/ui';\nimport { Button, Input, Space } from '@kooyaph/ui/components';\n\nexport default function App() {\n  return (\n    <KooyaProvider mode="light" density="comfortable">\n      <Space>\n        <Input aria-label="Project name" placeholder="Project name" />\n        <Button type="primary">Create project</Button>\n      </Space>\n    </KooyaProvider>\n  );\n}`;
export function Landing({
  appearance,
  onAppearance,
}: {
  appearance: Appearance;
  onAppearance: (value: Appearance) => void;
}) {
  const [name, setName] = useState("A little more human");
  const [saved, setSaved] = useState(false);
  const [progress, setProgress] = useState(64);
  const featured = [
    ...getEntries("blocks").slice(0, 2),
    ...getEntries("templates").slice(0, 2),
  ];
  return (
    <div className="landing">
      <section className="landing-hero">
        <div className="hero-copy">
          <p className="eyebrow">KOOYA UI · BUILT ON ANT DESIGN</p>
          <h1>
            GOOD TOOLS.
            <br />
            <span>GREAT FEEL.</span>
          </h1>
          <p className="hero-description">
            Thoughtful components. A distinct point of view. Everything you need
            to build interfaces that feel like Kooya.
          </p>
          <div className="hero-actions">
            <Button type="primary" size="large" href="#/components">
              Explore components <span aria-hidden="true">↗</span>
            </Button>
            <Button size="large" href="#/templates">
              Browse templates
            </Button>
          </div>
          <p className="hero-footnote">
            React · TypeScript · Ant Design · Open source
          </p>
        </div>
        <div className="hero-demo">
          <div className="demo-topline">
            <span>MAKE IT YOURS</span>
            <Tag>Live playground</Tag>
          </div>
          <h2>
            A small idea.
            <br />A good place to start.
          </h2>
          <label htmlFor="hero-project">Project name</label>
          <Input
            id="hero-project"
            size="large"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setSaved(false);
            }}
          />
          <div className="demo-control-row">
            <label htmlFor="hero-notifications">
              Keep the team in the loop
            </label>
            <Switch
              id="hero-notifications"
              aria-label="Team notifications"
              defaultChecked
            />
          </div>
          <div className="demo-control-row">
            <span>Working rhythm</span>
            <Select
              aria-label="Working rhythm"
              defaultValue="steady"
              options={[
                { label: "Steady", value: "steady" },
                { label: "Focused", value: "focused" },
                { label: "Exploring", value: "exploring" },
              ]}
            />
          </div>
          <div className="demo-progress">
            <span>Room to grow</span>
            <Slider
              ariaLabelForHandle="Room to grow"
              tooltip={{ placement: "bottom" }}
              value={progress}
              onChange={setProgress}
            />
            <Progress percent={progress} showInfo={false} />
          </div>
          <Button
            type="primary"
            size="large"
            block
            disabled={!name.trim()}
            onClick={() => setSaved(true)}
          >
            {saved ? "Project created ✓" : "Create a local project"}
          </Button>
          <p className="demo-status" role="status">
            {saved
              ? `“${name}” is ready in this demo.`
              : "Try the controls. Make yourself at home."}
          </p>
        </div>
      </section>
      <section className="collection-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FROM THE SMALL PARTS TO THE WHOLE PICTURE</p>
            <h2>Your next interface starts here.</h2>
          </div>
          <a href="#/docs">Get started ↗</a>
        </div>
        <div className="collection-entrances">
          {collections.map((item, index) => (
            <a key={item.id} href={`#/${item.id}`}>
              <span className="collection-number">0{index + 1}</span>
              <h3>
                {item.title} <span aria-hidden="true">↗</span>
              </h3>
              <p>{item.description}</p>
              <span className="collection-count">
                {getEntries(item.id).length} categories ·{" "}
                {countVariants(item.id)} examples
              </span>
            </a>
          ))}
        </div>
      </section>
      {featured.length > 0 && (
        <section className="featured-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">PUT THE PIECES TOGETHER</p>
              <h2>A head start, with room to make it yours.</h2>
            </div>
            <a href="#/blocks">All blocks ↗</a>
          </div>
          <div className="featured-grid">
            {featured.map((entry) => (
              <CategoryCard
                key={`${entry.kind}-${entry.id}`}
                entry={entry}
                appearance={appearance}
              />
            ))}
          </div>
        </section>
      )}
      <section className="theme-section">
        <div>
          <p className="eyebrow">SAME KOOYA. DIFFERENT LIGHT.</p>
          <h2>
            Compact by default.
            <br />
            Flexible by design.
          </h2>
          <p>
            Paper and ink for a clear day. Charcoal for a quieter evening. The
            same controls, with your preferred rhythm.
          </p>
          <div className="theme-switches">
            <Segmented
              aria-label="Landing color mode"
              value={appearance.mode}
              options={[
                { label: "Light", value: "light" },
                { label: "Dark", value: "dark" },
              ]}
              onChange={(value) =>
                onAppearance({
                  ...appearance,
                  mode: value as Appearance["mode"],
                  preferredMode: value as Appearance["mode"],
                })
              }
            />
            <Segmented
              aria-label="Landing density"
              value={appearance.density}
              options={[
                { label: "Comfortable", value: "comfortable" },
                { label: "Compact", value: "compact" },
              ]}
              onChange={(value) =>
                onAppearance({
                  ...appearance,
                  density: value as Appearance["density"],
                })
              }
            />
          </div>
        </div>
        <div className="theme-sample">
          <Tag color="success">A shared foundation</Tag>
          <h3>
            Less adjustment.
            <br />
            More making.
          </h3>
          <Checkbox defaultChecked>Clear, useful defaults</Checkbox>
          <Checkbox defaultChecked>Familiar Ant Design APIs</Checkbox>
          <Checkbox defaultChecked>One consistent theme</Checkbox>
        </div>
      </section>
      <section className="installation-section">
        <div>
          <p className="eyebrow">GET INTO YOUR FLOW</p>
          <h2>Start with one component.</h2>
          <p>Install the package, add the provider, and build from there.</p>
          <Button size="large" href="#/docs">
            Read the documentation ↗
          </Button>
        </div>
        <pre>
          <code>{installSnippet}</code>
        </pre>
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
        <code>density="comfortable"</code> or <code>density="compact"</code> on
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
