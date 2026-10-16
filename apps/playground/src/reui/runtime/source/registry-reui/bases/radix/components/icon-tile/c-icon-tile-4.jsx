import { jsx as _jsx } from "react/jsx-runtime";
import { IconTile } from "../../reui/icon-tile.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const variants = ["outline", "elevated", "soft", "solid", "frame"];
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center gap-4", children: variants.map((variant) => (_jsx(IconTile, { variant: variant, "aria-hidden": "true", children: _jsx(IconPlaceholder, { lucide: "PackageIcon", tabler: "IconPackage", hugeicons: "Package01Icon", phosphor: "PackageIcon", remixicon: "RiBox3Line" }) }, variant))) }));
}
