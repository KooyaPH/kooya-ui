import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { localAsset } from "../../../../../../../adapters/assets.ts";
import { ScrollArea, ScrollBar } from "../../../../../registry/bases/radix/ui/scroll-area.jsx";
export default function Pattern() {
    return (_jsxs(ScrollArea, { className: "rounded-2xl h-auto max-w-96 border", children: [_jsx("div", { className: "flex w-max gap-4 p-4", children: Array.from({ length: 10 }).map((_, i) => (_jsx("div", { className: "rounded-2xl relative h-36 w-40 shrink-0 overflow-hidden border", children: _jsx("img", { src: localAsset(`https://picsum.photos/400/300?random=${i + 1}`), alt: `Image ${i + 1}`, className: "h-full w-full object-cover" }) }, i))) }), _jsx(ScrollBar, { orientation: "horizontal" })] }));
}
