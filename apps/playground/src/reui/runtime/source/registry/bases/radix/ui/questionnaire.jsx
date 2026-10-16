"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Questionnaire as QuestionnairePrimitive } from "@shadcn/react/questionnaire";
import { cn } from "cn";
import { buttonVariants } from "../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../adapters/icons.tsx";
function Questionnaire({ className, ...props }) {
    return (_jsx(QuestionnairePrimitive.Root, { "data-slot": "questionnaire", className: cn("cn-questionnaire flex w-full min-w-0 flex-col", className), ...props }));
}
function QuestionnaireProgress({ className, ...props }) {
    return (_jsx(QuestionnairePrimitive.Progress, { "data-slot": "questionnaire-progress", className: cn("cn-questionnaire-progress min-h-[1lh] w-fit min-w-[14ch] font-medium text-muted-foreground tabular-nums", className), ...props }));
}
function QuestionnaireItem({ className, ...props }) {
    return (_jsx(QuestionnairePrimitive.Item, { "data-slot": "questionnaire-item", className: cn("cn-questionnaire-item min-w-0 border-0 p-0 outline-none", className), ...props }));
}
function QuestionnaireTitle({ className, ...props }) {
    return (_jsx(QuestionnairePrimitive.Title, { "data-slot": "questionnaire-title", className: cn("cn-questionnaire-title cn-font-heading text-pretty", className), ...props }));
}
function QuestionnaireDescription({ className, ...props }) {
    return (_jsx(QuestionnairePrimitive.Description, { "data-slot": "questionnaire-description", className: cn("cn-questionnaire-description text-pretty text-muted-foreground", className), ...props }));
}
function QuestionnaireChoices({ className, ...props }) {
    return (_jsx(QuestionnairePrimitive.Choices, { "data-slot": "questionnaire-choices", className: cn("cn-questionnaire-choices group/questionnaire-choices grid min-w-0", className), ...props }));
}
function QuestionnaireChoice({ children, className, ...props }) {
    return (_jsxs(QuestionnairePrimitive.Choice, { "data-slot": "questionnaire-choice", className: cn("cn-questionnaire-choice group/questionnaire-choice relative flex min-h-11 cursor-pointer items-start text-start transition-colors outline-none select-none", "data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50", className), ...props, children: [_jsx(QuestionnairePrimitive.ChoiceInput, { "data-slot": "questionnaire-choice-input", className: "cn-questionnaire-choice-input absolute inset-0 z-10 size-full cursor-pointer opacity-0" }), _jsxs("span", { "aria-hidden": "true", "data-slot": "questionnaire-choice-indicator", className: "cn-questionnaire-choice-indicator pointer-events-none relative flex shrink-0 items-center justify-center border group-data-[type=radio]/questionnaire-choice:rounded-full", children: [_jsx("span", { "data-slot": "questionnaire-choice-indicator-dot", className: "cn-questionnaire-choice-indicator-dot hidden rounded-full group-data-[type=checkbox]/questionnaire-choice:hidden group-data-checked/questionnaire-choice:block" }), _jsx(IconPlaceholder, { "data-slot": "questionnaire-choice-indicator-check", className: "cn-questionnaire-choice-indicator-check hidden group-data-[type=radio]/questionnaire-choice:hidden group-data-checked/questionnaire-choice:block", lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine" })] }), _jsx(QuestionnairePrimitive.ChoiceLabel, { "data-slot": "questionnaire-choice-label", className: "cn-questionnaire-choice-label cn-questionnaire-choice-content flex min-w-0 flex-1 flex-col leading-snug", children: children }), _jsx(QuestionnairePrimitive.ChoiceShortcut, { "data-slot": "questionnaire-choice-shortcut", className: "cn-questionnaire-choice-shortcut cn-questionnaire-shortcut pointer-events-none ms-auto hidden shrink-0 group-data-[shortcut]/questionnaire-choice:inline-flex" })] }));
}
function QuestionnaireChoiceDescription({ className, ...props }) {
    return (_jsx("span", { "data-slot": "questionnaire-choice-description", className: cn("cn-questionnaire-choice-description", className), ...props }));
}
function QuestionnaireInput({ className, ...props }) {
    return (_jsx("div", { "data-slot": "questionnaire-input-wrapper", className: "cn-questionnaire-input-wrapper group/questionnaire-input relative min-w-0", children: _jsx(QuestionnairePrimitive.Input, { "data-slot": "questionnaire-input", className: cn("cn-questionnaire-input min-h-11 w-full min-w-0 transition-[color,box-shadow,background-color] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0", "selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground", className), ...props }) }));
}
function QuestionnaireError({ className, ...props }) {
    return (_jsx(QuestionnairePrimitive.Error, { "data-slot": "questionnaire-error", className: cn("cn-questionnaire-error text-destructive", className), ...props }));
}
function QuestionnaireActions({ className, ...props }) {
    return (_jsx("div", { "data-slot": "questionnaire-actions", className: cn("cn-questionnaire-actions grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center", className), ...props }));
}
function QuestionnairePrevious({ children, className, size = "default", variant = "outline", ...props }) {
    return (_jsx(QuestionnairePrimitive.Previous, { "data-slot": "questionnaire-previous", "data-size": size, "data-variant": variant, className: cn(buttonVariants({ size, variant }), "cn-questionnaire-previous col-start-1 row-start-1 min-h-11 justify-self-start sm:min-h-0", className), ...props, children: children ?? "Previous" }));
}
function QuestionnaireSkip({ children, className, size = "default", variant = "outline", ...props }) {
    return (_jsx(QuestionnairePrimitive.Skip, { "data-slot": "questionnaire-skip", "data-size": size, "data-variant": variant, className: cn(buttonVariants({ size, variant }), "cn-questionnaire-skip col-start-2 row-start-1 min-h-11 justify-self-end sm:min-h-0", className), ...props, children: children ?? "Skip" }));
}
function QuestionnaireNext({ children, className, size = "default", variant = "default", ...props }) {
    return (_jsx(QuestionnairePrimitive.Next, { "data-slot": "questionnaire-next", "data-size": size, "data-variant": variant, className: cn(buttonVariants({ size, variant }), "cn-questionnaire-next col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0", className), ...props, children: children ?? "Next" }));
}
function QuestionnaireSubmit({ children, className, size = "default", variant = "default", ...props }) {
    return (_jsx(QuestionnairePrimitive.Submit, { "data-slot": "questionnaire-submit", "data-size": size, "data-variant": variant, className: cn(buttonVariants({ size, variant }), "cn-questionnaire-submit col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0", className), ...props, children: children ?? "Submit" }));
}
export { Questionnaire, QuestionnaireActions, QuestionnaireChoice, QuestionnaireChoiceDescription, QuestionnaireChoices, QuestionnaireDescription, QuestionnaireError, QuestionnaireInput, QuestionnaireItem, QuestionnaireNext, QuestionnairePrevious, QuestionnaireProgress, QuestionnaireSkip, QuestionnaireSubmit, QuestionnaireTitle, };
