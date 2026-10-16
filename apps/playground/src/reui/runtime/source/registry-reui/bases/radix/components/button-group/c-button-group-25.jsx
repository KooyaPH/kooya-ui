"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    const [rating, setRating] = useState(null);
    return (_jsxs("div", { className: "space-y-3", children: [_jsx("p", { className: "text-sm font-medium", children: "How likely are you to recommend us?" }), _jsx(ButtonGroup, { children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (_jsx(Button, { variant: "outline", size: "icon-sm", onClick: () => setRating(n), className: cn(rating === n &&
                        "bg-primary hover:bg-primary hover:text-primary-foreground hover:border-primary text-primary-foreground border-primary"), children: n }, n))) }), _jsxs("div", { className: "text-muted-foreground flex justify-between text-xs", children: [_jsx("span", { children: "Not likely" }), _jsx("span", { children: "Very likely" })] })] }));
}
