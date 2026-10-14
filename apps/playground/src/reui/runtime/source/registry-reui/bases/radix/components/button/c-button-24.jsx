import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx(Button, { size: "icon-xs", variant: "outline", "aria-label": "Close", children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "MultiplicationSignIcon", phosphor: "XIcon", remixicon: "RiCloseLine", "aria-hidden": "true" }) }));
}
