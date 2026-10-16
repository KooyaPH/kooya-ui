import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Kbd, KbdGroup } from "../../../../../registry/bases/radix/ui/kbd.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(KbdGroup, { children: [_jsxs(Kbd, { children: [_jsx(IconPlaceholder, { lucide: "ArrowLeftIcon", tabler: "IconArrowLeft", hugeicons: "ArrowLeft02Icon", phosphor: "ArrowLeftIcon", remixicon: "RiArrowLeftLine" }), "Left"] }), _jsxs(Kbd, { children: [_jsx(IconPlaceholder, { lucide: "CircleDashedIcon", tabler: "IconCircleDashed", hugeicons: "DashedLineCircleIcon", phosphor: "CircleDashedIcon", remixicon: "RiLoaderLine" }), "Voice Enabled"] })] }) }));
}
