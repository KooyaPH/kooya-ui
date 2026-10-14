"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const [volume, setVolume] = useState(50);
    const [isMuted, setIsMuted] = useState(false);
    const increaseVolume = () => {
        setVolume((prev) => Math.min(prev + 5, 100));
        setIsMuted(false);
    };
    const decreaseVolume = () => {
        setVolume((prev) => {
            const next = Math.max(prev - 5, 0);
            if (next === 0)
                setIsMuted(true);
            return next;
        });
    };
    const toggleMute = () => {
        setIsMuted((prev) => !prev);
    };
    return (_jsxs(ButtonGroup, { children: [_jsx(Button, { onClick: decreaseVolume, size: "sm", variant: "outline", "aria-label": "Decrease Volume", children: _jsx(IconPlaceholder, { lucide: "MinusIcon", tabler: "IconMinus", hugeicons: "MinusSignIcon", phosphor: "MinusIcon", remixicon: "RiSubtractLine", "aria-hidden": "true" }) }), _jsx(Button, { onClick: toggleMute, size: "sm", variant: "outline", className: "min-w-20", children: isMuted ? "Muted" : `${volume}%` }), _jsx(Button, { onClick: increaseVolume, size: "sm", variant: "outline", "aria-label": "Increase Volume", children: _jsx(IconPlaceholder, { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine", "aria-hidden": "true" }) })] }));
}
