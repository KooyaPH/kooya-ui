import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(InputGroup, { children: [_jsx(InputGroupInput, { type: "email", placeholder: "you@example.com" }), _jsx(InputGroupAddon, { align: "inline-end", children: _jsx(IconPlaceholder, { lucide: "MailIcon", tabler: "IconMail", hugeicons: "MailIcon", phosphor: "EnvelopeIcon", remixicon: "RiMailLine" }) })] }) }));
}
