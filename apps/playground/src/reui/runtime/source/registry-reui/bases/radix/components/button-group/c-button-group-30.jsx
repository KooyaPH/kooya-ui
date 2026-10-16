import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup, ButtonGroupText, } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(ButtonGroup, { children: [_jsxs(Button, { size: "sm", variant: "default", "aria-label": "Following 2.4k", className: "border-primary", children: [_jsx(IconPlaceholder, { lucide: "StarIcon", tabler: "IconStar", hugeicons: "StarIcon", phosphor: "StarIcon", remixicon: "RiStarLine" }), "Star"] }), _jsx(ButtonGroupText, { className: "border-primary", children: "2.4k" })] }));
}
