import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center p-4", children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Team Members" }), _jsx(CardDescription, { children: "Manage your team and their permissions." })] }), _jsx(CardContent, { children: _jsxs(Empty, { children: [_jsxs(EmptyHeader, { children: [_jsx(EmptyMedia, { variant: "icon", children: _jsx(IconPlaceholder, { lucide: "UsersIcon", tabler: "IconUsers", hugeicons: "UserMultiple02Icon", phosphor: "UsersIcon", remixicon: "RiGroupLine" }) }), _jsx(EmptyTitle, { children: "No team members" }), _jsx(EmptyDescription, { children: "Invite people to collaborate on this project." })] }), _jsx(EmptyContent, { children: _jsxs(Button, { size: "sm", children: [_jsx(IconPlaceholder, { lucide: "UserPlusIcon", tabler: "IconUserPlus", hugeicons: "UserAdd01Icon", phosphor: "UserPlusIcon", remixicon: "RiUserAddLine", "data-icon": "inline-start" }), "Invite People"] }) })] }) })] }) }));
}
