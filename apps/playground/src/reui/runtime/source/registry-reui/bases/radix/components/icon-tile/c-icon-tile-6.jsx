import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconTile } from "../../reui/icon-tile.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "flex items-center justify-center gap-4", children: [_jsx(IconTile, { variant: "outline", size: "lg", radius: "full", "aria-hidden": "true", children: _jsx(IconPlaceholder, { lucide: "GlobeIcon", tabler: "IconWorld", hugeicons: "Globe02Icon", phosphor: "GlobeSimpleIcon", remixicon: "RiGlobalLine" }) }), _jsx(IconTile, { variant: "elevated", size: "lg", radius: "full", "aria-hidden": "true", children: _jsx(IconPlaceholder, { lucide: "StarIcon", tabler: "IconStar", hugeicons: "StarIcon", phosphor: "StarIcon", remixicon: "RiStarLine" }) }), _jsx(IconTile, { variant: "frame", size: "lg", radius: "full", "aria-hidden": "true", children: _jsx(IconPlaceholder, { lucide: "CircleCheckIcon", tabler: "IconCircleCheck", hugeicons: "CheckmarkCircle01Icon", phosphor: "CheckCircleIcon", remixicon: "RiCheckboxCircleLine" }) })] }));
}
