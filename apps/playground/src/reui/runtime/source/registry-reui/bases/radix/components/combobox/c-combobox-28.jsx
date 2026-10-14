"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "cn";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Combobox, ComboboxCollection, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxLabel, ComboboxList, ComboboxSeparator, ComboboxTrigger, ComboboxValue, } from "../../../../../registry/bases/radix/ui/combobox.jsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Item, ItemContent, ItemMedia, ItemTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const noAssigneeOption = {
    type: "none",
    id: "no-assignee",
    value: "none",
    label: "No assignee",
    searchText: "No assignee unassigned clear assignee remove assignee",
};
const teamMembers = [
    {
        type: "member",
        id: "member-1",
        value: "alex-morgan",
        label: "Alex Morgan",
        avatar: "/reui-assets/images/833451dbb99bcf927d1b.jpg",
        initials: "AM",
        isCurrentUser: true,
        searchText: "Alex Morgan current user owner",
    },
    {
        type: "member",
        id: "member-2",
        value: "emma-carter",
        label: "Emma Carter",
        avatar: "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
        initials: "EC",
        searchText: "Emma Carter product design",
    },
    {
        type: "member",
        id: "member-3",
        value: "ryan-mitchell",
        label: "Ryan Mitchell",
        avatar: "/reui-assets/images/c6064767ae24420606fc.jpg",
        initials: "RM",
        searchText: "Ryan Mitchell engineering backend",
    },
    {
        type: "member",
        id: "member-4",
        value: "olivia-bennett",
        label: "Olivia Bennett",
        avatar: "/reui-assets/images/efb8484410f45934d56a.jpg",
        initials: "OB",
        searchText: "Olivia Bennett growth marketing",
    },
    {
        type: "member",
        id: "member-5",
        value: "ethan-brooks",
        label: "Ethan Brooks",
        avatar: "/reui-assets/images/b2bda5d4122155a0381c.jpg",
        initials: "EB",
        searchText: "Ethan Brooks operations",
    },
];
const inviteOption = {
    type: "invite",
    id: "invite-user",
    value: "invite",
    label: "Invite...",
    searchText: "Invite new user teammate member collaborator",
};
const assigneeOptions = [
    noAssigneeOption,
    ...teamMembers,
    inviteOption,
];
function UserGlyph({ className }) {
    return (_jsx(IconPlaceholder, { lucide: "UserIcon", tabler: "IconUser", hugeicons: "UserIcon", phosphor: "UserIcon", remixicon: "RiUserLine", className: cn("size-4 shrink-0", className) }));
}
function PaperPlaneIcon({ className }) {
    return (_jsx(IconPlaceholder, { lucide: "SendIcon", tabler: "IconSend", hugeicons: "SentIcon", phosphor: "PaperPlaneTiltIcon", remixicon: "RiSendInsLine", className: cn("size-4 shrink-0", className) }));
}
function AssigneeTriggerLabel({ option, placeholder, }) {
    if (!option) {
        return _jsx("span", { className: "text-muted-foreground truncate", children: placeholder });
    }
    if (option.type === "none") {
        return (_jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [_jsx(UserGlyph, { className: "text-muted-foreground" }), _jsx("span", { className: "truncate", children: option.label })] }));
    }
    return (_jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [_jsxs(Avatar, { className: "size-5", children: [_jsx(AvatarImage, { src: option.avatar, alt: option.label }), _jsx(AvatarFallback, { className: "text-[9px]", children: option.initials })] }), _jsx("span", { className: "truncate", children: option.label })] }));
}
function AssigneeListRow({ option, }) {
    if (option.type === "none") {
        return (_jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [_jsx(UserGlyph, { className: "text-muted-foreground" }), _jsx("span", { className: "truncate", children: option.label })] }));
    }
    if (option.type === "invite") {
        return (_jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [_jsx(PaperPlaneIcon, { className: "text-muted-foreground" }), _jsx("span", { className: "truncate", children: option.label })] }));
    }
    return (_jsxs(Item, { size: "xs", className: "p-0", children: [_jsx(ItemMedia, { children: _jsxs(Avatar, { className: "size-5", children: [_jsx(AvatarImage, { src: option.avatar, alt: option.label }), _jsx(AvatarFallback, { className: "text-[9px]", children: option.initials })] }) }), _jsx(ItemContent, { children: _jsxs(ItemTitle, { className: "gap-1 whitespace-nowrap", children: [_jsx("span", { children: option.label }), option.isCurrentUser ? (_jsx("span", { className: "text-muted-foreground font-normal", children: "(You)" })) : null] }) })] }));
}
export default function Pattern() {
    const [assignee, setAssignee] = React.useState(null);
    const selectedAssignee = assignee ?? noAssigneeOption;
    function handleAssigneeChange(nextAssignee) {
        if (!nextAssignee || nextAssignee.type === "invite") {
            return;
        }
        setAssignee(nextAssignee.type === "member" ? nextAssignee : null);
    }
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Combobox, { items: assigneeOptions, value: selectedAssignee, onValueChange: handleAssigneeChange, itemToStringValue: (item) => item.searchText, autoHighlight: true, children: [_jsx(ComboboxTrigger, { render: _jsx(Button, { type: "button", variant: "outline", className: "w-full justify-between font-normal" }), children: _jsx(ComboboxValue, { placeholder: "No assignee", children: (selectedAssignee) => (_jsx(AssigneeTriggerLabel, { option: selectedAssignee, placeholder: "No assignee" })) }) }), _jsxs(ComboboxContent, { className: "max-w-(--anchor-width) min-w-(--anchor-width)", children: [_jsx(ComboboxInput, { showTrigger: false, placeholder: "Select assignee", className: "mb-1" }), _jsx(ComboboxEmpty, { children: "No assignees found." }), _jsxs(ComboboxList, { children: [_jsx(ComboboxItem, { value: noAssigneeOption, children: _jsx(AssigneeListRow, { option: noAssigneeOption }) }), _jsx(ComboboxSeparator, {}), _jsxs(ComboboxGroup, { items: teamMembers, children: [_jsx(ComboboxLabel, { children: "Team members" }), _jsx(ComboboxCollection, { children: (member) => (_jsx(ComboboxItem, { value: member, children: _jsx(AssigneeListRow, { option: member }) }, member.id)) })] }), _jsx(ComboboxSeparator, {}), _jsxs(ComboboxGroup, { items: [inviteOption], children: [_jsx(ComboboxLabel, { children: "New user" }), _jsx(ComboboxCollection, { children: (item) => (_jsx(ComboboxItem, { value: item, children: _jsx(AssigneeListRow, { option: item }) }, item.id)) })] })] })] })] }) }));
}
