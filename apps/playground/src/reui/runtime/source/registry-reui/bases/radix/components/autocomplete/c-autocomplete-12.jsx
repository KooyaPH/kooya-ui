"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Autocomplete, AutocompleteContent, AutocompleteEmpty, AutocompleteInput, AutocompleteItem, AutocompleteList, } from "../../../../../../../adapters/autocomplete.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { z } from "zod";
import { Alert, AlertDescription } from "../../../../../registry/bases/radix/ui/alert.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const FormSchema = z.object({
    feature: z
        .string()
        .min(1, "Please select an item.")
        .refine((val) => items.some((item) => item.value === val), "Please select a valid item."),
});
export default function Pattern() {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: { feature: "" },
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });
    function onSubmit(data) {
        toast.success("Form submitted", {
            description: (_jsxs(Alert, { variant: "default", children: [_jsx(IconPlaceholder, { lucide: "CircleAlertIcon", tabler: "IconAlertCircle", hugeicons: "AlertCircleIcon", phosphor: "WarningCircleIcon", remixicon: "RiErrorWarningLine" }), _jsxs(AlertDescription, { children: ["Your form has successfully submitted with feature: ", data.feature] })] })),
        });
        form.reset();
    }
    return (_jsx("div", { className: "w-full max-w-xs", children: _jsx("form", { onSubmit: form.handleSubmit(onSubmit), children: _jsxs(FieldGroup, { children: [_jsx(FieldSet, { children: _jsx(FieldGroup, { children: _jsx(Controller, { name: "feature", control: form.control, render: ({ field, fieldState }) => (_jsxs(Field, { "data-invalid": fieldState.invalid || undefined, children: [_jsx(FieldLabel, { htmlFor: "autocomplete-feature", children: "Select Feature" }), _jsxs(Autocomplete, { items: items, value: field.value, onValueChange: (value) => {
                                                field.onChange(value);
                                            }, children: [_jsx(AutocompleteInput, { id: "autocomplete-feature", placeholder: "e.g. feature", "aria-invalid": !!form.formState.errors.feature }), _jsxs(AutocompleteContent, { children: [_jsx(AutocompleteEmpty, { children: "No items found." }), _jsx(AutocompleteList, { children: (item) => (_jsx(AutocompleteItem, { value: item.value, children: item.value }, item.id)) })] })] }), _jsx(FieldDescription, { children: "Search and select a component feature." }), fieldState.error && (_jsx(FieldError, { children: fieldState.error?.message }))] })) }) }) }), _jsxs(Field, { orientation: "horizontal", children: [_jsx(Button, { variant: "outline", type: "button", onClick: () => form.reset(), className: "flex-1", children: "Cancel" }), _jsx(Button, { type: "submit", className: "flex-1", children: "Submit" })] })] }) }) }));
}
const items = [
    { id: "t1", value: "feature" },
    { id: "t2", value: "fix" },
    { id: "t3", value: "bug" },
    { id: "t4", value: "docs" },
    { id: "t5", value: "internal" },
    { id: "t6", value: "mobile" },
    { id: "c-accordion", value: "component: accordion" },
    { id: "c-alert-dialog", value: "component: alert dialog" },
    { id: "c-autocomplete", value: "component: autocomplete" },
    { id: "c-avatar", value: "component: avatar" },
    { id: "c-checkbox", value: "component: checkbox" },
    { id: "c-checkbox-group", value: "component: checkbox group" },
    { id: "c-collapsible", value: "component: collapsible" },
    { id: "c-combobox", value: "component: combobox" },
    { id: "c-context-menu", value: "component: context menu" },
    { id: "c-dialog", value: "component: dialog" },
    { id: "c-field", value: "component: field" },
    { id: "c-fieldset", value: "component: fieldset" },
    { id: "c-filterable-menu", value: "component: filterable menu" },
    { id: "c-form", value: "component: form" },
    { id: "c-input", value: "component: input" },
    { id: "c-menu", value: "component: menu" },
    { id: "c-menubar", value: "component: menubar" },
    { id: "c-meter", value: "component: meter" },
    { id: "c-navigation-menu", value: "component: navigation menu" },
    { id: "c-number-field", value: "component: number field" },
    { id: "c-popover", value: "component: popover" },
    { id: "c-preview-card", value: "component: preview card" },
    { id: "c-progress", value: "component: progress" },
    { id: "c-radio", value: "component: radio" },
    { id: "c-scroll-area", value: "component: scroll area" },
    { id: "c-select", value: "component: select" },
    { id: "c-separator", value: "component: separator" },
    { id: "c-slider", value: "component: slider" },
    { id: "c-switch", value: "component: switch" },
    { id: "c-tabs", value: "component: tabs" },
    { id: "c-toast", value: "component: toast" },
    { id: "c-toggle", value: "component: toggle" },
    { id: "c-toggle-group", value: "component: toggle group" },
    { id: "c-toolbar", value: "component: toolbar" },
    { id: "c-tooltip", value: "component: tooltip" },
];
