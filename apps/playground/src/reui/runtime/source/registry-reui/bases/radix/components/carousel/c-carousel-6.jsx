import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { localAsset } from "../../../../../../../adapters/assets.ts";
import { Card } from "../../../../../../../adapters/layout.tsx";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "../../../../../../../adapters/navigation.tsx";
export default function Pattern() {
    return (_jsxs(Carousel, { opts: {
            align: "center",
            loop: true,
        }, className: "w-full max-w-xs", children: [_jsx(CarouselContent, { children: Array.from({ length: 5 }).map((_, index) => (_jsx(CarouselItem, { className: "basis-[70%]", children: _jsx("div", { className: "p-1", children: _jsx(Card, { className: "relative aspect-video overflow-hidden border-0 p-0", children: _jsx("img", { src: localAsset(`https://picsum.photos/800/450?grayscale&random=${index + 30}`), alt: `Slide ${index + 1}`, width: 800, height: 450, className: "h-full w-full object-cover" }) }) }) }, index))) }), _jsx(CarouselPrevious, {}), _jsx(CarouselNext, {})] }));
}
