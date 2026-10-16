import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldGroup, FieldLabel, FieldTitle, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsx(FieldGroup, { className: "w-full max-w-xs", children: _jsx(FieldLabel, { className: "relative p-0", children: _jsxs(Field, { orientation: "horizontal", children: [_jsxs(FieldTitle, { className: "flex items-center gap-2", children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "/reui-assets/images/e53b6c9adff882773afd.jpg", alt: "Emma Wilson" }), _jsx(AvatarFallback, { children: "EW" })] }), _jsxs("div", { className: "flex flex-col items-start", children: [_jsx("span", { className: "text-sm font-semibold", children: "Emma Wilson" }), _jsx("span", { className: "text-muted-foreground text-xs", children: "@emmawilson" })] })] }), _jsx(Checkbox, { defaultChecked: true })] }) }) }));
}
