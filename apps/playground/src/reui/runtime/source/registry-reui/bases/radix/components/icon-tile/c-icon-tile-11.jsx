import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame, FramePanel } from "../../reui/frame.jsx";
import { IconTile } from "../../reui/icon-tile.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx(Frame, { className: "w-full max-w-xs", children: _jsxs(FramePanel, { className: "flex flex-col gap-3", children: [_jsx(IconTile, { variant: "elevated", size: "lg", "aria-hidden": "true", children: _jsx(IconPlaceholder, { lucide: "LayoutDashboardIcon", tabler: "IconLayoutDashboard", hugeicons: "DashboardSquare02Icon", phosphor: "LayoutIcon", remixicon: "RiDashboardLine" }) }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("h3", { className: "text-sm font-medium", children: "Unified dashboard" }), _jsx("p", { className: "text-muted-foreground text-xs", children: "Track every project, deployment and metric from a single workspace." })] })] }) }));
}
