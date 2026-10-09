import {
  useId,
  useRef,
  useState,
  useEffect,
  isValidElement,
  cloneElement,
  type ReactNode,
  type ReactElement,
  type KeyboardEvent,
  type HTMLAttributes,
} from "react";
import {
  Dropdown,
  Tabs as AntTabs,
  Pagination as AntPagination,
  Breadcrumb as AntBreadcrumb,
  type PaginationProps,
  type BreadcrumbProps,
} from "antd";
import { IconButton } from "../atoms/index";
export interface MenuAction {
  key?: string;
  label: ReactNode;
  onSelect: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  /** Selection menus may expose a radio choice without changing action callbacks. */
  checked?: boolean;
}
export interface MenuSubmenu {
  key?: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  children: readonly MenuItem[];
}
export interface MenuDivider {
  type: "divider";
  key?: string;
}
export type MenuItem = MenuAction | MenuSubmenu | MenuDivider;
export interface MenuProps {
  label: string;
  trigger: ReactNode;
  items: readonly MenuItem[];
  align?: "start" | "end";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** A close request (selection, Escape or outside); controlled props remain authoritative. */
  onClose?: () => void;
}
export function Menu({
  label,
  trigger,
  items,
  align = "end",
  open,
  defaultOpen = false,
  onOpenChange,
  onClose,
}: MenuProps) {
  const [internal, setInternal] = useState(defaultOpen);
  const visible = open ?? internal;
  const anchor = useRef<HTMLSpanElement>(null);
  const popup = useRef<HTMLDivElement>(null);
  const initialLast = useRef(false);
  const wasOpen = useRef(false);
  const restore = () =>
    anchor.current
      ?.querySelector<HTMLElement>("button, a, [tabindex]")
      ?.focus({ preventScroll: true });
  const change = (next: boolean) => {
    if (next === visible) return;
    setInternal(next);
    onOpenChange?.(next);
    if (!next) onClose?.();
  };
  useEffect(() => {
    if (
      wasOpen.current &&
      !visible &&
      (document.activeElement === document.body ||
        popup.current?.contains(document.activeElement))
    )
      restore();
    wasOpen.current = visible;
    if (!visible) return;
    const frame = requestAnimationFrame(() => {
      const menu = popup.current?.querySelector('[role="menu"]');
      const nodes = Array.from(
        menu?.querySelectorAll<HTMLElement>(
          '[role^="menuitem"]:not([aria-disabled="true"])',
        ) ?? [],
      ).filter((node) => node.closest('[role="menu"]') === menu);
      nodes[initialLast.current ? nodes.length - 1 : 0]?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [visible]);
  const child = isValidElement(trigger) ? (
    cloneElement(trigger as ReactElement<HTMLAttributes<HTMLElement>>, {
      "aria-haspopup": "menu",
      "aria-expanded": visible,
      onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
        (trigger.props as HTMLAttributes<HTMLElement>).onKeyDown?.(event);
        if (
          !event.defaultPrevented &&
          ["ArrowDown", "ArrowUp"].includes(event.key)
        ) {
          event.preventDefault();
          initialLast.current = event.key === "ArrowUp";
          change(true);
        }
      },
    })
  ) : (
    <span>{trigger}</span>
  );
  const mapItems = (
    entries: readonly MenuItem[],
    prefix = "",
  ): import("antd").MenuProps["items"] =>
    entries.map((item, index) => {
      const key = item.key ?? `${prefix}${index}`;
      if ("type" in item) return { type: "divider", key };
      if ("children" in item)
        return {
          key,
          label: item.label,
          icon: item.icon,
          disabled: item.disabled,
          children: mapItems(item.children, `${key}/`),
        };
      return {
        key,
        label: item.label,
        icon: item.icon,
        disabled: item.disabled,
        danger: item.danger,
        ...(item.checked !== undefined
          ? { role: "menuitemradio", "aria-checked": item.checked }
          : {}),
        onClick: () => {
          // Restore before invoking a consumer that may synchronously open a dialog.
          restore();
          change(false);
          item.onSelect();
        },
      };
    });
  return (
    <span ref={anchor} className="ku-menu-trigger">
      <Dropdown
        open={visible}
        trigger={["click"]}
        placement={align === "end" ? "bottomRight" : "bottomLeft"}
        autoFocus
        onOpenChange={(next, info) => {
          if (info.source === "trigger") {
            initialLast.current = false;
            change(next);
          }
        }}
        menu={{
          "aria-label": label,
          expandIcon: <span aria-hidden="true">›</span>,
          items: mapItems(items),
        }}
        popupRender={(menu) => (
          <div
            ref={popup}
            className="ku-menu-popup"
            onKeyDownCapture={(event) => {
              // Ant selects on keydown. Without cancelling Enter's browser default, a
              // newly focused Modal close button receives a synthetic click before keyup.
              // Keep propagation and Ant selection intact; Space/arrows are untouched.
              if (event.key === "Enter") event.preventDefault();
              // Submenu portals are outside the root menu DOM. Close at the
              // owned boundary before Ant removes the currently focused level.
              if (event.key === "Escape") {
                event.preventDefault();
                event.stopPropagation();
                restore();
                change(false);
              }
            }}
          >
            {menu}
          </div>
        )}
      >
        {child}
      </Dropdown>
    </span>
  );
}
export interface TabOption {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}
export function Tabs({
  label,
  value,
  options,
  onValueChange,
  children,
  compact = false,
  orientation = "horizontal",
  activation = "automatic",
}: {
  label: string;
  value: string;
  options: readonly TabOption[];
  onValueChange: (value: string) => void;
  children: ReactNode;
  compact?: boolean;
  orientation?: "horizontal" | "vertical";
  activation?: "automatic" | "manual";
}) {
  const root = useRef<HTMLDivElement>(null);
  const id = useId();
  const [focusedValue, setFocusedValue] = useState(value);
  useEffect(() => setFocusedValue(value), [value]);
  return (
    <div
      ref={root}
      className={compact ? "ku-tabs ku-tabs--compact" : "ku-tabs"}
      onKeyDown={(event) => {
        if (
          !(event.target instanceof HTMLElement) ||
          event.target.getAttribute("role") !== "tab"
        )
          return;
        if (
          ![
            ...(orientation === "vertical"
              ? ["ArrowUp", "ArrowDown"]
              : ["ArrowLeft", "ArrowRight"]),
            "Home",
            "End",
          ].includes(event.key)
        )
          return;
        event.preventDefault();
        event.stopPropagation();
        const enabled = options.filter((x) => !x.disabled);
        const index = enabled.findIndex(
          (x) => `${id}-tab-${x.value}` === (event.target as HTMLElement).id,
        );
        const next =
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? enabled.length - 1
              : (index +
                  (["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1) +
                  enabled.length) %
                enabled.length;
        if (!enabled[next]) return;
        if (activation === "automatic") onValueChange(enabled[next].value);
        requestAnimationFrame(() =>
          root.current
            ?.querySelector<HTMLElement>(
              `[id="${CSS.escape(id + "-tab-" + enabled[next].value)}"]`,
            )
            ?.focus(),
        );
      }}
    >
      <AntTabs
        id={id}
        activeKey={value}
        onChange={onValueChange}
        tabBarExtraContent={undefined}
        items={options.map((option) => ({
          key: option.value,
          label: (
            <>
              <span aria-hidden>{option.icon}</span>
              <span>{option.label}</span>
            </>
          ),
          disabled: option.disabled,
          children: value === option.value ? children : null,
        }))}
        renderTabBar={(props) => (
          <div
            className="ku-tab-strip"
            role="tablist"
            aria-label={label}
            aria-orientation={orientation}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="tab"
                id={`${id}-tab-${option.value}`}
                aria-controls={`${id}-panel-${option.value}`}
                aria-selected={value === option.value}
                disabled={option.disabled}
                tabIndex={
                  (activation === "manual" ? focusedValue : value) ===
                  option.value
                    ? 0
                    : -1
                }
                className="ku-tab"
                onClick={(event) => props.onTabClick(option.value, event)}
                onFocus={(event) => {
                  setFocusedValue(option.value);
                  event.currentTarget.scrollIntoView?.({
                    block: "nearest",
                    inline: "nearest",
                  });
                }}
              >
                <span aria-hidden>{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        )}
      />
    </div>
  );
}
export function Pagination(props: PaginationProps) {
  return <AntPagination {...props} />;
}
export function Breadcrumb(props: BreadcrumbProps) {
  return <AntBreadcrumb {...props} />;
}
export function RowActions({
  items,
  label = "Row actions",
}: {
  items: readonly MenuItem[];
  label?: string;
}) {
  return (
    <Menu
      label={label}
      items={items}
      trigger={
        <IconButton label={label}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
          </svg>
        </IconButton>
      }
    />
  );
}
