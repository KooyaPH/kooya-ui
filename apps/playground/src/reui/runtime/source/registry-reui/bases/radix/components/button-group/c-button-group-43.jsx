"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const stances = [
    {
        id: "buy",
        label: "Buy",
        icon: (_jsx(IconPlaceholder, { lucide: "TrendingUpIcon", tabler: "IconTrendingUp", hugeicons: "TrendUp01Icon", phosphor: "TrendUpIcon", remixicon: "RiStockLine", "aria-hidden": "true" })),
    },
    {
        id: "hold",
        label: "Hold",
        icon: (_jsx(IconPlaceholder, { lucide: "MinusIcon", tabler: "IconMinus", hugeicons: "Minus02Icon", phosphor: "MinusIcon", remixicon: "RiSubtractLine", "aria-hidden": "true" })),
    },
    {
        id: "sell",
        label: "Sell",
        icon: (_jsx(IconPlaceholder, { lucide: "TrendingDownIcon", tabler: "IconTrendingDown", hugeicons: "TrendDown01Icon", phosphor: "TrendDownIcon", remixicon: "RiArrowDownLine", "aria-hidden": "true" })),
    },
];
export default function Pattern() {
    const [active, setActive] = useState(null);
    return (_jsx(ButtonGroup, { children: stances.map((stance) => (_jsxs(Button, { variant: active === stance.id ? "default" : "outline", onClick: () => setActive(active === stance.id ? null : stance.id), children: [stance.icon, stance.label] }, stance.id))) }));
}
