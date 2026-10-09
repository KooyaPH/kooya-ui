import { useDeviceMode } from "../foundations/device";
import { useState, type ReactNode } from "react";
import { Card, MetricCard } from "../molecules/index";
import {
  TemplateFrame,
  type TemplateProps,
  type SummaryMetric,
} from "./shared";
export interface DashboardTemplateProps extends TemplateProps {
  metrics: readonly SummaryMetric[];
  primary: ReactNode;
  aside?: ReactNode;
  /** Urgent/current work before metrics in every semantic reading order. */
  priority?: ReactNode;
  contextLabel?: string;
}
export function DashboardTemplate({
  metrics,
  primary,
  aside,
  priority,
  contextLabel = "More context",
  ...props
}: DashboardTemplateProps) {
  const device = useDeviceMode();
  const [contextOpen, setContextOpen] = useState(device !== "mobile");
  return (
    <TemplateFrame {...props}>
      {priority}
      <div className="ku-template-metrics">
        {metrics.map((m) => (
          <MetricCard
            key={m.id}
            label={m.label}
            value={m.value}
            detail={m.detail ?? ""}
          />
        ))}
      </div>
      <div className="ku-template-split">
        <div>{primary}</div>
        {aside && (
          <aside className="ku-context-column">
            <details
              open={contextOpen}
              onToggle={(event) => setContextOpen(event.currentTarget.open)}
            >
              <summary>{contextLabel}</summary>
              {aside}
            </details>
          </aside>
        )}
      </div>
      {props.children}
    </TemplateFrame>
  );
}
export interface AnalyticsPoint {
  id: string;
  label: string;
  value: number;
}
export interface AnalyticsTemplateProps extends TemplateProps {
  metrics: readonly SummaryMetric[];
  points: readonly AnalyticsPoint[];
  period: string;
  periods: readonly { id: string; label: string }[];
  onPeriodChange: (period: string) => void;
  chart?: ReactNode;
}
import { FilterChip } from "../atoms/index";
export function AnalyticsTemplate({
  metrics,
  points,
  period,
  periods,
  onPeriodChange,
  chart,
  ...props
}: AnalyticsTemplateProps) {
  const max = Math.max(1, ...points.map((p) => p.value));
  return (
    <TemplateFrame {...props}>
      <div
        className="ku-template-toolbar"
        role="group"
        aria-label="Analytics period"
      >
        {periods.map((p) => (
          <FilterChip
            key={p.id}
            selected={p.id === period}
            onClick={() => onPeriodChange(p.id)}
          >
            {p.label}
          </FilterChip>
        ))}
      </div>
      <div className="ku-template-metrics">
        {metrics.map((m) => (
          <MetricCard
            key={m.id}
            label={m.label}
            value={m.value}
            detail={m.detail ?? ""}
          />
        ))}
      </div>
      <Card title="Usage over time">
        {chart ?? (
          <ul className="ku-template-chart" aria-label="Usage by period">
            {points.map((p) => (
              <li key={p.id}>
                <span>{p.label}</span>
                <meter aria-label={p.label} min={0} max={max} value={p.value}>
                  {p.value}
                </meter>
                <strong>{p.value.toLocaleString()}</strong>
              </li>
            ))}
          </ul>
        )}
      </Card>
      {props.children}
    </TemplateFrame>
  );
}
