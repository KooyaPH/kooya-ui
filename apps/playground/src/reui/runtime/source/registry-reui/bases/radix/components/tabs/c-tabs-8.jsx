import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const plans = [
    {
        id: "starter",
        name: "Starter",
        price: "$9",
        description: "For individuals and small projects",
        icon: (_jsx(IconPlaceholder, { lucide: "UserIcon", tabler: "IconUser", hugeicons: "UserIcon", phosphor: "UserIcon", remixicon: "RiUserLine", className: "size-5" })),
        tablerIcon: "IconUser",
    },
    {
        id: "pro",
        name: "Pro",
        price: "$29",
        description: "For growing teams and businesses",
        icon: (_jsx(IconPlaceholder, { lucide: "ZapIcon", tabler: "IconBolt", hugeicons: "ZapIcon", phosphor: "LightningIcon", remixicon: "RiFlashlightLine", className: "size-5" })),
        tablerIcon: "IconBolt",
    },
    {
        id: "enterprise",
        name: "Enterprise",
        price: "$99",
        description: "For large organizations",
        icon: (_jsx(IconPlaceholder, { lucide: "BuildingIcon", tabler: "IconBuilding", hugeicons: "Building01Icon", phosphor: "BuildingsIcon", remixicon: "RiBuildingLine", className: "size-5" })),
        tablerIcon: "IconBuilding",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "flex w-full max-w-lg flex-col gap-6", children: _jsxs(Tabs, { defaultValue: "projects", orientation: "vertical", className: "gap-5", children: [_jsxs(TabsList, { variant: "line", className: "w-48 shrink-0", children: [_jsxs(TabsTrigger, { value: "projects", className: "justify-start gap-2", children: [_jsx(IconPlaceholder, { lucide: "FolderIcon", tabler: "IconFolder", hugeicons: "FolderIcon", phosphor: "FolderIcon", remixicon: "RiFolderLine", className: "size-4" }), "Projects", _jsx(Badge, { variant: "secondary", size: "sm", className: "ml-auto", children: "8" })] }), _jsxs(TabsTrigger, { value: "tasks", className: "justify-start gap-2", children: [_jsx(IconPlaceholder, { lucide: "CheckSquareIcon", tabler: "IconCheckbox", hugeicons: "CheckListIcon", phosphor: "CheckSquareIcon", remixicon: "RiCheckboxLine", className: "size-4" }), "Tasks", _jsx(Badge, { variant: "primary-light", size: "sm", className: "ml-auto", children: "24" })] }), _jsxs(TabsTrigger, { value: "team", className: "justify-start gap-2", children: [_jsx(IconPlaceholder, { lucide: "UsersIcon", tabler: "IconUsers", hugeicons: "UserGroupIcon", phosphor: "UsersIcon", remixicon: "RiGroupLine", className: "size-4" }), "Team"] }), _jsxs(TabsTrigger, { value: "reports", className: "justify-start gap-2", children: [_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File02Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", className: "size-4" }), "Reports"] })] }), _jsx(TabsContent, { value: "projects", children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx("h3", { className: "text-foreground mb-2 font-semibold", children: "Active Projects" }), _jsx("p", { children: "8 projects are currently in progress across your workspace." })] }) }) }), _jsx(TabsContent, { value: "tasks", children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx("h3", { className: "text-foreground mb-2 font-semibold", children: "Pending Tasks" }), _jsx("p", { children: "24 tasks need your attention this week." })] }) }) }), _jsx(TabsContent, { value: "team", children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx("h3", { className: "text-foreground mb-2 font-semibold", children: "Team Members" }), _jsx("p", { children: "Manage your team and their access permissions." })] }) }) }), _jsx(TabsContent, { value: "reports", children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx("h3", { className: "text-foreground mb-2 font-semibold", children: "Reports" }), _jsx("p", { children: "View generated reports and export data." })] }) }) })] }) }));
}
