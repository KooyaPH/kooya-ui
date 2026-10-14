"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useMemo, useState } from "react";
import { cn } from "cn";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Questionnaire, QuestionnaireActions, QuestionnaireChoice, QuestionnaireChoiceDescription, QuestionnaireChoices, QuestionnaireDescription, QuestionnaireError, QuestionnaireItem, QuestionnaireNext, QuestionnairePrevious, QuestionnaireProgress, QuestionnaireSubmit, QuestionnaireTitle, } from "../../../../../registry/bases/radix/ui/questionnaire.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const USAGE = [
    { value: "solo", label: "Just me" },
    { value: "team", label: "A team inside one company" },
    { value: "agency", label: "Client work across several companies" },
];
// A fixed 96px square at dpr 2 is the crop every avatar in this registry asks
// for, so these four reuse a size the CDN has already cut rather than adding a
// per-example variant of the same four photos.
const OWNERS = [
    {
        value: "amara",
        name: "Amara Boateng",
        role: "Operations lead",
        initials: "AB",
        photo: "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
    },
    {
        value: "ines",
        name: "Ines Roca",
        role: "Delivery manager",
        initials: "IR",
        photo: "/reui-assets/images/dbc92c73c5f6acf7373d.jpg",
    },
    {
        value: "theo",
        name: "Theo Lindqvist",
        role: "Engineering manager",
        initials: "TL",
        photo: "/reui-assets/images/e93553df2422635515ee.jpg",
    },
    {
        value: "daniel",
        name: "Daniel Okafor",
        role: "Finance partner",
        initials: "DO",
        photo: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
    },
];
// Both tail questions share one shape, so they come from an array instead of
// being written out twice. The controlled question and the branch stay
// explicit below, because each needs props the other two do not.
const TAIL = [
    {
        name: "import",
        title: "What should we import first?",
        description: "The rest follows once the first import has been checked.",
        choices: [
            { value: "projects", label: "Projects and their tasks" },
            { value: "people", label: "People and their roles" },
            { value: "files", label: "Files and attachments" },
        ],
    },
    {
        name: "start",
        title: "When do you want to start?",
        description: "Nothing reaches your team until you say so.",
        choices: [
            { value: "now", label: "Right away" },
            { value: "week", label: "Later this week" },
            { value: "later", label: "After the team is briefed" },
        ],
    },
];
function labelOf(options, value) {
    return (options.find((option) => option.value === value)?.label ?? "Not answered");
}
export default function Pattern() {
    // CardHeader sits between each fieldset and its legend, which stops the
    // legend naming the group. Pairing these ids with aria-labelledby on each
    // item puts that name back.
    const titleId = useId();
    const [usage, setUsage] = useState("");
    const [summary, setSummary] = useState(null);
    // The root warns in development when items and the rendered tree disagree on
    // a name, a required flag or a disabled flag, so both sides of the branch
    // read from this one derived value and the tail reads from one array.
    //
    // Nothing is preselected, which is also what keeps the branch shut on the
    // first paint: usage is empty until an answer arrives, so needsOwner starts
    // false and the counter starts at three.
    //
    // The counter then reads "Question 1 of 4", because it is computed from the
    // enabled items. That number is the visible proof the branch is in the flow.
    const needsOwner = usage === "team" || usage === "agency";
    const items = useMemo(() => [
        { name: "usage", required: true },
        { disabled: !needsOwner, name: "owner", required: true },
        ...TAIL.map((question) => ({ name: question.name, required: true })),
    ], [needsOwner]);
    // A disabled fieldset drops its controls from the submission, so owner comes
    // back as null rather than an empty string. Keeping that null is what lets
    // the summary print "Not applicable" where a name would otherwise sit.
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const owner = OWNERS.find((person) => person.value === formData.get("owner"));
        setSummary({
            usage: labelOf(USAGE, formData.get("usage")),
            owner: owner?.name ?? null,
            first: labelOf(TAIL[0].choices, formData.get("import")),
            start: labelOf(TAIL[1].choices, formData.get("start")),
        });
    }
    if (summary) {
        return (_jsxs(Card, { className: "mx-auto w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Workspace created" }), _jsx(CardDescription, { children: "The import runs in the background. You can start using the workspace before it finishes." })] }), _jsx(CardContent, { children: _jsxs("dl", { className: "grid gap-3", children: [_jsxs("div", { className: "grid min-w-0 gap-0.5", children: [_jsx("dt", { className: "text-muted-foreground text-sm", children: "Used for" }), _jsx("dd", { className: "text-sm font-medium", children: summary.usage })] }), _jsxs("div", { className: "grid min-w-0 gap-0.5", children: [_jsx("dt", { className: "text-muted-foreground text-sm", children: "Owner" }), _jsx("dd", { className: cn("text-sm font-medium", summary.owner === null && "text-muted-foreground"), children: summary.owner ?? "Not applicable" })] }), _jsxs("div", { className: "grid min-w-0 gap-0.5", children: [_jsx("dt", { className: "text-muted-foreground text-sm", children: "Importing" }), _jsx("dd", { className: "text-sm font-medium", children: summary.first })] }), _jsxs("div", { className: "grid min-w-0 gap-0.5", children: [_jsx("dt", { className: "text-muted-foreground text-sm", children: "Starting" }), _jsx("dd", { className: "text-sm font-medium", children: summary.start })] })] }) }), _jsx(CardFooter, { children: _jsx(Button, { size: "sm", variant: "outline", onClick: () => setSummary(null), children: "Create another" }) })] }));
    }
    return (
    // Progress is repeated in every card header rather than written once above
    // the card. Only the active fieldset has a layout box, so a counter placed
    // inside one question would disappear along with it on the next step.
    _jsxs(Questionnaire, { className: "mx-auto w-full max-w-md", items: items, 
        // A form reset restores the answers but knows nothing about host state,
        // so usage is cleared here too. Without that the branch would stay open
        // over a question whose controlling answer had just been wiped.
        onReset: () => setUsage(""), onSubmit: handleSubmit, children: [_jsxs(Card, { children: [_jsxs(QuestionnaireItem, { "aria-labelledby": `${titleId}-usage`, name: "usage", required: true, children: [_jsxs(CardHeader, { children: [_jsx(QuestionnaireTitle, { id: `${titleId}-usage`, render: _jsx(CardTitle, {}), children: "How will your team use this?" }), _jsx(QuestionnaireDescription, { render: _jsx(CardDescription, {}), children: "Shared workspaces add a question about who owns them." }), _jsx(CardAction, { children: _jsx(QuestionnaireProgress, {}) })] }), _jsxs(CardContent, { children: [_jsx(QuestionnaireChoices, { children: USAGE.map((option) => (_jsx(QuestionnaireChoice, { 
                                            // Controlling one question means controlling all of its
                                            // choices: each takes checked, not just the selected one. A
                                            // mix in one group leaves the engine with two sources of
                                            // truth.
                                            checked: usage === option.value, value: option.value, onChange: () => setUsage(option.value), children: option.label }, option.value))) }), _jsx(QuestionnaireError, {})] })] }), _jsxs(QuestionnaireItem, { "aria-labelledby": `${titleId}-owner`, 
                        // Only an item AFTER the controlling question may be toggled.
                        // Disabling the item on screen makes the root fall back to the
                        // first enabled one and throws the visitor back to question one.
                        disabled: !needsOwner, name: "owner", required: true, children: [_jsxs(CardHeader, { children: [_jsx(QuestionnaireTitle, { id: `${titleId}-owner`, render: _jsx(CardTitle, {}), children: "Who should own the workspace?" }), _jsx(QuestionnaireDescription, { render: _jsx(CardDescription, {}), children: "The owner manages billing and can invite everyone else." }), _jsx(CardAction, { children: _jsx(QuestionnaireProgress, {}) })] }), _jsxs(CardContent, { children: [_jsx(QuestionnaireChoices, { children: OWNERS.map((person) => (_jsxs(QuestionnaireChoice, { value: person.value, children: [_jsxs("span", { className: "flex min-w-0 items-center gap-2.5", children: [_jsxs(Avatar, { size: "sm", children: [_jsx(AvatarImage, { src: person.photo, 
                                                                    // Empty because the owner's name is read out right
                                                                    // beside it. An alt repeating that name would have a
                                                                    // screen reader announce each person twice over.
                                                                    alt: "" }), _jsx(AvatarFallback, { children: person.initials })] }), _jsx("span", { className: "truncate", children: person.name })] }), _jsx(QuestionnaireChoiceDescription, { children: person.role })] }, person.value))) }), _jsx(QuestionnaireError, {})] })] }), TAIL.map((question) => (_jsxs(QuestionnaireItem, { "aria-labelledby": `${titleId}-${question.name}`, name: question.name, required: true, children: [_jsxs(CardHeader, { children: [_jsx(QuestionnaireTitle, { id: `${titleId}-${question.name}`, render: _jsx(CardTitle, {}), children: question.title }), _jsx(QuestionnaireDescription, { render: _jsx(CardDescription, {}), children: question.description }), _jsx(CardAction, { children: _jsx(QuestionnaireProgress, {}) })] }), _jsxs(CardContent, { children: [_jsx(QuestionnaireChoices, { children: question.choices.map((choice) => (_jsx(QuestionnaireChoice, { value: choice.value, children: choice.label }, choice.value))) }), _jsx(QuestionnaireError, {})] })] }, question.name))), _jsx(CardFooter, { children: _jsxs(QuestionnaireActions, { className: "w-full", children: [_jsx(QuestionnairePrevious, {}), _jsx(QuestionnaireNext, { children: "Next" }), _jsx(QuestionnaireSubmit, { children: "Create the workspace" })] }) })] }), _jsx("div", { 
                // The reset button sits outside the Actions grid. That grid assigns
                // its three columns to Previous, Skip and Next or Submit, so an extra
                // child lands in column one and jumps to a second row once Previous
                // shows.
                className: "flex justify-end", children: _jsxs(Button, { type: "reset", size: "sm", variant: "outline", children: [_jsx(IconPlaceholder, { lucide: "RotateCcwIcon", tabler: "IconRotate2", hugeicons: "ArrowTurnBackwardIcon", phosphor: "ArrowCounterClockwiseIcon", remixicon: "RiArrowGoBackLine", "data-icon": "inline-start", "aria-hidden": "true" }), "Start over"] }) })] }));
}
