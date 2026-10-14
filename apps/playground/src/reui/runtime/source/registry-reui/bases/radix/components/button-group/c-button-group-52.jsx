import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup, ButtonGroupSeparator, } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const icons = {
    refresh: (_jsx(IconPlaceholder, { lucide: "RefreshCwIcon", tabler: "IconRefresh", hugeicons: "Refresh04Icon", phosphor: "ArrowsClockwiseIcon", remixicon: "RiRefreshLine", "aria-hidden": "true" })),
    share: (_jsx(IconPlaceholder, { lucide: "Share2Icon", tabler: "IconShare", hugeicons: "Share08Icon", phosphor: "ShareNetworkIcon", remixicon: "RiStackshareLine", "aria-hidden": "true" })),
    more: (_jsx(IconPlaceholder, { lucide: "MoreHorizontalIcon", tabler: "IconDots", hugeicons: "MoreHorizontalCircle01Icon", phosphor: "DotsThreeIcon", remixicon: "RiMoreLine", "aria-hidden": "true" })),
    pencil: (_jsx(IconPlaceholder, { lucide: "PencilIcon", tabler: "IconPencil", hugeicons: "Pen01Icon", phosphor: "PencilSimpleIcon", remixicon: "RiPencilLine", "aria-hidden": "true" })),
    fileText: (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "FileEditIcon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", "aria-hidden": "true" })),
    image: (_jsx(IconPlaceholder, { lucide: "ImageIcon", tabler: "IconPhoto", hugeicons: "Image01Icon", phosphor: "ImageIcon", remixicon: "RiImageLine", "aria-hidden": "true" })),
};
export default function Pattern() {
    return (_jsxs(ButtonGroup, { children: [_jsx(Button, { variant: "outline", size: "sm", "aria-label": "Refresh", children: icons.refresh }), _jsxs(Button, { variant: "outline", size: "sm", children: [icons.share, "Share"] }), _jsx(ButtonGroupSeparator, {}), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "sm", "aria-label": "More options", children: icons.more }) }), _jsx(DropdownMenuContent, { align: "end", className: "w-44", sideOffset: 9, children: _jsxs(DropdownMenuGroup, { children: [_jsxs(DropdownMenuItem, { children: [icons.pencil, "Edit dashboard"] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { children: [icons.fileText, "Export CSV"] }), _jsxs(DropdownMenuItem, { children: [icons.image, "Export PNG"] })] }) })] })] }));
}
