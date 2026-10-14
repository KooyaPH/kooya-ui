import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsx(Button, { asChild: true, children: _jsx("a", { href: "/", children: "Back to Home" }) }));
}
