import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "max-w-xs", children: [_jsx(FieldLabel, { htmlFor: "search-input", children: "Search Components" }), _jsxs(InputGroup, { children: [_jsx(InputGroupAddon, { children: _jsx(IconPlaceholder, { lucide: "SearchIcon", tabler: "IconSearch", hugeicons: "Search01Icon", phosphor: "MagnifyingGlassIcon", remixicon: "RiSearchLine", className: "text-muted-foreground" }) }), _jsx(InputGroupInput, { id: "search-input", placeholder: "Search..." })] })] }));
}
