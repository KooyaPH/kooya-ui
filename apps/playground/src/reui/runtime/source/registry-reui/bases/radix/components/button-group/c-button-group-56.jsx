import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const attachment = {
    name: "Q4-Product-Roadmap.pdf",
    size: "2.4 MB",
};
export default function Pattern() {
    return (_jsxs(ButtonGroup, { children: [_jsxs(Button, { variant: "outline", size: "xs", children: [_jsx(IconPlaceholder, { lucide: "PaperclipIcon", tabler: "IconPaperclip", hugeicons: "Attachment02Icon", phosphor: "PaperclipIcon", remixicon: "RiAttachment2", "aria-hidden": "true" }), attachment.name, _jsxs("span", { className: "opacity-60", children: ["(", attachment.size, ")"] })] }), _jsx(Button, { variant: "outline", size: "icon-xs", "aria-label": "Download attachment", children: _jsx(IconPlaceholder, { lucide: "DownloadIcon", tabler: "IconDownload", hugeicons: "Download01Icon", phosphor: "DownloadSimpleIcon", remixicon: "RiDownload2Line", "aria-hidden": "true" }) })] }));
}
