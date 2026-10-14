import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { localAsset } from "../../../../../../../adapters/assets.ts";
import { Card } from "../../../../../../../adapters/layout.tsx";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "../../../../../../../adapters/navigation.tsx";
export default function Pattern() {
    return (_jsxs(Carousel, { opts: {
            align: "start",
        }, className: "w-full max-w-3xl", children: [_jsx(CarouselContent, { children: Array.from({ length: 5 }).map((_, index) => (_jsx(CarouselItem, { className: "basis-1/3", children: _jsx("div", { className: "p-1", children: _jsx(Card, { className: "relative aspect-square overflow-hidden border-0 p-0", children: _jsx("img", { src: localAsset(`https://picsum.photos/400/400?grayscale&random=${index + 5}`), alt: `Slide ${index + 1}`, width: 400, height: 400, className: "h-full w-full object-cover" }) }) }) }, index))) }), _jsx(CarouselPrevious, { className: "hidden sm:inline-flex" }), _jsx(CarouselNext, { className: "hidden sm:inline-flex" })] }));
}
