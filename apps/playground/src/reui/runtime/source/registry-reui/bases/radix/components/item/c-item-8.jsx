import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const menuItems = [
    {
        icon: (_jsx(IconPlaceholder, { lucide: "InboxIcon", tabler: "IconInbox", hugeicons: "InboxIcon", phosphor: "TrayIcon", remixicon: "RiInboxLine" })),
        label: "Inbox",
        count: 12,
    },
    {
        icon: (_jsx(IconPlaceholder, { lucide: "SendIcon", tabler: "IconSend", hugeicons: "SentIcon", phosphor: "PaperPlaneTiltIcon", remixicon: "RiSendInsLine" })),
        label: "Sent",
        count: 0,
    },
    {
        icon: (_jsx(IconPlaceholder, { lucide: "FileIcon", tabler: "IconFile", hugeicons: "FileEmpty02Icon", phosphor: "FileIcon", remixicon: "RiFileLine" })),
        label: "Drafts",
        count: 3,
    },
    {
        icon: (_jsx(IconPlaceholder, { lucide: "ArchiveIcon", tabler: "IconArchive", hugeicons: "Archive02Icon", phosphor: "ArchiveIcon", remixicon: "RiArchiveLine" })),
        label: "Archive",
        count: 0,
    },
    {
        icon: (_jsx(IconPlaceholder, { lucide: "Trash2Icon", tabler: "IconTrash", hugeicons: "Delete02Icon", phosphor: "TrashIcon", remixicon: "RiDeleteBinLine" })),
        label: "Trash",
        count: 0,
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-full max-w-64 flex-col gap-0.5", children: menuItems.map((item) => (_jsx(Item, { size: "xs", asChild: true, children: _jsxs("a", { href: "#", children: [_jsx(ItemMedia, { variant: "icon", children: item.icon }), _jsx(ItemContent, { children: _jsx(ItemTitle, { children: item.label }) }), item.count > 1 && (_jsx(ItemActions, { children: _jsx(Badge, { variant: "success-light", className: "rounded-full", size: "xs", children: item.count }) }))] }) }, item.label))) }));
}
