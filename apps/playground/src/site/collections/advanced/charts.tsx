import { useState } from "react";
import { useKooyaOptions } from "@kooyaph/ui";
import { Area, Bar, Line, Pie, DualAxes, Gauge } from "@ant-design/charts";
import { Select, Table, Typography } from "@kooyaph/ui/components";
import "./advanced.css";

export type ChartKind =
  | "area"
  | "bar"
  | "line"
  | "donut"
  | "combined"
  | "gauge"
  | "sparkline"
  | "status";
export interface ChartDemoProps {
  kind?: ChartKind;
  alternate?: boolean;
}
export function chartData(period: string, alternate = false) {
  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => ({
    day,
    value: (i + 3) * (period === "month" ? 32 : 8) + (alternate ? 12 : 0),
    target: 70,
    status: i === 3 ? "Delayed" : "Healthy",
  }));
}
export default function ChartDemo({
  kind = "area",
  alternate = false,
}: ChartDemoProps) {
  const { mode } = useKooyaOptions();
  const [period, setPeriod] = useState("week");
  const data = chartData(period, alternate);
  const base = {
    data,
    xField: "day",
    yField: "value",
    height: 240,
    animate: false,
    color: mode === "dark" ? "#d7f20f" : "#314300",
    theme: mode,
  };
  const chart =
    kind === "area" ? (
      <Area {...base} />
    ) : kind === "bar" ? (
      <Bar {...base} />
    ) : kind === "line" || kind === "sparkline" ? (
      <Line
        {...base}
        height={kind === "sparkline" ? 90 : 240}
        axis={kind === "sparkline" ? false : undefined}
      />
    ) : kind === "donut" ? (
      <Pie
        theme={mode}
        data={data}
        angleField="value"
        colorField="day"
        innerRadius={alternate ? 0 : 0.65}
        height={240}
        animate={false}
      />
    ) : kind === "combined" ? (
      <DualAxes
        theme={mode}
        data={data}
        xField="day"
        children={[
          { type: "interval", yField: "value" },
          { type: "line", yField: "target", style: { stroke: "#1d46d9" } },
        ]}
        height={240}
        animate={false}
      />
    ) : kind === "gauge" ? (
      <Gauge
        theme={mode}
        data={{ target: alternate ? 86 : 72, total: 100 }}
        height={240}
        animate={false}
      />
    ) : (
      <Bar
        theme={mode}
        data={data}
        xField="day"
        yField="value"
        colorField="status"
        height={240}
        animate={false}
      />
    );
  return (
    <section className="advanced-demo" aria-label={`${kind} chart`}>
      <div className="advanced-toolbar">
        <Typography.Title level={4}>Weekly operations</Typography.Title>
        <Select
          aria-label="Chart period"
          value={period}
          onChange={setPeriod}
          options={[
            { value: "week", label: "This week" },
            { value: "month", label: "Monthly projection" },
          ]}
        />
      </div>
      {chart}
      <Typography.Paragraph>
        Fictional local data.{" "}
        {kind === "gauge"
          ? `Goal completion: ${alternate ? 86 : 72} of 100 (percent).`
          : "Exact values are available below."}
      </Typography.Paragraph>
      <Table
        size="small"
        pagination={false}
        rowKey="day"
        dataSource={data}
        columns={[
          { title: "Day", dataIndex: "day" },
          { title: "Completed", dataIndex: "value" },
          ...(kind === "combined"
            ? [{ title: "Target", dataIndex: "target" }]
            : []),
          ...(kind === "status"
            ? [{ title: "Status", dataIndex: "status" }]
            : []),
        ]}
      />
    </section>
  );
}
export { ChartDemo };
