import { useState } from "react";
import {
  Button,
  Card,
  Chip,
  PageHeading,
  SelectField,
  TextField,
  type TemplateState,
} from "@kooyaph/ui";
import { DashboardExample, AnalyticsExample } from "./examples/dashboard";
import {
  CollectionExample,
  DetailExample,
  AuditExample,
} from "./examples/collections";
import { FormExample, WizardExample, SettingsExample } from "./examples/forms";
import {
  BoardExample,
  InboxExample,
  FeedExample,
} from "./examples/collaboration";
import { ContentExample, MediaExample } from "./examples/content";
import {
  ProfileExample,
  BusinessExample,
  PortalExample,
} from "./examples/identity";
import { ToolExample } from "./examples/focused-tool";
import { templates, type Route } from "./data";
const families = [
  ["dashboard", "Dashboard", "Console"],
  ["collection", "Table & list collections", "Console"],
  ["detail", "Record details", "Console"],
  ["form", "Forms", "Console"],
  ["wizard", "Wizards", "Console"],
  ["settings", "Settings & branding", "Console"],
  ["board", "Boards", "Business"],
  ["inbox", "Inbox & chat", "Business"],
  ["feed", "Feeds", "Business"],
  ["content", "CMS & content editing", "Business"],
  ["media", "Media galleries", "Business"],
  ["analytics", "Analytics & usage", "Client"],
  ["audit", "Audit history", "Console"],
  ["profile", "Profiles", "Business"],
  ["business", "Public business pages", "Business"],
  ["portal", "Client portals", "Client"],
  ["tool", "Meetings / games / maps framing", "Business"],
] as const;
const examples = {
  dashboard: DashboardExample,
  collection: CollectionExample,
  detail: DetailExample,
  form: FormExample,
  wizard: WizardExample,
  settings: SettingsExample,
  board: BoardExample,
  inbox: InboxExample,
  feed: FeedExample,
  content: ContentExample,
  media: MediaExample,
  analytics: AnalyticsExample,
  audit: AuditExample,
  profile: ProfileExample,
  business: BusinessExample,
  portal: PortalExample,
  tool: ToolExample,
};
export function TemplateCatalog({
  onNavigate,
  selectedFamily,
}: {
  selectedFamily?: string;
  onNavigate: (
    route: Route,
    composition?: (typeof templates)[number]["composition"],
  ) => void;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const family = families.find(([id]) => id === selectedFamily)?.[0];
  const [status, setStatus] = useState("ready");
  const Example = family ? examples[family] : undefined;
  const state: TemplateState =
    status === "loading"
      ? { status: "loading" }
      : status === "error"
        ? {
            status: "error",
            message: "This fictional view could not load. Try the local retry.",
            onRetry: () => setStatus("ready"),
          }
        : { status: "ready" };
  return (
    <div className="ku-template-stack">
      <header className="document-heading">
        <p className="ku-eyebrow">PRESENTATIONAL FAMILIES</p>
        <h1 data-route-heading tabIndex={-1}>
          {family
            ? families.find((f) => f[0] === family)?.[1]
            : "Template library"}
        </h1>
        <p>
          {family
            ? "A live, local example. Change the state below and try the workflow."
            : "17 typed templates for Business, Console and Client. Choose a family to explore its working example."}
        </p>
      </header>
      {family && Example ? (
        <>
          <a className="library-link" href="#/templates">
            ← All templates
          </a>
          <div className="template-catalog-controls template-inspector">
            <SelectField
              label="Template family"
              value={family}
              onValueChange={(value) => {
                window.location.hash = "/templates/" + value;
                setStatus("ready");
              }}
              options={families.map(([value, label, area]) => ({
                value,
                label: area + " · " + label,
              }))}
            />
            <SelectField
              label="Example state"
              value={status}
              onValueChange={setStatus}
              options={[
                { value: "ready", label: "Ready" },
                { value: "loading", label: "Loading" },
                { value: "error", label: "Error & retry" },
                { value: "empty", label: "Empty collections" },
              ]}
            />
            <Chip>{families.find((f) => f[0] === family)?.[2]}</Chip>
          </div>
          <section
            className="template-preview"
            aria-label="Live template example"
          >
            <Example key={family} state={state} empty={status === "empty"} />
          </section>
        </>
      ) : (
        <>
          {selectedFamily && (
            <p role="status">
              Template not found. Choose a registered template below.
            </p>
          )}
          <div className="template-gallery-filters">
            <TextField
              label="Find a template"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search templates…"
            />
            <SelectField
              label="Template category"
              value={category}
              onValueChange={setCategory}
              options={["All", "Business", "Console", "Client"].map(
                (value) => ({ value, label: value }),
              )}
            />
          </div>
          <div className="template-gallery">
            {families
              .filter(
                ([, label, area]) =>
                  (category === "All" || category === area) &&
                  `${label} ${area}`
                    .toLowerCase()
                    .includes(query.trim().toLowerCase()),
              )
              .map(([id, label, area], index) => (
                <a
                  className="template-gallery-card"
                  key={id}
                  href={`#/templates/${id}`}
                >
                  <div
                    className={`template-diagram template-diagram-${id}`}
                    aria-hidden="true"
                  >
                    <i />
                    <div>
                      {Array.from(
                        {
                          length:
                            id === "board"
                              ? 3
                              : id === "form" || id === "wizard"
                                ? 4
                                : 6,
                        },
                        (_, i) => (
                          <span key={i} />
                        ),
                      )}
                    </div>
                  </div>
                  <p className="ku-eyebrow">{area}</p>
                  <h2>{label}</h2>
                  <span>Open example →</span>
                </a>
              ))}
          </div>
          {!families.some(
            ([, label, area]) =>
              (category === "All" || category === area) &&
              `${label} ${area}`
                .toLowerCase()
                .includes(query.trim().toLowerCase()),
          ) && (
            <p role="status">
              No templates found. Try another name or category.
            </p>
          )}
        </>
      )}
      <Card
        title="Existing complete workflows"
        description="Explore the original CRM, CMS, settings and usage examples in every composition."
      >
        <div className="ku-template-toolbar">
          {templates.map((t) => (
            <Button
              key={t.title}
              onClick={() => onNavigate(t.route, t.composition)}
            >
              {t.title}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
