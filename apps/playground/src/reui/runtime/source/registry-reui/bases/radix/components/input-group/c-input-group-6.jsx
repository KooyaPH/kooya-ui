import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(InputGroup, { children: [_jsx(InputGroupAddon, { children: _jsx(IconPlaceholder, { lucide: "MicIcon", tabler: "IconMicrophone", hugeicons: "Mic02Icon", phosphor: "MicrophoneIcon", remixicon: "RiMicLine" }) }), _jsx(InputGroupInput, { placeholder: "Listening..." }), _jsx(InputGroupAddon, { align: "inline-end", children: _jsx(IconPlaceholder, { lucide: "RadioIcon", tabler: "IconBroadcast", hugeicons: "LiveStreaming02Icon", phosphor: "BroadcastIcon", remixicon: "RiRfidLine", className: "text-destructive animate-pulse" }) })] }) }));
}
