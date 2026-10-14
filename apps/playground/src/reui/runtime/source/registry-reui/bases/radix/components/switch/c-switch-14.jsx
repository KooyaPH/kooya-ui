import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldContent, FieldGroup, FieldLabel, FieldTitle, } from "../../../../../../../adapters/layout.tsx";
import { Switch } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const features = [
    {
        id: "feat-analytics",
        title: "Analytics",
        description: "Track page views and user interactions",
        checked: true,
        icon: (_jsx(IconPlaceholder, { lucide: "BarChart3Icon", tabler: "IconChartBar", hugeicons: "ChartBarLineIcon", phosphor: "ChartBarIcon", remixicon: "RiBarChartBoxLine", "aria-hidden": "true", className: "size-4" })),
    },
    {
        id: "feat-logging",
        title: "Error Logging",
        description: "Capture and report runtime errors",
        checked: true,
        icon: (_jsx(IconPlaceholder, { lucide: "BugIcon", tabler: "IconBug", hugeicons: "Bug01Icon", phosphor: "BugIcon", remixicon: "RiBugLine", "aria-hidden": "true", className: "size-4" })),
    },
    {
        id: "feat-cdn",
        title: "CDN Caching",
        description: "Serve static assets from edge network",
        checked: false,
        icon: (_jsx(IconPlaceholder, { lucide: "GlobeIcon", tabler: "IconWorld", hugeicons: "Globe02Icon", phosphor: "GlobeSimpleIcon", remixicon: "RiGlobalLine", "aria-hidden": "true", className: "size-4" })),
    },
    {
        id: "feat-backup",
        title: "Auto Backup",
        description: "Daily snapshots of your database",
        checked: false,
        icon: (_jsx(IconPlaceholder, { lucide: "DatabaseIcon", tabler: "IconDatabase", hugeicons: "Database02Icon", phosphor: "DatabaseIcon", remixicon: "RiDatabase2Line", "aria-hidden": "true", className: "size-4" })),
    },
];
export default function Pattern() {
    return (_jsx(FieldGroup, { className: "grid w-full max-w-md grid-cols-2 gap-4", children: features.map((feature) => (_jsx(FieldLabel, { htmlFor: feature.id, className: "p-0!", children: _jsxs(Field, { orientation: "horizontal", children: [_jsx(FieldContent, { children: _jsxs(FieldTitle, { className: "flex items-start gap-2", children: [_jsx("div", { className: "bg-background border-border flex shrink-0 items-center justify-center rounded-md border p-1.5 shadow-xs shadow-black/5", children: feature.icon }), _jsxs("div", { className: "flex flex-col items-start gap-0.5", children: [_jsx("span", { className: "text-sm font-semibold", children: feature.title }), _jsx("span", { className: "text-muted-foreground text-xs", children: feature.description })] })] }) }), _jsx(Switch, { id: feature.id, defaultChecked: feature.checked, size: "sm" })] }) }, feature.id))) }));
}
