import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup, ButtonGroupSeparator, } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const icons = {
    check: (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", "aria-hidden": "true" })),
    chevronDown: (_jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", "aria-hidden": "true" })),
    checkCircle: (_jsx(IconPlaceholder, { lucide: "CheckCircleIcon", tabler: "IconCircleCheck", hugeicons: "CheckmarkCircle01Icon", phosphor: "CheckCircleIcon", remixicon: "RiCheckboxCircleLine", "aria-hidden": "true" })),
    messageSquare: (_jsx(IconPlaceholder, { lucide: "MessageSquareIcon", tabler: "IconMessageCircle", hugeicons: "Message02Icon", phosphor: "ChatCircleIcon", remixicon: "RiChat3Line", "aria-hidden": "true" })),
    x: (_jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "Cancel01Icon", phosphor: "XIcon", remixicon: "RiCloseLine", "aria-hidden": "true" })),
};
export default function Pattern() {
    return (_jsxs(ButtonGroup, { className: "**:data-[slot=button]:border-x-0", children: [_jsxs(Button, { variant: "default", children: [icons.check, "Approve"] }), _jsx(ButtonGroupSeparator, { className: "bg-primary-foreground/20" }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "default", size: "icon", "aria-label": "More approval options", children: icons.chevronDown }) }), _jsx(DropdownMenuContent, { align: "end", className: "w-52", children: _jsxs(DropdownMenuGroup, { children: [_jsxs(DropdownMenuItem, { children: [icons.checkCircle, "Approve with Conditions"] }), _jsxs(DropdownMenuItem, { children: [icons.messageSquare, "Request Changes"] }), _jsxs(DropdownMenuItem, { variant: "destructive", children: [icons.x, "Reject"] })] }) })] })] }));
}
