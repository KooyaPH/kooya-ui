import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(ButtonGroup, { children: [_jsxs(Button, { variant: "outline", children: [_jsx(IconPlaceholder, { lucide: "HeartIcon", tabler: "IconHeart", hugeicons: "FavouriteIcon", phosphor: "HeartIcon", remixicon: "RiHeartLine", "aria-hidden": "true" }), "Like"] }), _jsx(Button, { variant: "outline", className: "w-12", asChild: true, children: _jsx("span", { children: "1.2K" }) })] }));
}
