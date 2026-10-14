import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Toggle } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { size: "sm", variant: "outline", children: "Button" }), _jsx(Toggle, { variant: "outline", size: "sm", "aria-label": "Small toggle", children: "Toggle" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", size: "icon", children: _jsx(IconPlaceholder, { lucide: "BoldIcon", tabler: "IconBold", hugeicons: "TextBoldIcon", phosphor: "TextBIcon", remixicon: "RiBold" }) }), _jsx(Toggle, { variant: "outline", "aria-label": "Toggle bold icon", children: _jsx(IconPlaceholder, { lucide: "BoldIcon", tabler: "IconBold", hugeicons: "TextBoldIcon", phosphor: "TextBIcon", remixicon: "RiBold" }) })] })] }));
}
