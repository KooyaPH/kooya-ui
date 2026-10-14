import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { localAsset } from "../../../../../../../adapters/assets.ts";
import { Card } from "../../../../../../../adapters/layout.tsx";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "../../../../../../../adapters/navigation.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex w-full items-center justify-center p-6", children: _jsxs(Carousel, { opts: {
                align: "start",
            }, orientation: "vertical", className: "w-full max-w-xs", children: [_jsx(CarouselContent, { className: "-mt-1 h-[325px]", children: Array.from({ length: 5 }).map((_, index) => (_jsx(CarouselItem, { className: "basis-1/2 pt-1", children: _jsx("div", { className: "p-1", children: _jsx(Card, { className: "relative h-[145px] overflow-hidden border-0 p-0", children: _jsx("img", { src: localAsset(`https://picsum.photos/600/300?grayscale&random=${index + 10}`), alt: `Slide ${index + 1}`, width: 600, height: 300, className: "h-full w-full object-cover" }) }) }) }, index))) }), _jsx(CarouselPrevious, {}), _jsx(CarouselNext, {})] }) }));
}
