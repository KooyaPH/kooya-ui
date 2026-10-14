import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(Card, { className: "w-full max-w-xs gap-2 pt-5", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Need a help in Claim?" }) }), _jsx(CardContent, { className: "mb-2", children: _jsx("p", { children: "Go to this step by step guideline process on how to certify for your weekly benefits:" }) }), _jsx(CardFooter, { className: "py-2", children: _jsxs(Button, { variant: "link", className: "px-0", children: ["See our guideline", _jsx(IconPlaceholder, { lucide: "ExternalLinkIcon", tabler: "IconExternalLink", hugeicons: "LinkSquare01Icon", phosphor: "ArrowSquareOutIcon", remixicon: "RiExternalLinkLine", "aria-hidden": "true" })] }) })] }));
}
