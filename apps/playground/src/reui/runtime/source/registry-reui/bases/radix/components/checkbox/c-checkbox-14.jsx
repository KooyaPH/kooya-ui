import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldGroup, FieldLabel, FieldTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const items = [
    {
        title: "Payments",
        description: "Receive payments from your customers",
        icon: (_jsx(IconPlaceholder, { lucide: "CircleDollarSignIcon", tabler: "IconPremiumRights", hugeicons: "DollarCircleIcon", phosphor: "CurrencyCircleDollarIcon", remixicon: "RiMoneyDollarCircleLine", "aria-hidden": "true", className: "size-4" })),
        checked: true,
    },
    {
        title: "Invoices",
        description: "Create and send invoices to your customers",
        icon: (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File02Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", "aria-hidden": "true", className: "size-4" })),
        checked: false,
    },
    {
        title: "Billing",
        description: "Manage your billing and subscriptions",
        icon: (_jsx(IconPlaceholder, { lucide: "CreditCardIcon", tabler: "IconCreditCard", hugeicons: "CreditCardIcon", phosphor: "CreditCardIcon", remixicon: "RiBankCardLine", "aria-hidden": "true", className: "size-4" })),
        checked: false,
    },
    {
        title: "Reports",
        description: "View your reports and analytics",
        icon: (_jsx(IconPlaceholder, { lucide: "ChartNoAxesColumnDecreasingIcon", tabler: "IconAntennaBars5", hugeicons: "SignalFull02Icon", phosphor: "ChartBarIcon", remixicon: "RiBarChart2Line", "aria-hidden": "true", className: "size-4" })),
        checked: false,
    },
];
export default function Pattern() {
    return (_jsx(FieldGroup, { className: "grid w-full max-w-xs grid-cols-2 gap-4", children: items.map((item) => (_jsx(FieldLabel, { className: "relative p-0", children: _jsxs(Field, { orientation: "horizontal", children: [_jsx(Checkbox, { defaultChecked: item.checked, className: "absolute top-3 right-3 size-5 rounded-full" }), _jsxs(FieldTitle, { className: "flex flex-col items-start", children: [_jsx("div", { className: "bg-background border-border rounded-2xl flex shrink-0 items-center justify-center border p-2 shadow-xs shadow-black/5", children: item.icon }), _jsxs("div", { className: "flex flex-col items-start gap-0.5", children: [_jsxs("span", { className: "text-sm font-semibold", children: [" ", item.title, " "] }), _jsxs("span", { className: "text-muted-foreground text-xs", children: [" ", item.description, " "] })] })] })] }) }, item.title))) }));
}
