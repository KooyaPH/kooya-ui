import React, { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Button, Dropdown, Menu as AntMenu, type MenuProps } from "antd";
import { findParts, part, role, type PartProps } from "./parts";

function menuParts(prefix: string) {
  return Object.fromEntries(
    [
      "Content",
      "Trigger",
      "Item",
      "Label",
      "Group",
      "Separator",
      "Shortcut",
      "CheckboxItem",
      "RadioGroup",
      "RadioItem",
      "Sub",
      "SubTrigger",
      "SubContent",
      "Portal",
    ].map((suffix) => [
      prefix + suffix,
      part(prefix + suffix, suffix === "Shortcut" ? "span" : "div"),
    ]),
  );
}
const dropdownParts = menuParts("DropdownMenu");
export const {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} = dropdownParts;
const contextParts = menuParts("ContextMenu");
export const {
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuGroup,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuPortal,
} = contextParts;
const menubarParts = menuParts("Menubar");
export const {
  MenubarContent,
  MenubarTrigger,
  MenubarItem,
  MenubarLabel,
  MenubarGroup,
  MenubarSeparator,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarPortal,
} = menubarParts;
export const MenubarMenu = part("MenubarMenu");

function items(
  children: ReactNode,
  prefix: string,
  radio?: PartProps,
  trail = "",
): MenuProps["items"] {
  return React.Children.toArray(children).flatMap((child, index) => {
    if (!React.isValidElement<PartProps>(child)) return [];
    const name = role(child);
    const key = trail + String(child.key ?? child.props.value ?? index);
    if (name === prefix + "Separator")
      return [{ type: "divider" as const, key }];
    if (name === prefix + "Sub") {
      const trigger = findParts(child.props.children, [
        prefix + "SubTrigger",
      ])[0];
      const content = findParts(child.props.children, [
        prefix + "SubContent",
      ])[0];
      return [
        {
          key,
          label: trigger?.props.children,
          disabled: !!trigger?.props.disabled,
          children: items(content?.props.children, prefix, radio, key + "/"),
        },
      ];
    }
    if (name === prefix + "RadioGroup")
      return items(child.props.children, prefix, child.props, key + "/") ?? [];
    if (name === prefix + "Group")
      return [
        {
          type: "group" as const,
          key,
          children: items(child.props.children, prefix, radio, key + "/"),
        },
      ];
    if (name === prefix + "Label")
      return [{ type: "group" as const, key, label: child.props.children }];
    if (
      [prefix + "Item", prefix + "CheckboxItem", prefix + "RadioItem"].includes(
        name ?? "",
      )
    ) {
      const selected =
        child.props.checked ||
        (name === prefix + "RadioItem" && radio?.value === child.props.value);
      return [
        {
          key,
          ...(name === prefix + "CheckboxItem" || name === prefix + "RadioItem"
            ? {
                role:
                  name === prefix + "CheckboxItem"
                    ? "menuitemcheckbox"
                    : "menuitemradio",
                "aria-checked": !!selected,
              }
            : {}),
          label: (
            <span
              className={["reui-menu-item-label", child.props.className]
                .filter(Boolean)
                .join(" ")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                minInlineSize: 0,
                ...(child.props.style as React.CSSProperties | undefined),
              }}
            >
              {selected ? <span aria-hidden="true">✓ </span> : null}
              {child.props.children}
            </span>
          ),
          disabled: !!child.props.disabled,
          danger: child.props.variant === "destructive",
          onClick: ({
            domEvent,
          }: {
            domEvent: React.MouseEvent | React.KeyboardEvent;
          }) => {
            (
              child.props.onSelect as
                | ((event: Event | React.SyntheticEvent) => void)
                | undefined
            )?.(domEvent);
            (
              child.props.onClick as
                | ((event: React.SyntheticEvent) => void)
                | undefined
            )?.(domEvent);
            (
              child.props.onCheckedChange as
                | ((value: boolean) => void)
                | undefined
            )?.(!child.props.checked);
            (radio?.onValueChange as ((value: string) => void) | undefined)?.(
              String(child.props.value),
            );
          },
        },
      ];
    }
    const nested = findParts(child.props.children, [
      prefix + "Item",
      prefix + "Group",
      prefix + "Sub",
      prefix + "Separator",
      prefix + "CheckboxItem",
      prefix + "RadioGroup",
    ]);
    if (nested.length)
      return items(child.props.children, prefix, radio, key + "/") ?? [];
    return [{ type: "group" as const, key, label: child }];
  }) as MenuProps["items"];
}

function menu(prefix: "DropdownMenu" | "ContextMenu") {
  return function RecipeMenu({
    children,
    open,
    defaultOpen,
    onOpenChange,
  }: PartProps & {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  }) {
    const [local, setLocal] = useState(defaultOpen ?? false);
    const triggerRef = useRef<HTMLElement>(null);
    const popupRef = useRef<HTMLElement | null>(null);
    const keyboardMenuRef = useRef<HTMLElement | null>(null);
    const [submenuKeys, setSubmenuKeys] = useState<string[]>([]);
    const visible = open ?? local;
    useLayoutEffect(() => {
      // Native popup content is cached during exit. Update its owned DOM scope
      // before queued native navigation can focus a closing menu item.
      popupRef.current?.toggleAttribute("inert", !visible);
    }, [visible]);
    useEffect(() => {
      if (!visible) setSubmenuKeys((keys) => (keys.length ? [] : keys));
    }, [visible]);
    const trigger = findParts(children, [prefix + "Trigger"])[0];
    const content = findParts(children, [prefix + "Content"])[0];
    const target = trigger?.props.render ?? trigger?.props.children;
    const node = React.isValidElement(target) ? (
      target
    ) : (
      <Button>{(target as ReactNode) ?? "Open menu"}</Button>
    );
    const change = (next: boolean) => {
      if (!next) {
        const ownedMenu = keyboardMenuRef.current;
        const active =
          (ownedMenu?.getRootNode() as Document | ShadowRoot | undefined)
            ?.activeElement ?? ownedMenu?.ownerDocument.activeElement;
        // Preserve focus moved outside by the caller or a pointer interaction.
        if (active && ownedMenu?.contains(active)) triggerRef.current?.focus();
        keyboardMenuRef.current = null;
        setSubmenuKeys((keys) => (keys.length ? [] : keys));
      }
      setLocal(next);
      onOpenChange?.(next);
    };
    const connected = React.cloneElement(
      node as React.ReactElement<{
        onKeyDown?: (event: React.KeyboardEvent) => void;
        tabIndex?: number;
      }>,
      {
        tabIndex: node.props.tabIndex ?? 0,
        onKeyDown: (event: React.KeyboardEvent) => {
          node.props.onKeyDown?.(event);
          if (
            prefix === "ContextMenu" &&
            event.shiftKey &&
            event.key === "F10"
          ) {
            event.preventDefault();
            change(true);
          }
        },
      },
    );
    return (
      <Dropdown
        ref={triggerRef}
        destroyOnHidden={content?.props.forceMount !== true}
        open={visible}
        classNames={{ root: content?.props.className }}
        styles={{
          root: content?.props.style as React.CSSProperties | undefined,
        }}
        placement={
          content?.props.align === "end" ? "bottomRight" : "bottomLeft"
        }
        align={{
          overflow: {
            adjustX: true,
            adjustY: true,
            shiftX: true,
            shiftY: true,
          },
        }}
        onOpenChange={(next, info) => {
          // Selection is handled below so caller cancellation remains authoritative.
          if (info.source !== "menu") change(next);
        }}
        trigger={prefix === "ContextMenu" ? ["contextMenu"] : ["click"]}
        menu={{
          // The bridge owns selection close/veto; native multiple mode keeps it open.
          selectable: true,
          multiple: true,
          selectedKeys: [],
          openKeys: visible ? submenuKeys : [],
          onOpenChange: setSubmenuKeys,
          items: items(content?.props.children, prefix),
          onFocusCapture: (event) => {
            popupRef.current = event.currentTarget;
          },
          onKeyDownCapture: (event) => {
            // Keep the native root intact: custom popup wrappers disable its
            // automatic ARIA state and keyboard entry behavior.
            popupRef.current = event.currentTarget;
            // Capture ownership before native Menu may consume a root Escape.
            keyboardMenuRef.current = event.currentTarget;
          },
          onClick: ({ domEvent }) => {
            if (!domEvent.defaultPrevented) {
              // Prevent the accepted key from activating the restored trigger.
              if (
                domEvent.type === "keydown" &&
                "key" in domEvent &&
                (domEvent.key === "Enter" || domEvent.key === " ")
              )
                domEvent.preventDefault();
              const target = domEvent.target as Element | null;
              const ownedMenu = target?.closest?.('[role="menu"]');
              const active =
                (ownedMenu?.getRootNode() as Document | ShadowRoot | undefined)
                  ?.activeElement ?? ownedMenu?.ownerDocument.activeElement;
              // Preserve focus deliberately moved by a caller's selection callback.
              if (active && ownedMenu?.contains(active))
                triggerRef.current?.focus();
              change(false);
            }
          },
        }}
      >
        {connected}
      </Dropdown>
    );
  };
}
export const DropdownMenu = menu("DropdownMenu");
export const ContextMenu = menu("ContextMenu");
export function Menubar({ children, ...props }: PartProps) {
  const entries = findParts(children, ["MenubarMenu"]).map((entry, index) => {
    const trigger = findParts(entry.props.children, ["MenubarTrigger"])[0];
    const content = findParts(entry.props.children, ["MenubarContent"])[0];
    return {
      key: String(index),
      label: trigger?.props.children,
      children: items(content?.props.children, "Menubar"),
    };
  });
  return (
    <AntMenu
      {...props}
      mode="horizontal"
      triggerSubMenuAction="click"
      items={entries}
    />
  );
}
