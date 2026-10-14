"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup, ButtonGroupText, } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const [zoom, setZoom] = useState(100);
    const handleZoomIn = () => {
        setZoom((prev) => Math.min(prev + 10, 200));
    };
    const handleZoomOut = () => {
        setZoom((prev) => Math.max(prev - 10, 10));
    };
    return (_jsxs(ButtonGroup, { children: [_jsx(Button, { variant: "outline", size: "icon", "aria-label": "Zoom out", onClick: handleZoomOut, children: _jsx(IconPlaceholder, { lucide: "MinusIcon", tabler: "IconMinus", hugeicons: "MinusSignIcon", phosphor: "MinusIcon", remixicon: "RiSubtractLine", "aria-hidden": "true" }) }), _jsxs(ButtonGroupText, { className: "w-16 justify-center", children: [zoom, "%"] }), _jsx(Button, { variant: "outline", size: "icon", "aria-label": "Zoom in", onClick: handleZoomIn, children: _jsx(IconPlaceholder, { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine", "aria-hidden": "true" }) })] }));
}
