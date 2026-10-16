import { jsx as _jsx } from "react/jsx-runtime";
import { AspectRatio } from "../../../../../registry/bases/radix/ui/aspect-ratio.jsx";
export default function Pattern() {
    return (_jsx("div", { className: "w-full max-w-xs", children: _jsx(AspectRatio, { ratio: 1 / 1, className: "bg-muted rounded-xl overflow-hidden border", children: _jsx("img", { src: "/reui-assets/images/2f95edd007f2710283bc.jpg", alt: "1:1", width: 1000, height: 800, className: "h-full w-full object-cover" }) }) }));
}
