"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Cascader, CascaderContent, CascaderEmpty, CascaderList, CascaderPanel, CascaderStatus, CascaderTrigger, } from "../../../../../../../adapters/cascader.tsx";
import { CascaderItems } from "../../../../../../../adapters/cascader.tsx";
import { CascaderBreadcrumb, CascaderInput, CascaderNav, CascaderValue, } from "../../../../../../../adapters/cascader.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const textIcon = (_jsx(IconPlaceholder, { lucide: "TypeIcon", tabler: "IconLetterCase", hugeicons: "TextIcon", phosphor: "TextAaIcon", remixicon: "RiText", className: "size-4" }));
const hashIcon = (_jsx(IconPlaceholder, { lucide: "HashIcon", tabler: "IconHash", hugeicons: "Hash01Icon", phosphor: "HashIcon", remixicon: "RiHashtag", className: "size-4" }));
const usersIcon = (_jsx(IconPlaceholder, { lucide: "UsersIcon", tabler: "IconUsers", hugeicons: "UserGroupIcon", phosphor: "UsersIcon", remixicon: "RiGroupLine", className: "size-4" }));
const mailIcon = (_jsx(IconPlaceholder, { lucide: "AtSignIcon", tabler: "IconAt", hugeicons: "AtIcon", phosphor: "AtIcon", remixicon: "RiAtLine", className: "size-4" }));
const checkIcon = (_jsx(IconPlaceholder, { lucide: "SquareCheckIcon", tabler: "IconSquareCheck", hugeicons: "CheckmarkSquare02Icon", phosphor: "CheckSquareIcon", remixicon: "RiCheckboxLine", className: "size-4" }));
const clockIcon = (_jsx(IconPlaceholder, { lucide: "CalendarClockIcon", tabler: "IconCalendarClock", hugeicons: "Calendar03Icon", phosphor: "CalendarDotsIcon", remixicon: "RiCalendarLine", className: "size-4" }));
const userIcon = (_jsx(IconPlaceholder, { lucide: "UserIcon", tabler: "IconUser", hugeicons: "User02Icon", phosphor: "UserIcon", remixicon: "RiUserLine", className: "size-4" }));
const attributes = [
    { value: "record-id", label: "Record ID", icon: hashIcon },
    {
        value: "person",
        label: "Person",
        icon: usersIcon,
        count: 24,
        children: [
            { value: "person.name", label: "Name", icon: textIcon },
            {
                value: "person.email",
                label: "Email addresses",
                icon: mailIcon,
                keywords: ["mail"],
            },
            { value: "person.title", label: "Job title", icon: textIcon },
            {
                value: "person.company",
                label: "Company",
                icon: usersIcon,
                count: 8,
                children: [
                    {
                        value: "person.company.name",
                        label: "Company name",
                        icon: textIcon,
                    },
                    { value: "person.company.domain", label: "Domain", icon: textIcon },
                    {
                        value: "person.company.employees",
                        label: "Employees",
                        icon: hashIcon,
                    },
                ],
            },
        ],
    },
    {
        value: "email",
        label: "Primary email address",
        icon: mailIcon,
        keywords: ["mail"],
    },
    { value: "user-id", label: "User ID", icon: textIcon },
    {
        value: "workspaces",
        label: "Workspaces",
        icon: usersIcon,
        count: 9,
        children: [
            { value: "workspaces.name", label: "Name", icon: textIcon },
            { value: "workspaces.plan", label: "Plan", icon: textIcon },
            { value: "workspaces.seats", label: "Seats", icon: hashIcon },
        ],
    },
    {
        value: "next-task",
        label: "Next due task",
        icon: checkIcon,
        count: 1,
        children: [{ value: "next-task.due", label: "Due date", icon: clockIcon }],
    },
    { value: "created-at", label: "Created at", icon: clockIcon },
    { value: "created-by", label: "Created by", icon: userIcon },
];
export default function Pattern() {
    const [value, setValue] = useState("");
    return (_jsx("div", { className: "flex w-full justify-center p-4", children: _jsxs(Cascader, { items: attributes, value: value, onValueChange: setValue, children: [_jsx(CascaderTrigger, { "aria-label": "Attribute", render: _jsx(Button, { variant: "outline", className: "w-72 justify-between gap-2 font-normal" }), children: _jsx(CascaderValue, { placeholder: "Select an attribute", maxSegments: 3 }) }), _jsx(CascaderContent, { className: "w-80", children: _jsxs(CascaderPanel, { children: [_jsx(CascaderNav, { children: _jsx(CascaderInput, {}) }), _jsx(CascaderBreadcrumb, {}), _jsx(CascaderEmpty, {}), _jsx(CascaderList, { children: _jsx(CascaderItems, {}) }), _jsx(CascaderStatus, {})] }) })] }) }));
}
