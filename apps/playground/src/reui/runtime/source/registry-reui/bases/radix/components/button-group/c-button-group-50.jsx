import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup, ButtonGroupSeparator, } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const icons = {
    filter: (_jsx(IconPlaceholder, { lucide: "FilterIcon", tabler: "IconFilter", hugeicons: "FilterIcon", phosphor: "FunnelIcon", remixicon: "RiFilterLine", "aria-hidden": "true" })),
    sort: (_jsx(IconPlaceholder, { lucide: "ArrowUpDownIcon", tabler: "IconArrowsSort", hugeicons: "Sorting04Icon", phosphor: "ArrowsDownUpIcon", remixicon: "RiSortAsc", "aria-hidden": "true" })),
    more: (_jsx(IconPlaceholder, { lucide: "MoreHorizontalIcon", tabler: "IconDots", hugeicons: "MoreHorizontalCircle01Icon", phosphor: "DotsThreeIcon", remixicon: "RiMoreLine", "aria-hidden": "true" })),
    copy: (_jsx(IconPlaceholder, { lucide: "CopyIcon", tabler: "IconCopy", hugeicons: "Copy01Icon", phosphor: "CopyIcon", remixicon: "RiFileCopyLine", "aria-hidden": "true" })),
    share: (_jsx(IconPlaceholder, { lucide: "Share2Icon", tabler: "IconShare", hugeicons: "Share08Icon", phosphor: "ShareNetworkIcon", remixicon: "RiStackshareLine", "aria-hidden": "true" })),
    download: (_jsx(IconPlaceholder, { lucide: "DownloadIcon", tabler: "IconDownload", hugeicons: "Download01Icon", phosphor: "DownloadSimpleIcon", remixicon: "RiDownload2Line", "aria-hidden": "true" })),
    settings: (_jsx(IconPlaceholder, { lucide: "SettingsIcon", tabler: "IconSettings", hugeicons: "Settings01Icon", phosphor: "GearIcon", remixicon: "RiSettings3Line", "aria-hidden": "true" })),
};
export default function Pattern() {
    return (_jsxs(ButtonGroup, { children: [_jsx(Button, { variant: "outline", size: "sm", "aria-label": "Filter", children: icons.filter }), _jsx(Button, { variant: "outline", size: "sm", "aria-label": "Sort", children: icons.sort }), _jsx(ButtonGroupSeparator, {}), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "sm", "aria-label": "More options", children: icons.more }) }), _jsx(DropdownMenuContent, { align: "end", sideOffset: 8, children: _jsxs(DropdownMenuGroup, { children: [_jsxs(DropdownMenuItem, { children: [icons.copy, "Copy link"] }), _jsxs(DropdownMenuItem, { children: [icons.share, "Share"] }), _jsxs(DropdownMenuItem, { children: [icons.download, "Export"] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { children: [icons.settings, "Settings"] })] }) })] })] }));
}
