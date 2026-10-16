import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Empty, { children: [_jsxs(EmptyHeader, { children: [_jsx(EmptyTitle, { children: "No projects yet" }), _jsx(EmptyDescription, { children: "You haven't created any projects yet. Get started by creating your first project." })] }), _jsxs(EmptyContent, { children: [_jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { asChild: true, children: _jsx("a", { href: "#", children: "Create project" }) }), _jsx(Button, { variant: "outline", children: "Import project" })] }), _jsx(Button, { variant: "link", asChild: true, className: "text-muted-foreground", children: _jsxs("a", { href: "#", children: ["Learn more", " ", _jsx(IconPlaceholder, { lucide: "ArrowUpRightIcon", tabler: "IconArrowUpRight", hugeicons: "ArrowUpRight01Icon", phosphor: "ArrowUpRightIcon", remixicon: "RiArrowRightUpLine" })] }) })] })] }) }));
}
