import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { Spinner } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "w-full max-w-xs", children: [_jsx(FieldLabel, { htmlFor: "search-loading", children: "Searching" }), _jsxs(InputGroup, { id: "search-loading", children: [_jsx(InputGroupInput, { placeholder: "Search records\u2026" }), _jsx(InputGroupAddon, { children: _jsx(Spinner, { className: "size-4" }) })] })] }));
}
