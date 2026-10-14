import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ToggleGroup, ToggleGroupItem, } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(ToggleGroup, { type: "multiple", orientation: "vertical", variant: "outline", spacing: 1, children: [_jsx(ToggleGroupItem, { value: "bold", "aria-label": "Toggle bold", children: _jsx(IconPlaceholder, { lucide: "BoldIcon", tabler: "IconBold", hugeicons: "TextBoldIcon", phosphor: "TextBIcon", remixicon: "RiBold" }) }), _jsx(ToggleGroupItem, { value: "italic", "aria-label": "Toggle italic", children: _jsx(IconPlaceholder, { lucide: "ItalicIcon", tabler: "IconItalic", hugeicons: "TextItalicIcon", phosphor: "TextItalicIcon", remixicon: "RiItalic" }) }), _jsx(ToggleGroupItem, { value: "underline", "aria-label": "Toggle underline", children: _jsx(IconPlaceholder, { lucide: "UnderlineIcon", tabler: "IconUnderline", hugeicons: "TextUnderlineIcon", phosphor: "TextUnderlineIcon", remixicon: "RiUnderline" }) })] }) }));
}
