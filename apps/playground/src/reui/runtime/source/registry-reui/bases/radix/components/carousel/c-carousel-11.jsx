import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { localAsset } from "../../../../../../../adapters/assets.ts";
"use client";
import { useEffect, useState } from "react";
import { cn } from "cn";
import { Card } from "../../../../../../../adapters/layout.tsx";
import { Carousel, CarouselContent, CarouselItem, } from "../../../../../../../adapters/navigation.tsx";
export default function Pattern() {
    const [api, setApi] = useState();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!api)
            return;
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);
    return (_jsxs(Carousel, { setApi: setApi, className: "w-full max-w-xs", children: [_jsx(CarouselContent, { children: Array.from({ length: 5 }).map((_, index) => (_jsx(CarouselItem, { children: _jsx("div", { className: "p-1", children: _jsxs(Card, { className: "group/card relative aspect-square overflow-hidden border-0 p-0", children: [_jsx("img", { src: localAsset(`https://picsum.photos/800/800?grayscale&random=${index + 45}`), alt: `Slide ${index + 1}`, width: 800, height: 800, className: "absolute inset-0 size-full scale-100 object-cover transition-transform duration-500 ease-in-out group-hover/card:scale-105" }), _jsx("div", { className: "absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent" }), _jsxs("div", { className: "absolute inset-0 top-auto flex flex-col justify-end bg-black/20 p-4", children: [_jsxs("h3", { className: "text-xl font-bold text-white", children: ["Slide ", index + 1] }), _jsxs("p", { className: "text-sm text-white/90", children: ["Feature description for slide ", index + 1, "."] })] })] }) }) }, index))) }), _jsx("div", { className: "flex justify-center gap-2 py-3", children: Array.from({ length: count }).map((_, index) => (_jsx("button", { className: cn("h-2 cursor-pointer rounded-full transition-all duration-500 ease-in-out", index === current
                        ? "bg-primary w-4 opacity-100"
                        : "bg-muted-foreground w-2 opacity-30 hover:opacity-50"), onClick: () => api?.scrollTo(index), "aria-label": `Go to slide ${index + 1}` }, index))) })] }));
}
