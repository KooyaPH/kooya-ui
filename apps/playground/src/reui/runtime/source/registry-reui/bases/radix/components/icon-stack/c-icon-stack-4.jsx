import { jsx as _jsx } from "react/jsx-runtime";
import { IconStack } from "../../reui/icon-stack.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(IconStack, { "aria-hidden": "true", className: "text-primary h-24 w-22", children: _jsx("span", { className: "bg-background text-primary flex size-8 items-center justify-center rounded-full border shadow-xs", children: _jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-4" }) }) }) }));
}
