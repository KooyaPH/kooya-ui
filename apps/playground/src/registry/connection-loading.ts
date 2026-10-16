import { createElement } from "react";
import type { CatalogEntry } from "./types";
export const connectionLoadingEntries: CatalogEntry[] = [
  {
    id: "application-authorization",
    kind: "groups",
    category: "authorization",
    title: "Application connection & authorization",
    description:
      "Review application identity, permissions and selected repositories before approving a connection. Includes progress, approval, cancellation and recovery.",
    tags: ["oauth", "github", "connect", "consent", "permissions", "approval"],
    exportName: "ApplicationAuthorization",
    importPath: "@kooyaph/ui",
    dependencies: ["@kooyaph/ui"],
    variants: (
      [
        "review",
        "repositories",
        "authorizing",
        "approved",
        "denied",
        "error",
        "long-text",
      ] as const
    ).map((variant) => ({
      id: `kooya-authorization-${variant}`,
      title:
        variant === "repositories"
          ? "Select repositories"
          : variant === "long-text"
            ? "Long application and account names"
            : variant.charAt(0).toUpperCase() + variant.slice(1),
      description:
        "Presentational local consent flow. No real authorization is performed.",
      previewHeight: variant === "long-text" ? 1200 : 1040,
      load: async () => {
        const { default: Demo } = await import(
          "../site/collections/authorization"
        );
        return { default: () => createElement(Demo, { variant }) };
      },
      loadCode: async () =>
        `${(await import("../site/collections/authorization.tsx?raw")).default}\n\n// Selected preview\n<AuthorizationDemo variant="${variant}" />`,
    })),
  },
  {
    id: "data-loading",
    kind: "groups",
    category: "feedback",
    title: "Data loading & skeletons",
    description:
      "Stable tables, metrics and detail containers. Skeletons replace data values; static structure and controls remain visible. Cached data remains during refresh.",
    tags: ["skeleton", "loading", "loader", "table", "refresh", "busy"],
    exportName: "DataValue, BusyBoundary, DataTable",
    importPath: "@kooyaph/ui/molecules",
    dependencies: ["@kooyaph/ui"],
    variants: ["table", "metrics", "detail", "action"].map((variant) => ({
      id: `kooya-data-loading-${variant}`,
      title:
        variant === "action"
          ? "Action progress"
          : `${variant.charAt(0).toUpperCase() + variant.slice(1)} values`,
      description:
        "Switch between first load, ready and background refresh. Static labels and structure never become skeletons.",
      previewHeight: 680,
      load: async () => {
        const { default: Demo } = await import("../site/collections/loading");
        return { default: () => createElement(Demo, { variant }) };
      },
      loadCode: async () =>
        `${(await import("../site/collections/loading.tsx?raw")).default}\n\n<LoadingPatterns variant="${variant}" />`,
    })),
  },
];
