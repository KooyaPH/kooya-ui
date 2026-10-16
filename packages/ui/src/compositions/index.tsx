import type { CSSProperties, ReactNode } from "react";
import { Flex, Statistic, Tag } from "antd";
import { ExpandableText } from "../molecules/text";
import { DataValue, useDataLoading } from "../molecules/experience";
export interface ActionBarProps {
  children: ReactNode;
  primary?: ReactNode;
  align?: "start" | "end" | "between";
  label?: string;
}
/** Compose real Ant controls without replacing their props or event contracts. */
export function ActionBar({
  children,
  primary,
  align = "start",
  label = "Actions",
}: ActionBarProps) {
  return (
    <Flex
      role="group"
      aria-label={label}
      gap={12}
      wrap
      align="center"
      justify={
        align === "between"
          ? "space-between"
          : align === "end"
            ? "flex-end"
            : "flex-start"
      }
    >
      <Flex gap={8} wrap>
        {children}
      </Flex>
      {primary}
    </Flex>
  );
}
export interface FieldGroupProps {
  label: ReactNode;
  htmlFor: string;
  help?: ReactNode;
  required?: boolean;
  children: ReactNode;
}
export function FieldGroup({
  label,
  htmlFor,
  help,
  required,
  children,
}: FieldGroupProps) {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <label htmlFor={htmlFor} style={{ fontWeight: 600 }}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {help && (
        <div id={`${htmlFor}-help`} style={{ fontSize: 12, opacity: 0.8 }}>
          {help}
        </div>
      )}
    </div>
  );
}
export interface MetricGroupProps {
  metrics: {
    key: string;
    label: ReactNode;
    value: number | string;
    prefix?: ReactNode;
    suffix?: ReactNode;
    detail?: ReactNode;
  }[];
}
export function MetricGroup({ metrics }: MetricGroupProps) {
  const loading = useDataLoading();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
        gap: 16,
      }}
    >
      {metrics.map((metric) => (
        <div
          key={metric.key}
          style={{
            padding: 20,
            border: "1px solid var(--ku-line, #d3d0c4)",
            borderRadius: 10,
          }}
        >
          <Statistic
            styles={{ title: { color: "var(--ku-muted, #66614f)" } }}
            title={metric.label}
            value={metric.value}
            formatter={loading ? () => <DataValue loading /> : undefined}
            prefix={loading ? undefined : metric.prefix}
            suffix={loading ? undefined : metric.suffix}
          />
          {metric.detail && (
            <p style={{ fontSize: 12, margin: "8px 0 0" }}>
              <DataValue>{metric.detail}</DataValue>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
export interface StatusGroupProps {
  items: { key: string; label: ReactNode; color?: string }[];
  label?: string;
}
export function StatusGroup({ items, label = "Statuses" }: StatusGroupProps) {
  return (
    <Flex role="group" aria-label={label} gap={8} wrap>
      {items.map((item) => (
        <Tag key={item.key} color={item.color}>
          {item.label}
        </Tag>
      ))}
    </Flex>
  );
}
export interface PageFrameProps {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
}
export function PageFrame({
  title,
  description,
  actions,
  aside,
  children,
  style,
}: PageFrameProps) {
  return (
    <section style={{ display: "grid", gap: 24, minWidth: 0, ...style }}>
      <Flex justify="space-between" align="center" gap={16} wrap>
        <div>
          <h1 style={{ fontSize: 28, lineHeight: 1.2, margin: "0 0 8px" }}>
            {title}
          </h1>
          {description &&
            (typeof description === "string" ? (
              <ExpandableText text={description} />
            ) : (
              <div>{description}</div>
            ))}
        </div>
        {actions}
      </Flex>
      <Flex gap={24} wrap align="start">
        <div style={{ flex: "1 1 420px", minWidth: 0 }}>{children}</div>
        {aside && (
          <aside style={{ flex: "1 1 240px", minWidth: 0 }}>{aside}</aside>
        )}
      </Flex>
    </section>
  );
}

export * from "./workspace";
export * from "./appearance";
export * from "./authorization";

export * from "./public";
export * from "./swimlane";
