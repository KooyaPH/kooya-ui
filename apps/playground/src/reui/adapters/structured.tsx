/** REUI compound composition bridges over actual Ant Steps, Timeline and Tag. */
import React, {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Button,
  Steps,
  Tag,
  Timeline as AntTimeline,
  type ButtonProps,
  type GetRef,
  type TagProps,
} from "@kooyaph/ui/components";
import { contrastRatio, useKooyaOptions } from "@kooyaph/ui/foundations";
import { findParts, role, text, type PartProps } from "./parts";

type StepState = "active" | "completed" | "inactive" | "loading";
type StepIndicators = Partial<Record<StepState, ReactNode>>;
type Orientation = "horizontal" | "vertical";
export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  orientation?: Orientation;
  indicators?: StepIndicators;
}
export interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
  completed?: boolean;
  disabled?: boolean;
  loading?: boolean;
}
export interface StepperTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}
export interface StepperContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  forceMount?: boolean;
}
interface StepperContextValue {
  activeStep: number;
  setActiveStep: (step: number) => void;
  stepsCount: number;
  orientation: Orientation;
  indicators: StepIndicators;
  baseId: string;
  registerTrigger: (node: HTMLButtonElement | null) => void;
  triggerNodes: HTMLButtonElement[];
  focusNext: (index: number) => void;
  focusPrev: (index: number) => void;
  focusFirst: () => void;
  focusLast: () => void;
}
interface StepItemContextValue {
  step: number;
  state: StepState;
  isDisabled: boolean;
  isLoading: boolean;
}
const StepperContext = createContext<StepperContextValue | null>(null);
const StepItemContext = createContext<StepItemContextValue | null>(null);
export function useStepper() {
  const context = useContext(StepperContext);
  if (!context) throw Error("useStepper must be used within a Stepper");
  return context;
}
export function useStepItem() {
  const context = useContext(StepItemContext);
  if (!context) throw Error("useStepItem must be used within a StepperItem");
  return context;
}
function mark<T extends (...args: never[]) => unknown>(
  component: T,
  name: string,
): T {
  Object.assign(component, { recipeRole: name, displayName: name });
  return component;
}
function scopedParts(
  children: ReactNode,
  names: string[],
): React.ReactElement<PartProps>[] {
  const result: React.ReactElement<PartProps>[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement<PartProps>(child)) return;
    const name = role(child);
    if (names.includes(name ?? "")) result.push(child);
    else if (name !== "Stepper" && name !== "Timeline")
      result.push(...scopedParts(child.props.children, names));
  });
  return result;
}
export function Stepper({
  value,
  defaultValue = 1,
  onValueChange,
  orientation = "horizontal",
  indicators = {},
  children,
  className,
  ...props
}: StepperProps) {
  const [local, setLocal] = useState(defaultValue);
  const activeStep = value ?? local;
  const baseId = useId();
  const root = useRef<HTMLDivElement>(null);
  const triggerNodes = () =>
    Array.from(
      root.current?.querySelectorAll<HTMLButtonElement>(
        `[data-stepper-owner="${baseId}"]`,
      ) ?? [],
    );
  const focusAt = (index: number, direction: number) => {
    const nodes = triggerNodes();
    for (let count = 0; count < nodes.length; count++) {
      const node =
        nodes[(index + direction * count + nodes.length) % nodes.length];
      if (
        node &&
        !node.disabled &&
        node.getAttribute("aria-disabled") !== "true"
      ) {
        node.focus();
        return;
      }
    }
  };
  const context: StepperContextValue = {
    activeStep,
    setActiveStep: (next) => {
      if (value === undefined) setLocal(next);
      onValueChange?.(next);
    },
    stepsCount: scopedParts(children, ["StepperItem"]).length,
    orientation,
    indicators,
    baseId,
    registerTrigger: () => {},
    get triggerNodes() {
      return triggerNodes();
    },
    focusNext: (index) => focusAt(index + 1, 1),
    focusPrev: (index) => focusAt(index - 1, -1),
    focusFirst: () => focusAt(0, 1),
    focusLast: () => focusAt(triggerNodes().length - 1, -1),
  };
  return (
    <StepperContext.Provider value={context}>
      <div
        {...props}
        ref={root}
        className={className}
        data-slot="stepper"
        data-orientation={orientation}
      >
        {children}
      </div>
    </StepperContext.Provider>
  );
}
mark(Stepper, "Stepper");
export function StepperItem({
  step,
  completed = false,
  disabled = false,
  loading = false,
  children,
  className,
  ...props
}: StepperItemProps) {
  const { activeStep } = useStepper();
  const state =
    completed || step < activeStep
      ? "completed"
      : step === activeStep
        ? "active"
        : "inactive";
  const isLoading = loading && step === activeStep;
  return (
    <StepItemContext.Provider
      value={{ step, state, isDisabled: disabled, isLoading }}
    >
      <div
        {...props}
        className={["group/step min-w-0", className].filter(Boolean).join(" ")}
        data-slot="stepper-item"
        data-state={state}
        data-loading={isLoading || undefined}
      >
        {children}
      </div>
    </StepItemContext.Provider>
  );
}
mark(StepperItem, "StepperItem");
export function StepperNav({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const context = useStepper();
  const items = scopedParts(children, ["StepperItem"]);
  return (
    <nav
      {...props}
      className={["group/stepper-nav", className].filter(Boolean).join(" ")}
      data-slot="stepper-nav"
      data-orientation={context.orientation}
      data-state={context.activeStep}
      role="tablist"
      aria-orientation={context.orientation}
    >
      <Steps
        orientation={context.orientation}
        responsive={false}
        current={Math.max(
          0,
          items.findIndex(
            (item) => Number(item.props.step) === context.activeStep,
          ),
        )}
        iconRender={() => null}
        styles={{
          itemRail: { display: "none" },
          itemSection: { width: "100%", minWidth: 0 },
          itemHeader: { width: "100%" },
          itemTitle: { width: "100%", whiteSpace: "normal" },
        }}
        items={items.map((item, index) => ({
          key: item.key ?? String(item.props.step),
          disabled: !!item.props.disabled,
          status:
            item.props.completed || Number(item.props.step) < context.activeStep
              ? "finish"
              : Number(item.props.step) === context.activeStep
                ? "process"
                : "wait",
          title: item,
          style: {
            minWidth: 0,
            flex: context.orientation === "horizontal" ? "1 1 0" : undefined,
          },
        }))}
      />
    </nav>
  );
}
mark(StepperNav, "StepperNav");
export function StepperTrigger({
  asChild,
  children,
  onClick,
  onKeyDown,
  tabIndex,
  disabled,
  ...props
}: StepperTriggerProps) {
  const context = useStepper(),
    item = useStepItem();
  const ref = useRef<GetRef<typeof Button>>(null);
  const blocked = disabled || item.isDisabled;
  const activate = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!blocked && !event.defaultPrevented) context.setActiveStep(item.step);
  };
  const keyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (blocked || event.defaultPrevented) return;
    const index = context.triggerNodes.indexOf(
      ref.current as HTMLButtonElement,
    );
    if (
      [
        "ArrowRight",
        "ArrowDown",
        "ArrowLeft",
        "ArrowUp",
        "Home",
        "End",
      ].includes(event.key)
    ) {
      event.preventDefault();
      if (event.key === "Home") context.focusFirst();
      else if (event.key === "End") context.focusLast();
      else if (event.key === "ArrowRight" || event.key === "ArrowDown")
        context.focusNext(index);
      else context.focusPrev(index);
    }
  };
  const native: ButtonProps = {
    ...props,
    ref,
    type: "text",
    htmlType: "button",
    role: "tab",
    id: props.id ?? `${context.baseId}-tab-${item.step}`,
    "aria-selected": context.activeStep === item.step,
    "aria-controls":
      props["aria-controls"] ?? `${context.baseId}-panel-${item.step}`,
    "aria-label":
      props["aria-label"] ?? (text(children).trim() || `Step ${item.step}`),
    tabIndex: tabIndex ?? (context.activeStep === item.step ? 0 : -1),
    disabled: blocked,
    onClick: activate,
    onKeyDown: keyDown,
    "data-slot": "stepper-trigger",
    "data-state": item.state,
    "data-loading": String(item.isLoading),
    "data-stepper-owner": context.baseId,
  } as ButtonProps;
  if (
    asChild &&
    isValidElement<React.ButtonHTMLAttributes<HTMLButtonElement>>(children)
  ) {
    const { htmlType, type: _buttonType, ...domProps } = native;
    return React.cloneElement(children, {
      ...domProps,
      type: htmlType,
      ref: (node: HTMLButtonElement | null) => {
        ref.current = node;
      },
      onClick: (event) => {
        children.props.onClick?.(event);
        activate(event);
      },
      onKeyDown: (event) => {
        children.props.onKeyDown?.(event);
        keyDown(event);
      },
    } as React.ButtonHTMLAttributes<HTMLButtonElement>);
  }
  return <Button {...native}>{children}</Button>;
}
mark(StepperTrigger, "StepperTrigger");
export function StepperIndicator({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { state, isLoading } = useStepItem(),
    { indicators } = useStepper();
  return (
    <div
      {...props}
      className={[
        "relative inline-flex shrink-0 items-center justify-center rounded-full text-xs",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-slot="stepper-indicator"
      data-state={state}
      data-loading={isLoading || undefined}
      aria-busy={isLoading || undefined}
      style={{
        minWidth: 24,
        minHeight: 24,
        background:
          state === "inactive" ? "var(--ku-subtle)" : "var(--ku-accent)",
        color: state === "inactive" ? "var(--ku-ink)" : "var(--ku-accent-ink)",
        ...props.style,
      }}
    >
      {(isLoading ? indicators.loading : indicators[state]) ?? children}
    </div>
  );
}
mark(StepperIndicator, "StepperIndicator");
export function StepperSeparator({
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { state } = useStepItem(),
    { orientation } = useStepper();
  return (
    <div
      {...props}
      aria-hidden="true"
      data-slot="stepper-separator"
      data-state={state}
      className={className}
      style={{
        background:
          state === "completed" ? "var(--ku-focus)" : "var(--ku-line)",
        height: orientation === "horizontal" ? 2 : 24,
        width: orientation === "vertical" ? 2 : "100%",
        ...style,
      }}
    />
  );
}
mark(StepperSeparator, "StepperSeparator");
export function StepperTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  const { state } = useStepItem();
  return <h3 {...props} data-slot="stepper-title" data-state={state} />;
}
mark(StepperTitle, "StepperTitle");
export function StepperDescription(
  props: React.HTMLAttributes<HTMLDivElement>,
) {
  const { state } = useStepItem();
  return <div {...props} data-slot="stepper-description" data-state={state} />;
}
mark(StepperDescription, "StepperDescription");
export function StepperPanel(props: React.HTMLAttributes<HTMLDivElement>) {
  const { activeStep } = useStepper();
  return <div {...props} data-slot="stepper-panel" data-state={activeStep} />;
}
mark(StepperPanel, "StepperPanel");
export function StepperContent({
  value,
  forceMount,
  ...props
}: StepperContentProps) {
  const { activeStep, baseId } = useStepper();
  const active = value === activeStep;
  if (!active && !forceMount) return null;
  return (
    <div
      {...props}
      role="tabpanel"
      id={props.id ?? `${baseId}-panel-${value}`}
      aria-labelledby={props["aria-labelledby"] ?? `${baseId}-tab-${value}`}
      hidden={!active}
      data-slot="stepper-content"
      data-state={activeStep}
    />
  );
}
mark(StepperContent, "StepperContent");

interface TimelineContextValue {
  activeStep: number;
  setActiveStep: (step: number) => void;
}
const TimelineContext = createContext<TimelineContextValue | null>(null);
export function useTimeline() {
  const value = useContext(TimelineContext);
  if (!value) throw Error("useTimeline must be used within a Timeline");
  return value;
}
export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  orientation?: Orientation;
}
function stripParts(children: ReactNode, names: string[]): ReactNode {
  return Children.map(children, (child) => {
    if (!isValidElement<PartProps>(child)) return child;
    if (names.includes(role(child) ?? "")) return null;
    return child.props.children
      ? React.cloneElement(child, {}, stripParts(child.props.children, names))
      : child;
  });
}
export function Timeline({
  children,
  value,
  defaultValue = 1,
  onValueChange,
  orientation = "vertical",
  ...props
}: TimelineProps) {
  const [local, setLocal] = useState(defaultValue),
    activeStep = value ?? local;
  const context = {
    activeStep,
    setActiveStep: (next: number) => {
      if (value === undefined) setLocal(next);
      onValueChange?.(next);
    },
  };
  const items = scopedParts(children, ["TimelineItem"]);
  return (
    <TimelineContext.Provider value={context}>
      <div {...props} data-slot="timeline" data-orientation={orientation}>
        <AntTimeline
          orientation={orientation}
          items={items.map((item, index) => ({
            key: item.key ?? String(item.props.step),
            color:
              Number(item.props.step) <= activeStep
                ? "var(--ku-focus)"
                : "var(--ku-line)",
            icon:
              scopedParts(item.props.children, ["TimelineIndicator"])[0] ??
              undefined,
            content: React.cloneElement(
              item,
              {},
              stripParts(item.props.children, [
                "TimelineIndicator",
                "TimelineSeparator",
              ]),
            ),
          }))}
        />
      </div>
    </TimelineContext.Provider>
  );
}
mark(Timeline, "Timeline");
export function TimelineItem({
  step,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { step: number }) {
  const { activeStep } = useTimeline();
  return (
    <div
      {...props}
      className={["group/timeline-item", className].filter(Boolean).join(" ")}
      data-slot="timeline-item"
      data-completed={step <= activeStep || undefined}
    />
  );
}
mark(TimelineItem, "TimelineItem");
export function TimelineContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} data-slot="timeline-content" />;
}
mark(TimelineContent, "TimelineContent");
export function TimelineHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} data-slot="timeline-header" />;
}
mark(TimelineHeader, "TimelineHeader");
export function TimelineTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 {...props} data-slot="timeline-title" />;
}
mark(TimelineTitle, "TimelineTitle");
export function TimelineDate({
  asChild,
  children,
  ...props
}: React.TimeHTMLAttributes<HTMLTimeElement> & { asChild?: boolean }) {
  if (asChild && isValidElement(children))
    return React.cloneElement(children, {
      ...props,
      "data-slot": "timeline-date",
    } as React.HTMLAttributes<HTMLElement>);
  return (
    <time {...props} data-slot="timeline-date">
      {children}
    </time>
  );
}
mark(TimelineDate, "TimelineDate");
export function TimelineIndicator({
  asChild,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean }) {
  if (asChild && isValidElement(children))
    return React.cloneElement(children, {
      ...props,
      "aria-hidden": true,
      "data-slot": "timeline-indicator",
    } as React.HTMLAttributes<HTMLElement>);
  return (
    <span {...props} aria-hidden="true" data-slot="timeline-indicator">
      {children ?? (
        <span
          style={{
            display: "block",
            width: 12,
            height: 12,
            borderRadius: "50%",
            border: "2px solid currentColor",
          }}
        />
      )}
    </span>
  );
}
mark(TimelineIndicator, "TimelineIndicator");
export function TimelineSeparator() {
  return null;
}
mark(TimelineSeparator, "TimelineSeparator");

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: string | null;
  size?: "xs" | "sm" | "default" | "lg" | "xl" | null;
  radius?: "default" | "full" | null;
  asChild?: boolean;
};
export function badgeVariants({
  variant = "default",
  size = "default",
  radius = "default",
  className = "",
}: Pick<BadgeProps, "variant" | "size" | "radius" | "className"> = {}) {
  return [
    `reui-badge-${variant ?? "default"}`,
    `reui-badge-size-${size ?? "default"}`,
    radius === "full" ? "rounded-full" : "rounded-sm",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}
export function Badge({
  variant = "default",
  size = "default",
  radius = "default",
  asChild,
  children,
  className,
  style,
  ...props
}: BadgeProps) {
  const { variables } = useKooyaOptions();
  const v = (key: string) => String(variables[`--ku-${key}`] ?? "");
  const semantic = variant?.split("-")[0] ?? "default";
  const tone =
    semantic === "primary" || semantic === "default"
      ? "accent"
      : semantic === "destructive"
        ? "danger"
        : semantic === "invert"
          ? "ink"
          : semantic === "secondary"
            ? "subtle"
            : semantic;
  const outline = variant === "outline" || variant?.endsWith("-outline"),
    light = variant?.endsWith("-light");
  const background = outline
    ? "transparent"
    : light
      ? v("subtle")
      : v(tone) || v("subtle");
  const foreground =
    semantic === "secondary" || variant === "outline"
      ? v("ink")
      : outline || light
        ? ["default", "primary"].includes(semantic)
          ? v("focus")
          : v(tone) || v("ink")
        : contrastRatio(background, "#ffffff") >=
            contrastRatio(background, "#000000")
          ? "#ffffff"
          : "#000000";
  const metric =
    size === "xs"
      ? { minHeight: 16, fontSize: 10 }
      : size === "sm"
        ? { minHeight: 18, fontSize: 11 }
        : size === "lg"
          ? { minHeight: 22, fontSize: 12 }
          : size === "xl"
            ? { minHeight: 24, fontSize: 14 }
            : { minHeight: 20, fontSize: 12 };
  return (
    <Tag
      {...(props as TagProps)}
      data-slot="badge"
      data-variant={variant}
      data-size={size}
      data-radius={radius}
      className={badgeVariants({ variant, size, radius, className })}
      style={{
        marginInlineEnd: 0,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        border:
          outline || light
            ? "1px solid var(--ku-line)"
            : "1px solid transparent",
        background,
        color: foreground,
        borderRadius: radius === "full" ? 999 : 4,
        paddingInline: size === "xl" ? 8 : 6,
        ...metric,
        ...style,
      }}
    >
      {asChild && isValidElement<React.HTMLAttributes<HTMLElement>>(children)
        ? React.cloneElement(children, {
            style: { color: "inherit", ...children.props.style },
          })
        : children}
    </Tag>
  );
}
mark(Badge, "Badge");
