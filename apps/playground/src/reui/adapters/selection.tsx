import React, { type ReactNode } from "react";
import {
  Collapse,
  Select as AntSelect,
  Tabs as AntTabs,
  Segmented,
  Button,
  ColorPicker as AntColorPicker,
  Input,
} from "antd";
import { part, findParts, type PartProps, text } from "./parts";

export const SelectGroup = part("SelectGroup");
export const SelectLabel = part("SelectLabel");
export const SelectTrigger = part("SelectTrigger");
export const SelectValue = part("SelectValue", "span");
export const SelectContent = part("SelectContent");
export const SelectItem = part("SelectItem");
export const SelectSeparator = part("SelectSeparator");
export const SelectScrollUpButton = part("SelectScrollUpButton");
export const SelectScrollDownButton = part("SelectScrollDownButton");
export function Select({
  children,
  onValueChange,
  value,
  defaultValue,
  disabled,
  ...props
}: PartProps & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}) {
  const trigger = findParts(children, ["SelectTrigger"])[0];
  const selected = findParts(children, ["SelectValue"])[0];
  const options = findParts(children, ["SelectItem"]).map((item, index) => ({
    value: String(item.props.value ?? index),
    label: (
      <span>
        {item.props.children}
        {!text(item.props.children) && (
          <span className="sr-only">
            {String(item.props["aria-label"] ?? item.props.value)}
          </span>
        )}
      </span>
    ),
    disabled: !!item.props.disabled,
    searchLabel: text(item.props.children),
  }));
  return (
    <AntSelect
      {...props}
      {...trigger?.props}
      children={undefined}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled || !!trigger?.props.disabled}
      style={{
        minWidth: 160,
        ...((trigger?.props.style as React.CSSProperties) ?? {}),
      }}
      options={options}
      placeholder={selected?.props.placeholder as ReactNode}
      onChange={onValueChange}
      optionFilterProp="searchLabel"
    />
  );
}

export const TabsList = part("TabsList");
export const TabsTrigger = part("TabsTrigger");
export const TabsContent = part("TabsContent");
export function Tabs({
  children,
  value,
  defaultValue,
  onValueChange,
  orientation,
  className,
  ...props
}: PartProps & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
}) {
  const panels = findParts(children, ["TabsContent"]);
  const items = findParts(children, ["TabsTrigger"]).map((trigger, i) => ({
    key: String(trigger.props.value ?? i),
    label: (
      <span>
        {trigger.props.children}
        {!text(trigger.props.children) && (
          <span className="sr-only">
            {String(trigger.props["aria-label"] ?? trigger.props.value)}
          </span>
        )}
      </span>
    ),
    disabled: !!trigger.props.disabled,
    children: panels.find((panel) => panel.props.value === trigger.props.value)
      ?.props.children,
  }));
  return (
    <AntTabs
      {...props}
      className={className}
      activeKey={value}
      defaultActiveKey={defaultValue}
      onChange={onValueChange}
      tabPlacement={orientation === "vertical" ? "start" : "top"}
      items={items}
    />
  );
}

export const AccordionItem = part("AccordionItem");
export const AccordionTrigger = part("AccordionTrigger");
export const AccordionContent = part("AccordionContent");
function accordionTextStyles(styles: {
  root?: React.CSSProperties; header?: React.CSSProperties; title?: React.CSSProperties;
  body?: React.CSSProperties; icon?: React.CSSProperties;
} = {}) {
  return {
    ...styles,
    title: { minWidth: 0, overflowWrap: "anywhere" as const, ...styles.title },
    body: { overflowWrap: "anywhere" as const, ...styles.body },
  };
}
export function Accordion({
  children,
  type,
  value,
  defaultValue,
  onValueChange,
  onKeyDownCapture,
  collapsible = false,
  ...props
}: PartProps & {
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  collapsible?: boolean;
  onValueChange?: (value: string | string[]) => void;
}) {
  const bridgeId = React.useId();
  const host = React.useRef<HTMLDivElement>(null);
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | string[]>(defaultValue ?? []);
  const semanticStyles = props.styles as React.ComponentProps<typeof Collapse>["styles"];
  // Native Collapse does not expose header/panel ARIA props. Bind only this
  // instance's native nodes, including panels mounted lazily by its motion layer.
  React.useLayoutEffect(() => {
    const element = host.current;
    if (!element) return;
    const bind = () => {
      const root = element.firstElementChild;
      if (root?.getAttribute("role") === "tablist") root.removeAttribute("role");
      element.querySelectorAll<HTMLElement>("[data-kooya-accordion-item]").forEach((item) => {
        const itemId = item.dataset.kooyaAccordionItem;
        if (!itemId?.startsWith(`${bridgeId}-`)) return;
        const header = item.firstElementChild;
        if (!(header instanceof HTMLElement)) return;
        header.id = `${itemId}-trigger`;
        header.setAttribute("role", "button");
        header.dataset.kooyaAccordionTrigger = bridgeId;
        const panel = item.children[1];
        if (panel instanceof HTMLElement) {
          panel.id = `${itemId}-panel`;
          panel.setAttribute("role", "region");
          panel.setAttribute("aria-labelledby", header.id);
          header.setAttribute("aria-controls", panel.id);
        } else header.removeAttribute("aria-controls");
      });
    };
    bind();
    const observer = new MutationObserver(bind);
    observer.observe(element, { childList: true, subtree: true, attributes: true, attributeFilter: ["aria-expanded"] });
    return () => observer.disconnect();
  }, [bridgeId, type, children]);
  const items = findParts(children, ["AccordionItem"]).map((item, i) => {
    const trigger = findParts(item.props.children, ["AccordionTrigger"])[0];
    const content = findParts(item.props.children, ["AccordionContent"])[0];
    return {
      key: String(item.props.value ?? i),
      "data-kooya-accordion-item": `${bridgeId}-${Array.from(String(item.props.value ?? i), character => character.codePointAt(0)!.toString(16)).join("-")}`,
      label: trigger?.props.children,
      children: content?.props.children,
      collapsible:
        item.props.disabled || trigger?.props.disabled
          ? ("disabled" as const)
          : undefined,
    };
  });
  return (
    <div ref={host} style={{ display: "contents" }} onKeyDownCapture={(event) => {
      if (typeof onKeyDownCapture === "function") onKeyDownCapture(event);
      if (event.defaultPrevented || event.key !== " " || event.repeat) return;
      const target = event.target;
      if (!(target instanceof HTMLElement) || target.dataset.kooyaAccordionTrigger !== bridgeId) return;
      if (target.getAttribute("aria-disabled") === "true" || target.closest(".ant-collapse-item-disabled")) return;
      event.preventDefault();
      target.click();
    }}>
    <Collapse
      {...props}
      styles={typeof semanticStyles === "function"
        ? (info) => accordionTextStyles(semanticStyles(info))
        : accordionTextStyles(semanticStyles)}
      accordion={type === "single"}
      activeKey={value === undefined ? uncontrolledValue : value}
      defaultActiveKey={defaultValue}
      items={items}
      onChange={(keys) => {
        if (type === "single" && !collapsible && (!Array.isArray(keys) || keys.length === 0)) return;
        const next =
          type === "single"
            ? Array.isArray(keys)
              ? (keys[0] ?? "")
              : keys
            : Array.isArray(keys)
              ? keys
              : [keys];
        if (value === undefined) setUncontrolledValue(next);
        onValueChange?.(next);
      }}
    />
    </div>
  );
}

export function Toggle({
  pressed,
  defaultPressed,
  onPressedChange,
  children,
  ...props
}: PartProps & {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (value: boolean) => void;
}) {
  const [local, setLocal] = React.useState(defaultPressed ?? false);
  const selected = pressed ?? local;
  return (
    <Button
      {...props}
      type={selected ? "primary" : "default"}
      aria-pressed={selected}
      onClick={() => {
        setLocal(!selected);
        onPressedChange?.(!selected);
      }}
    >
      {children}
    </Button>
  );
}
export const ToggleGroupItem = part("ToggleGroupItem");
export function ToggleGroup({
  children,
  type,
  value,
  defaultValue,
  onValueChange,
  ...props
}: PartProps & {
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}) {
  const [local, setLocal] = React.useState(
    defaultValue ?? (type === "multiple" ? [] : ""),
  );
  const selected = value ?? local;
  const items = findParts(children, ["ToggleGroupItem"]);
  const update = (next: string | string[]) => {
    setLocal(next);
    onValueChange?.(next);
  };
  if (type !== "multiple")
    return (
      <Segmented
        {...props}
        value={selected as string}
        onChange={(next) => update(String(next))}
        options={items.map((item) => ({
          value: String(item.props.value),
          label: (
            <span>
              {item.props.children}
              {!text(item.props.children) && (
                <span className="sr-only">
                  {String(item.props["aria-label"] ?? item.props.value)}
                </span>
              )}
            </span>
          ),
          disabled: !!item.props.disabled,
        }))}
      />
    );
  return (
    <div {...props} role="group">
      {items.map((item) => {
        const key = String(item.props.value);
        const active = Array.isArray(selected) && selected.includes(key);
        return (
          <Button
            key={key}
            aria-label={item.props["aria-label"] as string | undefined}
            aria-pressed={active}
            disabled={!!item.props.disabled}
            type={active ? "primary" : "default"}
            onClick={() =>
              update(
                active
                  ? (selected as string[]).filter((x) => x !== key)
                  : [...(selected as string[]), key],
              )
            }
          >
            {item.props.children}
          </Button>
        );
      })}
    </div>
  );
}

export const InputOTPGroup = part("InputOTPGroup");
export const InputOTPSlot = part("InputOTPSlot");
export const InputOTPSeparator = part("InputOTPSeparator", "span");
export function InputOTP({
  children,
  maxLength = 6,
  value,
  onChange,
  pattern,
  ...props
}: PartProps & {
  maxLength?: number;
  value?: string;
  onChange?: (value: string) => void;
  pattern?: string;
}) {
  return (
    <Input.OTP
      {...props}
      value={value}
      length={maxLength}
      onChange={onChange}
      formatter={
        pattern
          ? (next) =>
              [...next]
                .filter((character) => new RegExp(pattern).test(character))
                .join("")
          : undefined
      }
    />
  );
}

export function ColorPicker({
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: PartProps & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <AntColorPicker
      {...props}
      value={value}
      defaultValue={defaultValue}
      onChange={(_, hex) => onValueChange?.(hex)}
    >
      {children}
    </AntColorPicker>
  );
}
