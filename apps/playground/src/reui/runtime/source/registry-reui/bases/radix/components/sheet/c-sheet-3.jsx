import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from "../../../../../../../adapters/overlays.tsx";
const sides = ["top", "right", "bottom", "left"];
export default function Pattern() {
    return (_jsx("div", { className: "flex flex-wrap items-center justify-center gap-2", children: sides.map((side) => (_jsxs(Sheet, { children: [_jsx(SheetTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", className: "capitalize", children: side }) }), _jsxs(SheetContent, { side: side, className: "data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]", children: [_jsxs(SheetHeader, { children: [_jsxs(SheetTitle, { children: ["Sheet Side: ", side] }), _jsxs(SheetDescription, { children: ["This sheet opens from the ", side, " side of the screen."] })] }), _jsx("div", { className: "text-muted-foreground p-4 text-sm", children: Array.from({ length: 5 }).map((_, i) => (_jsx("p", { className: "mb-2", children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }, i))) }), _jsx(SheetFooter, { children: _jsx(SheetClose, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Close" }) }) })] })] }, side))) }));
}
