"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "cn";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxSeparator, ComboboxTrigger, ComboboxValue, } from "../../../../../registry/bases/radix/ui/combobox.jsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Item, ItemContent, ItemMedia, ItemTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const noMembersOption = {
    id: "no-members",
    value: "none",
    label: "No members",
    searchText: "No members clear members remove members empty",
};
const teamMembers = [
    {
        id: "member-1",
        value: "alex-morgan",
        label: "Alex Morgan",
        avatar: "/reui-assets/images/833451dbb99bcf927d1b.jpg",
        initials: "AM",
        isCurrentUser: true,
    },
    {
        id: "member-2",
        value: "emma-carter",
        label: "Emma Carter",
        avatar: "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
        initials: "EC",
    },
    {
        id: "member-3",
        value: "ryan-mitchell",
        label: "Ryan Mitchell",
        initials: "RM",
    },
    {
        id: "member-4",
        value: "olivia-bennett",
        label: "Olivia Bennett",
        avatar: "/reui-assets/images/efb8484410f45934d56a.jpg",
        initials: "OB",
    },
    {
        id: "member-5",
        value: "ethan-brooks",
        label: "Ethan Brooks",
        avatar: "/reui-assets/images/b2bda5d4122155a0381c.jpg",
        initials: "EB",
    },
    {
        id: "member-6",
        value: "sophia-reed",
        label: "Sophia Reed",
        avatar: "/reui-assets/images/5785adb882eb815215aa.jpg",
        initials: "SR",
    },
    {
        id: "member-7",
        value: "lucas-hayes",
        label: "Lucas Hayes",
        avatar: "/reui-assets/images/db62bd4fecdc9df2e323.jpg",
        initials: "LH",
    },
    {
        id: "member-8",
        value: "ava-sinclair",
        label: "Ava Sinclair",
        initials: "AS",
    },
    {
        id: "member-9",
        value: "mia-parker",
        label: "Mia Parker",
        avatar: "/reui-assets/images/ccbc5e77aa9f9a4b17a0.jpg",
        initials: "MP",
    },
    {
        id: "member-10",
        value: "noah-foster",
        label: "Noah Foster",
        avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
        initials: "NF",
    },
    {
        id: "member-11",
        value: "grace-collins",
        label: "Grace Collins",
        initials: "GC",
    },
    {
        id: "member-12",
        value: "jack-turner",
        label: "Jack Turner",
        avatar: "/reui-assets/images/833451dbb99bcf927d1b.jpg",
        initials: "JT",
    },
];
const memberSelectionOptions = [
    noMembersOption,
    ...teamMembers,
];
function isNoMembersOption(item) {
    return item.id === noMembersOption.id;
}
function isMemberSelectionItemEqual(item, value) {
    return item.id === value.id;
}
function UsersGlyph({ className }) {
    return (_jsx(IconPlaceholder, { lucide: "UsersIcon", tabler: "IconUsers", hugeicons: "UserMultiple02Icon", phosphor: "UsersIcon", remixicon: "RiGroupLine", className: cn("size-4 shrink-0", className) }));
}
function MemberAvatar({ member, className, fallbackClassName, }) {
    return (_jsxs(Avatar, { className: className, children: [member.avatar ? (_jsx(AvatarImage, { src: member.avatar, alt: member.label })) : null, _jsx(AvatarFallback, { className: cn("text-foreground text-[9px]", fallbackClassName), children: member.initials })] }));
}
function MembersTriggerSummary({ selectedMembers, }) {
    if (!selectedMembers.length) {
        return (_jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [_jsx(UsersGlyph, { className: "text-muted-foreground" }), _jsx("span", { className: "truncate", children: "Members" })] }));
    }
    const visibleMembers = selectedMembers.slice(0, 4);
    const hiddenMemberCount = selectedMembers.length - visibleMembers.length;
    const selectedLabel = selectedMembers.map((member) => member.label).join(", ");
    const countLabel = selectedMembers.length === 1
        ? "1 member"
        : hiddenMemberCount > 0
            ? `+${hiddenMemberCount} ${hiddenMemberCount === 1 ? "member" : "members"}`
            : `${selectedMembers.length} members`;
    return (_jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [_jsxs("span", { className: "sr-only", children: ["Selected members: ", selectedLabel] }), _jsx(AvatarGroup, { className: "-space-x-1", children: visibleMembers.map((member) => (_jsx(MemberAvatar, { member: member, className: "size-5", fallbackClassName: "text-[9px]" }, member.id))) }), _jsx("span", { className: "truncate", children: countLabel })] }));
}
function MemberListRow({ member }) {
    return (_jsxs(Item, { size: "xs", className: "p-0", children: [_jsx(ItemMedia, { children: _jsx(MemberAvatar, { member: member, className: "size-5" }) }), _jsx(ItemContent, { children: _jsxs(ItemTitle, { className: "gap-1 whitespace-nowrap", children: [_jsx("span", { children: member.label }), member.isCurrentUser ? (_jsx("span", { className: "text-muted-foreground font-normal", children: "(You)" })) : null] }) })] }));
}
function MemberSelectionRow({ option }) {
    if (isNoMembersOption(option)) {
        return (_jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [_jsx(UsersGlyph, { className: "text-muted-foreground" }), _jsx("span", { className: "truncate", children: option.label })] }));
    }
    return _jsx(MemberListRow, { member: option });
}
export default function Pattern() {
    const [members, setMembers] = React.useState(teamMembers.slice(0, 5));
    function handleMembersChange(nextMembers) {
        if (nextMembers.some(isNoMembersOption)) {
            setMembers([]);
            return;
        }
        setMembers(nextMembers.filter((member) => !isNoMembersOption(member)));
    }
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Combobox, { multiple: true, items: memberSelectionOptions, value: members, onValueChange: handleMembersChange, itemToStringValue: (item) => isNoMembersOption(item) ? item.searchText : item.label, isItemEqualToValue: isMemberSelectionItemEqual, autoHighlight: true, children: [_jsx(ComboboxTrigger, { render: _jsx(Button, { type: "button", variant: "outline", className: "w-full justify-between font-normal" }), children: _jsx(ComboboxValue, { placeholder: "Members", children: (selectedMembers) => (_jsx(MembersTriggerSummary, { selectedMembers: selectedMembers ?? [] })) }) }), _jsxs(ComboboxContent, { className: "max-w-(--anchor-width) min-w-(--anchor-width)", children: [_jsx(ComboboxInput, { showTrigger: false, placeholder: "Select members", className: "mb-1" }), _jsx(ComboboxEmpty, { children: "No members found." }), _jsxs(ComboboxList, { children: [_jsx(ComboboxItem, { value: noMembersOption, children: _jsx(MemberSelectionRow, { option: noMembersOption }) }), _jsx(ComboboxSeparator, {}), teamMembers.map((member) => (_jsx(ComboboxItem, { value: member, children: _jsx(MemberSelectionRow, { option: member }) }, member.id)))] })] })] }) }));
}
