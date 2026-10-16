import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileType, getFileType, } from "../../reui/file-type.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const ATTACHMENTS = [
    {
        id: "agreement",
        name: "master-services-agreement-signed.pdf",
        size: "2.1 MB",
        modified: "2026-10-06",
        modifiedLabel: "Oct 6",
    },
    {
        id: "deck",
        name: "q3-board-deck.pptx",
        size: "18.4 MB",
        modified: "2026-10-02",
        modifiedLabel: "Oct 2",
    },
    {
        id: "forecast",
        name: "revenue-forecast-2027.xlsx",
        size: "860 KB",
        modified: "2026-09-29",
        modifiedLabel: "Sep 29",
    },
    {
        id: "brief",
        name: "launch-brief.docx",
        size: "312 KB",
        modified: "2026-09-24",
        modifiedLabel: "Sep 24",
    },
    {
        id: "demo",
        name: "product-demo.mp4",
        size: "64.2 MB",
        modified: "2026-09-18",
        modifiedLabel: "Sep 18",
    },
];
export default function Pattern() {
    return (_jsx(ItemGroup, { "aria-label": "Attachments", className: "mx-auto w-full max-w-md", children: ATTACHMENTS.map((file) => (
        // ItemGroup is a role="list", so each row declares itself a listitem
        // or assistive tech announces an empty list.
        _jsxs(Item, { role: "listitem", variant: "outline", size: "sm", children: [_jsx(ItemMedia, { children: _jsx(FileType, { type: getFileType(file.name), variant: "light", "aria-hidden": "true" }) }), _jsxs(ItemContent, { className: "min-w-0", children: [_jsx(ItemTitle, { className: "max-w-full", children: _jsx("span", { className: "truncate", title: file.name, children: file.name }) }), _jsxs(ItemDescription, { children: [file.size, _jsx("span", { "aria-hidden": "true", className: "bg-muted-foreground/40 mx-1.5 inline-block size-1 rounded-full align-middle" }), _jsx("time", { dateTime: file.modified, children: file.modifiedLabel })] })] }), _jsx(ItemActions, { children: _jsx(Button, { type: "button", variant: "ghost", size: "icon-sm", "aria-label": `Download ${file.name}`, children: _jsx(IconPlaceholder, { lucide: "DownloadIcon", tabler: "IconDownload", hugeicons: "Download01Icon", phosphor: "DownloadSimpleIcon", remixicon: "RiDownloadLine", "aria-hidden": "true" }) }) })] }, file.id))) }));
}
