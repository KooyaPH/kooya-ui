import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(ButtonGroup, { className: "max-w-xs", children: [_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", "aria-label": "Filter", children: [_jsx(IconPlaceholder, { lucide: "ListFilterIcon", tabler: "IconFilter2", hugeicons: "FilterMailIcon", phosphor: "FunnelSimpleIcon", remixicon: "RiFilter3Line", "aria-hidden": "true" }), "Filter", _jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", "aria-hidden": "true" })] }) }), _jsxs(DropdownMenuContent, { align: "start", className: "w-40", children: [_jsx(DropdownMenuItem, { children: "All Records" }), _jsx(DropdownMenuItem, { children: "Recent" }), _jsx(DropdownMenuItem, { children: "Archived" })] })] }), _jsx(Input, { placeholder: "Filter records..." }), _jsx(Button, { variant: "outline", size: "icon", children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "MultiplicationSignIcon", phosphor: "XIcon", remixicon: "RiCloseLine", "aria-hidden": "true" }) })] }));
}
