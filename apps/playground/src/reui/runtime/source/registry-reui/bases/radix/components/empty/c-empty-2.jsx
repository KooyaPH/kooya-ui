import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Empty, { className: "bg-muted", children: [_jsxs(EmptyHeader, { children: [_jsx(EmptyTitle, { children: "No results found" }), _jsx(EmptyDescription, { children: "No results found for your search. Try adjusting your search terms." })] }), _jsxs(EmptyContent, { children: [_jsx(Button, { children: "Try again" }), _jsx(Button, { variant: "link", asChild: true, className: "text-muted-foreground", children: _jsxs("a", { href: "#", children: ["Learn more", " ", _jsx(IconPlaceholder, { lucide: "ArrowUpRightIcon", tabler: "IconArrowUpRight", hugeicons: "ArrowUpRight01Icon", phosphor: "ArrowUpRightIcon", remixicon: "RiArrowRightUpLine" })] }) })] })] }) }));
}
