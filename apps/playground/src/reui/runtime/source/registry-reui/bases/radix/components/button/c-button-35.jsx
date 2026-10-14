"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const [isExpanded, setIsExpanded] = useState(false);
    return (_jsxs(Button, { variant: "ghost", onClick: () => setIsExpanded(!isExpanded), children: [isExpanded ? "Show less" : "Show more", isExpanded ? (_jsx(IconPlaceholder, { lucide: "ChevronUpIcon", tabler: "IconChevronUp", hugeicons: "ArrowUp01Icon", phosphor: "CaretUpIcon", remixicon: "RiArrowUpSLine", "aria-hidden": "true" })) : (_jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", "aria-hidden": "true" }))] }));
}
