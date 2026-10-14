import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxTrigger, ComboboxValue, } from "../../../../../registry/bases/radix/ui/combobox.jsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Item, ItemContent, ItemDescription, ItemTitle, } from "../../../../../../../adapters/layout.tsx";
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
    {
        id: "5",
        name: "David Kim",
        email: "david@example.com",
        avatar: "/reui-assets/images/973d47055c51440af7dc.jpg",
        initials: "DK",
    },
    {
        id: "6",
        name: "Aron Thompson",
        email: "lisa@example.com",
        avatar: "/reui-assets/images/df73db9a2c25069a422d.jpg",
        initials: "LT",
    },
    {
        id: "7",
        name: "James Brown",
        email: "james@example.com",
        avatar: "/reui-assets/images/c75592a667f30cfd44b0.jpg",
        initials: "JB",
    },
    {
        id: "8",
        name: "Maria Garcia",
        email: "maria@example.com",
        avatar: "/reui-assets/images/067c566cd567259bb9aa.jpg",
        initials: "MG",
    },
    {
        id: "9",
        name: "Nick Johnson",
        email: "nick@example.com",
        avatar: "/reui-assets/images/f1d4253436738aaf8fdf.jpg",
        initials: "NJ",
    },
    {
        id: "10",
        name: "Liam Thompson",
        email: "liam@example.com",
        avatar: "/reui-assets/images/a3afee2f77d259ce6a59.jpg",
        initials: "LT",
    },
];
const members = users.map((user, index) => ({
    ...user,
    position: [
        "Software Engineer",
        "Product Manager",
        "UX Designer",
        "Technical Lead",
        "CTO",
    ][index % 5],
}));
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Combobox, { items: members, defaultValue: members[0], itemToStringValue: (member) => member.name, children: [_jsx(ComboboxTrigger, { render: _jsx(Button, { variant: "outline", className: "w-full justify-between font-normal" }), children: _jsx(ComboboxValue, { children: (member) => member ? (_jsxs("span", { className: "flex items-center gap-2", children: [_jsxs(Avatar, { className: "size-5", children: [_jsx(AvatarImage, { src: member?.avatar, alt: member?.name }), _jsx(AvatarFallback, { children: member?.initials })] }), _jsx("span", { children: member?.name })] })) : (_jsx("span", { className: "text-muted-foreground", children: "Select a member" })) }) }), _jsxs(ComboboxContent, { className: "max-w-(--anchor-width) min-w-(--anchor-width)", children: [_jsx(ComboboxInput, { showTrigger: false, placeholder: "Search members..." }), _jsx(ComboboxEmpty, { children: "No members found." }), _jsx(ComboboxList, { children: (member) => (_jsx(ComboboxItem, { value: member, children: _jsxs(Item, { size: "xs", className: "p-0", children: [_jsxs(Avatar, { className: "size-6", children: [_jsx(AvatarImage, { src: member.avatar, alt: member.name }), _jsx(AvatarFallback, { children: member.initials })] }), _jsxs(ItemContent, { children: [_jsx(ItemTitle, { className: "whitespace-nowrap", children: member.name }), _jsx(ItemDescription, { children: member.position })] })] }) }, member.id)) })] })] }) }));
}
