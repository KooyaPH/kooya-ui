import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
const members = [
    {
        value: "sarah",
        label: "Sarah Chen",
        initials: "SC",
        avatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
    },
    {
        value: "alex",
        label: "Alex Kim",
        initials: "AK",
        avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
    },
    {
        value: "maria",
        label: "Maria Garcia",
        initials: "MG",
        avatar: "/reui-assets/images/067c566cd567259bb9aa.jpg",
    },
    {
        value: "james",
        label: "James Wilson",
        initials: "JW",
        avatar: "/reui-assets/images/c75592a667f30cfd44b0.jpg",
    },
];
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Select, { defaultValue: members[0].value, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select member" }) }), _jsx(SelectContent, { position: "popper", children: _jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Assign to" }), members.map((member) => (_jsx(SelectItem, { value: member.value, children: _jsxs("span", { className: "flex items-center gap-2", children: [_jsxs(Avatar, { className: "size-6", children: [_jsx(AvatarImage, { src: member.avatar, alt: member.label }), _jsx(AvatarFallback, { className: "text-xs", children: member.initials })] }), _jsx("span", { children: member.label })] }) }, member.value)))] }) })] }) }));
}
