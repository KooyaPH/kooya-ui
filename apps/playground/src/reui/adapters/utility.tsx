import React, {
  useId,
  useState,
  useContext,
  createContext,
  useRef,
  useEffect,
} from "react";
import {
  InputNumber,
  Rate,
  Breadcrumb as AntBreadcrumb,
  Splitter,
  Button,
  Space,
} from "antd";
import { part, findParts, text, type PartProps } from "./parts";
export const NumberFieldGroup = part("NumberFieldGroup");
export const NumberFieldInput = part("NumberFieldInput");
export const NumberFieldIncrement = part("NumberFieldIncrement");
export const NumberFieldDecrement = part("NumberFieldDecrement");
export const NumberFieldScrubArea = part("NumberFieldScrubArea");
interface NumberController {
  value: number | null;
  change: (value: number | null) => void;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  id: string;
  size: "small" | "middle" | "large";
  inputProps: PartProps;
}
const NumberContext = createContext<NumberController | null>(null);
function NumericParts({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement<PartProps>(child)) return child;
    const name = (child.type as { recipeRole?: string }).recipeRole;
    if (name === "NumberFieldInput") return <NumericInput {...child.props} />;
    if (name === "NumberFieldIncrement" || name === "NumberFieldDecrement")
      return (
        <NumericAction
          {...child.props}
          delta={name === "NumberFieldIncrement" ? 1 : -1}
        />
      );
    if (name === "NumberFieldScrubArea")
      return <NumericLabel {...child.props} />;
    if (name === "NumberFieldGroup")
      return (
        <Space.Compact
          style={{ display: "flex", width: "100%" }}
          className={child.props.className}
        >
          <NumericParts>{child.props.children}</NumericParts>
        </Space.Compact>
      );
    return child.props.children
      ? React.cloneElement(child, {
          children: <NumericParts>{child.props.children}</NumericParts>,
        })
      : child;
  });
}
function NumericInput(props: PartProps) {
  const c = useContext(NumberContext)!;
  return (
    <InputNumber
      {...c.inputProps}
      {...props}
      id={c.id}
      aria-label={props["aria-label"] as string | undefined}
      size={c.size}
      value={c.value}
      min={Number.isFinite(c.min) ? c.min : undefined}
      max={Number.isFinite(c.max) ? c.max : undefined}
      step={c.step}
      disabled={c.disabled}
      controls={false}
      onChange={c.change}
      style={{
        width: "100%",
        minWidth: 0,
        ...(props.style as React.CSSProperties),
      }}
    />
  );
}
function NumericAction({
  children,
  delta,
  ...props
}: PartProps & { delta: number }) {
  const c = useContext(NumberContext)!;
  return (
    <Button
      {...props}
      htmlType="button"
      size={c.size}
      aria-label={delta > 0 ? "Increase amount" : "Decrease amount"}
      disabled={
        c.disabled ||
        (delta > 0 ? (c.value ?? 0) >= c.max : (c.value ?? 0) <= c.min)
      }
      onClick={() =>
        c.change(
          Math.min(c.max, Math.max(c.min, (c.value ?? 0) + delta * c.step)),
        )
      }
    >
      {children ?? (delta > 0 ? "+" : "−")}
    </Button>
  );
}
function NumericLabel({ children, label, ...props }: PartProps) {
  const c = useContext(NumberContext)!;
  const cleanup = useRef<() => void>(() => {});
  useEffect(() => () => cleanup.current(), []);
  return (
    <label
      {...props}
      htmlFor={c.id}
      style={{
        display: "block",
        marginBottom: 8,
        cursor: c.disabled ? "default" : "ew-resize",
        ...(props.style as React.CSSProperties),
      }}
      onPointerDown={(event) => {
        if (c.disabled) return;
        cleanup.current();
        const start = event.clientX,
          value = c.value ?? 0;
        let active = true;
        const move = (e: PointerEvent) => {
          if (active)
            c.change(
              Math.min(
                c.max,
                Math.max(
                  c.min,
                  value + Math.round((e.clientX - start) / 8) * c.step,
                ),
              ),
            );
        };
        const end = () => {
          active = false;
          document.removeEventListener("pointermove", move);
          document.removeEventListener("pointerup", end);
          document.removeEventListener("pointercancel", end);
        };
        cleanup.current = end;
        document.addEventListener("pointermove", move);
        document.addEventListener("pointerup", end, { once: true });
        document.addEventListener("pointercancel", end, { once: true });
      }}
    >
      {(label as React.ReactNode) ?? children}
    </label>
  );
}
export function NumberField({
  children,
  onValueChange,
  size,
  value,
  defaultValue,
  ...props
}: PartProps) {
  const generated = useId();
  const input = findParts(children, ["NumberFieldInput"])[0];
  const [local, setLocal] = useState<number | null>(
    typeof defaultValue === "number" ? defaultValue : null,
  );
  const change = (next: number | null) => {
    setLocal(next);
    (onValueChange as ((value: number | null) => void) | undefined)?.(next);
  };
  const controller = {
    value: value === undefined ? local : (value as number | null),
    change,
    min: typeof props.min === "number" ? props.min : -Infinity,
    max: typeof props.max === "number" ? props.max : Infinity,
    step: typeof props.step === "number" ? props.step : 1,
    disabled: !!props.disabled,
    id: String(input?.props.id ?? props.id ?? generated),
    inputProps: props,
    size:
      size === "sm"
        ? ("small" as const)
        : size === "lg"
          ? ("large" as const)
          : ("middle" as const),
  };
  return (
    <NumberContext.Provider value={controller}>
      <div className={props.className}>
        <NumericParts>{children}</NumericParts>
      </div>
    </NumberContext.Provider>
  );
}
export function Rating({
  rating,
  maxRating = 5,
  editable = false,
  onRatingChange,
  variant,
  showValue,
  starClassName,
  size,
  ...props
}: PartProps & {
  rating?: number;
  maxRating?: number;
  editable?: boolean;
  showValue?: boolean;
  onRatingChange?: (value: number) => void;
}) {
  return (
    <span>
      <Rate
        {...props}
        value={rating}
        count={maxRating}
        disabled={!editable}
        allowHalf
        allowClear
        onChange={onRatingChange}
        aria-label={String(
          props["aria-label"] ?? `Rating ${rating ?? 0} out of ${maxRating}`,
        )}
      />
      {showValue && <span style={{ marginInlineStart: 8 }}>{rating}</span>}
    </span>
  );
}
export const BreadcrumbList = part("BreadcrumbList");
export const BreadcrumbItem = part("BreadcrumbItem");
export const BreadcrumbLink = part("BreadcrumbLink");
export const BreadcrumbPage = part("BreadcrumbPage");
export const BreadcrumbSeparator = part("BreadcrumbSeparator");
export const BreadcrumbEllipsis = part("BreadcrumbEllipsis", "span");
export function Breadcrumb({ children, ...props }: PartProps) {
  const items = findParts(children, ["BreadcrumbItem"]).map((item, index) => {
    const link = findParts(item.props.children, ["BreadcrumbLink"])[0];
    const page = findParts(item.props.children, ["BreadcrumbPage"])[0];
    return {
      key: String(index),
      title:
        link?.props.children ?? page?.props.children ?? item.props.children,
      href: link?.props.href as string | undefined,
      onClick: link?.props.onClick as
        | React.MouseEventHandler<HTMLAnchorElement>
        | undefined,
    };
  });
  return <AntBreadcrumb {...props} items={items} />;
}
export const ResizablePanel = part("ResizablePanel");
export const ResizableHandle = part("ResizableHandle");
export function ResizablePanelGroup({
  children,
  orientation,
  direction,
  onLayoutChange,
  onLayout,
  ...props
}: PartProps) {
  return (
    <Splitter
      {...props}
      onResize={(sizes) => {
        const total = sizes.reduce((sum, size) => sum + size, 0) || 1;
        const percentages = sizes.map((size) => (size / total) * 100);
        const panels = findParts(children, ["ResizablePanel"]);
        (
          onLayoutChange as
            | ((layout: Record<string, number>) => void)
            | undefined
        )?.(
          Object.fromEntries(
            percentages.map((size, index) => [
              String(panels[index]?.props.id ?? index),
              size,
            ]),
          ),
        );
        (onLayout as ((layout: number[]) => void) | undefined)?.(percentages);
      }}
      orientation={
        orientation === "vertical" || direction === "vertical"
          ? "vertical"
          : "horizontal"
      }
      style={{ height: 300, ...(props.style as React.CSSProperties) }}
    >
      {findParts(children, ["ResizablePanel"]).map((panel, index) => (
        <Splitter.Panel
          key={panel.key ?? index}
          {...panel.props}
          defaultSize={
            typeof panel.props.defaultSize === "number"
              ? panel.props.defaultSize + "%"
              : (panel.props.defaultSize as string | undefined)
          }
          min={
            typeof panel.props.minSize === "number"
              ? panel.props.minSize + "%"
              : (panel.props.minSize as string | undefined)
          }
          max={
            typeof panel.props.maxSize === "number"
              ? panel.props.maxSize + "%"
              : (panel.props.maxSize as string | undefined)
          }
        >
          {panel.props.children}
        </Splitter.Panel>
      ))}
    </Splitter>
  );
}
