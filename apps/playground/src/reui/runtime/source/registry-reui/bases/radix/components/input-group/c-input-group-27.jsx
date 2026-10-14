import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ButtonGroup, ButtonGroupText, } from "../../../../../../../adapters/controls.tsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(ButtonGroup, { children: [_jsx(ButtonGroupText, { children: "https://" }), _jsxs(InputGroup, { children: [_jsx(InputGroupInput, { placeholder: "example" }), _jsx(InputGroupAddon, { align: "inline-end", children: _jsx(IconPlaceholder, { lucide: "InfoIcon", tabler: "IconInfoCircle", hugeicons: "InformationCircleIcon", phosphor: "InfoIcon", remixicon: "RiInformationLine", className: "text-muted-foreground size-4" }) })] }), _jsx(ButtonGroupText, { children: ".com" })] }) }));
}
