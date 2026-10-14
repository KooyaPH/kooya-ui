import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { Kbd, KbdGroup } from "../../../../../registry/bases/radix/ui/kbd.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(InputGroup, { children: [_jsx(InputGroupAddon, { children: _jsx(IconPlaceholder, { lucide: "SparklesIcon", tabler: "IconSparkles", hugeicons: "SparklesIcon", phosphor: "SparkleIcon", remixicon: "RiSparklingLine", className: "text-emerald-500" }) }), _jsx(InputGroupInput, { placeholder: "Ask AI to generate..." }), _jsx(InputGroupAddon, { align: "inline-end", children: _jsxs(KbdGroup, { children: [_jsx(Kbd, { children: _jsx(IconPlaceholder, { lucide: "CommandIcon", tabler: "IconCommand", hugeicons: "CommandIcon", phosphor: "CommandIcon", remixicon: "RiCommandLine", className: "size-3" }) }), _jsx(Kbd, { children: "Enter" })] }) })] }) }));
}
