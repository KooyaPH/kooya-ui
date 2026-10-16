import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx(Field, { className: "w-full max-w-xs", children: _jsxs(InputGroup, { className: "h-auto", children: [_jsx(InputGroupInput, { placeholder: "First name" }), _jsxs(InputGroupAddon, { align: "block-start", children: [_jsx(InputGroupText, { className: "font-medium", children: "User Profile" }), _jsx(IconPlaceholder, { lucide: "InfoIcon", tabler: "IconInfoCircle", hugeicons: "InformationCircleIcon", phosphor: "InfoIcon", remixicon: "RiInformationLine", className: "ml-auto" })] })] }) }));
}
