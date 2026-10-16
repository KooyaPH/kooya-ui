import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx(Field, { className: "w-full max-w-xs", children: _jsxs(InputGroup, { children: [_jsx(InputGroupInput, { defaultValue: "https://reui.com/share", readOnly: true }), _jsx(InputGroupAddon, { align: "inline-end", children: _jsx(InputGroupButton, { variant: "ghost", size: "icon-xs", onClick: () => toast.success("Copied to clipboard"), children: _jsx(IconPlaceholder, { lucide: "CopyIcon", tabler: "IconCopy", hugeicons: "CopyIcon", phosphor: "CopyIcon", remixicon: "RiFileCopyLine", className: "size-4" }) }) })] }) }));
}
