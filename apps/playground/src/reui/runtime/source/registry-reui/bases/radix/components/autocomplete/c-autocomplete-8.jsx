"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { Autocomplete, AutocompleteCollection, AutocompleteContent, AutocompleteEmpty, AutocompleteGroup, AutocompleteGroupLabel, AutocompleteInput, AutocompleteItem, AutocompleteList, } from "../../../../../../../adapters/autocomplete.tsx";
import { Autocomplete as AutocompletePrimitive } from "../../../../../../../adapters/autocomplete.tsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    const { contains } = AutocompletePrimitive.useFilter({ sensitivity: "base" });
    const filteredItems = useMemo(() => {
        if (!value)
            return groupedUsers;
        return groupedUsers
            .map((group) => ({
            ...group,
            items: (group.items || []).filter((item) => contains(item.name || "", value) ||
                contains(item.group || "", value) ||
                contains(item.position || "", value)),
        }))
            .filter((group) => group.items && group.items.length > 0);
    }, [value, contains]);
    return (_jsx("div", { className: "w-full max-w-xs", children: _jsxs(Autocomplete, { items: filteredItems, value: value, onValueChange: setValue, open: open, onOpenChange: setOpen, itemToStringValue: (item) => item.name, filter: null, children: [_jsx(AutocompleteInput, { placeholder: "e.g. John, Developer, Marketing" }), open && (_jsx(AutocompleteContent, { className: "pt-0", children: filteredItems.length === 0 ? (_jsx(AutocompleteEmpty, { children: "No matching users found." })) : (_jsx(AutocompleteList, { className: "not-empty:py-0", children: (group) => (_jsxs(AutocompleteGroup, { items: group.items, className: "py-0", children: [_jsx(AutocompleteGroupLabel, { className: "bg-background text-muted-foreground sticky top-0 z-10 me-1.5 py-2.5 text-xs font-medium", children: group.group }), _jsx(AutocompleteCollection, { children: (item) => (_jsxs(AutocompleteItem, { value: item, className: "flex items-center gap-2.5 rounded-lg", children: [_jsxs(Avatar, { className: "size-9", children: [_jsx(AvatarImage, { src: item.avatar, alt: item.name || "User" }), _jsx(AvatarFallback, { children: (item.name || "U")
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("") })] }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("div", { className: "truncate font-medium", children: item.name || "Unknown" }), _jsx("div", { className: "text-muted-foreground truncate text-sm", children: item.position || "No position available" })] })] }, item.id)) })] }, group.group)) })) }))] }) }));
}
const usersData = [
    // Development Team
    {
        id: "john-doe",
        name: "John Doe",
        group: "Development Team",
        position: "Senior Frontend Developer",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        status: "Active",
    },
    {
        id: "jane-smith",
        name: "Jane Smith",
        group: "Development Team",
        position: "Full Stack Developer",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        status: "Active",
    },
    {
        id: "mike-wilson",
        name: "Mike Wilson",
        group: "Development Team",
        position: "Backend Developer",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        status: "Active",
    },
    {
        id: "sarah-johnson",
        name: "Sarah Johnson",
        group: "Development Team",
        position: "DevOps Engineer",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        status: "Away",
    },
    {
        id: "david-brown",
        name: "David Brown",
        group: "Development Team",
        position: "Mobile Developer",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        status: "Active",
    },
    {
        id: "lisa-garcia",
        name: "Lisa Garcia",
        group: "Development Team",
        position: "UI/UX Developer",
        avatar: "https://randomuser.me/api/portraits/women/6.jpg",
        status: "Active",
    },
    // Design Team
    {
        id: "alex-martinez",
        name: "Alex Martinez",
        group: "Design Team",
        position: "Lead UX Designer",
        avatar: "https://randomuser.me/api/portraits/men/7.jpg",
        status: "Active",
    },
    {
        id: "emma-davis",
        name: "Emma Davis",
        group: "Design Team",
        position: "UI Designer",
        avatar: "https://randomuser.me/api/portraits/women/8.jpg",
        status: "Active",
    },
    {
        id: "chris-taylor",
        name: "Chris Taylor",
        group: "Design Team",
        position: "Product Designer",
        avatar: "https://randomuser.me/api/portraits/men/9.jpg",
        status: "Active",
    },
    {
        id: "olivia-anderson",
        name: "Olivia Anderson",
        group: "Design Team",
        position: "Visual Designer",
        avatar: "https://randomuser.me/api/portraits/women/10.jpg",
        status: "Inactive",
    },
    // Marketing Team
    {
        id: "james-moore",
        name: "James Moore",
        group: "Marketing Team",
        position: "Marketing Manager",
        avatar: "https://randomuser.me/api/portraits/men/11.jpg",
        status: "Active",
    },
    {
        id: "sophia-white",
        name: "Sophia White",
        group: "Marketing Team",
        position: "Content Marketing Specialist",
        avatar: "https://randomuser.me/api/portraits/women/12.jpg",
        status: "Active",
    },
    {
        id: "william-harris",
        name: "William Harris",
        group: "Marketing Team",
        position: "Digital Marketing Specialist",
        avatar: "https://randomuser.me/api/portraits/men/13.jpg",
        status: "Active",
    },
    {
        id: "ava-martin",
        name: "Ava Martin",
        group: "Marketing Team",
        position: "Social Media Manager",
        avatar: "https://randomuser.me/api/portraits/women/14.jpg",
        status: "Away",
    },
    // Sales Team
    {
        id: "ethan-thompson",
        name: "Ethan Thompson",
        group: "Sales Team",
        position: "Sales Director",
        avatar: "https://randomuser.me/api/portraits/men/15.jpg",
        status: "Active",
    },
    {
        id: "mia-garcia",
        name: "Mia Garcia",
        group: "Sales Team",
        position: "Account Executive",
        avatar: "https://randomuser.me/api/portraits/women/16.jpg",
        status: "Active",
    },
    {
        id: "noah-martinez",
        name: "Noah Martinez",
        group: "Sales Team",
        position: "Sales Representative",
        avatar: "https://randomuser.me/api/portraits/men/17.jpg",
        status: "Active",
    },
    {
        id: "isabella-rodriguez",
        name: "Isabella Rodriguez",
        group: "Sales Team",
        position: "Business Development Manager",
        avatar: "https://randomuser.me/api/portraits/women/18.jpg",
        status: "Active",
    },
    // Management Team
    {
        id: "lucas-lee",
        name: "Lucas Lee",
        group: "Management Team",
        position: "CEO",
        avatar: "https://randomuser.me/api/portraits/men/19.jpg",
        status: "Active",
    },
    {
        id: "charlotte-walker",
        name: "Charlotte Walker",
        group: "Management Team",
        position: "CTO",
        avatar: "https://randomuser.me/api/portraits/women/20.jpg",
        status: "Active",
    },
    {
        id: "benjamin-hall",
        name: "Benjamin Hall",
        group: "Management Team",
        position: "VP of Engineering",
        avatar: "https://randomuser.me/api/portraits/men/21.jpg",
        status: "Active",
    },
    {
        id: "amelia-allen",
        name: "Amelia Allen",
        group: "Management Team",
        position: "VP of Marketing",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
        status: "Active",
    },
    // Support Team
    {
        id: "henry-young",
        name: "Henry Young",
        group: "Support Team",
        position: "Customer Success Manager",
        avatar: "https://randomuser.me/api/portraits/men/23.jpg",
        status: "Active",
    },
    {
        id: "grace-king",
        name: "Grace King",
        group: "Support Team",
        position: "Technical Support Specialist",
        avatar: "https://randomuser.me/api/portraits/women/24.jpg",
        status: "Active",
    },
    {
        id: "sebastian-wright",
        name: "Sebastian Wright",
        group: "Support Team",
        position: "Customer Support Representative",
        avatar: "https://randomuser.me/api/portraits/men/25.jpg",
        status: "Away",
    },
    {
        id: "lily-lopez",
        name: "Lily Lopez",
        group: "Support Team",
        position: "Help Desk Technician",
        avatar: "https://randomuser.me/api/portraits/women/26.jpg",
        status: "Active",
    },
];
function groupUsers(users) {
    const groups = {};
    users.forEach((item) => {
        ;
        (groups[item.group] ??= []).push(item);
    });
    // Sort by status within each group (Active first, then Away, then Inactive)
    Object.keys(groups).forEach((group) => {
        groups[group].sort((a, b) => {
            const statusOrder = { Active: 0, Away: 1, Inactive: 2 };
            return statusOrder[a.status] - statusOrder[b.status];
        });
    });
    const order = [
        "Management Team",
        "Development Team",
        "Design Team",
        "Marketing Team",
        "Sales Team",
        "Support Team",
    ];
    return order.map((group) => ({ group, items: groups[group] ?? [] }));
}
const groupedUsers = groupUsers(usersData);
