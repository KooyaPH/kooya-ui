import { useDeviceMode } from "../foundations/device";
import { Dialog } from "./overlays";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Avatar, IconButton } from "../atoms/index";
import { useKooyaOptions, type Composition } from "../foundations/index";
const ExpandedNavigation = createContext(false);
export interface NavigationItem {
  id: string;
  label: string;
  description?: string;
  icon: ReactNode;
  count?: number;
  wide?: boolean;
  href?: string;
}
export interface NavigationGroup {
  label: string;
  items: readonly NavigationItem[];
}
export function BentoShell({
  sidebar,
  header,
  children,
  collapsed = false,
  composition,
  focus = false,
  mainId = "kooya-main",
  navigationOpen,
  onNavigationOpenChange,
  navigationTitle = "Workspace navigation",
}: {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
  collapsed?: boolean;
  composition?: Composition;
  focus?: boolean;
  mainId?: string;
  navigationOpen?: boolean;
  onNavigationOpenChange?: (open: boolean) => void;
  navigationTitle?: string;
}) {
  const options = useKooyaOptions();
  const device = useDeviceMode();
  const shell = useRef<HTMLDivElement>(null);
  const sidebarFocus = useRef<HTMLElement | null>(null);
  useLayoutEffect(() => {
    const focused = sidebarFocus.current;
    if (device !== "mobile" || !focused || navigationOpen) return;
    // CSS can hide the sidebar before the media-query React commit. Remember
    // its focus owner, but never move focus away from an external surface.
    if (
      document.activeElement !== focused &&
      document.activeElement !== document.body
    )
      return;
    sidebarFocus.current = null;
    shell.current
      ?.querySelector<HTMLElement>("[data-ku-navigation-trigger], main")
      ?.focus({ preventScroll: true });
  }, [device, navigationOpen]);
  return (
    <div
      ref={shell}
      className={"ku-shell " + (collapsed ? "ku-shell--collapsed" : "")}
      data-composition={composition ?? options.composition}
      data-focus={focus}
      data-device={device}
    >
      <aside
        className="ku-sidebar"
        aria-label="Workspace sidebar"
        onFocusCapture={(event) => {
          sidebarFocus.current = event.target;
        }}
        onBlurCapture={(event) => {
          // An explicit blur while visible relinquishes ownership; a browser
          // blur caused by display:none still needs a visible destination.
          if (event.relatedTarget || event.target.getClientRects().length > 0)
            sidebarFocus.current = null;
        }}
      >
        {!navigationOpen && sidebar}
      </aside>
      {navigationOpen !== undefined && (
        <Dialog
          kind="navigation"
          title={navigationTitle}
          open={navigationOpen}
          onOpenChange={onNavigationOpenChange}
        >
          {navigationOpen && (
            <ExpandedNavigation.Provider value>
              {sidebar}
            </ExpandedNavigation.Provider>
          )}
        </Dialog>
      )}
      <div className="ku-workspace">
        <div className="ku-header-wrap">{header}</div>
        <main id={mainId} tabIndex={-1} className="ku-main">
          {children}
        </main>
      </div>
    </div>
  );
}
export function WorkspaceSidebar({
  brand,
  name,
  groups,
  selected,
  onSelect,
  collapsed = false,
  focusSlot,
  profileName,
  workspaceSubtitle,
  profileSubtitle,
  navTitle = "Navigation",
  workspaceActions,
  renderLink,
  presentation = "auto",
}: {
  brand: ReactNode;
  name: string;
  groups: readonly NavigationGroup[];
  selected: string;
  onSelect?: (id: string) => void;
  collapsed?: boolean;
  focusSlot?: ReactNode;
  profileName?: string;
  workspaceSubtitle?: string;
  profileSubtitle?: string;
  navTitle?: string;
  workspaceActions?: ReactNode;
  presentation?: "auto" | "expanded";
  renderLink?: (
    item: NavigationItem,
    props: AnchorHTMLAttributes<HTMLAnchorElement>,
  ) => ReactNode;
}) {
  const device = useDeviceMode();
  const expandedSurface = useContext(ExpandedNavigation);
  // A drawer requests full labels via its local navigation surface.
  const automaticRail = device === "tablet" && presentation === "auto";
  const compact =
    !expandedSurface &&
    presentation !== "expanded" &&
    (collapsed || automaticRail);
  const [hidden, setHidden] = useState<string[]>([]);
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    const group = groups.find((group) =>
      group.items.some((item) => item.id === selected),
    );
    if (group)
      setHidden((current) =>
        current.includes(group.label)
          ? current.filter((label) => label !== group.label)
          : current,
      );
  }, [selected]);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const container = nav.current;
      const active = container?.querySelector<HTMLElement>(
        '[aria-current="page"]',
      );
      if (!container || !active) return;
      const bounds = container.getBoundingClientRect();
      const target = active.getBoundingClientRect();
      if (target.bottom > bounds.bottom - 12)
        container.scrollTop += target.bottom - bounds.bottom + 12;
      else if (target.top < bounds.top + 12)
        container.scrollTop -= bounds.top - target.top + 12;
    });
    return () => cancelAnimationFrame(frame);
  }, [selected, compact, hidden]);
  return (
    <div
      className={
        "ku-sidebar-content " + (compact ? "ku-sidebar-content--collapsed" : "")
      }
    >
      <div className="ku-workspace-pod">
        <div className="ku-brand">{brand}</div>
        <div className="ku-workspace-switch">
          <span className="ku-workspace-letter">
            {name.trim().slice(0, 1).toUpperCase() || "W"}
          </span>
          <span className="ku-sidebar-copy">
            <strong>{name}</strong>
            {workspaceSubtitle && <small>{workspaceSubtitle}</small>}
          </span>
          {workspaceActions}
        </div>
      </div>
      <nav ref={nav} className="ku-nav-pod" aria-label="Workspace navigation">
        <div className="ku-nav-heading ku-sidebar-copy">
          <strong>{navTitle}</strong>
          <span>
            {String(
              groups.reduce((sum, group) => sum + group.items.length, 0),
            ).padStart(2, "0")}
          </span>
        </div>
        {groups.map((group) => (
          <div className="ku-nav-group" key={group.label}>
            <button
              type="button"
              className="ku-group-toggle ku-sidebar-copy"
              aria-expanded={!hidden.includes(group.label)}
              onClick={() =>
                setHidden((current) =>
                  current.includes(group.label)
                    ? current.filter((item) => item !== group.label)
                    : [...current, group.label],
                )
              }
            >
              {group.label}
              <span aria-hidden="true">⌄</span>
            </button>
            {(compact || !hidden.includes(group.label)) && (
              <div className="ku-nav-tiles">
                {group.items.map((item) => {
                  const children = (
                    <>
                      <span className="ku-nav-icon" aria-hidden="true">
                        {item.icon}
                      </span>
                      <span className="ku-nav-copy ku-sidebar-copy">
                        <strong>{item.label}</strong>
                        {item.description && (
                          <>
                            {" "}
                            <small>{item.description}</small>
                          </>
                        )}
                      </span>
                      {item.count !== undefined && (
                        <span className="ku-nav-count ku-sidebar-copy">
                          {" "}
                          {String(item.count).padStart(2, "0")}
                        </span>
                      )}
                    </>
                  );
                  const common = {
                    "aria-label": compact ? item.label : undefined,
                    title: item.label,
                    "aria-current":
                      selected === item.id ? ("page" as const) : undefined,
                    className:
                      "ku-nav-tile " + (item.wide ? "ku-nav-tile--wide" : ""),
                    children,
                  };
                  const selectLink = (event: MouseEvent<HTMLAnchorElement>) => {
                    if (
                      !event.defaultPrevented &&
                      event.button === 0 &&
                      !event.metaKey &&
                      !event.ctrlKey &&
                      !event.altKey &&
                      !event.shiftKey
                    )
                      onSelect?.(item.id);
                  };
                  return item.href ? (
                    <span className="ku-nav-link-slot" key={item.id}>
                      {renderLink ? (
                        renderLink(item, {
                          ...common,
                          href: item.href,
                          onClick: selectLink,
                        })
                      ) : (
                        <a {...common} href={item.href} onClick={selectLink} />
                      )}
                    </span>
                  ) : (
                    <button
                      {...common}
                      type="button"
                      key={item.id}
                      onClick={() => onSelect?.(item.id)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
      {focusSlot && (
        <div className="ku-focus-pod ku-sidebar-copy">{focusSlot}</div>
      )}
      {profileName && (
        <div className="ku-profile-pod">
          <Avatar name={profileName} />
          <span className="ku-sidebar-copy">
            <strong>{profileName}</strong>
            {profileSubtitle && <small>{profileSubtitle}</small>}
          </span>
        </div>
      )}
    </div>
  );
}
export function WorkspaceHeader({
  name,
  area,
  title,
  collapsed,
  navigationLabel,
  onNavigation,
  onSearch,
  focus = false,
  onFocus,
  notifications,
  account,
  searchShortcut,
  onShortcutHelp,
}: {
  name: string;
  area: string;
  title: string;
  collapsed: boolean;
  navigationLabel?: string;
  onNavigation: () => void;
  onSearch: () => void;
  focus?: boolean;
  onFocus?: () => void;
  notifications?: ReactNode;
  account?: ReactNode;
  /** Disclosure only; the app owns a guarded key handler. */
  searchShortcut?: string;
  onShortcutHelp?: () => void;
}) {
  const tracks = (base: string, size: string, withFocus = false) =>
    [
      base,
      withFocus && onFocus ? "144px" : "",
      notifications ? size : "",
      account ? size : "",
      onShortcutHelp ? "44px" : "",
    ]
      .filter(Boolean)
      .join(" ");
  const gridStyle = {
    "--ku-header-desktop": tracks(
      "minmax(210px,1.25fr) minmax(180px,1fr)",
      "64px",
      true,
    ),
    "--ku-header-medium": tracks(
      "minmax(200px,1.25fr) minmax(150px,1fr)",
      "60px",
    ),
    "--ku-header-tablet": tracks("minmax(180px,1fr) minmax(120px,1fr)", "56px"),
    "--ku-header-mobile": tracks("minmax(0,1fr) 50px", "50px"),
  } as CSSProperties;
  return (
    <header
      style={gridStyle}
      className="ku-header"
      aria-label="Workspace toolbar"
    >
      <div className="ku-header-context ku-header-block">
        <IconButton
          label={
            navigationLabel ??
            (collapsed ? "Expand navigation" : "Collapse navigation")
          }
          data-ku-navigation-trigger="true"
          onClick={onNavigation}
        >
          <svg
            width="19"
            height="19"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <rect x="3" y="4" width="18" height="16" rx="3" />
            <path d="M9 4v16m7-12-4 4 4 4" />
          </svg>
        </IconButton>
        <div>
          <span>
            <span>{name}</span>
            <i /> <span className="ku-header-area">{area}</span>
          </span>
          <strong>{title}</strong>
        </div>
      </div>
      <button
        type="button"
        className="ku-header-search ku-header-block"
        aria-label={
          searchShortcut
            ? `Jump to a space (${searchShortcut})`
            : "Jump to a space"
        }
        onClick={onSearch}
      >
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.7"
        >
          <circle cx="10" cy="10" r="6" />
          <path d="m15 15 5 5" />
        </svg>
        <span>
          Jump to a space <small>Everything, a little closer.</small>
        </span>{" "}
        {searchShortcut && <kbd>{searchShortcut}</kbd>}
      </button>
      {onFocus && (
        <button
          type="button"
          aria-label={
            focus ? "In focus A quieter canvas" : "Find focus A quieter canvas"
          }
          aria-pressed={focus}
          onClick={onFocus}
          className="ku-header-focus ku-header-block"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path d="M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span>
            {focus ? "In focus" : "Find focus"} <small>A quieter canvas</small>
          </span>
        </button>
      )}
      {notifications && (
        <div className="ku-header-notifications ku-header-block">
          {notifications}
        </div>
      )}
      {onShortcutHelp && (
        <IconButton label="Keyboard shortcuts" onClick={onShortcutHelp}>
          ?
        </IconButton>
      )}
      {account && (
        <div className="ku-header-account ku-header-block">{account}</div>
      )}
    </header>
  );
}
