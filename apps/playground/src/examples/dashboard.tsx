import { useState } from "react";
import {
  DashboardTemplate,
  AnalyticsTemplate,
  Card,
  Button,
  Checkbox,
  type TemplateState,
} from "@kooyaph/ui";
const metrics = [
  {
    id: "active",
    label: "Active projects",
    value: "12",
    detail: "Across three teams",
  },
  {
    id: "review",
    label: "Ready for review",
    value: "4",
    detail: "Two due this week",
  },
  {
    id: "capacity",
    label: "Team capacity",
    value: "76%",
    detail: "24% available",
  },
];
export function DashboardExample({ state }: { state?: TemplateState }) {
  const [done, setDone] = useState(false);
  return (
    <DashboardTemplate
      title="Studio overview"
      description="A fictional workspace dashboard with a local checklist."
      state={state}
      metrics={metrics}
      primary={
        <Card title="Today’s priorities">
          <Checkbox
            label="Review the launch brief"
            checked={done}
            onChange={(e) => setDone(e.target.checked)}
          />
          <p role="status">
            {done ? "Brief reviewed." : "One review waiting."}
          </p>
        </Card>
      }
      aside={
        <Card title="Team availability">
          <p>Maya Chen · Design</p>
          <p>Jordan Lee · Content</p>
        </Card>
      }
    />
  );
}
export function AnalyticsExample({ state }: { state?: TemplateState }) {
  const [period, setPeriod] = useState("week");
  const [exported, setExported] = useState(false);
  return (
    <AnalyticsTemplate
      title="Usage & allowances"
      state={state}
      period={period}
      periods={[
        { id: "week", label: "This week" },
        { id: "month", label: "This month" },
      ]}
      onPeriodChange={setPeriod}
      metrics={metrics}
      points={(period === "week"
        ? [24, 38, 31, 52, 45]
        : [108, 146, 120, 182]
      ).map((value, i) => ({
        id: String(i),
        label:
          period === "week"
            ? ["Mon", "Tue", "Wed", "Thu", "Fri"][i]
            : "Week " + (i + 1),
        value,
      }))}
      actions={
        <Button onClick={() => setExported(true)}>Prepare report</Button>
      }
    >
      {exported && (
        <p role="status">
          Local report prepared for{" "}
          {period === "week" ? "this week" : "this month"}.
        </p>
      )}
    </AnalyticsTemplate>
  );
}
