import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(ButtonGroup, { children: [_jsx(Button, { variant: "outline", children: "Update" }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "icon", children: _jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", "aria-hidden": "true" }) }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-36", children: [_jsx(DropdownMenuItem, { children: "Production" }), _jsx(DropdownMenuItem, { children: "Staging" }), _jsx(DropdownMenuItem, { children: "Development" })] })] })] }));
}
