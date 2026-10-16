"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup, ButtonGroupSeparator, } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const icons = {
    filter: (_jsx(IconPlaceholder, { lucide: "ListFilterIcon", tabler: "IconFilter", hugeicons: "FilterIcon", phosphor: "FunnelIcon", remixicon: "RiFilterLine", "aria-hidden": "true" })),
    download: (_jsx(IconPlaceholder, { lucide: "DownloadIcon", tabler: "IconDownload", hugeicons: "Download01Icon", phosphor: "DownloadSimpleIcon", remixicon: "RiDownloadLine", "aria-hidden": "true" })),
    chevronDown: (_jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", "aria-hidden": "true" })),
    grid: (_jsx(IconPlaceholder, { lucide: "LayoutGridIcon", tabler: "IconLayoutGrid", hugeicons: "GridViewIcon", phosphor: "SquaresFourIcon", remixicon: "RiGalleryView2", "aria-hidden": "true" })),
    list: (_jsx(IconPlaceholder, { lucide: "ListIcon", tabler: "IconList", hugeicons: "Menu01Icon", phosphor: "ListIcon", remixicon: "RiListUnordered", "aria-hidden": "true" })),
    fileSpreadsheet: (_jsx(IconPlaceholder, { lucide: "FileSpreadsheetIcon", tabler: "IconFileSpreadsheet", hugeicons: "GoogleSpreadsheetIcon", phosphor: "FileXlsIcon", remixicon: "RiFileExcel2Line", "aria-hidden": "true" })),
    fileJson: (_jsx(IconPlaceholder, { lucide: "FileJsonIcon", tabler: "IconFileTypeJson", hugeicons: "FileJsonIcon", phosphor: "FilejsIcon", remixicon: "RiFileCodeLine", "aria-hidden": "true" })),
    filePdf: (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileTypePdf", hugeicons: "FilePdf01Icon", phosphor: "FilePdfIcon", remixicon: "RiFilePdf2Line", "aria-hidden": "true" })),
};
export default function Pattern() {
    const [view, setView] = useState("grid");
    return (_jsxs(ButtonGroup, { children: [_jsxs(Button, { variant: "outline", children: [icons.filter, "Filter"] }), _jsx(ButtonGroupSeparator, {}), _jsxs(Button, { variant: "outline", children: [icons.download, "Export CSV"] }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "icon", className: "shrink-0", "aria-label": "More export options", children: icons.chevronDown }) }), _jsx(DropdownMenuContent, { align: "end", className: "w-40", children: _jsxs(DropdownMenuGroup, { children: [_jsxs(DropdownMenuItem, { children: [icons.fileSpreadsheet, "Export Excel"] }), _jsxs(DropdownMenuItem, { children: [icons.fileJson, "Export JSON"] }), _jsxs(DropdownMenuItem, { children: [icons.filePdf, "Export PDF"] })] }) })] }), _jsx(Button, { variant: "outline", size: "icon", "aria-label": "Grid view", className: cn(view === "grid" ? "bg-muted" : ""), onClick: () => setView("grid"), children: icons.grid }), _jsx(Button, { variant: "outline", size: "icon", "aria-label": "List view", className: cn(view === "list" ? "bg-muted" : ""), onClick: () => setView("list"), children: icons.list })] }));
}
