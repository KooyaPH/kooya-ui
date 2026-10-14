import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Toggle } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "flex flex-wrap items-center justify-center gap-2", children: [_jsx(Toggle, { "aria-label": "Toggle bold", defaultPressed: true, children: _jsx(IconPlaceholder, { lucide: "BoldIcon", tabler: "IconBold", hugeicons: "TextBoldIcon", phosphor: "TextBIcon", remixicon: "RiBold" }) }), _jsx(Toggle, { "aria-label": "Toggle italic", children: _jsx(IconPlaceholder, { lucide: "ItalicIcon", tabler: "IconItalic", hugeicons: "TextItalicIcon", phosphor: "TextItalicIcon", remixicon: "RiItalic" }) }), _jsx(Toggle, { "aria-label": "Toggle underline", children: _jsx(IconPlaceholder, { lucide: "UnderlineIcon", tabler: "IconUnderline", hugeicons: "TextUnderlineIcon", phosphor: "TextUnderlineIcon", remixicon: "RiUnderline" }) })] }));
}
