"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput, } from "../../../../../../../adapters/utility.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { z } from "zod";
import { Alert, AlertDescription } from "../../../../../registry/bases/radix/ui/alert.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const FormSchema = z.object({
    amount: z
        .number({
        message: "Amount must be a number.",
    })
        .min(10, {
        message: "Amount must be at least 10.",
    })
        .max(100, {
        message: "Amount must be at most 100.",
    }),
});
export default function Pattern() {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            amount: 5,
        },
        mode: "onChange",
    });
    function onSubmit(data) {
        toast.success("Form submitted", {
            description: (_jsxs(Alert, { variant: "default", children: [_jsx(IconPlaceholder, { lucide: "CircleAlertIcon", tabler: "IconAlertCircle", hugeicons: "AlertCircleIcon", phosphor: "WarningCircleIcon", remixicon: "RiErrorWarningLine" }), _jsxs(AlertDescription, { children: ["Your form has successfully submitted with amount: ", data.amount] })] })),
        });
        form.reset();
    }
    return (_jsx("div", { className: "w-full max-w-68", children: _jsx("form", { onSubmit: form.handleSubmit(onSubmit), children: _jsxs(FieldGroup, { children: [_jsx(FieldSet, { children: _jsx(FieldGroup, { children: _jsx(Controller, { name: "amount", control: form.control, render: ({ field, fieldState }) => (_jsxs(Field, { "data-invalid": fieldState.invalid, children: [_jsx(FieldLabel, { htmlFor: "number-field-amount", children: "Amount" }), _jsx(NumberField, { id: "number-field-amount", value: field.value, onValueChange: (value) => field.onChange(value), min: 0, max: 100, children: _jsxs(NumberFieldGroup, { "aria-invalid": !!form.formState.errors.amount, children: [_jsx(NumberFieldDecrement, {}), _jsx(NumberFieldInput, {}), _jsx(NumberFieldIncrement, {})] }) }), _jsx(FieldDescription, { children: "Enter an amount between 10 and 100." }), fieldState.error && (_jsx(FieldError, { children: fieldState.error?.message }))] })) }) }) }), _jsxs(Field, { orientation: "horizontal", children: [_jsx(Button, { variant: "outline", type: "button", onClick: () => form.reset(), className: "flex-1", children: "Cancel" }), _jsx(Button, { type: "submit", className: "flex-1", children: "Submit" })] })] }) }) }));
}
