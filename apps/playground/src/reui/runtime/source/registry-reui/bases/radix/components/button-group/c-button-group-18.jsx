import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup, ButtonGroupSeparator, } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(ButtonGroup, { className: "**:data-[slot=button]:border-r-0", children: [_jsxs(Button, { children: [_jsx(IconPlaceholder, { lucide: "PlayIcon", tabler: "IconPlayerPlay", hugeicons: "PlayIcon", phosphor: "PlayIcon", remixicon: "RiPlayLine", "aria-hidden": "true", className: "fill-current" }), _jsx("span", { children: "Execute" })] }), _jsx(ButtonGroupSeparator, { className: "bg-primary/72" }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { size: "icon", className: "border-primary-foreground/20 rounded-l-none border-l", children: _jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", "aria-hidden": "true" }) }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-40", children: [_jsx(DropdownMenuItem, { children: "Commit & Push" }), _jsx(DropdownMenuItem, { children: "Commit & Sync" }), _jsx(DropdownMenuItem, { children: "Amend Last Commit" })] })] })] }));
}
