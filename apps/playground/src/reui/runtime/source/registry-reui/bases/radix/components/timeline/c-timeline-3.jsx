import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Timeline, TimelineContent, TimelineDate, TimelineHeader, TimelineIndicator, TimelineItem, TimelineSeparator, TimelineTitle, } from "../../../../../../../adapters/structured.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const orderStatus = [
    {
        id: 1,
        date: "Mar 15, 2024",
        title: "Order Placed",
        description: "Your order has been received and is being processed.",
    },
    {
        id: 2,
        date: "Mar 16, 2024",
        title: "Payment Confirmed",
        description: "Transaction successful. Preparing for shipment.",
    },
    {
        id: 3,
        date: "Mar 18, 2024",
        title: "Shipped",
        description: "Your package is on its way. Track your delivery.",
    },
    {
        id: 4,
        date: "Mar 20, 2024",
        title: "Delivered",
        description: "Package successfully delivered to the recipient.",
    },
];
export default function Pattern() {
    return (_jsx(Timeline, { defaultValue: 3, className: "w-full max-w-md", children: orderStatus.map((item) => (_jsxs(TimelineItem, { step: item.id, className: "group-data-[orientation=vertical]/timeline:ms-10", children: [_jsxs(TimelineHeader, { children: [_jsx(TimelineSeparator, { className: "group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" }), _jsx(TimelineDate, { children: item.date }), _jsx(TimelineTitle, { children: item.title }), _jsx(TimelineIndicator, { className: "group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center group-data-completed/timeline-item:border-none group-data-[orientation=vertical]/timeline:-left-7", children: _jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-4 group-not-data-completed/timeline-item:hidden" }) })] }), _jsx(TimelineContent, { children: item.description })] }, item.id))) }));
}
