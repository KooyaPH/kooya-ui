import { useState } from "react";
import { Avatar, Button, Drawer, Select, Tooltip, App } from "antd";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  ArrowUpRight,
  Plus,
  FileText,
  LayoutDashboard,
  Users,
  Settings,
  CheckSquare,
  Blocks,
  Command,
  ChevronRight,
} from "lucide-react";
import { scenes, layouts, type Selection, type SceneId } from "./model";
import { useDemo } from "./state";
import { Scene, Status } from "./Scenes";
const icons = {
  dashboard: LayoutDashboard,
  cms: FileText,
  work: CheckSquare,
  people: Users,
  settings: Settings,
  components: Blocks,
};
export function Shell({
  selection,
  onScene,
  previewState = "ready",
  onReady,
}: {
  selection: Selection;
  onScene: (scene: SceneId) => void;
  previewState?: string;
  onReady?: () => void;
}) {
  const data = useDemo();
  const { message } = App.useApp();
  const [mobile, setMobile] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [search, setSearch] = useState(false);
  const [record, setRecord] = useState(data.content[0].key);
  const [searchQuery, setSearchQuery] = useState("");
  const current = data.content.find((x) => x.key === record) ?? data.content[0];
  const layout = layouts.find((x) => x.id === selection.layout)!;
  const navigate = (scene: SceneId) => {
    onScene(scene);
    setMobile(false);
  };
  const nav = (
    <>
      <div className="poc-workspace-picker">
        <span className="poc-workspace-avatar">N</span>
        <div>
          <strong>{data.settings.name}</strong>
          <small>Team workspace</small>
        </div>
        <ChevronDown size={14} />
      </div>
      <div className="poc-nav-caption">WORKSPACE</div>
      <nav aria-label="Workspace navigation">
        {scenes.map((scene) => {
          const Icon = icons[scene.id];
          return (
            <button
              key={scene.id}
              title={scene.name}
              aria-current={selection.scene === scene.id ? "page" : undefined}
              onClick={() => navigate(scene.id)}
            >
              <Icon size={17} />
              <span>{scene.name}</span>
              {scene.id === "work" && (
                <small>
                  {data.tasks.filter((x) => x.status !== "Done").length}
                </small>
              )}
            </button>
          );
        })}
      </nav>
      <div className="poc-nav-bottom">
        <div className="poc-workspace-note">
          <span className="poc-online-dot" />
          Everything is up to date
        </div>
        <button onClick={() => navigate("people")}>
          <Avatar size={28}>AM</Avatar>
          <span>
            <strong>Alex Morgan</strong>
            <small>Workspace administrator</small>
          </span>
          <ChevronDown size={13} />
        </button>
      </div>
    </>
  );
  const contextual = [
    "atlas",
    "ledger",
    "editorial",
    "relay",
    "directory",
    "governance",
  ].includes(selection.layout);
  const contextTitle =
    selection.layout === "atlas"
      ? "Your projects"
      : selection.layout === "ledger"
        ? "Refine your view"
        : selection.layout === "editorial"
          ? "Content structure"
          : selection.layout === "governance"
            ? "Administration"
            : "Browse records";
  return (
    <div
      className={"poc-workspace recipe-" + selection.layout}
      data-layout={selection.layout}
    >
      <header className="poc-app-header">
        <div className="poc-app-header-left">
          <Button
            className="poc-mobile-menu"
            aria-label="Open workspace navigation"
            type="text"
            icon={<Menu size={19} />}
            onClick={() => setMobile(true)}
          />
          <div className="poc-app-brand">
            <img src="/brand/kooya-wordmark.png" alt="Kooya" />
          </div>
          <span className="poc-header-divider" />
          <span className="poc-header-context">
            Workspace <ChevronRight size={13} />{" "}
            <strong>
              {scenes.find((x) => x.id === selection.scene)?.name}
            </strong>
          </span>
        </div>
        <div className="poc-app-header-actions">
          <Tooltip title="Search workspace">
            <Button
              type="text"
              aria-label="Search workspace"
              icon={<Search size={17} />}
              onClick={() => setSearch(true)}
            />
          </Tooltip>
          <Tooltip title="Notifications">
            <Button
              type="text"
              aria-label="Workspace notifications"
              icon={<Bell size={17} />}
              onClick={() => setNotifications(true)}
            />
          </Tooltip>
          <Button
            type="text"
            aria-label="Open your profile"
            onClick={() => navigate("people")}
          >
            <Avatar size={27}>AM</Avatar>
          </Button>
        </div>
      </header>
      {selection.layout === "atlas" && (
        <aside className="poc-app-rail" aria-label="Applications">
          <span className="poc-rail-mark">∞</span>
          {scenes.slice(0, 4).map((scene) => {
            const Icon = icons[scene.id];
            return (
              <Tooltip key={scene.id} title={scene.name}>
                <button
                  aria-label={`Open ${scene.name}`}
                  onClick={() => navigate(scene.id)}
                >
                  <Icon size={19} />
                </button>
              </Tooltip>
            );
          })}
        </aside>
      )}
      <aside className="poc-app-nav">{nav}</aside>
      {contextual && (
        <aside className="poc-context-panel">
          <div className="poc-context-heading">
            <strong>{contextTitle}</strong>
            <Button
              size="small"
              type="text"
              aria-label="Create content from sidebar"
              icon={<Plus size={15} />}
              onClick={() => {
                navigate("cms");
                message.info("Choose Create page to add content");
              }}
            />
          </div>
          {selection.layout === "ledger" ? (
            <>
              <label className="poc-sidebar-label">Publishing status</label>
              <Select
                aria-label="Filter sidebar records"
                value={data.contentFilter}
                options={["All content", "Published", "Draft", "In review"].map(
                  (value) => ({ value, label: value }),
                )}
                onChange={(value) => {
                  data.setContentFilter(value);
                  const first = data.content.find(
                    (x) => value === "All content" || x.status === value,
                  );
                  if (first) setRecord(first.key);
                  message.info(
                    value === "All content"
                      ? "Showing all record types"
                      : `Inspector showing ${value.toLowerCase()} content`,
                  );
                }}
              />
              <label className="poc-sidebar-label">CONTENT TYPES</label>
              {[
                "All pages",
                "Articles & stories",
                "Company pages",
                "Guides & resources",
              ].map((text, i) => (
                <button
                  className="poc-context-item"
                  key={text}
                  onClick={() => {
                    setRecord(data.content[i].key);
                    navigate("cms");
                  }}
                >
                  <FileText size={15} />
                  <span>{text}</span>
                </button>
              ))}
            </>
          ) : selection.layout === "governance" ? (
            <>
              {scenes.map((scene) => (
                <button
                  key={scene.id}
                  className={
                    "poc-context-item " +
                    (selection.scene === scene.id ? "active" : "")
                  }
                  onClick={() => navigate(scene.id)}
                >
                  <span>
                    {scene.name === "Settings"
                      ? "Workspace preferences"
                      : scene.name}
                  </span>
                  <ChevronRight size={13} />
                </button>
              ))}
              <div className="poc-context-tip">
                <strong>A considered workspace</strong>
                <p>
                  People, permissions, and publishing. Clear responsibilities at
                  every step.
                </p>
              </div>
            </>
          ) : (
            <>
              {data.content.map((row) => (
                <button
                  key={row.key}
                  className={
                    "poc-context-item " +
                    (current?.key === row.key ? "active" : "")
                  }
                  onClick={() => setRecord(row.key)}
                >
                  <FileText size={15} />
                  <span>
                    {row.title}
                    {["relay", "directory"].includes(selection.layout) && (
                      <small>
                        {row.owner} · {row.status}
                      </small>
                    )}
                  </span>
                </button>
              ))}
              <div className="poc-context-tip">
                <span className="poc-eyebrow">SELECTED RECORD</span>
                <strong>{current?.title}</strong>
                <p>{current?.body}</p>
                <Status value={current?.status ?? "Draft"} />
              </div>
            </>
          )}
        </aside>
      )}
      <main
        className="poc-work-area"
        id="poc-work-area"
        data-scene={selection.scene}
      >
        {["horizon", "observatory"].includes(selection.layout) && (
          <nav className="poc-horizontal-nav" aria-label="Workspace sections">
            {scenes.map((scene) => (
              <button
                key={scene.id}
                aria-current={selection.scene === scene.id ? "page" : undefined}
                onClick={() => navigate(scene.id)}
              >
                {scene.name}
              </button>
            ))}
          </nav>
        )}
        {selection.layout === "delivery" && (
          <div className="poc-project-strip">
            <div>
              <span className="poc-project-symbol">N</span>
              <strong>Northstar / Autumn launch</strong>
              <Tagline />
            </div>
            <span className="poc-muted">Oct 1 – Oct 31</span>
          </div>
        )}
        {["relay", "directory", "editorial"].includes(selection.layout) && (
          <div className="poc-record-strip">
            <span>
              <FileText size={15} />
              {current?.title}
            </span>
            <Status value={current?.status ?? "Draft"} />
          </div>
        )}
        {previewState === "loading" ? (
          <div className="poc-preview-placeholder" aria-label="Loading sample">
            <div className="poc-skeleton-line" />
            <div className="poc-skeleton-block" />
            <div className="poc-skeleton-block" />
          </div>
        ) : previewState === "empty" ? (
          <div className="poc-empty-state">
            <FileText size={42} />
            <h1>A fresh start.</h1>
            <p>Your workspace content will appear here.</p>
            <Button type="primary" onClick={() => onReady?.()}>
              Explore this sample
            </Button>
          </div>
        ) : previewState === "error" ? (
          <div className="poc-empty-state">
            <h1>Let’s try that again.</h1>
            <p>We couldn’t load this sample. Your changes are still here.</p>
            <Button onClick={() => onReady?.()}>Try again</Button>
          </div>
        ) : (
          <Scene scene={selection.scene} layout={selection.layout} />
        )}
        <footer className="poc-app-footer">
          <span>
            {layout.name} <span>·</span> Kooya UI
          </span>
          <span>Fictional workspace · Session-only changes</span>
        </footer>
      </main>
      {["editorial", "observatory"].includes(selection.layout) && (
        <aside className="poc-inspector">
          <div className="poc-eyebrow">
            {selection.layout === "editorial" ? "PUBLISHING" : "AT A GLANCE"}
          </div>
          <h3>
            {selection.layout === "editorial"
              ? "Page details"
              : "Workspace pulse"}
          </h3>
          <p>{current?.title}</p>
          <label className="poc-sidebar-label">Publishing status</label>
          <Select
            aria-label="Inspector publishing status"
            value={current?.status}
            onChange={(status) =>
              data.setContent((old) =>
                old.map((x) => (x.key === current?.key ? { ...x, status } : x)),
              )
            }
            options={["Draft", "In review", "Published"].map((value) => ({
              value,
              label: value,
            }))}
          />
          <dl className="poc-details">
            <dt>Owner</dt>
            <dd>{current?.owner}</dd>
            <dt>Last updated</dt>
            <dd>{current?.updated}</dd>
            <dt>Workspace</dt>
            <dd>{data.settings.name}</dd>
          </dl>
          <div className="poc-context-tip">
            <span className="poc-online-dot" />A little clarity goes a long way.
          </div>
        </aside>
      )}
      <Drawer
        title="Workspace navigation"
        open={mobile}
        onClose={() => setMobile(false)}
        placement="left"
        size={280}
      >
        {nav}
      </Drawer>
      <Drawer
        title="Notifications"
        open={notifications}
        onClose={() => setNotifications(false)}
      >
        <h3>You’re all caught up.</h3>
        <p className="poc-muted">
          A clear day ahead. Recent updates appear below.
        </p>
        {data.content.slice(0, 3).map((x) => (
          <div className="poc-timeline-item" key={x.key}>
            <Status value={x.status} />
            <h3>{x.title}</h3>
            <p>
              {x.owner} · {x.updated}
            </p>
          </div>
        ))}
      </Drawer>
      <Drawer
        title="Search your workspace"
        open={search}
        onClose={() => setSearch(false)}
      >
        <input
          className="poc-native-search"
          aria-label="Workspace search query"
          placeholder="Find a page or a person…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {data.content
          .filter((x) =>
            x.title.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((x) => (
            <button
              key={x.key}
              className="poc-search-result"
              onClick={() => {
                setRecord(x.key);
                navigate("cms");
                setSearch(false);
              }}
            >
              <FileText size={16} />
              {x.title}
              <ArrowUpRight size={15} />
            </button>
          ))}
        {data.people
          .filter((x) =>
            x.name.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((x) => (
            <button
              key={x.key}
              className="poc-search-result"
              onClick={() => {
                navigate("people");
                setSearch(false);
              }}
            >
              <Users size={16} />
              {x.name}
              <ArrowUpRight size={15} />
            </button>
          ))}
      </Drawer>
    </div>
  );
}
function Tagline() {
  return <span className="poc-project-badge">TEAM PROJECT</span>;
}
