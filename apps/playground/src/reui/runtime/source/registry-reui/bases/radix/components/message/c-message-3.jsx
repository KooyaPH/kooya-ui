import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bubble, BubbleContent } from "../../../../../registry/bases/radix/ui/bubble.jsx";
import { Message, MessageContent, MessageFooter, MessageHeader, } from "../../../../../registry/bases/radix/ui/message.jsx";
/*
 * The two metadata slots pick their side differently: MessageHeader stays
 * where the content starts whatever the row does, while MessageFooter follows
 * the row to the end. Both inherit the bubble's horizontal padding.
 */
export default function Pattern() {
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-sm flex-col gap-7", children: [_jsx(Message, { children: _jsxs(MessageContent, { children: [_jsxs(MessageHeader, { className: "gap-1.5", children: ["Emma Wilson", _jsx("span", { "aria-hidden": "true", className: "bg-muted-foreground/40 size-1 shrink-0 rounded-full" }), _jsx("span", { className: "tabular-nums", children: "09:38" })] }), _jsx(Bubble, { variant: "muted", children: _jsx(BubbleContent, { children: "The invoice template is missing the VAT line on EU orders." }) })] }) }), _jsx(Message, { align: "end", children: _jsxs(MessageContent, { children: [_jsx(Bubble, { children: _jsx(BubbleContent, { children: "Fixed on the 4.2 branch. It ships with tonight's release." }) }), _jsx(MessageFooter, { children: "Read 09:41" })] }) }), _jsx(Message, { children: _jsxs(MessageContent, { children: [_jsxs(MessageHeader, { className: "gap-1.5", children: ["Emma Wilson", _jsx("span", { "aria-hidden": "true", className: "bg-muted-foreground/40 size-1 shrink-0 rounded-full" }), _jsx("span", { className: "tabular-nums", children: "09:42" })] }), _jsx(Bubble, { variant: "muted", children: _jsx(BubbleContent, { children: "Then I will re-run the January batch once it is out." }) }), _jsxs(MessageFooter, { className: "gap-1.5", children: [_jsx("span", { children: "Edited" }), _jsx("span", { "aria-hidden": "true", className: "bg-muted-foreground/40 size-1 shrink-0 rounded-full" }), _jsx("span", { className: "tabular-nums", children: "09:44" })] })] }) })] }));
}
