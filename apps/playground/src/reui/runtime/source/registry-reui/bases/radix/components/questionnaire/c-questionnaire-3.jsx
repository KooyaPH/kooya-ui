"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from "react";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Label } from "../../../../../../../adapters/layout.tsx";
import { Questionnaire, QuestionnaireActions, QuestionnaireChoice, QuestionnaireChoices, QuestionnaireDescription, QuestionnaireError, QuestionnaireInput, QuestionnaireItem, QuestionnaireNext, QuestionnairePrevious, QuestionnaireProgress, QuestionnaireSubmit, QuestionnaireTitle, } from "../../../../../registry/bases/radix/ui/questionnaire.jsx";
const SOURCES = [
    { value: "colleague", label: "A colleague mentioned it" },
    { value: "talk", label: "A conference talk" },
    { value: "search", label: "Search" },
    { value: "newsletter", label: "A newsletter" },
];
const REPLACING = [
    { value: "spreadsheet", label: "A spreadsheet and a group chat" },
    { value: "legacy", label: "A tool we have outgrown" },
    { value: "nothing", label: "Nothing, this is new for us" },
];
const TIMELINES = [
    { value: "month", label: "Inside a month" },
    { value: "quarter", label: "This quarter" },
    { value: "exploring", label: "Still exploring" },
];
// No choices listed on these entries, because choices in items exist to hand
// out the single-key shortcuts and this flow does not use them. Names and the
// required flags still have to mirror the rendered tree or the root warns.
const ITEMS = [
    { name: "source", required: true },
    { name: "replacing", required: true },
    { name: "timeline", required: true },
];
// An unrecognised entry is the typed answer, so it is returned verbatim rather
// than mapped. That is the only place the free-text value can surface, because
// the input and the radios share one field name.
//
// The engine hands that name to whichever control currently holds the answer
// and detaches the other with an empty form attribute, so typing clears the
// selected radio and one question never submits two values.
function answerLabel(options, value) {
    if (typeof value !== "string" || value.trim() === "") {
        return "Not answered";
    }
    return options.find((option) => option.value === value)?.label ?? value;
}
export default function Pattern() {
    // CardHeader sits between each fieldset and its legend, which stops the
    // legend naming the group. Pairing these ids with aria-labelledby on each
    // item puts that name back.
    const titleId = useId();
    // The free-text row is a visible Label plus the input rather than a
    // placeholder: a placeholder is not an accessible name and vanishes on the
    // first keystroke. The id passed in wins over the generated one, which is
    // what lets htmlFor find the input at all.
    //
    // It sits inside the choices group for the per-style gap, not for the
    // wiring. Answer controls register against the item, so the input counts as
    // an answer anywhere inside the fieldset.
    const otherId = useId();
    const [answers, setAnswers] = useState(null);
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setAnswers({
            source: answerLabel(SOURCES, formData.get("source")),
            replacing: answerLabel(REPLACING, formData.get("replacing")),
            timeline: answerLabel(TIMELINES, formData.get("timeline")),
        });
    }
    if (answers) {
        return (_jsxs(Card, { className: "mx-auto w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Thanks, that helps" }), _jsx(CardDescription, { children: "Your answers are attached to the account, so nobody has to ask again on the onboarding call." })] }), _jsx(CardContent, { children: _jsxs("dl", { className: "grid gap-3", children: [_jsxs("div", { className: "grid min-w-0 gap-0.5", children: [_jsx("dt", { className: "text-muted-foreground text-sm", children: "Heard about us" }), _jsx("dd", { className: "text-sm font-medium", children: answers.source })] }), _jsxs("div", { className: "grid min-w-0 gap-0.5", children: [_jsx("dt", { className: "text-muted-foreground text-sm", children: "Replacing" }), _jsx("dd", { className: "text-sm font-medium", children: answers.replacing })] }), _jsxs("div", { className: "grid min-w-0 gap-0.5", children: [_jsx("dt", { className: "text-muted-foreground text-sm", children: "Live by" }), _jsx("dd", { className: "text-sm font-medium", children: answers.timeline })] })] }) }), _jsx(CardFooter, { children: _jsx(Button, { size: "sm", variant: "outline", onClick: () => setAnswers(null), children: "Answer again" }) })] }));
    }
    return (
    // shortcuts stays off here on purpose: single-key answer shortcuts and a
    // text field inside the same question would compete for every keystroke.
    //
    // The root ships noValidate on by default, so the browser never takes the
    // question over. What gates Next is the primitive's own rule, which counts
    // an item satisfied only once it is answered and not flagged invalid.
    _jsx(Questionnaire, { className: "mx-auto w-full max-w-md", defaultItem: "source", items: ITEMS, onSubmit: handleSubmit, children: _jsxs(Card, { children: [_jsxs(QuestionnaireItem, { "aria-labelledby": `${titleId}-source`, name: "source", required: true, children: [_jsxs(CardHeader, { children: [_jsx(QuestionnaireTitle, { id: `${titleId}-source`, render: _jsx(CardTitle, {}), children: "How did you first hear about us?" }), _jsx(QuestionnaireDescription, { render: _jsx(CardDescription, {}), children: "Pick the closest match, or write in what actually happened." }), _jsx(CardAction, { children: _jsx(QuestionnaireProgress, {}) })] }), _jsxs(CardContent, { children: [_jsxs(QuestionnaireChoices, { children: [SOURCES.map((source) => (_jsx(QuestionnaireChoice, { value: source.value, children: source.label }, source.value))), _jsxs("div", { className: "grid gap-1.5", children: [_jsx(Label, { htmlFor: otherId, children: "Somewhere else" }), _jsx(QuestionnaireInput, { id: otherId, placeholder: "Tell us where" })] })] }), _jsx(QuestionnaireError, {})] })] }), _jsxs(QuestionnaireItem, { "aria-labelledby": `${titleId}-replacing`, name: "replacing", required: true, children: [_jsxs(CardHeader, { children: [_jsx(QuestionnaireTitle, { id: `${titleId}-replacing`, render: _jsx(CardTitle, {}), children: "What are you replacing?" }), _jsx(QuestionnaireDescription, { render: _jsx(CardDescription, {}), children: "It changes which import we offer you first." }), _jsx(CardAction, { children: _jsx(QuestionnaireProgress, {}) })] }), _jsxs(CardContent, { children: [_jsx(QuestionnaireChoices, { children: REPLACING.map((option) => (_jsx(QuestionnaireChoice, { value: option.value, children: option.label }, option.value))) }), _jsx(QuestionnaireError, {})] })] }), _jsxs(QuestionnaireItem, { "aria-labelledby": `${titleId}-timeline`, name: "timeline", required: true, children: [_jsxs(CardHeader, { children: [_jsx(QuestionnaireTitle, { id: `${titleId}-timeline`, render: _jsx(CardTitle, {}), children: "When do you want to be live?" }), _jsx(QuestionnaireDescription, { render: _jsx(CardDescription, {}), children: "An honest answer is more useful than an ambitious one." }), _jsx(CardAction, { children: _jsx(QuestionnaireProgress, {}) })] }), _jsxs(CardContent, { children: [_jsx(QuestionnaireChoices, { children: TIMELINES.map((option) => (_jsx(QuestionnaireChoice, { value: option.value, children: option.label }, option.value))) }), _jsx(QuestionnaireError, {})] })] }), _jsx(CardFooter, { children: _jsxs(QuestionnaireActions, { className: "w-full", children: [_jsx(QuestionnairePrevious, {}), _jsx(QuestionnaireNext, { children: "Next" }), _jsx(QuestionnaireSubmit, { children: "Send answers" })] }) })] }) }));
}
