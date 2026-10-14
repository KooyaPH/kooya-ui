import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../../../../../../../adapters/data.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const subscriptions = [
    {
        service: "Vercel Pro",
        plan: "Pro",
        planVariant: "default",
        billing: "$20/mo",
        nextBilling: "Mar 1, 2025",
        status: "Active",
        statusVariant: "success-light",
    },
    {
        service: "GitHub Enterprise",
        plan: "Enterprise",
        planVariant: "info",
        billing: "$21/user/mo",
        nextBilling: "Mar 15, 2025",
        status: "Active",
        statusVariant: "success-light",
    },
    {
        service: "Figma Organization",
        plan: "Organization",
        planVariant: "warning-light",
        billing: "$45/editor/mo",
        nextBilling: "Apr 1, 2025",
        status: "Active",
        statusVariant: "success-light",
    },
    {
        service: "Slack Business+",
        plan: "Business+",
        planVariant: "secondary",
        billing: "$12.50/user/mo",
        nextBilling: "—",
        status: "Cancelled",
        statusVariant: "destructive-light",
    },
    {
        service: "Linear Standard",
        plan: "Standard",
        planVariant: "outline",
        billing: "$8/user/mo",
        nextBilling: "Mar 20, 2025",
        status: "Trial",
        statusVariant: "info-light",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-full max-w-2xl flex-col", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Service" }), _jsx(TableHead, { children: "Plan" }), _jsx(TableHead, { children: "Billing" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsx(TableBody, { children: subscriptions.map((sub) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium", children: sub.service }), _jsxs("span", { className: "text-muted-foreground text-xs", children: ["Next: ", sub.nextBilling] })] }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: sub.planVariant, size: "sm", children: sub.plan }) }), _jsx(TableCell, { className: "text-sm", children: sub.billing }), _jsx(TableCell, { children: _jsx(Badge, { variant: sub.statusVariant, size: "sm", children: sub.status }) }), _jsx(TableCell, { className: "text-right", children: _jsxs(Button, { variant: "ghost", size: "sm", className: "h-7", children: [_jsx(IconPlaceholder, { lucide: "SettingsIcon", tabler: "IconSettings", hugeicons: "SettingsIcon", phosphor: "GearIcon", remixicon: "RiSettings3Line", className: "size-3.5", "aria-hidden": "true" }), "Manage"] }) })] }, sub.service))) })] }) }));
}
