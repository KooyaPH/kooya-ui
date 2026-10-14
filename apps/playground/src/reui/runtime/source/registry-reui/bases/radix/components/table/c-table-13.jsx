import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../../../../../../../adapters/data.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const files = [
    {
        name: "Q4 Financial Report.pdf",
        icon: (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File02Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", className: "text-muted-foreground size-4 shrink-0", "aria-hidden": "true" })),
        size: "2.4 MB",
        owner: "Sarah Chen",
        ownerAvatar: "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
        sharing: "Team",
        sharingVariant: "info-light",
        modified: "2 hours ago",
    },
    {
        name: "Brand Guidelines",
        icon: (_jsx(IconPlaceholder, { lucide: "FolderIcon", tabler: "IconFolder", hugeicons: "FolderIcon", phosphor: "FolderIcon", remixicon: "RiFolderLine", className: "text-muted-foreground size-4 shrink-0", "aria-hidden": "true" })),
        size: "—",
        owner: "Emily Park",
        ownerAvatar: "/reui-assets/images/dbc92c73c5f6acf7373d.jpg",
        sharing: "Public",
        sharingVariant: "success-light",
        modified: "1 day ago",
    },
    {
        name: "Product Roadmap 2025.xlsx",
        icon: (_jsx(IconPlaceholder, { lucide: "FileSpreadsheetIcon", tabler: "IconFileSpreadsheet", hugeicons: "GoogleSheetIcon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", className: "text-muted-foreground size-4 shrink-0", "aria-hidden": "true" })),
        size: "856 KB",
        owner: "Marcus Johnson",
        ownerAvatar: "/reui-assets/images/e93553df2422635515ee.jpg",
        sharing: "Private",
        sharingVariant: "outline",
        modified: "3 days ago",
    },
    {
        name: "App Screenshots",
        icon: (_jsx(IconPlaceholder, { lucide: "ImageIcon", tabler: "IconPhoto", hugeicons: "ImageIcon", phosphor: "ImageIcon", remixicon: "RiImageLine", className: "text-muted-foreground size-4 shrink-0", "aria-hidden": "true" })),
        size: "48.2 MB",
        owner: "David Kim",
        ownerAvatar: "/reui-assets/images/823cc7e47d4e7e6cb0b4.jpg",
        sharing: "Team",
        sharingVariant: "info-light",
        modified: "1 week ago",
    },
    {
        name: "Architecture Diagram.fig",
        icon: (_jsx(IconPlaceholder, { lucide: "PenToolIcon", tabler: "IconEdit", hugeicons: "PenTool03Icon", phosphor: "PenNibIcon", remixicon: "RiPenNibLine", className: "text-muted-foreground size-4 shrink-0", "aria-hidden": "true" })),
        size: "12.8 MB",
        owner: "Sofia Davis",
        ownerAvatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
        sharing: "Restricted",
        sharingVariant: "warning-light",
        modified: "2 weeks ago",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-full max-w-2xl flex-col", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Name" }), _jsx(TableHead, { children: "Owner" }), _jsx(TableHead, { children: "Sharing" }), _jsx(TableHead, { children: "Size" }), _jsx(TableHead, { className: "text-right", children: "Modified" })] }) }), _jsx(TableBody, { children: files.map((file) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-3", children: [file.icon, _jsx("span", { className: "text-sm font-medium", children: file.name })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Avatar, { size: "sm", children: [_jsx(AvatarImage, { src: file.ownerAvatar, alt: file.owner }), _jsx(AvatarFallback, { children: file.owner
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("") })] }), _jsx("span", { className: "text-sm", children: file.owner })] }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: file.sharingVariant, size: "sm", children: file.sharing }) }), _jsx(TableCell, { className: "text-muted-foreground text-sm", children: file.size }), _jsx(TableCell, { className: "text-muted-foreground text-right text-sm", children: file.modified })] }, file.name))) })] }) }));
}
