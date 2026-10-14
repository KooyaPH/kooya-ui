"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from "react";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Questionnaire, QuestionnaireActions, QuestionnaireChoice, QuestionnaireChoices, QuestionnaireDescription, QuestionnaireError, QuestionnaireItem, QuestionnaireNext, QuestionnairePrevious, QuestionnaireProgress, QuestionnaireSubmit, QuestionnaireTitle, } from "../../../../../registry/bases/radix/ui/questionnaire.jsx";
const REGIONS = [
    { value: "us", label: "United States" },
    { value: "eu", label: "European Union" },
    { value: "self-managed", label: "A region you manage" },
];
const PLANS = [
    { value: "starter", label: "Starter" },
    { value: "growth", label: "Growth" },
    { value: "enterprise", label: "Enterprise" },
];
const SIGNERS = [
    { value: "me", label: "I sign it myself" },
    { value: "legal", label: "Our legal team" },
    { value: "admin", label: "A named administrator" },
];
const ITEMS = [
    { name: "region", required: true },
    { name: "plan", required: true },
    { name: "signer", required: true },
];
// The one cross-question rule in this flow, written out once. No schema
// library is involved and none is missing: a single rule over two FormData
// reads costs less than a resolver, and the per-question required checks a
// schema would carry are already the primitive's job.
const PLAN_CONFLICT = "A region you manage is available on Enterprise. Pick another plan, or change the region.";
function labelOf(options, value) {
    return (options.find((option) => option.value === value)?.label ?? "Not answered");
}
export default function Pattern() {
    // CardHeader sits between each fieldset and its legend, which stops the
    // legend naming the group. Pairing these ids with aria-labelledby on each
    // item puts that name back.
    const titleId = useId();
    // Controlled navigation is what makes the walk-back possible at all: item
    // and onItemChange hand the flow's position to this component, so writing to
    // it moves the visitor, and the root focuses whichever question it lands on.
    const [item, setItem] = useState("region");
    const [planError, setPlanError] = useState(null);
    const [summary, setSummary] = useState(null);
    // Each question is already gated by the built-in required check, so nothing
    // here re-implements that. This rule spans two answers and cannot be judged
    // until both exist, which is why it runs on submit and moves item by hand.
    //
    // Rejected: noValidate={false} switches on native constraint validation, but
    // the browser judges one control at a time and answers with its own bubble,
    // so it can never express a rule that reads across two questions.
    //
    // The root re-checks every enabled item before this handler is reached, so
    // all three answers are known to exist by the time it runs and the only
    // thing left to judge is the combination.
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const region = formData.get("region");
        const plan = formData.get("plan");
        if (region === "self-managed" && plan === "starter") {
            setPlanError(PLAN_CONFLICT);
            setItem("plan");
            return;
        }
        setSummary({
            region: labelOf(REGIONS, region),
            plan: labelOf(PLANS, plan),
            signer: labelOf(SIGNERS, formData.get("signer")),
        });
    }
    function startOver() {
        setSummary(null);
        setPlanError(null);
        setItem("region");
    }
    if (summary) {
        return (_jsxs(Card, { className: "mx-auto w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Agreement on its way" }), _jsx(CardDescription, { children: "The data agreement has been drafted against these three answers and sent for signature." })] }), _jsx(CardContent, { children: _jsxs("dl", { className: "grid gap-3", children: [_jsxs("div", { className: "grid min-w-0 gap-0.5", children: [_jsx("dt", { className: "text-muted-foreground text-sm", children: "Data residency" }), _jsx("dd", { className: "text-sm font-medium", children: summary.region })] }), _jsxs("div", { className: "grid min-w-0 gap-0.5", children: [_jsx("dt", { className: "text-muted-foreground text-sm", children: "Plan" }), _jsx("dd", { className: "text-sm font-medium", children: summary.plan })] }), _jsxs("div", { className: "grid min-w-0 gap-0.5", children: [_jsx("dt", { className: "text-muted-foreground text-sm", children: "Signed by" }), _jsx("dd", { className: "text-sm font-medium", children: summary.signer })] })] }) }), _jsx(CardFooter, { children: _jsx(Button, { size: "sm", variant: "outline", onClick: startOver, children: "Start over" }) })] }));
    }
    return (_jsx(Questionnaire, { className: "mx-auto w-full max-w-md", item: item, items: ITEMS, onItemChange: setItem, onSubmit: handleSubmit, children: _jsxs(Card, { children: [_jsxs(QuestionnaireItem, { "aria-labelledby": `${titleId}-region`, name: "region", required: true, children: [_jsxs(CardHeader, { children: [_jsx(QuestionnaireTitle, { id: `${titleId}-region`, render: _jsx(CardTitle, {}), children: "Where should your data live?" }), _jsx(QuestionnaireDescription, { render: _jsx(CardDescription, {}), children: "Residency is fixed once the workspace is created." }), _jsx(CardAction, { children: _jsx(QuestionnaireProgress, {}) })] }), _jsxs(CardContent, { children: [_jsx(QuestionnaireChoices, { children: REGIONS.map((region) => (_jsx(QuestionnaireChoice, { value: region.value, 
                                        // Both questions clear the message as they change, because
                                        // either answer can resolve the conflict and a stale
                                        // sentence under a corrected question is worse than none.
                                        onChange: () => setPlanError(null), children: region.label }, region.value))) }), _jsx(QuestionnaireError, {})] })] }), _jsxs(QuestionnaireItem, { "aria-labelledby": `${titleId}-plan`, name: "plan", required: true, 
                    // invalid and the error children are separate on purpose: the flag
                    // drives the styling and the alert role, the children supply the
                    // sentence. Null rather than an empty string leaves the primitive's
                    // own required copy in place for the ordinary unanswered case.
                    //
                    // The flag also blocks Next while it is set, so the rule holds on the
                    // way forward and not only on the way out. The visitor cannot
                    // walk past the question that broke it and meet the same message
                    // again at the end.
                    invalid: planError !== null, children: [_jsxs(CardHeader, { children: [_jsx(QuestionnaireTitle, { id: `${titleId}-plan`, render: _jsx(CardTitle, {}), children: "Which plan are you on?" }), _jsx(QuestionnaireDescription, { render: _jsx(CardDescription, {}), children: "Not every region is offered on every plan." }), _jsx(CardAction, { children: _jsx(QuestionnaireProgress, {}) })] }), _jsxs(CardContent, { children: [_jsx(QuestionnaireChoices, { children: PLANS.map((plan) => (_jsx(QuestionnaireChoice, { value: plan.value, onChange: () => setPlanError(null), children: plan.label }, plan.value))) }), _jsx(QuestionnaireError, { children: planError })] })] }), _jsxs(QuestionnaireItem, { "aria-labelledby": `${titleId}-signer`, name: "signer", required: true, children: [_jsxs(CardHeader, { children: [_jsx(QuestionnaireTitle, { id: `${titleId}-signer`, render: _jsx(CardTitle, {}), children: "Who signs the data agreement?" }), _jsx(QuestionnaireDescription, { render: _jsx(CardDescription, {}), children: "We send it for signature as soon as this flow is finished." }), _jsx(CardAction, { children: _jsx(QuestionnaireProgress, {}) })] }), _jsxs(CardContent, { children: [_jsx(QuestionnaireChoices, { children: SIGNERS.map((signer) => (_jsx(QuestionnaireChoice, { value: signer.value, children: signer.label }, signer.value))) }), _jsx(QuestionnaireError, {})] })] }), _jsx(CardFooter, { children: _jsxs(QuestionnaireActions, { className: "w-full", children: [_jsx(QuestionnairePrevious, {}), _jsx(QuestionnaireNext, { children: "Next" }), _jsx(QuestionnaireSubmit, { children: "Request the agreement" })] }) })] }) }));
}
