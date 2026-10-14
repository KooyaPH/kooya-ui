import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Kbd, KbdGroup } from "../../../../../registry/bases/radix/ui/kbd.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(Button, { variant: "outline", "aria-label": "Search (Command K)", children: [_jsx(IconPlaceholder, { lucide: "SearchIcon", tabler: "IconSearch", hugeicons: "Search01Icon", phosphor: "MagnifyingGlassIcon", remixicon: "RiSearchLine", "aria-hidden": "true" }), _jsx("span", { children: "Search" }), _jsxs(KbdGroup, { "aria-hidden": "true", children: [_jsx(Kbd, { children: "\u2318" }), _jsx(Kbd, { children: "K" })] })] }));
}
