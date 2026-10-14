import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center p-4", children: _jsxs(Empty, { className: "border py-12", children: [_jsxs(EmptyHeader, { children: [_jsx(EmptyMedia, { variant: "icon", children: _jsx(IconPlaceholder, { lucide: "BarChart3Icon", tabler: "IconChartBar", hugeicons: "ChartBarLineIcon", phosphor: "ChartBarIcon", remixicon: "RiBarChartBoxLine" }) }), _jsx(EmptyTitle, { children: "No data yet" }), _jsx(EmptyDescription, { children: "Once your project starts receiving traffic, analytics will appear here." })] }), _jsx(EmptyContent, { children: _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", children: "Connect Data Source" }), _jsx(Button, { variant: "outline", size: "sm", children: "View Docs" })] }) })] }) }));
}
