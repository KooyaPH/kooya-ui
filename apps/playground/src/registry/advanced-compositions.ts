import { createElement } from "react";
import type { CatalogEntry } from "./types";
import type { ChartKind } from "../site/collections/advanced/charts";

const localPath = "apps/playground/src/site/collections/advanced/";
function chartEntry(kind: ChartKind, title: string): CatalogEntry {
  return {
    id: `advanced-chart-${kind}`,
    kind: "blocks",
    category: "charts",
    title,
    description: `${title} with local period selection and accessible numeric values.`,
    tags: ["chart", "analytics", "local state"],
    exportName: "ChartDemo",
    importPath: `${localPath}charts`,
    dependencies: ["@kooyaph/ui", "@ant-design/charts"],
    props: [
      {
        name: "kind",
        description:
          "area | bar | line | donut | combined | gauge | sparkline | status",
      },
      {
        name: "alternate",
        description: "Use alternate sample data; donut becomes a pie.",
      },
    ],
    variants: [false, true].map((alternate) => ({
      id: `advanced-chart-${kind}-${alternate ? "alternate" : "standard"}`,
      title: alternate ? "Alternate" : "Standard",
      description:
        "Change the period; inspect the exact values below the chart.",
      previewHeight: 620,
      load: async () => {
        const module = await import("../site/collections/advanced/charts");
        return {
          default: () => createElement(module.default, { kind, alternate }),
        };
      },
      loadCode: async () =>
        `${(await import("../site/collections/advanced/charts.tsx?raw")).default}\n\n// Selected configuration inside your existing KooyaProvider:\n<ChartDemo kind="${kind}" alternate={${alternate}} />\n`,
    })),
  };
}
const demos = [
  {
    id: "flow-editor",
    title: "Flow editor",
    file: "flow",
    name: "FlowDemo",
    dependency: "@xyflow/react",
    description: "Add, connect, select, drag and remove workflow steps.",
    load: () => import("../site/collections/advanced/flow"),
    code: () => import("../site/collections/advanced/flow.tsx?raw"),
  },
  {
    id: "rich-text-editor",
    title: "Rich text editor",
    file: "editor",
    name: "RichTextDemo",
    localName: "EditorDemo",
    dependency: "@tiptap/react",
    description: "Format text, undo changes and save local HTML.",
    load: () => import("../site/collections/advanced/editor"),
    code: () => import("../site/collections/advanced/editor.tsx?raw"),
  },
  {
    id: "whiteboard",
    title: "Whiteboard",
    file: "whiteboard",
    name: "WhiteboardDemo",
    dependency: "@excalidraw/excalidraw",
    description: "Draw and edit local shapes with locally hosted engine fonts.",
    load: () => import("../site/collections/advanced/whiteboard"),
    code: () => import("../site/collections/advanced/whiteboard.tsx?raw"),
  },
  {
    id: "ai-assistant",
    title: "AI assistant",
    file: "assistant",
    name: "AssistantDemo",
    dependency: "@ant-design/x",
    description:
      "Local prompt replies, conversation history, attachment names and activity steps.",
    load: () => import("../site/collections/advanced/assistant"),
    code: () => import("../site/collections/advanced/assistant.tsx?raw"),
  },
];
export const advancedCompositionEntries: CatalogEntry[] = [
  ...(
    [
      "area",
      "bar",
      "line",
      "donut",
      "combined",
      "gauge",
      "sparkline",
      "status",
    ] as ChartKind[]
  ).map((kind) =>
    chartEntry(
      kind,
      {
        area: "Area chart",
        bar: "Bar chart",
        line: "Line chart",
        donut: "Pie and donut chart",
        combined: "Combined chart",
        gauge: "Radial gauge",
        sparkline: "Sparkline",
        status: "Status tracker",
      }[kind],
    ),
  ),
  ...demos.map((demo) => ({
    id: `advanced-${demo.id}`,
    kind: "blocks" as const,
    category: demo.id === "ai-assistant" ? "ai" : "advanced",
    title: demo.title,
    description: demo.description,
    tags: ["advanced", "local state", demo.id],
    exportName: demo.name,
    importPath: `${localPath}${demo.file}`,
    dependencies: [
      "@kooyaph/ui",
      demo.dependency,
      ...(demo.id === "rich-text-editor" ? ["@tiptap/starter-kit"] : []),
    ],
    props: [
      {
        name: "alternate",
        description: "Use alternate initial local content.",
      },
    ],
    variants: [false, true].map((alternate) => ({
      id: `advanced-${demo.id}-${alternate ? "alternate" : "standard"}`,
      title: alternate ? "Alternate" : "Standard",
      description: demo.description,
      previewHeight: 640,
      load: async () => {
        const module = await demo.load();
        return { default: () => createElement(module.default, { alternate }) };
      },
      loadCode: async () =>
        `${(await demo.code()).default}\n\n// Selected configuration inside your existing KooyaProvider:\n<${demo.localName ?? demo.name} alternate={${alternate}} />\n`,
    })),
  })),
];
