import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { InputGroup, InputGroupAddon, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(ButtonGroup, { className: "max-w-xs", children: [_jsxs(InputGroup, { children: [_jsx(InputGroupAddon, { children: _jsx(IconPlaceholder, { lucide: "SearchIcon", tabler: "IconSearch", hugeicons: "Search01Icon", phosphor: "MagnifyingGlassIcon", remixicon: "RiSearchLine", "aria-hidden": "true" }) }), _jsx(InputGroupInput, { placeholder: "Filter records..." })] }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "icon", "aria-label": "Filter", children: _jsx(IconPlaceholder, { lucide: "EllipsisVerticalIcon", tabler: "IconDotsVertical", hugeicons: "MoreVerticalIcon", phosphor: "DotsThreeVerticalIcon", remixicon: "RiMore2Fill", "aria-hidden": "true" }) }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-40", children: [_jsx(DropdownMenuItem, { children: "All Records" }), _jsx(DropdownMenuItem, { children: "Recent" }), _jsx(DropdownMenuItem, { children: "Archived" })] })] })] }));
}
