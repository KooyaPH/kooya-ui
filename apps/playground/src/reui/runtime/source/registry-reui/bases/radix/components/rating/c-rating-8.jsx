"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { cn } from "cn";
const emojis = [
    { value: 1, emoji: "😞", label: "Terrible" },
    { value: 2, emoji: "😕", label: "Bad" },
    { value: 3, emoji: "😐", label: "Okay" },
    { value: 4, emoji: "😊", label: "Good" },
    { value: 5, emoji: "🤩", label: "Amazing" },
];
export default function Pattern() {
    const [selected, setSelected] = useState(null);
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-xs flex-col items-center gap-3", children: [_jsx("p", { className: "text-sm font-medium", children: "How was your experience?" }), _jsx("div", { className: "flex gap-2", children: emojis.map((item) => (_jsx("button", { type: "button", onClick: () => setSelected(item.value), className: cn("rounded-lg flex size-10 items-center justify-center border-2 text-2xl transition-all", selected === item.value
                        ? "border-border bg-muted scale-110"
                        : "hover:bg-muted border-transparent"), children: item.emoji }, item.value))) }), selected && (_jsx("p", { className: "text-muted-foreground text-sm", children: emojis.find((e) => e.value === selected)?.label }))] }));
}
