import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconTile } from "../../reui/icon-tile.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs("span", { className: "relative inline-flex", "aria-hidden": "true", children: [_jsx(IconTile, { variant: "elevated", children: _jsx(IconPlaceholder, { lucide: "GlobeIcon", tabler: "IconWorld", hugeicons: "Globe02Icon", phosphor: "GlobeSimpleIcon", remixicon: "RiGlobalLine" }) }), _jsx("span", { className: "border-background bg-success absolute -end-0.5 -top-0.5 size-3 rounded-full border-2" })] }) }));
}
