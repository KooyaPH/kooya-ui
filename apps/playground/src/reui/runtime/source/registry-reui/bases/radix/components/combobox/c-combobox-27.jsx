"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxSeparator, ComboboxTrigger, ComboboxValue, } from "../../../../../registry/bases/radix/ui/combobox.jsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const noTeamOption = {
    type: "none",
    id: "no-team",
    label: "No team",
    searchText: "No team clear team remove team empty",
};
const teamOptions = [
    {
        type: "team",
        id: "testo-growth",
        value: "testo-growth",
        label: "Testo Growth",
        tone: "lime",
        searchText: "Testo Growth experiments lifecycle activation",
    },
    {
        type: "team",
        id: "atlas-platform",
        value: "atlas-platform",
        label: "Atlas Platform",
        tone: "sky",
        searchText: "Atlas Platform infrastructure systems",
    },
    {
        type: "team",
        id: "nova-studio",
        value: "nova-studio",
        label: "Nova Studio",
        tone: "violet",
        searchText: "Nova Studio design systems creative",
    },
    {
        type: "team",
        id: "pulse-support",
        value: "pulse-support",
        label: "Pulse Support",
        tone: "rose",
        searchText: "Pulse Support product health customer care",
    },
    {
        type: "team",
        id: "orbit-ops",
        value: "orbit-ops",
        label: "Orbit Ops",
        tone: "amber",
        searchText: "Orbit Ops operations dependencies releases",
    },
];
const teamSelectionOptions = [noTeamOption, ...teamOptions];
function EmptyTeamGlyph({ className }) {
    return (_jsx(IconPlaceholder, { lucide: "UsersIcon", tabler: "IconUsers", hugeicons: "UserGroupIcon", phosphor: "UsersIcon", remixicon: "RiTeamLine", className: cn("size-4 shrink-0", className) }));
}
const teamToneClassName = {
    lime: "text-lime-600! [&_*]:text-lime-600!",
    sky: "text-sky-600! [&_*]:text-sky-600!",
    violet: "text-violet-600! [&_*]:text-violet-600!",
    amber: "text-amber-600! [&_*]:text-amber-600!",
    rose: "text-rose-600! [&_*]:text-rose-600!",
};
function TeamMark({ team }) {
    const className = cn("size-4 shrink-0", teamToneClassName[team.tone]);
    switch (team.tone) {
        case "sky":
            return (_jsx(IconPlaceholder, { lucide: "LayersIcon", tabler: "IconStack2", hugeicons: "Layers01Icon", phosphor: "StackIcon", remixicon: "RiStackLine", className: className }));
        case "violet":
            return (_jsx(IconPlaceholder, { lucide: "BriefcaseBusinessIcon", tabler: "IconBriefcase", hugeicons: "Briefcase01Icon", phosphor: "BriefcaseIcon", remixicon: "RiBriefcaseLine", className: className }));
        case "amber":
            return (_jsx(IconPlaceholder, { lucide: "GitBranchIcon", tabler: "IconGitBranch", hugeicons: "GitBranchIcon", phosphor: "GitBranchIcon", remixicon: "RiGitBranchLine", className: className }));
        case "rose":
            return (_jsx(IconPlaceholder, { lucide: "PackageIcon", tabler: "IconPackage", hugeicons: "Package01Icon", phosphor: "PackageIcon", remixicon: "RiBox3Line", className: className }));
        case "lime":
        default:
            return (_jsx(IconPlaceholder, { lucide: "SparklesIcon", tabler: "IconSparkles", hugeicons: "SparklesIcon", phosphor: "SparkleIcon", remixicon: "RiSparklingLine", className: className }));
    }
}
function TeamTriggerLabel({ value, placeholder, }) {
    if (!value) {
        return _jsx("span", { className: "text-muted-foreground truncate", children: placeholder });
    }
    if (value.type === "none") {
        return (_jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [_jsx(EmptyTeamGlyph, { className: "text-muted-foreground" }), _jsx("span", { className: "truncate", children: value.label })] }));
    }
    return (_jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [_jsx(TeamMark, { team: value }), _jsx("span", { className: "truncate", children: value.label })] }));
}
function TeamOptionRow({ option }) {
    if (option.type === "none") {
        return (_jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [_jsx(EmptyTeamGlyph, { className: "text-muted-foreground" }), _jsx("span", { className: "truncate", children: option.label })] }));
    }
    return (_jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [_jsx(TeamMark, { team: option }), _jsx("span", { className: "truncate", children: option.label })] }));
}
export default function Pattern() {
    const [team, setTeam] = React.useState(teamOptions[0]);
    const selectedTeam = team ?? noTeamOption;
    function handleTeamChange(nextTeam) {
        setTeam(nextTeam?.type === "team" ? nextTeam : null);
    }
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Combobox, { items: teamSelectionOptions, value: selectedTeam, onValueChange: handleTeamChange, itemToStringValue: (item) => item.searchText, autoHighlight: true, children: [_jsx(ComboboxTrigger, { render: _jsx(Button, { type: "button", variant: "outline", className: "w-full justify-between font-normal" }), children: _jsx(ComboboxValue, { placeholder: "Select team", children: (selectedTeam) => (_jsx(TeamTriggerLabel, { value: selectedTeam, placeholder: "Select team" })) }) }), _jsxs(ComboboxContent, { className: "max-w-(--anchor-width) min-w-(--anchor-width)", children: [_jsx(ComboboxInput, { showTrigger: false, placeholder: "Select team", className: "mb-1" }), _jsx(ComboboxEmpty, { children: "No teams found." }), _jsxs(ComboboxList, { children: [_jsx(ComboboxItem, { value: noTeamOption, children: _jsx(TeamOptionRow, { option: noTeamOption }) }), _jsx(ComboboxSeparator, {}), teamOptions.map((item) => (_jsx(ComboboxItem, { value: item, children: _jsx(TeamOptionRow, { option: item }) }, item.id)))] })] })] }) }));
}
