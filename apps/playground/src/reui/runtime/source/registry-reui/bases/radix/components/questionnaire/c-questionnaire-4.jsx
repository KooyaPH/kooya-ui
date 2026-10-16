"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, } from "../../../../../../../adapters/layout.tsx";
import { Questionnaire, QuestionnaireActions, QuestionnaireChoice, QuestionnaireChoices, QuestionnaireError, QuestionnaireItem, QuestionnaireNext, QuestionnairePrevious, QuestionnaireProgress, QuestionnaireSubmit, QuestionnaireTitle, } from "../../../../../registry/bases/radix/ui/questionnaire.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
// Four questions of three choices each, none of them carrying a description,
// so every step is the same height. Inactive fieldsets are hidden and have no
// box at all, so uneven steps would make the card jump on each Next.
const QUESTIONS = [
    {
        name: "source",
        step: "Source",
        title: "Where does the data come from?",
        choices: [
            { value: "warehouse", label: "A warehouse table" },
            { value: "stream", label: "An event stream" },
            { value: "uploads", label: "Files uploaded by hand" },
        ],
    },
    {
        name: "volume",
        step: "Volume",
        title: "How much arrives in a day?",
        choices: [
            { value: "small", label: "Under 1M rows" },
            { value: "medium", label: "1M to 50M rows" },
            { value: "large", label: "More than 50M rows" },
        ],
    },
    {
        name: "alerting",
        step: "Alerting",
        title: "Who should be alerted when it stalls?",
        choices: [
            { value: "oncall", label: "The on-call rota" },
            { value: "data", label: "The data team channel" },
            { value: "none", label: "Nobody yet" },
        ],
    },
    {
        name: "owner",
        step: "Owner",
        title: "Who owns the pipeline?",
        choices: [
            { value: "me", label: "Me" },
            { value: "teammate", label: "A teammate" },
            { value: "undecided", label: "Still deciding" },
        ],
    },
];
const ITEMS = QUESTIONS.map((question) => ({
    name: question.name,
    required: true,
}));
export default function Pattern() {
    const [created, setCreated] = useState(null);
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const source = QUESTIONS[0].choices.find((choice) => choice.value === formData.get("source"));
        setCreated(source?.label.toLowerCase() ?? "the chosen source");
    }
    if (created) {
        return (
        // Empty, not a Card, for the ending. The flow itself runs bare, so a
        // panel appearing only at the finish would introduce a frame the visitor
        // had not been looking at for the previous four steps.
        _jsxs(Empty, { className: "mx-auto w-full max-w-md", children: [_jsxs(EmptyHeader, { children: [_jsx(EmptyMedia, { variant: "icon", children: _jsx(IconPlaceholder, { lucide: "CircleCheckIcon", tabler: "IconCircleCheck", hugeicons: "CheckmarkCircle01Icon", phosphor: "CheckCircleIcon", remixicon: "RiCheckboxCircleLine", "aria-hidden": "true" }) }), _jsx(EmptyTitle, { children: "Pipeline queued" }), _jsxs(EmptyDescription, { children: ["We are provisioning a pipeline from ", created, ". The first run starts as soon as the connection is verified."] })] }), _jsx(EmptyContent, { children: _jsx(Button, { size: "sm", variant: "outline", onClick: () => setCreated(null), children: "Set up another" }) })] }));
    }
    return (_jsxs(Questionnaire, { className: "mx-auto w-full max-w-md", defaultItem: "source", items: ITEMS, onSubmit: handleSubmit, children: [_jsx(QuestionnaireProgress, { className: "w-full", render: (props, state) => {
                    // w-full above is not optional: the primitive ships w-fit with a
                    // min-width sized for the default "Question N of M" string, and a
                    // custom bar left inside that box stops well short of the questions.
                    //
                    // One string for both readings. aria-valuetext goes on after the
                    // spread because the props carry the primitive's own "Question N of
                    // M", and for a progressbar that value text is what gets announced.
                    const step = QUESTIONS[state.current - 1]?.step;
                    const label = `Step ${state.current} of ${state.total} - ${step}`;
                    return (_jsxs("div", { ...props, "aria-valuetext": label, children: [_jsx("div", { "aria-hidden": "true", className: "mb-2 flex gap-1.5", children: Array.from({ length: state.total }, (_, index) => (
                                // Hidden from assistive tech because the wrapper already
                                // carries role="progressbar" with aria-valuenow, so exposing
                                // the segments would announce the position a second time.
                                //
                                // state.current is 1-based, hence the strict less-than, and
                                // state.total counts the enabled items rather than the
                                // rendered ones, so disabling a question drops a segment.
                                _jsx("span", { className: cn("h-1.5 flex-1 rounded-full", index < state.current ? "bg-primary" : "bg-muted") }, index))) }), _jsx("span", { children: label })] }));
                } }), QUESTIONS.map((question) => (
            // The title renders as the fieldset's own legend with nothing between
            // the two, so the group is named without any aria-labelledby pairing.
            // A card header in between would break that and need one.
            _jsxs(QuestionnaireItem, { name: question.name, required: true, children: [_jsx(QuestionnaireTitle, { children: question.title }), _jsx(QuestionnaireChoices, { children: question.choices.map((choice) => (_jsx(QuestionnaireChoice, { value: choice.value, children: choice.label }, choice.value))) }), _jsx(QuestionnaireError, {})] }, question.name))), _jsxs(QuestionnaireActions, { children: [_jsx(QuestionnairePrevious, {}), _jsx(QuestionnaireNext, { children: "Next" }), _jsx(QuestionnaireSubmit, { children: "Create the pipeline" })] })] }));
}
