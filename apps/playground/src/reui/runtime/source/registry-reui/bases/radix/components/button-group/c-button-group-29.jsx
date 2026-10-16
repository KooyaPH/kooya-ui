import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup, ButtonGroupText, } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(ButtonGroup, { children: [_jsxs(Button, { size: "sm", variant: "outline", children: [_jsx(IconPlaceholder, { lucide: "UserPlusIcon", tabler: "IconUserPlus", hugeicons: "UserAdd01Icon", phosphor: "UserPlusIcon", remixicon: "RiUserAddLine", "aria-hidden": "true" }), "Follow"] }), _jsx(ButtonGroupText, { className: "text-muted-foreground", children: "2.4k followers" })] }));
}
