"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from "react";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { Field, FieldGroup, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    const id = useId();
    const [open, setOpen] = useState(false);
    const [profile, setProfile] = useState({
        name: "Pedro Duarte",
        username: "@peduarte",
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setProfile({
            name: String(formData.get("name")),
            username: String(formData.get("username")),
        });
        setOpen(false);
    };
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Basic Dialog" }) }), _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Edit profile" }), _jsx(DialogDescription, { children: "Make changes to your profile here. Click save when you're done. Your profile will be updated immediately." })] }), _jsxs("form", { onSubmit: handleSubmit, className: "contents", children: [_jsxs(FieldGroup, { children: [_jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: `${id}-name`, children: "Name" }), _jsx(Input, { id: `${id}-name`, name: "name", defaultValue: profile.name })] }), _jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: `${id}-username`, children: "Username" }), _jsx(Input, { id: `${id}-username`, name: "username", defaultValue: profile.username })] })] }), _jsxs(DialogFooter, { children: [_jsx(DialogClose, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Cancel" }) }), _jsx(Button, { type: "submit", children: "Save changes" })] })] })] })] }) }));
}
