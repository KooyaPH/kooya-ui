"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const users = [
    {
        id: "1",
        name: "Alex Johnson",
        email: "alex@example.com",
        avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
        initials: "AJ",
    },
    {
        id: "2",
        name: "Sarah Chen",
        email: "sarah@example.com",
        avatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
        initials: "SC",
    },
    {
        id: "3",
        name: "Michael Rodriguez",
        email: "michael@example.com",
        avatar: "/reui-assets/images/4349381d8a8476edbc4c.jpg",
        initials: "MR",
    },
    {
        id: "4",
        name: "Emma Wilson",
        email: "emma@example.com",
        avatar: "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
        initials: "EW",
    },
];
export default function Pattern() {
    const [selectedUserId, setSelectedUserId] = useState("3");
    return (_jsxs(ButtonGroup, { children: [_jsxs(Select, { value: selectedUserId, onValueChange: setSelectedUserId, children: [_jsx(SelectTrigger, { className: "w-40", children: _jsx(SelectValue, { placeholder: "Select user" }) }), _jsx(SelectContent, { position: "popper", className: "min-w-[200px]", children: _jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Team Members" }), users.map((user) => (_jsx(SelectItem, { value: user.id, children: _jsxs("span", { className: "flex items-center gap-2", children: [_jsxs(Avatar, { className: "size-5", children: [_jsx(AvatarImage, { src: user.avatar, alt: user.name }), _jsx(AvatarFallback, { className: "text-[10px]", children: user.initials })] }), _jsx("span", { className: "truncate", children: user.name })] }) }, user.id)))] }) })] }), _jsx(Button, { variant: "outline", size: "icon", "aria-label": "Add Tag", children: _jsx(IconPlaceholder, { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine", "aria-hidden": "true" }) }), _jsx(Button, { variant: "outline", size: "icon", "aria-label": "Settings", children: _jsx(IconPlaceholder, { lucide: "Settings2Icon", tabler: "IconAdjustmentsHorizontal", hugeicons: "FilterHorizontalIcon", phosphor: "SlidersHorizontalIcon", remixicon: "RiEqualizer2Line", "aria-hidden": "true" }) })] }));
}
