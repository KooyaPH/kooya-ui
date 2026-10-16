import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../../../../../../../adapters/data.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const apiKeys = [
    {
        name: "Production API",
        token: "sk_live_••••••••4f3a",
        permissions: ["read", "write"],
        lastUsed: "2 minutes ago",
        status: "Active",
        statusVariant: "success-light",
    },
    {
        name: "Staging API",
        token: "sk_test_••••••••8b2c",
        permissions: ["read", "write", "admin"],
        lastUsed: "1 hour ago",
        status: "Active",
        statusVariant: "success-light",
    },
    {
        name: "CI/CD Pipeline",
        token: "sk_ci_••••••••1d9e",
        permissions: ["read"],
        lastUsed: "3 days ago",
        status: "Active",
        statusVariant: "success-light",
    },
    {
        name: "Legacy Integration",
        token: "sk_old_••••••••7a5f",
        permissions: ["read", "write"],
        lastUsed: "30 days ago",
        status: "Expired",
        statusVariant: "destructive-light",
    },
];
const permissionVariant = {
    read: "outline",
    write: "info-light",
    admin: "warning-light",
};
export default function Pattern() {
    return (_jsx(Card, { className: "mx-auto flex w-full max-w-2xl p-0", children: _jsx(CardContent, { className: "p-0", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Name" }), _jsx(TableHead, { children: "Key" }), _jsx(TableHead, { children: "Permissions" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsx(TableBody, { children: apiKeys.map((key) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium", children: key.name }), _jsxs("span", { className: "text-muted-foreground text-xs", children: ["Last used: ", key.lastUsed] })] }) }), _jsx(TableCell, { children: _jsx("code", { className: "bg-muted rounded px-1.5 py-0.5 font-mono text-xs", children: key.token }) }), _jsx(TableCell, { children: _jsx("div", { className: "flex gap-1", children: key.permissions.map((perm) => (_jsx(Badge, { variant: permissionVariant[perm] ?? "outline", size: "xs", children: perm }, perm))) }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: key.statusVariant, size: "sm", children: key.status }) }), _jsx(TableCell, { className: "text-right", children: _jsxs("div", { className: "flex justify-end gap-1", children: [_jsxs(Button, { variant: "ghost", size: "icon", className: "size-7", children: [_jsx(IconPlaceholder, { lucide: "CopyIcon", tabler: "IconCopy", hugeicons: "Copy01Icon", phosphor: "CopyIcon", remixicon: "RiFileCopyLine", className: "size-3.5", "aria-hidden": "true" }), _jsx("span", { className: "sr-only", children: "Copy key" })] }), _jsxs(Button, { variant: "ghost", size: "icon", className: "size-7", children: [_jsx(IconPlaceholder, { lucide: "RotateCcwIcon", tabler: "IconRotate2", hugeicons: "Refresh04Icon", phosphor: "ArrowCounterClockwiseIcon", remixicon: "RiRestartLine", className: "size-3.5", "aria-hidden": "true" }), _jsx("span", { className: "sr-only", children: "Regenerate key" })] })] }) })] }, key.name))) })] }) }) }));
}
