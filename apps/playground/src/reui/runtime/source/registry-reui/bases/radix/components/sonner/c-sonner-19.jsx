import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "flex flex-wrap items-center justify-center gap-2", children: [_jsx(Button, { size: "sm", variant: "outline", className: "w-fit", onClick: () => toast("Message sent", {
                    description: "Your message has been delivered.",
                    icon: (_jsx(IconPlaceholder, { lucide: "SendIcon", tabler: "IconSend", hugeicons: "SentIcon", phosphor: "PaperPlaneTiltIcon", remixicon: "RiSendInsLine", className: "size-4" })),
                }), children: "Send Icon" }), _jsx(Button, { size: "sm", variant: "outline", className: "w-fit", onClick: () => toast("Download complete", {
                    description: "design-assets.zip is ready.",
                    icon: (_jsx(IconPlaceholder, { lucide: "DownloadIcon", tabler: "IconDownload", hugeicons: "Download01Icon", phosphor: "DownloadSimpleIcon", remixicon: "RiDownload2Line", className: "size-4" })),
                }), children: "Download Icon" }), _jsx(Button, { size: "sm", variant: "outline", className: "w-fit", onClick: () => toast("Bookmark added", {
                    description: "Saved to your collection.",
                    icon: (_jsx(IconPlaceholder, { lucide: "BookmarkIcon", tabler: "IconBookmark", hugeicons: "Bookmark02Icon", phosphor: "BookmarkSimpleIcon", remixicon: "RiBookmarkLine", className: "size-4" })),
                }), children: "Bookmark Icon" })] }));
}
