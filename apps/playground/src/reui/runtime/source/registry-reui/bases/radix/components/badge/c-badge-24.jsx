import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(Badge, { variant: "outline", children: [_jsxs(Avatar, { className: "size-3.5", children: [_jsx(AvatarImage, { src: "/reui-assets/images/e93553df2422635515ee.jpg" }), _jsx(AvatarFallback, { children: "AL" })] }), "Alex", _jsx(Button, { variant: "ghost", size: "icon", className: "size-3 hover:bg-transparent", children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "MultiplicationSignIcon", phosphor: "XIcon", remixicon: "RiCloseLine" }) })] }));
}
