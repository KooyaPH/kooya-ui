import {
  ExperienceProvider,
  ExperienceTransferStatus,
} from "./examples/experience";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Bell,
  Blocks,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronsUpDown,
  FileText,
  Focus,
  Layers3,
  LayoutDashboard,
  LayoutTemplate,
  MoreHorizontal,
  Search,
  Settings2,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import {
  Avatar,
  BentoShell,
  Button,
  Chip,
  Dialog,
  IconButton,
  KooyaProvider,
  useDeviceMode,
  isEditableTarget,
  Menu,
  Tabs,
  TextField,
  SelectField,
  type ColorMode,
  WorkspaceHeader,
  WorkspaceSidebar,
  themes,
  type Composition,
  type Density,
  type NavigationGroup,
  type ThemeName,
} from "@kooyaph/ui";
import { LibraryHeader, LibraryPages, useLibraryRoute } from "./LibrarySite";
import { Catalog } from "./Catalog";
import { CrmPage, PagesPage, SettingsPage, UsagePage } from "./ProductPages";
import {
  compositions,
  initialAccounts,
  initialPages,
  initialSettings,
  routes,
  type Route,
} from "./data";

const areaTabs = [
  {
    value: "business",
    label: "Business",
    icon: <BriefcaseBusiness size={16} />,
  },
  { value: "console", label: "Console", icon: <LayoutDashboard size={16} /> },
  { value: "client", label: "Client", icon: <UserRound size={16} /> },
  { value: "library", label: "Library", icon: <BookOpen size={16} /> },
];
function KooyaMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="currentColor">
      <rect x="2" y="3" width="9" height="26" rx="3" />
      <rect x="16" y="3" width="12" height="12" rx="3" />
      <rect x="16" y="18" width="12" height="11" rx="3" opacity=".5" />
    </svg>
  );
}
function AppContent() {
  const libraryRoute = useLibraryRoute();
  const exampleRoute = libraryRoute.startsWith("examples/")
    ? libraryRoute.split("/")[1]
    : undefined;
  const showExample =
    !!exampleRoute &&
    ["crm", "pages", "settings", "usage"].includes(exampleRoute);
  const [theme, setTheme] = useState<ThemeName>("mosaic");
  const [composition, setComposition] = useState<Composition>("mosaic");
  const [density, setDensity] = useState<Density>("comfortable");
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const [mode, setMode] = useState<ColorMode>("light");
  const [font, setFont] = useState("theme");
  const [accent, setAccent] = useState("");
  const [page, setPage] = useState<Route>("crm");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [taskDone, setTaskDone] = useState(false);
  const [notice, setNotice] = useState("");
  const [accounts, setAccounts] = useState(initialAccounts);
  const [pages, setPages] = useState(initialPages);
  const [settings, setSettings] = useState(initialSettings);
  const workspaceName = settings.name;
  const device = useDeviceMode();
  const isMobile = device !== "desktop";
  const current = routes[page];
  useEffect(() => {
    if (showExample) setPage(exampleRoute as Route);
  }, [exampleRoute, showExample]);
  useEffect(
    () => setCollapsed(composition === "orbit" || composition === "flow"),
    [composition],
  );
  useEffect(() => {
    document.title =
      (showExample
        ? current.title
        : libraryRoute === "overview"
          ? "Overview"
          : libraryRoute.split("/").filter(Boolean).join(" / ")) +
      " · Kooya UI";
    window.scrollTo(0, 0);
  }, [page, current.title, libraryRoute, showExample]);
  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(""), 4500);
    return () => window.clearTimeout(timeout);
  }, [notice]);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (
        !isEditableTarget(event.target) &&
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k" &&
        !document.querySelector('[role="dialog"]')
      ) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  const navigate = (route: Route, nextComposition?: Composition) => {
    if (["crm", "pages", "settings", "usage"].includes(route))
      window.location.hash = "/examples/" + route;
    else if (route === "templates" || route === "library-templates")
      window.location.hash = "/templates";
    else window.location.hash = "/components";
    setPage(route);
    if (nextComposition) setComposition(nextComposition);
    setMobileOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
  };
  const reset = () => {
    setAccounts(initialAccounts);
    setPages(initialPages);
    setSettings(initialSettings);
    setTaskDone(false);
    setNotice("Dummy data reset.");
  };
  const groups: NavigationGroup[] = [
    {
      label: "Business",
      items: [
        {
          id: "pages",
          label: "Pages",
          description: "Content studio",
          icon: <FileText />,
          wide: true,
          count: pages.length,
        },
      ],
    },
    {
      label: "Console",
      items: [
        {
          id: "crm",
          label: "CRM & accounts",
          description: "Your relationships",
          icon: <UsersRound />,
          wide: true,
          count: accounts.length,
        },
        {
          id: "settings",
          label: "Settings",
          description: "Make it yours",
          icon: <Settings2 />,
          wide: true,
        },
      ],
    },
    {
      label: "Client space",
      items: [
        {
          id: "usage",
          label: "Usage dashboard",
          description: "A little perspective",
          icon: <LayoutDashboard />,
          wide: true,
        },
      ],
    },
  ];
  const brand = (
    <>
      {theme === "signature" ? (
        <img
          className="signature-wordmark"
          src="/brand/kooya-wordmark.png"
          alt="Kooya"
        />
      ) : (
        <KooyaMark />
      )}
      <span>
        <strong>Kooya Workspace</strong>
        <small>Powered by Kooya UI</small>
      </span>
    </>
  );
  const focusPod = (
    <>
      <p className="ku-eyebrow">TODAY’S LITTLE WIN</p>
      <strong className="focus-title">
        {taskDone ? "One more thing, done." : "Small steps. Good progress."}
      </strong>
      <button
        type="button"
        className="focus-task"
        aria-pressed={taskDone}
        onClick={() => setTaskDone(!taskDone)}
      >
        <span>{taskDone && <Check size={12} />}</span>Review the workspace brief
      </button>
      <div className="focus-progress">
        <i style={{ width: taskDone ? "80%" : "60%" }} />
      </div>
      <small>{taskDone ? "4" : "3"} of 5 sample tasks complete</small>
    </>
  );
  const sidebar = (compact: boolean, expanded = false) => (
    <WorkspaceSidebar
      brand={brand}
      name={workspaceName || "Workspace"}
      workspaceSubtitle="Demo workspace"
      navTitle="Your spaces"
      profileName="Alex Stone"
      profileSubtitle="Workspace owner"
      groups={groups}
      selected={page}
      onSelect={(id) => navigate(id as Route)}
      collapsed={compact}
      presentation={expanded ? "expanded" : "auto"}
      focusSlot={focusPod}
      workspaceActions={
        <Menu
          label="Switch workspace"
          align="start"
          trigger={
            <IconButton label="Switch workspace">
              <ChevronsUpDown />
            </IconButton>
          }
          items={[
            { label: "Business workspace", onSelect: () => navigate("pages") },
            { label: "Console workspace", onSelect: () => navigate("crm") },
            { label: "Client workspace", onSelect: () => navigate("usage") },
          ]}
        />
      }
    />
  );
  return (
    <KooyaProvider
      theme={theme}
      density={density}
      composition={composition}
      mode={mode}
      branding={accent ? { accent } : undefined}
      fontFamily={
        font === "system"
          ? "system-ui, sans-serif"
          : font === "dm"
            ? '"DM Sans Variable", sans-serif'
            : font === "inter"
              ? '"Inter Variable", sans-serif'
              : theme === "signature"
                ? '"DM Sans Variable", "DM Sans", system-ui, sans-serif'
                : undefined
      }
      className="playground"
    >
      <a
        className="skip-link"
        href={showExample ? "#kooya-main" : "#library-main"}
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById(
            showExample ? "kooya-main" : "library-main",
          );
          main?.setAttribute("tabindex", "-1");
          main?.focus();
        }}
      >
        Skip to content
      </a>
      <LibraryHeader
        route={libraryRoute}
        onAppearance={() => setAppearanceOpen(true)}
      />
      <ExperienceTransferStatus />
      {showExample ? (
        <BentoShell
          sidebar={mobileOpen ? null : sidebar(collapsed)}
          collapsed={collapsed}
          composition={composition}
          focus={focus}
          header={
            <WorkspaceHeader
              name={workspaceName || "Workspace"}
              area={areaTabs.find((tab) => tab.value === current.area)!.label}
              title={current.title}
              collapsed={collapsed}
              navigationLabel={isMobile ? "Open navigation" : undefined}
              onNavigation={() => {
                if (device !== "desktop") setMobileOpen(true);
                else setCollapsed(!collapsed);
              }}
              searchShortcut={
                navigator.platform.includes("Mac") ? "⌘ K" : "Ctrl K"
              }
              onSearch={() => setSearchOpen(true)}
              focus={focus}
              onFocus={() => setFocus(!focus)}
              notifications={
                <Menu
                  label="Notifications"
                  trigger={
                    <IconButton label="Notifications">
                      <Bell />
                    </IconButton>
                  }
                  items={[
                    {
                      label: "Website brief approved",
                      onSelect: () =>
                        setNotice("Sample website brief approved today."),
                    },
                    {
                      label: "Customer story ready",
                      onSelect: () =>
                        setNotice("Sample customer story is ready for review."),
                    },
                  ]}
                />
              }
              account={
                <Menu
                  label="Workspace actions for AS"
                  trigger={
                    <IconButton label="Workspace actions for AS">
                      <Avatar name="Alex Stone" />
                    </IconButton>
                  }
                  items={[
                    {
                      label: focus ? "Exit focus mode" : "Enter focus mode",
                      icon: <Focus />,
                      onSelect: () => setFocus(!focus),
                    },
                    {
                      label: "Workspace settings",
                      icon: <Settings2 />,
                      onSelect: () => navigate("settings"),
                    },
                    {
                      label: "Component library",
                      icon: <Blocks />,
                      onSelect: () => navigate("foundations"),
                    },
                    {
                      label: "Preview appearance",
                      onSelect: () => setAppearanceOpen(true),
                    },
                    { label: "Reset dummy data", onSelect: reset },
                  ]}
                />
              }
            />
          }
        >
          <div className="page-view" key={page}>
            {page === "crm" ? (
              <CrmPage
                accounts={accounts}
                onChange={setAccounts}
                composition={composition}
                onNotice={setNotice}
              />
            ) : page === "pages" ? (
              <PagesPage
                pages={pages}
                onChange={setPages}
                composition={composition}
                onNotice={setNotice}
                onTemplates={() => navigate("templates")}
              />
            ) : page === "settings" ? (
              <SettingsPage
                settings={settings}
                onChange={setSettings}
                onNotice={setNotice}
              />
            ) : page === "usage" ? (
              <UsagePage />
            ) : (
              <Catalog
                category={page === "library-templates" ? "templates" : page}
                theme={theme}
                accounts={accounts}
                onNotice={setNotice}
                onNavigate={navigate}
              />
            )}
          </div>
          <footer className="workspace-footer">
            <span>Kooya UI · Owned components. Shared rhythm.</span>
            <span>Just ideas. All dummy data.</span>
          </footer>
        </BentoShell>
      ) : (
        <LibraryPages route={libraryRoute} onNavigate={navigate} />
      )}
      <Dialog
        title="Preview appearance"
        description="Local preview controls for provider mode, bundled fonts and branding."
        open={appearanceOpen}
        onOpenChange={setAppearanceOpen}
      >
        <div className="form-stack">
          <SelectField
            label="Theme"
            value={theme}
            onValueChange={(v) => setTheme(v as ThemeName)}
            options={Object.entries(themes).map(([value, item]) => ({
              value,
              label: item.name,
            }))}
          />
          <SelectField
            label="Composition"
            value={composition}
            onValueChange={(v) => setComposition(v as Composition)}
            options={compositions.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
          <SelectField
            label="Density"
            value={density}
            onValueChange={(v) => setDensity(v as Density)}
            options={[
              { value: "comfortable", label: "Comfortable" },
              { value: "compact", label: "Compact" },
            ]}
          />
          <SelectField
            label="Color mode"
            value={mode}
            onValueChange={(v) => setMode(v as ColorMode)}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
          />
          <SelectField
            label="Interface font"
            value={font}
            onValueChange={setFont}
            options={[
              { value: "theme", label: "Theme default" },
              { value: "inter", label: "Inter (locally bundled)" },
              { value: "dm", label: "DM Sans (locally bundled)" },
              { value: "system", label: "System font" },
            ]}
          />
          <TextField
            label="Brand accent"
            type="color"
            value={accent || themes[theme].accent}
            onChange={(e) => setAccent(e.target.value)}
          />
          <Button
            onClick={() => {
              setAccent("");
              setFont("theme");
              setMode("light");
            }}
          >
            Reset appearance overrides
          </Button>
          <p className="sample-caption">
            Changes also reach menus, dialogs and notifications. Product font
            assets remain application owned.
          </p>
        </div>
      </Dialog>
      <Dialog
        kind="navigation"
        title="Navigation"
        description="Choose a sample page or component category."
        open={mobileOpen}
        onOpenChange={setMobileOpen}
      >
        {sidebar(false, true)}
      </Dialog>
      <Dialog
        title="Find a page"
        description="Jump to a product template or component category."
        open={searchOpen}
        onOpenChange={setSearchOpen}
      >
        <div className="form-stack">
          <TextField
            label="Search workspace pages"
            type="search"
            icon={<Search />}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search pages and components…"
          />
          <div className="search-results">
            {Object.entries(routes)
              .filter(([, route]) =>
                route.title.toLowerCase().includes(searchQuery.toLowerCase()),
              )
              .map(([id, route]) => (
                <Button
                  key={id}
                  variant="ghost"
                  trailingIcon={<ArrowUpRight />}
                  onClick={() => navigate(id as Route)}
                >
                  {route.title}
                </Button>
              ))}
          </div>
        </div>
      </Dialog>
      {notice && (
        <div className="sample-toast" role="status">
          <Check size={18} />
          <span>{notice}</span>
          <IconButton
            label="Dismiss notification"
            onClick={() => setNotice("")}
          >
            <X />
          </IconButton>
        </div>
      )}
    </KooyaProvider>
  );
}

export default function App() {
  return (
    <ExperienceProvider>
      <AppContent />
    </ExperienceProvider>
  );
}
