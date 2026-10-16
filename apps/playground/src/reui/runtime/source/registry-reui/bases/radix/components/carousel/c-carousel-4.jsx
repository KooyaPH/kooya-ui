import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { localAsset } from "../../../../../../../adapters/assets.ts";
import { Card } from "../../../../../../../adapters/layout.tsx";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "../../../../../../../adapters/navigation.tsx";
export default function Pattern() {
    return (_jsxs(Carousel, { opts: {
            align: "start",
        }, className: "w-full max-w-3xl", children: [_jsx(CarouselContent, { children: Array.from({ length: 8 }).map((_, index) => (_jsx(CarouselItem, { className: "sm:basis-1/2 md:basis-1/3 lg:basis-1/4", children: _jsx("div", { className: "p-1", children: _jsx(Card, { className: "relative aspect-3/4 overflow-hidden border-0 p-0", children: _jsx("img", { src: localAsset(`https://picsum.photos/600/800?grayscale&random=${index + 15}`), alt: `Slide ${index + 1}`, width: 600, height: 800, className: "h-full w-full object-cover" }) }) }) }, index))) }), _jsx(CarouselPrevious, { className: "hidden sm:inline-flex" }), _jsx(CarouselNext, { className: "hidden sm:inline-flex" })] }));
}
