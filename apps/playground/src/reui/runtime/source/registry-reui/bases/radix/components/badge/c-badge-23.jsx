import { jsx as _jsx } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
export default function Pattern() {
    return (_jsx(Badge, { variant: "outline", asChild: true, children: _jsx("a", { href: "#", children: "Badge" }) }));
}
