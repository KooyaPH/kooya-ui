import { createElement, type ComponentType } from "react";
import type { CatalogEntry, CollectionKind } from "./types";
import { advancedCompositionEntries } from "./advanced-compositions";
type DemoProps = { family?: string; alternate?: boolean; domain?: string };
type DemoModule = ComponentType<DemoProps>;
function entry(
  kind: CollectionKind,
  id: string,
  title: string,
  description: string,
  category: string,
  componentName: string,
  modulePath: string,
  loader: () => Promise<DemoModule>,
  code: () => Promise<{ default: string }>,
  props: DemoProps = {},
): CatalogEntry {
  const selectedProps: DemoProps =
    componentName === "DataWorkbench"
      ? { domain: props.domain ?? "projects" }
      : { family: props.family ?? id };
  return {
    id,
    kind,
    title,
    description,
    category,
    tags: [category, id, "Ant Design", "local state"],
    exportName: componentName,
    importPath: `apps/playground/src/site/collections/${modulePath}`,
    dependencies: ["@kooyaph/ui", "antd"],
    props: [
      {
        name: "alternate",
        description: "Switch the initial content or composition layout.",
      },
      {
        name: componentName === "DataWorkbench" ? "domain" : "family",
        description:
          "Select the demonstrated composition family. All state remains local.",
      },
    ],
    variants: [false, true].map((alternate) => ({
      id: `kooya-${kind}-${id}-${alternate ? "alternate" : "standard"}`,
      title: `${title} · ${alternate ? "Alternate" : "Standard"}`,
      description: `${description} ${alternate ? "Alternate composition." : "Standard composition."} Keyboard-operable native Ant controls; no backend connection.`,
      previewHeight:
        kind === "templates"
          ? 920
          : kind === "sections"
            ? 640
            : kind === "groups"
              ? 420
              : 720,
      load: async () => {
        const Demo = await loader();
        return {
          default: () => createElement(Demo, { ...selectedProps, alternate }),
        };
      },
      loadCode: async () =>
        `${(await code()).default}\n\n// Selected local example. Copy this module and its local imports alongside it.\n// Render inside your application's KooyaProvider.\nexport default function SelectedExample() {\n  return <${componentName}${Object.entries(
          selectedProps,
        )
          .map(([key, value]) => ` ${key}={${JSON.stringify(value)}}`)
          .join("")} alternate={${alternate}} />;\n}\n`,
    })),
  };
}
const groupFamilies = [
  [
    "actions",
    "Action and button groups",
    "Primary, secondary and overflow actions with local feedback.",
  ],
  [
    "input",
    "Input groups",
    "Compound address input with a real Ant Select and submit action.",
  ],
  [
    "field",
    "Labelled field groups",
    "Associated labels, Ant Form validation and save feedback.",
  ],
  [
    "choices",
    "Checkbox and radio groups",
    "Controlled notification channels and frequency choices.",
  ],
  [
    "avatars",
    "Avatar groups",
    "Team membership summary and local invitation selection.",
  ],
  [
    "filters",
    "Filter and search toolbar",
    "Controlled query, department filters and reset.",
  ],
  [
    "row-actions",
    "Row actions",
    "Open, duplicate, rename and archive row commands.",
  ],
  [
    "navigation",
    "Navigation groups",
    "Selected navigation updates its associated panel.",
  ],
  [
    "metrics",
    "Metric groups",
    "Responsive metrics update from local task creation.",
  ],
  [
    "status",
    "Status groups",
    "Accessible status labels tied to an actual toggle.",
  ],
  [
    "cards",
    "Card groups",
    "Related project cards with real local selection actions.",
  ],
];
const applicationFamilies = [
  ["app-shell", "Application shell"],
  ["header", "Application header"],
  ["sidebar", "Application sidebar"],
  ["authentication", "Authentication"],
  ["onboarding", "Onboarding"],
  ["dashboard", "Dashboard"],
  ["card", "Project cards"],
  ["dialog", "Confirmation dialog"],
  ["drawer", "Details drawer"],
  ["empty-state", "Empty state"],
  ["form", "Workspace form"],
  ["list", "Task list"],
  ["profile", "Team profile"],
  ["settings", "Workspace settings"],
  ["timeline", "Activity timeline"],
  ["statistics", "Statistics"],
  ["wizard", "Setup wizard"],
];
const workflowFamilies = [
  ["event-calendar", "Event calendar"],
  ["schedule", "Daily schedule"],
  ["kanban", "Kanban board"],
  ["gantt", "Gantt schedule"],
  ["upload", "Local uploads"],
  ["file-management", "File management"],
  ["notifications", "Notification center"],
];
const commerceFamilies = [
  ["product-card", "Product card"],
  ["category-grid", "Category grid"],
  ["product-grid", "Product grid"],
  ["filters", "Commerce filters"],
  ["product-details", "Product details"],
  ["comparison", "Product comparison"],
  ["wishlist", "Wishlist"],
  ["cart", "Shopping cart"],
  ["checkout", "Checkout"],
  ["coupon", "Coupon"],
  ["receipt", "Receipt"],
  ["reviews", "Product reviews"],
];
const sectionFamilies = [
  "navigation",
  "hero",
  "features",
  "benefits",
  "logos",
  "testimonials",
  "team",
  "statistics",
  "process",
  "integrations",
  "pricing",
  "comparison",
  "faq",
  "blog",
  "contact",
  "newsletter",
  "cta",
  "footer",
];
const templateFamilies = [
  "dashboard",
  "collection",
  "detail",
  "form",
  "wizard",
  "settings",
  "board",
  "inbox",
  "feed",
  "content",
  "media",
  "analytics",
  "audit",
  "profile",
  "business",
  "portal",
  "tool",
  "landing",
  "saas",
  "authentication",
  "onboarding",
  "storefront",
  "product",
  "cart",
  "checkout",
  "billing",
  "scheduling",
  "file-manager",
  "inventory",
  "users",
  "ai-assistant",
  "operations",
  "docs",
  "catalog",
];
const title = (value: string) =>
  value
    .split("-")
    .map((word) =>
      word === "ai"
        ? "AI"
        : word === "saas"
          ? "SaaS"
          : word === "faq"
            ? "FAQ"
            : word === "cta"
              ? "CTA"
              : word[0].toUpperCase() + word.slice(1),
    )
    .join(" ");
export const compositionEntries: CatalogEntry[] = [
  ...groupFamilies.map(([id, name, description]) =>
    entry(
      "groups",
      id,
      name,
      description,
      "groups",
      "GroupDemo",
      "groups.tsx",
      async () => (await import("../site/collections/groups")).GroupDemo,
      () => import("../site/collections/groups.tsx?raw"),
    ),
  ),
  ...applicationFamilies.map(([id, name]) =>
    entry(
      "blocks",
      `application-${id}`,
      name,
      "An Ant-based application composition with working local interactions.",
      "application",
      "ApplicationDemo",
      "applications.tsx",
      async () =>
        (await import("../site/collections/applications")).ApplicationDemo,
      () => import("../site/collections/applications.tsx?raw"),
      { family: id },
    ),
  ),
  entry(
    "blocks",
    "data-workbench",
    "Data workbench",
    "Sort, filter, paginate, select, edit, expand, group, hide, fix, resize, reorder, virtualize and export records.",
    "data",
    "DataWorkbench",
    "data.tsx",
    async () => (await import("../site/collections/data")).DataWorkbench,
    () => import("../site/collections/data.tsx?raw"),
    { domain: "projects" },
  ),
  ...[
    "crm",
    "users",
    "inventory",
    "billing",
    "bookings",
    "devops",
    "ai-operations",
  ].map((domain) =>
    entry(
      "blocks",
      `operations-${domain}`,
      title(domain),
      "A domain-specific collection with real record editing, filtering, selection and export.",
      "operations",
      "DataWorkbench",
      "data.tsx",
      async () => (await import("../site/collections/data")).DataWorkbench,
      () => import("../site/collections/data.tsx?raw"),
      { domain },
    ),
  ),
  ...workflowFamilies.map(([id, name]) =>
    entry(
      "blocks",
      id,
      name,
      "A complete local workflow with controlled state and useful actions.",
      "workflows",
      "WorkflowDemo",
      "workflows.tsx",
      async () => (await import("../site/collections/workflows")).WorkflowDemo,
      () => import("../site/collections/workflows.tsx?raw"),
    ),
  ),
  ...commerceFamilies.map(([id, name]) =>
    entry(
      "blocks",
      `commerce-${id}`,
      name,
      "A fictional store composition with local product, cart or checkout interactions.",
      "commerce",
      "CommerceDemo",
      "commerce.tsx",
      async () => (await import("../site/collections/commerce")).CommerceDemo,
      () => import("../site/collections/commerce.tsx?raw"),
      { family: id },
    ),
  ),
  ...advancedCompositionEntries,
  ...sectionFamilies.map((id) =>
    entry(
      "sections",
      id,
      title(id),
      "A complete fictional marketing section with usable local interactions.",
      "marketing",
      "SectionDemo",
      "sections.tsx",
      async () => (await import("../site/collections/sections")).SectionDemo,
      () => import("../site/collections/sections.tsx?raw"),
    ),
  ),
  ...templateFamilies.map((id) =>
    entry(
      "templates",
      id,
      title(id),
      "A complete page built from actual Ant controls and working Kooya compositions.",
      "pages",
      "TemplateDemo",
      "templates.tsx",
      async () => (await import("../site/collections/templates")).TemplateDemo,
      () => import("../site/collections/templates.tsx?raw"),
    ),
  ),
];
