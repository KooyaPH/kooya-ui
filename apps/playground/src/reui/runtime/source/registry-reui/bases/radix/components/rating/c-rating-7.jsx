"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Rating } from "../../../../../../../adapters/utility.tsx";
export default function Pattern() {
    const [rating, setRating] = useState(3.5);
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-xs flex-col items-center gap-4", children: [_jsx(Rating, { rating: rating, onRatingChange: setRating, editable: true }), _jsxs("p", { className: "text-muted-foreground text-sm", children: ["Your rating:", " ", _jsx("span", { className: "text-foreground font-semibold", children: rating.toFixed(1) }), " ", "/ 5"] })] }));
}
