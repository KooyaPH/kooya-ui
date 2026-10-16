import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const icons = {
    plus: (_jsx(IconPlaceholder, { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine", "aria-hidden": "true" })),
    more: (_jsx(IconPlaceholder, { lucide: "MoreHorizontalIcon", tabler: "IconDots", hugeicons: "MoreHorizontalCircle01Icon", phosphor: "DotsThreeIcon", remixicon: "RiMoreLine", "aria-hidden": "true" })),
    userPlus: (_jsx(IconPlaceholder, { lucide: "UserPlusIcon", tabler: "IconUserPlus", hugeicons: "UserAdd01Icon", phosphor: "UserPlusIcon", remixicon: "RiUserAddLine", "aria-hidden": "true" })),
    cart: (_jsx(IconPlaceholder, { lucide: "ShoppingCartIcon", tabler: "IconShoppingCart", hugeicons: "ShoppingCart01Icon", phosphor: "ShoppingCartIcon", remixicon: "RiShoppingCartLine", "aria-hidden": "true" })),
    fileText: (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File02Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", "aria-hidden": "true" })),
};
export default function Pattern() {
    return (_jsxs(ButtonGroup, { children: [_jsxs(Button, { variant: "outline", size: "sm", "aria-label": "More options", children: [icons.plus, "New"] }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { size: "icon-sm", variant: "outline", "aria-label": "More options", children: icons.more }) }), _jsx(DropdownMenuContent, { align: "end", className: "w-40", children: _jsxs(DropdownMenuGroup, { children: [_jsx(DropdownMenuLabel, { children: "Create" }), _jsxs(DropdownMenuItem, { children: [icons.userPlus, "New Customer"] }), _jsxs(DropdownMenuItem, { children: [icons.cart, "New Order"] }), _jsxs(DropdownMenuItem, { children: [icons.fileText, "New Invoice"] })] }) })] })] }));
}
