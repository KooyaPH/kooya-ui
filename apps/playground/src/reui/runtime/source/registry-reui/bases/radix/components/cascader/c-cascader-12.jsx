"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Cascader, CascaderContent, CascaderEmpty, CascaderList, CascaderPanel, CascaderStatus, CascaderTrigger, } from "../../../../../../../adapters/cascader.tsx";
import { CascaderItems } from "../../../../../../../adapters/cascader.tsx";
import { CascaderBreadcrumb, CascaderInput, CascaderNav, CascaderValue, } from "../../../../../../../adapters/cascader.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldDescription, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
const topics = [
    {
        value: "billing",
        label: "Billing",
        children: [
            { value: "billing.invoice", label: "Invoice question" },
            { value: "billing.refund", label: "Refund request" },
            { value: "billing.plan", label: "Change plan" },
            { value: "billing.tax", label: "Tax details" },
        ],
    },
    {
        value: "technical",
        label: "Technical",
        children: [
            {
                value: "technical.api",
                label: "API",
                children: [
                    { value: "technical.api.auth", label: "Authentication" },
                    { value: "technical.api.limits", label: "Rate limits" },
                    { value: "technical.api.webhooks", label: "Webhooks" },
                ],
            },
            { value: "technical.bug", label: "Bug report" },
            { value: "technical.performance", label: "Performance" },
        ],
    },
    {
        value: "account",
        label: "Account",
        children: [
            { value: "account.login", label: "Cannot sign in" },
            { value: "account.email", label: "Change email" },
            { value: "account.delete", label: "Delete account" },
        ],
    },
    {
        value: "team",
        label: "Team",
        children: [
            { value: "team.invite", label: "Invites" },
            { value: "team.seats", label: "Seats" },
            { value: "team.roles", label: "Roles" },
        ],
    },
    {
        value: "licensing",
        label: "Licensing",
        children: [
            { value: "licensing.key", label: "License key" },
            { value: "licensing.transfer", label: "Transfer a license" },
        ],
    },
    {
        value: "security",
        label: "Security",
        children: [
            { value: "security.report", label: "Report a vulnerability" },
            { value: "security.sso", label: "SSO setup" },
        ],
    },
    { value: "feedback", label: "Product feedback" },
    { value: "other", label: "Something else" },
];
/**
 * Form integration. `name` makes the cascader submit like any native field, so
 * it works with a plain form action or any form library without a controller
 * wrapper. The submitted value is the selected node's `value`.
 */
export default function Pattern() {
    const [submitted, setSubmitted] = useState(null);
    return (_jsx("div", { className: "flex w-full justify-center p-4", children: _jsxs("form", { className: "flex w-full max-w-sm flex-col gap-4", onSubmit: (event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                setSubmitted(String(data.get("topic") ?? ""));
            }, children: [_jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "topic-trigger", children: "What do you need help with?" }), _jsxs(Cascader, { items: topics, name: "topic", children: [_jsx(CascaderTrigger, { id: "topic-trigger", render: _jsx(Button, { variant: "outline", className: "w-full justify-between gap-2 font-normal" }), children: _jsx(CascaderValue, { placeholder: "Select a topic" }) }), _jsx(CascaderContent, { className: "w-(--anchor-width)", children: _jsxs(CascaderPanel, { children: [_jsx(CascaderNav, { children: _jsx(CascaderInput, {}) }), _jsx(CascaderBreadcrumb, {}), _jsx(CascaderEmpty, {}), _jsx(CascaderList, { children: _jsx(CascaderItems, {}) }), _jsx(CascaderStatus, {})] }) })] }), _jsx(FieldDescription, { children: "Pick the most specific topic you can." })] }), _jsx(Button, { type: "submit", className: "w-full", children: "Submit request" }), submitted ? (_jsxs("p", { className: "text-muted-foreground text-xs", children: ["Submitted ", _jsxs("code", { className: "text-foreground", children: ["topic=", submitted] })] })) : null] }) }));
}
