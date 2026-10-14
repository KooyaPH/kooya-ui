import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const icons = {
    more: (_jsx(IconPlaceholder, { lucide: "MoreHorizontalIcon", tabler: "IconDots", hugeicons: "MoreHorizontalCircle01Icon", phosphor: "DotsThreeIcon", remixicon: "RiMoreLine", "aria-hidden": "true" })),
    settings: (_jsx(IconPlaceholder, { lucide: "SettingsIcon", tabler: "IconSettings", hugeicons: "Settings01Icon", phosphor: "GearIcon", remixicon: "RiSettings3Line", "aria-hidden": "true" })),
    share: (_jsx(IconPlaceholder, { lucide: "Share2Icon", tabler: "IconShare", hugeicons: "Share08Icon", phosphor: "ShareNetworkIcon", remixicon: "RiStackshareLine", "aria-hidden": "true" })),
    trash: (_jsx(IconPlaceholder, { lucide: "TrashIcon", tabler: "IconTrash", hugeicons: "DeleteIcon", phosphor: "TrashIcon", remixicon: "RiDeleteBinLine", "aria-hidden": "true" })),
};
export default function Pattern() {
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "-me-1.5", "aria-label": "More options", children: icons.more }) }), _jsx(DropdownMenuContent, { align: "start", className: "w-36", children: _jsxs(DropdownMenuGroup, { children: [_jsxs(DropdownMenuItem, { children: [icons.settings, "Settings"] }), _jsxs(DropdownMenuItem, { children: [icons.share, "Share"] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { variant: "destructive", children: [icons.trash, "Remove"] })] }) })] }));
}
