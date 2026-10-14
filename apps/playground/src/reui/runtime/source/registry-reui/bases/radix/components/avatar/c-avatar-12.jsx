import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(AvatarGroup, { children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "/reui-assets/images/f1d4253436738aaf8fdf.jpg", alt: "Nick Johnson" }), _jsx(AvatarFallback, { children: "NJ" })] }), _jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "/reui-assets/images/e93553df2422635515ee.jpg", alt: "Alex Johnson (away)" }), _jsx(AvatarFallback, { children: "AJ" })] }), _jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg", alt: "Sarah Chen" }), _jsx(AvatarFallback, { children: "SC" })] }), _jsx(AvatarGroupCount, { children: _jsx(IconPlaceholder, { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine", "aria-hidden": "true" }) })] }));
}
