"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "cn";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Combobox, ComboboxCollection, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxLabel, ComboboxList, ComboboxTrigger, ComboboxValue, } from "../../../../../registry/bases/radix/ui/combobox.jsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Item, ItemContent, ItemMedia, ItemTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const noLeadOption = {
    type: "none",
    value: "none",
    label: "No lead",
};
const teamMembers = [
    {
        type: "member",
        id: "member-1",
        value: "shuhrat-saipov",
        label: "Shuhrat Saipov",
        avatar: "/reui-assets/images/833451dbb99bcf927d1b.jpg",
        initials: "SS",
        isCurrentUser: true,
    },
    {
        type: "member",
        id: "member-2",
        value: "nadia-karimova",
        label: "Nadia Karimova",
        avatar: "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
        initials: "NK",
    },
    {
        type: "member",
        id: "member-3",
        value: "bekzod-rakhimov",
        label: "Bekzod Rakhimov",
        avatar: "/reui-assets/images/c6064767ae24420606fc.jpg",
        initials: "BR",
    },
    {
        type: "member",
        id: "member-4",
        value: "lina-bauer",
        label: "Lina Bauer",
        avatar: "/reui-assets/images/efb8484410f45934d56a.jpg",
        initials: "LB",
    },
    {
        type: "member",
        id: "member-5",
        value: "omar-haddad",
        label: "Omar Haddad",
        avatar: "/reui-assets/images/b2bda5d4122155a0381c.jpg",
        initials: "OH",
    },
    {
        type: "member",
        id: "member-6",
        value: "priya-nand",
        label: "Priya Nand",
        avatar: "/reui-assets/images/5785adb882eb815215aa.jpg",
        initials: "PN",
    },
    {
        type: "member",
        id: "member-7",
        value: "kenji-watan",
        label: "Kenji Watan",
        avatar: "/reui-assets/images/db62bd4fecdc9df2e323.jpg",
        initials: "KW",
    },
    {
        type: "member",
        id: "member-8",
        value: "ava-sinclair",
        label: "Ava Sinclair",
        avatar: "/reui-assets/images/7da2efac125ddc6e0086.jpg",
        initials: "AS",
    },
    {
        type: "member",
        id: "member-9",
        value: "nia-okafor",
        label: "Nia Okafor",
        avatar: "/reui-assets/images/ccbc5e77aa9f9a4b17a0.jpg",
        initials: "NO",
    },
    {
        type: "member",
        id: "member-10",
        value: "matteo-sosa",
        label: "Matteo Sosa",
        avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
        initials: "MS",
    },
    {
        type: "member",
        id: "member-11",
        value: "salma-rahman",
        label: "Salma Rahman",
        avatar: "/reui-assets/images/36d650ee9968995d8e0a.jpg",
        initials: "SR",
    },
    {
        type: "member",
        id: "member-12",
        value: "jonas-meyer",
        label: "Jonas Meyer",
        avatar: "/reui-assets/images/833451dbb99bcf927d1b.jpg",
        initials: "JM",
    },
];
const leadOptions = [noLeadOption, ...teamMembers];
function UserGlyph({ className }) {
    return (_jsx(IconPlaceholder, { lucide: "UserIcon", tabler: "IconUser", hugeicons: "UserIcon", phosphor: "UserIcon", remixicon: "RiUserLine", className: cn("size-4 shrink-0", className) }));
}
function LeadTriggerLabel({ option }) {
    if (option.type === "none") {
        return (_jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [_jsx(UserGlyph, { className: "text-muted-foreground" }), _jsx("span", { className: "truncate", children: option.label })] }));
    }
    return (_jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [_jsxs(Avatar, { className: "size-5", children: [_jsx(AvatarImage, { src: option.avatar, alt: option.label }), _jsx(AvatarFallback, { className: "text-[9px]", children: option.initials })] }), _jsx("span", { className: "truncate", children: option.label })] }));
}
function LeadListRow({ option }) {
    if (option.type === "none") {
        return (_jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [_jsx(UserGlyph, { className: "text-muted-foreground" }), _jsx("span", { className: "truncate", children: option.label })] }));
    }
    return (_jsxs(Item, { size: "xs", className: "p-0", children: [_jsx(ItemMedia, { children: _jsxs(Avatar, { className: "size-5", children: [_jsx(AvatarImage, { src: option.avatar, alt: option.label }), _jsx(AvatarFallback, { className: "text-[9px]", children: option.initials })] }) }), _jsx(ItemContent, { children: _jsxs(ItemTitle, { className: "gap-1 whitespace-nowrap", children: [_jsx("span", { children: option.label }), option.isCurrentUser ? (_jsx("span", { className: "text-muted-foreground font-normal", children: "(You)" })) : null] }) })] }));
}
export default function Pattern() {
    const [lead, setLead] = React.useState(noLeadOption);
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Combobox, { items: leadOptions, value: lead, onValueChange: setLead, itemToStringValue: (item) => item.label, autoHighlight: true, children: [_jsx(ComboboxTrigger, { render: _jsx(Button, { type: "button", variant: "outline", className: "w-full justify-between font-normal" }), children: _jsx(ComboboxValue, { placeholder: "No lead", children: (selectedLead) => selectedLead ? (_jsx(LeadTriggerLabel, { option: selectedLead })) : (_jsx("span", { className: "text-muted-foreground", children: "No lead" })) }) }), _jsxs(ComboboxContent, { className: "max-w-(--anchor-width) min-w-(--anchor-width)", children: [_jsx(ComboboxInput, { showTrigger: false, placeholder: "Select lead", className: "mb-1" }), _jsx(ComboboxEmpty, { children: "No team members found." }), _jsxs(ComboboxList, { children: [_jsx(ComboboxItem, { value: noLeadOption, children: _jsx(LeadListRow, { option: noLeadOption }) }), _jsxs(ComboboxGroup, { items: teamMembers, children: [_jsx(ComboboxLabel, { children: "Team members" }), _jsx(ComboboxCollection, { children: (member) => (_jsx(ComboboxItem, { value: member, children: _jsx(LeadListRow, { option: member }) }, member.id)) })] })] })] })] }) }));
}
