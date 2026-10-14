// Owned responsive correction to the actual attributed REUI recipe.
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "cn";
import { Button } from "../../adapters/controls";
import { ButtonGroup, ButtonGroupSeparator } from "../../adapters/controls";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger, } from "../../adapters/menus";
import { IconPlaceholder } from "../../adapters/icons";
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
    const container = useRef(null);
    const [vertical, setVertical] = useState(false);
    useLayoutEffect(() => {
        const node = container.current;
        if (!node)
            return;
        const update = () => setVertical(node.clientWidth < 336);
        update();
        const observer = new ResizeObserver(update);
        observer.observe(node);
        return () => observer.disconnect();
    }, []);
    return (_jsx("div", { ref: container, role: "group", "aria-label": "Export and view options", style: { width: "100%", maxWidth: 384, minWidth: 0 }, children: _jsxs(ButtonGroup, { orientation: vertical ? "vertical" : "horizontal", style: { maxWidth: "100%", width: vertical ? "100%" : undefined }, children: [_jsxs(Button, { variant: "outline", children: [icons.filter, "Filter"] }), _jsx(ButtonGroupSeparator, {}), _jsxs(Button, { variant: "outline", children: [icons.download, "Export CSV"] }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "icon", className: "shrink-0", "aria-label": "More export options", children: icons.chevronDown }) }), _jsx(DropdownMenuContent, { align: "end", className: "w-40", children: _jsxs(DropdownMenuGroup, { children: [_jsxs(DropdownMenuItem, { children: [icons.fileSpreadsheet, "Export Excel"] }), _jsxs(DropdownMenuItem, { children: [icons.fileJson, "Export JSON"] }), _jsxs(DropdownMenuItem, { children: [icons.filePdf, "Export PDF"] })] }) })] }), _jsx(Button, { variant: "outline", size: "icon", "aria-label": "Grid view", "aria-pressed": view === "grid", style: {
                        backgroundColor: view === "grid" ? "var(--ku-subtle)" : undefined,
                        borderColor: view === "grid" ? "var(--ku-focus)" : undefined,
                    }, className: cn(view === "grid" ? "bg-muted" : ""), onClick: () => setView("grid"), children: icons.grid }), _jsx(Button, { variant: "outline", size: "icon", "aria-label": "List view", "aria-pressed": view === "list", style: {
                        backgroundColor: view === "list" ? "var(--ku-subtle)" : undefined,
                        borderColor: view === "list" ? "var(--ku-focus)" : undefined,
                    }, className: cn(view === "list" ? "bg-muted" : ""), onClick: () => setView("list"), children: icons.list })] }) }));
}
