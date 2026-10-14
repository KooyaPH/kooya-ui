"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from "react";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Questionnaire, QuestionnaireActions, QuestionnaireChoice, QuestionnaireChoiceDescription, QuestionnaireChoices, QuestionnaireDescription, QuestionnaireError, QuestionnaireItem, QuestionnaireNext, QuestionnairePrevious, QuestionnaireProgress, QuestionnaireSubmit, QuestionnaireTitle, } from "../../../../../registry/bases/radix/ui/questionnaire.jsx";
// Only the active fieldset has a layout box, because the primitive marks the
// rest hidden and inert. The card measures one question at a time, so three
// questions of similar shape are what keep it from jumping on each Next.
const QUESTIONS = [
    {
        name: "usage",
        title: "What will you use the workspace for?",
        description: "This picks the default views. Nothing here is permanent.",
        choices: [
            {
                value: "product",
                label: "Shipping product work",
                hint: "Roadmap, sprint board and release notes",
            },
            {
                value: "clients",
                label: "Running client projects",
                hint: "Separate spaces, budgets and approvals",
            },
            {
                value: "research",
                label: "Tracking research",
                hint: "Interview notes, findings and shared tags",
            },
        ],
    },
    {
        name: "size",
        title: "How many people will join you?",
        description: "Seats stay flexible. This only sets a starting layout.",
        choices: [
            { value: "solo", label: "Just me", hint: "One private space" },
            {
                value: "small",
                label: "2 to 10",
                hint: "A shared space with light roles",
            },
            {
                value: "mid",
                label: "11 to 50",
                hint: "Teams, groups and per-team defaults",
            },
        ],
    },
    {
        name: "first",
        title: "What should we set up first?",
        description: "The rest can be added from the sidebar at any point.",
        choices: [
            {
                value: "board",
                label: "A project board",
                hint: "Intake, in progress and done",
            },
            {
                value: "report",
                label: "A weekly report",
                hint: "Sent every Monday to whoever you pick",
            },
            {
                value: "import",
                label: "An import from your current tool",
                hint: "Projects, people and comments come across",
            },
        ],
    },
];
// The root compares items against the rendered tree and warns in development
// when a name, a required flag or a choice order drifts apart. Deriving one
// from the other is what keeps the two from ever disagreeing.
//
// The choice values are spelled out for a second reason: the letter shortcuts
// are handed out from this list, and an entry without choices leaves every
// shortcut badge unrendered even while shortcuts is set.
const ITEMS = QUESTIONS.map((question) => ({
    choices: question.choices.map((choice) => ({ value: choice.value })),
    name: question.name,
    required: true,
}));
export default function Pattern() {
    const titleId = useId();
    const [summary, setSummary] = useState(null);
    // FormData carries the choice value, never the label, so each answer is
    // resolved back through QUESTIONS. Echoing the raw entry would show "board"
    // where the visitor picked "A project board".
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const answers = {};
        for (const question of QUESTIONS) {
            const value = formData.get(question.name);
            answers[question.name] =
                question.choices.find((choice) => choice.value === value)?.label ??
                    "Not answered";
        }
        setSummary(answers);
    }
    // The finished state replaces the flow instead of firing a toast. A toast
    // lands at the edge of the page, so a visitor who just pressed Finish would
    // be left looking at a form that had not visibly changed.
    if (summary) {
        return (_jsxs(Card, { className: "mx-auto w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Your workspace is ready" }), _jsx(CardDescription, { children: "Built from the three answers below. Every one of them can be changed in settings later." })] }), _jsx(CardContent, { children: _jsx("dl", { className: "grid gap-3", children: QUESTIONS.map((question) => (_jsxs("div", { className: "grid min-w-0 gap-0.5", children: [_jsx("dt", { className: "text-muted-foreground text-sm", children: question.title }), _jsx("dd", { className: "text-sm font-medium", children: summary[question.name] })] }, question.name))) }) }), _jsx(CardFooter, { children: _jsx(Button, { size: "sm", variant: "outline", onClick: () => setSummary(null), children: "Start over" }) })] }));
    }
    return (
    // Passing items lets the root size the flow before a single fieldset has
    // registered, so the header reads "Question 1 of 3" on the first paint.
    //
    // The root owns the keyboard from here: Cmd or Ctrl with Enter advances,
    // the arrow keys walk answers and questions, and the letter shortcuts
    // stand down while focus is inside a text field.
    _jsx(Questionnaire, { className: "mx-auto w-full max-w-md", defaultItem: "usage", items: ITEMS, shortcuts: "letters", onSubmit: handleSubmit, children: _jsxs(Card, { children: [QUESTIONS.map((question) => (
                // CardHeader sits between each fieldset and its legend, which stops
                // the legend naming the group. Pairing the title id with
                // aria-labelledby on the item puts that name back.
                //
                // Nothing below pairs a description or an error by hand: the
                // primitive puts the description id into aria-describedby, and adds
                // the error id, plus role="alert", once the item goes invalid.
                _jsxs(QuestionnaireItem, { "aria-labelledby": `${titleId}-${question.name}`, name: question.name, required: true, children: [_jsxs(CardHeader, { children: [_jsx(QuestionnaireTitle, { id: `${titleId}-${question.name}`, render: _jsx(CardTitle, {}), children: question.title }), _jsx(QuestionnaireDescription, { render: _jsx(CardDescription, {}), children: question.description }), _jsx(CardAction, { children: _jsx(QuestionnaireProgress, {}) })] }), _jsxs(CardContent, { children: [_jsx(QuestionnaireChoices, { children: question.choices.map((choice) => (_jsxs(QuestionnaireChoice, { value: choice.value, children: [choice.label, _jsx(QuestionnaireChoiceDescription, { children: choice.hint })] }, choice.value))) }), _jsx(QuestionnaireError, {})] })] }, question.name))), _jsx(CardFooter, { children: _jsxs(QuestionnaireActions, { className: "w-full", children: [_jsx(QuestionnairePrevious, {}), _jsx(QuestionnaireNext, { children: "Next" }), _jsx(QuestionnaireSubmit, { children: "Finish setup" })] }) })] }) }));
}
