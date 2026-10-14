import { jsx as _jsx } from "react/jsx-runtime";
import { IconTile } from "../../reui/icon-tile.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(IconTile, { variant: "frame", "aria-hidden": "true", children: _jsx(IconPlaceholder, { lucide: "LayoutDashboardIcon", tabler: "IconLayoutDashboard", hugeicons: "DashboardSquare02Icon", phosphor: "LayoutIcon", remixicon: "RiDashboardLine" }) }) }));
}
