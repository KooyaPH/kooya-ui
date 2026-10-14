import { jsx as _jsx } from "react/jsx-runtime";
import { IconTile } from "../../reui/icon-tile.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const sizes = ["xs", "sm", "default", "lg", "xl"];
export default function Pattern() {
    return (_jsx("div", { className: "flex items-end justify-center gap-4", children: sizes.map((size) => (_jsx(IconTile, { variant: "elevated", size: size, "aria-hidden": "true", children: _jsx(IconPlaceholder, { lucide: "PackageIcon", tabler: "IconPackage", hugeicons: "Package01Icon", phosphor: "PackageIcon", remixicon: "RiBox3Line" }) }, size))) }));
}
