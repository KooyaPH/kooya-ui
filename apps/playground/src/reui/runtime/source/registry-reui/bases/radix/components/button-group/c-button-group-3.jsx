import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(ButtonGroup, { children: [_jsxs(Button, { variant: "outline", children: [_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File02Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", "aria-hidden": "true" }), _jsx(Badge, { variant: "warning-light", children: "Draft" })] }), _jsxs(Button, { variant: "outline", children: [_jsx(IconPlaceholder, { lucide: "PencilIcon", tabler: "IconPencil", hugeicons: "PenIcon", phosphor: "PencilIcon", remixicon: "RiPencilLine", "aria-hidden": "true" }), _jsx("span", { children: "Edit" })] }), _jsx(Button, { variant: "outline", size: "icon", children: _jsx(IconPlaceholder, { lucide: "UploadIcon", tabler: "IconUpload", hugeicons: "Upload01Icon", phosphor: "UploadSimple", remixicon: "RiUpload2Line", "aria-hidden": "true" }) })] }));
}
