import { jsx as _jsx } from "react/jsx-runtime";
import { localAsset } from "../../../../../../../adapters/assets.ts";
import { ScrollArea } from "../../../../../registry/bases/radix/ui/scroll-area.jsx";
export default function Pattern() {
    return (_jsx(ScrollArea, { className: "rounded-2xl h-72 w-56 border data-has-overflow-x:py-2.5 data-has-overflow-y:px-2.5", children: _jsx("div", { className: "flex w-full flex-col items-center gap-4 py-2", children: Array.from({ length: 10 }).map((_, i) => (_jsx("div", { className: "rounded-2xl relative h-36 w-full shrink-0 overflow-hidden border", children: _jsx("img", { src: localAsset(`https://picsum.photos/400/300?random=${i + 1}`), alt: `Image ${i + 1}`, className: "h-full w-full object-cover" }) }, i))) }) }));
}
