"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 1500 });
    return (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { size: "icon", variant: "outline", "aria-label": isCopied ? "Copied" : "Copy", onClick: () => copyToClipboard("https://reui.io"), children: isCopied ? (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", "aria-hidden": "true" })) : (_jsx(IconPlaceholder, { lucide: "CopyIcon", tabler: "IconCopy", hugeicons: "CopyIcon", phosphor: "CopyIcon", remixicon: "RiFileCopyLine", "aria-hidden": "true" })) }) }), _jsx(TooltipContent, { children: isCopied ? "Copied" : "Copy link" })] }) }));
}
