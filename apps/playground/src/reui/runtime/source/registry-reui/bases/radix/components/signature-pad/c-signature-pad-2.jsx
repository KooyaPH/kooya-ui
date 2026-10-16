import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SignaturePad, SignaturePadArea, SignaturePadClear, SignaturePadGuide, SignaturePadPlaceholder, SignaturePadRedo, SignaturePadUndo, } from "../../reui/signature-pad.jsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { Kbd, KbdGroup } from "../../../../../registry/bases/radix/ui/kbd.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(SignaturePad, { className: "mx-auto max-w-lg", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(ButtonGroup, { "aria-label": "History", children: [_jsx(SignaturePadUndo, {}), _jsx(SignaturePadRedo, {})] }), _jsxs("p", { className: "text-muted-foreground hidden items-center gap-1.5 text-xs sm:flex", children: [_jsxs(KbdGroup, { children: [_jsx(Kbd, { children: "Ctrl" }), _jsx(Kbd, { children: "Z" })] }), "to undo"] }), _jsxs(SignaturePadClear, { size: "sm", className: "ms-auto", children: [_jsx(IconPlaceholder, { lucide: "BrushCleaningIcon", tabler: "IconEraser", hugeicons: "BrushCleaningIcon", phosphor: "BroomIcon", remixicon: "RiEraserLine", "aria-hidden": "true" }), "Clear"] })] }), _jsxs(SignaturePadArea, { className: "h-48", children: [_jsx(SignaturePadGuide, {}), _jsx(SignaturePadPlaceholder, { children: "Draw your signature" })] })] }));
}
