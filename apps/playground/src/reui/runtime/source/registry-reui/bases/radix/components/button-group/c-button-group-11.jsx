import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx(ButtonGroup, { children: _jsxs(ButtonGroup, { children: [_jsx(Button, { variant: "outline", size: "icon-sm", children: _jsx(IconPlaceholder, { lucide: "ArrowLeftIcon", tabler: "IconArrowLeft", hugeicons: "ArrowLeft02Icon", phosphor: "ArrowLeftIcon", remixicon: "RiArrowLeftLine", "aria-hidden": "true" }) }), _jsx(Button, { variant: "outline", size: "sm", children: "1" }), _jsx(Button, { variant: "outline", size: "sm", children: "2" }), _jsx(Button, { variant: "outline", size: "sm", children: "3" }), _jsx(Button, { variant: "outline", size: "icon-sm", children: _jsx(IconPlaceholder, { lucide: "ArrowRightIcon", tabler: "IconArrowRight", hugeicons: "ArrowRight02Icon", phosphor: "ArrowRightIcon", remixicon: "RiArrowRightLine", "aria-hidden": "true" }) })] }) }));
}
