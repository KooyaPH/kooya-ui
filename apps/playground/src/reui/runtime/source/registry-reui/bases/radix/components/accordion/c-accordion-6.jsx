import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const items = [
    {
        value: "account",
        icon: (_jsx(IconPlaceholder, { lucide: "SettingsIcon", tabler: "IconSettings", hugeicons: "SettingsIcon", phosphor: "GearIcon", remixicon: "RiSettings3Line", className: "text-muted-foreground size-4" })),
        trigger: "Account Settings",
        badge: "New",
        content: "Manage your account preferences, security settings, and personal information. You can also configure two-factor authentication here.",
    },
    {
        value: "privacy",
        icon: (_jsx(IconPlaceholder, { lucide: "LockIcon", tabler: "IconLock", hugeicons: "SquareLock01Icon", phosphor: "LockSimpleIcon", remixicon: "RiLockLine", className: "text-muted-foreground size-4" })),
        trigger: "Privacy & Security",
        content: "Control who can see your profile and what data we collect. View our latest security audits and transparency reports.",
    },
    {
        value: "support",
        icon: (_jsx(IconPlaceholder, { lucide: "HelpCircleIcon", tabler: "IconHelpCircle", hugeicons: "HelpCircleIcon", phosphor: "QuestionIcon", remixicon: "RiQuestionLine", className: "text-muted-foreground size-4" })),
        trigger: "Help & Support",
        content: "Access our help center, community forums, and contact support. We're here to help you 24/7.",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto mb-auto w-full max-w-lg", children: _jsx(Accordion, { type: "single", collapsible: true, defaultValue: "account", className: "space-y-3 border-0", children: items.map((item) => (_jsxs(AccordionItem, { value: item.value, className: "border-border bg-card rounded-lg border px-2 **:data-[slot=accordion-content]:p-0!", children: [_jsx(AccordionTrigger, { className: "items-center px-1 py-3 font-semibold hover:no-underline", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "bg-muted rounded-lg flex size-8 items-center justify-center", children: item.icon }), _jsx("span", { children: item.trigger }), item.badge && (_jsx(Badge, { variant: "success-light", children: item.badge }))] }) }), _jsx(AccordionContent, { className: "text-muted-foreground px-2 pt-0 pb-4 leading-relaxed", children: _jsx("div", { className: "pl-11", children: item.content }) })] }, item.value))) }) }));
}
