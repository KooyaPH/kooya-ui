import { lazy, Suspense, useState, type ReactNode } from "react";
import {
  Alert,
  Avatar,
  Button,
  Card,
  Checkbox,
  Descriptions,
  Input,
  Menu,
  Progress,
  Result,
  Segmented,
  Space,
  Tabs,
  Tag,
  Typography,
} from "@kooyaph/ui/components";
import { AuthLayout, MetricGroup, PageFrame } from "@kooyaph/ui/compositions";
import { DemoFrame } from "./shared";
import { CatalogPage } from "../CatalogPages";
import { useKooyaOptions } from "@kooyaph/ui";
import {
  ApplicationDemo,
  FeedDemo,
  InboxDemo,
  ProfileDemo,
  SettingsDemo,
  WorkspaceForm,
} from "./applications";
import { DataWorkbench } from "./data";
import {
  BoardDemo,
  FileManager,
  NotificationsDemo,
  ScheduleDemo,
} from "./workflows";
import { CommerceDemo } from "./commerce";
import { SectionDemo } from "./sections";
const Chart = lazy(() => import("./advanced/charts"));
const Editor = lazy(() => import("./advanced/editor"));
const Assistant = lazy(() => import("./advanced/assistant"));
const Flow = lazy(() => import("./advanced/flow"));
const titles: Record<string, string> = {
  dashboard: "Studio overview",
  collection: "Project collection",
  detail: "Launch brief",
  form: "Create a workspace",
  wizard: "Workspace setup",
  settings: "Settings & branding",
  board: "Project board",
  inbox: "Team inbox",
  feed: "Team updates",
  content: "Content studio",
  media: "Media library",
  analytics: "Usage & insights",
  audit: "Activity history",
  profile: "Team profile",
  business: "Northstar Studio",
  portal: "Your client workspace",
  tool: "Workflow studio",
  landing: "A clearer place to start",
  saas: "Northstar workspace",
  authentication: "Welcome back",
  onboarding: "Make yourself at home",
  storefront: "The studio shop",
  product: "Everyday essentials",
  cart: "Your shopping bag",
  checkout: "Checkout",
  billing: "Billing & invoices",
  scheduling: "Your schedule",
  "file-manager": "Shared files",
  inventory: "Inventory",
  users: "People & access",
  "ai-assistant": "Your work assistant",
  operations: "Operations overview",
  docs: "Developer documentation",
  catalog: "Design collection",
};
export function TemplateDemo({
  family = "dashboard",
  alternate = false,
}: {
  family?: string;
  alternate?: boolean;
}) {
  const appearance = useKooyaOptions();
  const [section, setSection] = useState("Workspace");
  const [notice, setNotice] = useState("");
  const [approved, setApproved] = useState(false);
  const [view, setView] = useState("Components");
  let body: ReactNode;
  switch (family) {
    case "dashboard":
      body = (
        <div className="composition-stack">
          <Alert
            type="info"
            title="Ready for review"
            description="The launch brief is waiting for your approval."
            action={
              <Button onClick={() => setApproved(true)} disabled={approved}>
                {approved ? "Approved" : "Approve brief"}
              </Button>
            }
          />
          <MetricGroup
            metrics={[
              { key: "projects", label: "Active projects", value: 12 },
              {
                key: "review",
                label: "Ready for review",
                value: approved ? 3 : 4,
              },
              {
                key: "capacity",
                label: "Team capacity",
                value: 76,
                suffix: "%",
              },
            ]}
          />
          <DataWorkbench embedded alternate={alternate} />
        </div>
      );
      break;
    case "collection":
    case "audit":
    case "billing":
    case "inventory":
    case "users":
    case "operations":
      body = (
        <DataWorkbench
          embedded
          domain={
            family === "collection"
              ? "projects"
              : family === "operations"
                ? "devops"
                : family
          }
          alternate={alternate}
        />
      );
      break;
    case "detail":
      body = (
        <div className="composition-split">
          <Card title="A clearer launch">
            <p>
              Create a consistent story across the brand, website, and customer
              guide.
            </p>
            <Descriptions
              column={1}
              items={[
                { key: "owner", label: "Owner", children: "Maya Chen" },
                {
                  key: "status",
                  label: "Status",
                  children: (
                    <Tag color={approved ? "success" : "processing"}>
                      {approved ? "Approved" : "In review"}
                    </Tag>
                  ),
                },
                { key: "due", label: "Due date", children: "18 October 2026" },
              ]}
            />
            <Button
              type="primary"
              disabled={approved}
              onClick={() => setApproved(true)}
            >
              {approved ? "Brief approved" : "Approve brief"}
            </Button>
          </Card>
          <div className="composition-stack">
            <Card title="Checklist">
              <Checkbox defaultChecked>Research complete</Checkbox>
              <br />
              <Checkbox defaultChecked>Design reviewed</Checkbox>
              <br />
              <Checkbox>Final handoff</Checkbox>
            </Card>
            <FileManager />
          </div>
        </div>
      );
      break;
    case "form":
    case "wizard":
    case "authentication":
    case "onboarding":
      body = <WorkspaceForm family={family} alternate={alternate} />;
      break;
    case "settings":
      body = <SettingsDemo alternate={alternate} />;
      break;
    case "board":
      body = <BoardDemo alternate={alternate} />;
      break;
    case "inbox":
      body = <InboxDemo alternate={alternate} />;
      break;
    case "feed":
      body = <FeedDemo />;
      break;
    case "content":
      body = <Editor alternate={alternate} />;
      break;
    case "media":
    case "file-manager":
      body = <FileManager alternate={family === "media" || alternate} />;
      break;
    case "analytics":
      body = (
        <div className="composition-stack">
          <MetricGroup
            metrics={[
              { key: "events", label: "Sample events", value: 256 },
              { key: "seats", label: "Active seats", value: 12 },
              { key: "quality", label: "Completion", value: 86, suffix: "%" },
            ]}
          />
          <Chart kind={alternate ? "combined" : "area"} alternate={alternate} />
        </div>
      );
      break;
    case "profile":
      body = <ProfileDemo alternate={alternate} />;
      break;
    case "business":
    case "landing":
    case "saas":
      body = (
        <div className="composition-stack">
          <SectionDemo family="navigation" embedded alternate={alternate} />
          <SectionDemo family="hero" embedded alternate={alternate} />
          <SectionDemo family="features" embedded />
          {family === "saas" ? (
            <SectionDemo family="pricing" embedded />
          ) : (
            <SectionDemo
              family={family === "business" ? "team" : "process"}
              embedded
            />
          )}
          <SectionDemo family="faq" embedded />
          <SectionDemo family="contact" embedded />
          <SectionDemo family="footer" embedded />
        </div>
      );
      break;
    case "portal":
      body = (
        <div className="composition-stack">
          <Card title="Welcome to your project workspace">
            <p>
              Review the launch brief, download shared files and keep the next
              step clear.
            </p>
            <Progress percent={approved ? 100 : 75} />
            <Button
              type="primary"
              onClick={() => setApproved(true)}
              disabled={approved}
            >
              {approved ? "Project approved" : "Approve project handoff"}
            </Button>
          </Card>
          <Tabs
            items={[
              {
                key: "files",
                label: "Files",
                children: <FileManager alternate={alternate} />,
              },
              { key: "activity", label: "Activity", children: <FeedDemo /> },
              {
                key: "invoices",
                label: "Invoices",
                children: <DataWorkbench embedded domain="billing" />,
              },
            ]}
          />
        </div>
      );
      break;
    case "tool":
      body = <Flow alternate={alternate} />;
      break;
    case "storefront":
    case "product":
    case "cart":
    case "checkout":
      body = (
        <CommerceDemo
          embedded
          family={
            family === "storefront"
              ? "product-grid"
              : family === "product"
                ? "product-details"
                : family
          }
          alternate={alternate}
        />
      );
      break;
    case "scheduling":
      body = (
        <ScheduleDemo
          family={alternate ? "schedule" : "event-calendar"}
          alternate={alternate}
        />
      );
      break;
    case "ai-assistant":
      body = <Assistant alternate={alternate} />;
      break;
    case "docs":
      body = (
        <div className="composition-split">
          <div>
            <h2>Start building with Kooya UI</h2>
            <p>
              Install the public package and the Ant peer, add the provider,
              then import the canonical controls.
            </p>
            <pre className="composition-panel">
              <code>pnpm add @kooyaph/ui antd@6.6.5</code>
            </pre>
            <Tabs
              items={[
                {
                  key: "provider",
                  label: "Provider",
                  children: (
                    <pre>
                      <code>{`import { KooyaProvider } from '@kooyaph/ui';\nimport { Button } from '@kooyaph/ui/components';\n\n<KooyaProvider>\n  <Button type="primary">Continue</Button>\n</KooyaProvider>`}</code>
                    </pre>
                  ),
                },
                {
                  key: "themes",
                  label: "Appearance",
                  children: (
                    <p>
                      Use mode="dark" or density="compact" on the same provider.
                      All Ant controls share its tokens.
                    </p>
                  ),
                },
                {
                  key: "compositions",
                  label: "Compositions",
                  children: (
                    <p>
                      Import ActionBar, FieldGroup, MetricGroup, StatusGroup and
                      PageFrame from @kooyaph/ui/compositions.
                    </p>
                  ),
                },
              ]}
            />
          </div>
          <Card title="Try the control">
            <Button
              type="primary"
              onClick={() => setNotice("Your first local action works.")}
            >
              Continue
            </Button>
            <p role="status">{notice}</p>
          </Card>
        </div>
      );
      break;
    case "catalog":
      body = (
        <CatalogPage
          route={{ page: "collection", kind: "components", query: "" }}
          appearance={{ mode: appearance.mode, density: appearance.density }}
        />
      );
      break;
    default:
      body = <NotificationsDemo alternate={alternate} />;
  }
  const marketing = [
    "business",
    "landing",
    "saas",
    "authentication",
    "onboarding",
    "storefront",
    "product",
    "cart",
    "checkout",
  ].includes(family);
  const content = (
    <Suspense fallback={<p role="status">Opening example…</p>}>{body}</Suspense>
  );
  return (
    <DemoFrame
      title={`${family.replace(/-/g, " ")} template`}
      description="A complete local page composition. All actions use fictional in-memory data."
      alternate={alternate}
    >
      {family === "authentication" ? (
        <AuthLayout
          brand={
            <>
              <span className="ku-demo-brand-mark" aria-hidden="true">
                K
              </span>
              <span>KooyaHQ</span>
            </>
          }
          title={alternate ? "Create an account" : "Sign in"}
        >
          {content}
        </AuthLayout>
      ) : marketing ? (
        <PageFrame
          title={titles[family] ?? family}
          description={
            family === "authentication"
              ? "Use fictional values. No sign-in service is connected."
              : undefined
          }
        >
          {content}
        </PageFrame>
      ) : (
        <div
          className={`composition-template-shell ${alternate ? "alternate" : ""}`}
        >
          <aside className="composition-template-nav">
            <div className="composition-template-brand">NORTHSTAR</div>
            <Menu
              mode={alternate ? "horizontal" : "inline"}
              selectedKeys={[section]}
              onClick={({ key }) => setSection(key)}
              items={[
                { key: "Workspace", label: "Workspace" },
                { key: "Activity", label: "Activity" },
                { key: "Preferences", label: "Preferences" },
              ]}
            />
          </aside>
          <div className="composition-template-main">
            <PageFrame
              title={
                section === "Workspace" ? (titles[family] ?? family) : section
              }
              description="Northstar Studio · local workspace"
              actions={
                <Avatar style={{ background: "#314300", color: "#f2eee3" }}>
                  M
                </Avatar>
              }
            >
              {section === "Activity" ? (
                <FeedDemo />
              ) : section === "Preferences" ? (
                <SettingsDemo />
              ) : (
                content
              )}
            </PageFrame>
          </div>
        </div>
      )}
    </DemoFrame>
  );
}
