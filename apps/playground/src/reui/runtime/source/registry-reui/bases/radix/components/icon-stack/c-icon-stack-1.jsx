import { jsx as _jsx } from "react/jsx-runtime";
import { IconStack } from "../../reui/icon-stack.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(IconStack, { "aria-hidden": "true", children: _jsx(IconPlaceholder, { lucide: "LayersIcon", tabler: "IconStack2", hugeicons: "Layers01Icon", phosphor: "StackIcon", remixicon: "RiStackLine", className: "size-4" }) }) }));
}
