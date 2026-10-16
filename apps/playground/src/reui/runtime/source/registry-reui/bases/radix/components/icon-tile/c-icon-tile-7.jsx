import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconTile } from "../../reui/icon-tile.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "flex items-center justify-center gap-4", children: [_jsx(IconTile, { variant: "elevated", className: "size-14", "aria-hidden": "true", children: _jsx(IconPlaceholder, { lucide: "ImageIcon", tabler: "IconPhoto", hugeicons: "ImageIcon", phosphor: "ImageIcon", remixicon: "RiImageLine", className: "size-7" }) }), _jsx(IconTile, { variant: "elevated", className: "[--icon-tile-icon-size:--spacing(7)] [--icon-tile-size:--spacing(14)]", "aria-hidden": "true", children: _jsx(IconPlaceholder, { lucide: "Settings2Icon", tabler: "IconAdjustmentsHorizontal", hugeicons: "SlidersHorizontalIcon", phosphor: "SlidersHorizontalIcon", remixicon: "RiEqualizer2Line" }) })] }));
}
