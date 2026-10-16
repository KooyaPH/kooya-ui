import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(InputGroup, { children: [_jsx(InputGroupTextarea, { placeholder: "Share your thoughts...", className: "min-h-24" }), _jsxs(InputGroupAddon, { align: "block-end", children: [_jsx(InputGroupButton, { variant: "secondary", size: "sm", children: "Cancel" }), _jsx(InputGroupButton, { variant: "default", size: "sm", className: "ml-auto", children: "Post Comment" })] })] }) }));
}
