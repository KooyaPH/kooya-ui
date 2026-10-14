import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card } from "../../../../../../../adapters/layout.tsx";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "../../../../../../../adapters/navigation.tsx";
import { Field, FieldGroup, FieldLabel, FieldTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const settings = [
    { id: "push", label: "Push notifications", defaultChecked: true },
    { id: "email", label: "Email notifications", defaultChecked: false },
    { id: "sms", label: "SMS notifications", defaultChecked: false },
];
export default function Pattern() {
    return (_jsx("div", { className: "h-40 w-full max-w-xs", children: _jsxs(Collapsible, { className: "flex flex-col gap-2", defaultOpen: true, children: [_jsx(CollapsibleTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "bg-background! w-full justify-start", children: [_jsx(IconPlaceholder, { lucide: "ChevronRightIcon", tabler: "IconChevronRight", hugeicons: "ArrowRight01Icon", phosphor: "CaretRightIcon", remixicon: "RiArrowRightSLine", "aria-hidden": "true", className: "size-4 group-data-panel-open/button:rotate-90" }), _jsx("span", { className: "sr-only", children: "Toggle notification settings" }), "Notification settings"] }) }), _jsx(CollapsibleContent, { children: _jsx(Card, { className: "p-0", children: _jsx(FieldGroup, { className: "gap-0 divide-y", children: settings.map((item) => (_jsx(Field, { children: _jsxs(FieldLabel, { className: "px-3 py-2", children: [_jsx(Checkbox, { defaultChecked: item.defaultChecked }), _jsx(FieldTitle, { children: item.label })] }) }, item.id))) }) }) })] }) }));
}
