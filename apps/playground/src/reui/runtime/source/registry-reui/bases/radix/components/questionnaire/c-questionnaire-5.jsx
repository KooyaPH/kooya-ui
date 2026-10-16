"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Questionnaire, QuestionnaireActions, QuestionnaireChoice, QuestionnaireChoices, QuestionnaireDescription, QuestionnaireError, QuestionnaireInput, QuestionnaireItem, QuestionnaireNext, QuestionnairePrevious, QuestionnaireProgress, QuestionnaireSkip, QuestionnaireSubmit, QuestionnaireTitle, } from "../../../../../registry/bases/radix/ui/questionnaire.jsx";
const CURRENT = [
    { value: "sheets", label: "Spreadsheets on a shared drive" },
    { value: "legacy", label: "An in-house tool" },
    { value: "vendor", label: "Another vendor" },
];
const WATCH = [
    { value: "fields", label: "Custom fields we cannot lose" },
    { value: "exports", label: "Historical exports" },
    { value: "sso", label: "Single sign-on" },
];
const WINDOWS = [
    { value: "weekend", label: "A weekend" },
    { value: "evening", label: "A weekday evening" },
    { value: "anytime", label: "Any time, we can take downtime" },
];
// Omitting required from this one entry is the whole switch. Skip renders only
// while the active item is optional, so it appears on the middle question and
// on neither of its neighbours.
//
// Optional does not mean passable. An item counts as satisfied when it is
// answered, skipped or disabled, so the visitor still has to declare one way
// or the other before Next will move off the middle question.
const ITEMS = [
    { name: "from", required: true },
    { name: "watch" },
    { name: "window", required: true },
];
const WATCH_BADGE = {
    answered: { label: "Optional - answered", variant: "primary-light" },
    skipped: { label: "Optional - skipped", variant: "outline" },
    unanswered: { label: "Optional - not answered", variant: "secondary" },
};
// The optional question takes a written note as well as three choices, and
// either of them marks it answered. An entry matching no choice is that note,
// so it comes back as typed rather than mapped.
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
    // Skip clears whatever was ticked before it marks the item skipped, so a
    // half-answer can never ride along with a declined question. Answering
    // afterwards flips the status back, which is why the two cannot both hold.
    const [watchStatus, setWatchStatus] = useState("unanswered");
    const [summary, setSummary] = useState(null);
    // Skipping is not the same as leaving a question blank, and FormData cannot
    // tell them apart: both arrive as nothing. onStatusChange is the only place
    // that distinction survives, which is what the middle row below reports.
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setSummary({
            from: answerLabel(CURRENT, formData.get("from")),
            watch: watchStatus === "skipped"
                ? "Skipped"
                : answerLabel(WATCH, formData.get("watch")),
            window: answerLabel(WINDOWS, formData.get("window")),
        });
    }
    // The flow unmounts while the summary is on screen, so the mirrored status
    // has to be cleared alongside it. Leaving it would reopen an untouched
    // question under a badge still reporting it as skipped.
    function startOver() {
        setSummary(null);
        setWatchStatus("unanswered");
    }
    if (summary) {
        return (_jsxs(Card, { className: "mx-auto w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Migration booked" }), _jsx(CardDescription, { children: "An engineer will confirm the window by email within one working day." })] }), _jsx(CardContent, { children: _jsxs("dl", { className: "grid gap-3", children: [_jsxs("div", { className: "grid min-w-0 gap-0.5", children: [_jsx("dt", { className: "text-muted-foreground text-sm", children: "Moving off" }), _jsx("dd", { className: "text-sm font-medium", children: summary.from })] }), _jsxs("div", { className: "grid min-w-0 gap-0.5", children: [_jsx("dt", { className: "text-muted-foreground text-sm", children: "Watch out for" }), _jsx("dd", { className: "text-sm font-medium", children: summary.watch })] }), _jsxs("div", { className: "grid min-w-0 gap-0.5", children: [_jsx("dt", { className: "text-muted-foreground text-sm", children: "Window" }), _jsx("dd", { className: "text-sm font-medium", children: summary.window })] })] }) }), _jsx(CardFooter, { children: _jsx(Button, { size: "sm", variant: "outline", onClick: startOver, children: "Start over" }) })] }));
    }
    return (
    // The header row below lives outside the card on purpose. Only the active
    // fieldset has a layout box, so anything inside the card moves with the
    // question, while the progress and the badge should stay put across all
    // three.
    _jsxs(Questionnaire, { className: "mx-auto w-full max-w-md", defaultItem: "from", items: ITEMS, onSubmit: handleSubmit, children: [_jsxs("div", { className: "flex items-center justify-between gap-2", children: [_jsx(QuestionnaireProgress, {}), _jsx(Badge, { variant: WATCH_BADGE[watchStatus].variant, children: WATCH_BADGE[watchStatus].label })] }), _jsxs(Card, { children: [_jsxs(QuestionnaireItem, { "aria-labelledby": `${titleId}-from`, name: "from", required: true, children: [_jsxs(CardHeader, { children: [_jsx(QuestionnaireTitle, { id: `${titleId}-from`, render: _jsx(CardTitle, {}), children: "What are you moving off?" }), _jsx(QuestionnaireDescription, { render: _jsx(CardDescription, {}), children: "We have an importer for each of these." })] }), _jsxs(CardContent, { children: [_jsx(QuestionnaireChoices, { children: CURRENT.map((option) => (_jsx(QuestionnaireChoice, { value: option.value, children: option.label }, option.value))) }), _jsx(QuestionnaireError, {})] })] }), _jsxs(QuestionnaireItem, { "aria-labelledby": `${titleId}-watch`, name: "watch", onStatusChange: setWatchStatus, children: [_jsxs(CardHeader, { children: [_jsx(QuestionnaireTitle, { id: `${titleId}-watch`, render: _jsx(CardTitle, {}), children: "Anything we should watch out for?" }), _jsx(QuestionnaireDescription, { render: _jsx(CardDescription, {}), children: "Skip this if nothing comes to mind. It changes the plan, not the price." })] }), _jsxs(CardContent, { children: [_jsxs(QuestionnaireChoices, { children: [WATCH.map((option) => (_jsx(QuestionnaireChoice, { value: option.value, children: option.label }, option.value))), _jsx(QuestionnaireInput, { "aria-label": "Something else to watch out for", placeholder: "Something else" })] }), _jsx(QuestionnaireError, {})] })] }), _jsxs(QuestionnaireItem, { "aria-labelledby": `${titleId}-window`, name: "window", required: true, children: [_jsxs(CardHeader, { children: [_jsx(QuestionnaireTitle, { id: `${titleId}-window`, render: _jsx(CardTitle, {}), children: "When is your migration window?" }), _jsx(QuestionnaireDescription, { render: _jsx(CardDescription, {}), children: "Expect roughly two hours of read-only access." })] }), _jsxs(CardContent, { children: [_jsx(QuestionnaireChoices, { children: WINDOWS.map((option) => (_jsx(QuestionnaireChoice, { value: option.value, children: option.label }, option.value))) }), _jsx(QuestionnaireError, {})] })] }), _jsx(CardFooter, { children: _jsxs(QuestionnaireActions
                        // Nothing extra goes in this grid. Its three columns are assigned
                        // to Previous, Skip and Next or Submit, so a fourth child lands in
                        // column one and jumps to a second row once Previous appears.
                        //
                        // The buttons hide with the hidden attribute over an inline-flex
                        // base class, which only wins because preflight marks [hidden] as
                        // display:none with !important. Without it, all four show at once.
                        , { 
                            // Nothing extra goes in this grid. Its three columns are assigned
                            // to Previous, Skip and Next or Submit, so a fourth child lands in
                            // column one and jumps to a second row once Previous appears.
                            //
                            // The buttons hide with the hidden attribute over an inline-flex
                            // base class, which only wins because preflight marks [hidden] as
                            // display:none with !important. Without it, all four show at once.
                            className: "w-full", children: [_jsx(QuestionnairePrevious, {}), _jsx(QuestionnaireSkip, { children: "Skip for now" }), _jsx(QuestionnaireNext, { children: "Next" }), _jsx(QuestionnaireSubmit, { children: "Book the migration" })] }) })] })] }));
}
