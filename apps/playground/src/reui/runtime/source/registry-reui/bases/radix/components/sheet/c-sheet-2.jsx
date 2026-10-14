import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldGroup, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from "../../../../../../../adapters/overlays.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Sheet, { children: [_jsx(SheetTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "With No Close Button" }) }), _jsxs(SheetContent, { showCloseButton: false, children: [_jsxs(SheetHeader, { children: [_jsx(SheetTitle, { children: "Edit profile" }), _jsx(SheetDescription, { children: "Make changes to your profile here. Click save when you're done." })] }), _jsx("div", { className: "p-4", children: _jsxs(FieldGroup, { children: [_jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "name", children: "Name" }), _jsx(Input, { id: "name", defaultValue: "John Doe" })] }), _jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "username", children: "Username" }), _jsx(Input, { id: "username", defaultValue: "@john-doe" })] })] }) }), _jsxs(SheetFooter, { children: [_jsx(Button, { type: "submit", children: "Save changes" }), _jsx(SheetClose, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Cancel" }) })] })] })] }) }));
}
