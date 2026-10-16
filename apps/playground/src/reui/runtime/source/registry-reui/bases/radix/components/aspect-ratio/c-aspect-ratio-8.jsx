import { jsx as _jsx } from "react/jsx-runtime";
import { AspectRatio } from "../../../../../registry/bases/radix/ui/aspect-ratio.jsx";
export default function Pattern() {
    return (_jsx("div", { className: "w-full max-w-md", children: _jsx(AspectRatio, { ratio: 16 / 10, className: "bg-muted rounded-xl overflow-hidden border", children: _jsx("img", { src: "/reui-assets/images/355afce7afc66d079f8e.jpg", alt: "16:10", width: 1000, height: 800, className: "h-full w-full object-cover" }) }) }));
}
