"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "../../../../../registry/bases/radix/ui/command.jsx";
const users = [
    {
        name: "Alex Johnson",
        email: "alex@example.com",
        avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
        role: "Admin",
    },
    {
        name: "Sarah Chen",
        email: "sarah@example.com",
        avatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
        role: "Editor",
    },
    {
        name: "David Kim",
        email: "david@example.com",
        avatar: "/reui-assets/images/973d47055c51440af7dc.jpg",
        role: "Viewer",
    },
    {
        name: "Emma Wilson",
        email: "emma@example.com",
        avatar: "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
        role: "Admin",
    },
    {
        name: "Michael Rodriguez",
        email: "michael@example.com",
        avatar: "/reui-assets/images/4349381d8a8476edbc4c.jpg",
        role: "Editor",
    },
];
export default function Pattern() {
    const [open, setOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => setOpen(true), variant: "outline", children: "Search Users" }), _jsx(CommandDialog, { open: open, onOpenChange: setOpen, children: _jsxs(Command, { className: "**:data-[selected=true]:bg-muted **:data-selected:bg-transparent", children: [_jsx(CommandInput, { placeholder: "Search by name or email..." }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: "No users found." }), _jsx(CommandGroup, { heading: "Team Members", children: users.map((user) => (_jsxs(CommandItem, { className: "gap-2 py-2", children: [_jsxs(Avatar, { className: "size-6 shrink-0", children: [_jsx(AvatarImage, { src: user.avatar, alt: user.name }), _jsx(AvatarFallback, { className: "text-xs", children: user.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("") })] }), _jsxs("div", { className: "flex flex-1 flex-col", children: [_jsx("span", { className: "text-sm font-medium", children: user.name }), _jsx("span", { className: "text-muted-foreground text-xs", children: user.email })] }), _jsx("div", { className: "ml-auto", "data-slot": "command-shortcut", children: _jsx(Badge, { variant: user.role === "Admin"
                                                        ? "primary-light"
                                                        : user.role === "Editor"
                                                            ? "info-light"
                                                            : "success-light", size: "sm", children: user.role }) })] }, user.email))) })] })] }) })] }));
}
