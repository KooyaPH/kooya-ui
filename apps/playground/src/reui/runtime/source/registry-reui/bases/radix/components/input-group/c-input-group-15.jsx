import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { Spinner } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", "data-disabled": "true", children: _jsxs(InputGroup, { children: [_jsx(InputGroupInput, { defaultValue: "shadcn_ui", disabled: true }), _jsx(InputGroupAddon, { align: "inline-end", children: _jsx(Spinner, {}) })] }) }));
}
