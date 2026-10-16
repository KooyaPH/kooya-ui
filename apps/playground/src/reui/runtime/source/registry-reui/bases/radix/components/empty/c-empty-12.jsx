import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center p-4", children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Tasks" }), _jsx(CardDescription, { children: "Track and manage your to-dos." })] }), _jsx(CardContent, { children: _jsxs(Empty, { children: [_jsxs(EmptyHeader, { children: [_jsx(EmptyMedia, { variant: "icon", children: _jsx(IconPlaceholder, { lucide: "CircleCheckIcon", tabler: "IconCircleCheck", hugeicons: "CheckmarkCircle01Icon", phosphor: "CheckCircleIcon", remixicon: "RiCheckboxCircleLine" }) }), _jsx(EmptyTitle, { children: "All clear" }), _jsx(EmptyDescription, { children: "You have no pending tasks. Enjoy the downtime or create a new one." })] }), _jsx(EmptyContent, { children: _jsxs(Button, { size: "sm", variant: "outline", children: [_jsx(IconPlaceholder, { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine", "data-icon": "inline-start" }), "New Task"] }) })] }) })] }) }));
}
