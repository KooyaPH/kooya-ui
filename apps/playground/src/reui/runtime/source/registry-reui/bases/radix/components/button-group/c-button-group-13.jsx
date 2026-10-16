import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(ButtonGroup, { orientation: "vertical", children: [_jsx(Button, { variant: "outline", size: "icon", "aria-label": "Add", children: _jsx(IconPlaceholder, { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine", "aria-hidden": "true" }) }), _jsx(Button, { variant: "outline", size: "icon", "aria-label": "Subtract", children: _jsx(IconPlaceholder, { lucide: "MinusIcon", tabler: "IconMinus", hugeicons: "MinusSignIcon", phosphor: "MinusIcon", remixicon: "RiSubtractLine", "aria-hidden": "true" }) })] }));
}
