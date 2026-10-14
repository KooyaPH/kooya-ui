import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bubble, BubbleContent } from "../../../../../registry/bases/radix/ui/bubble.jsx";
import { Message, MessageContent } from "../../../../../registry/bases/radix/ui/message.jsx";
/*
 * align="end" is the whole mechanism for an outgoing turn: Message writes it
 * out as data-align and reverses its own flex row, so no ms-auto is needed.
 */
export default function Pattern() {
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-sm flex-col gap-6", children: [_jsx(Message, { children: _jsx(MessageContent, { children: _jsx(Bubble, { variant: "muted", children: _jsx(BubbleContent, { children: "Staging is green on 4.2. Want me to promote it?" }) }) }) }), _jsx(Message, { align: "end", children: _jsx(MessageContent, { children: _jsx(Bubble, { children: _jsx(BubbleContent, { children: "Hold it. The billing migration has to go out in the same release." }) }) }) }), _jsx(Message, { children: _jsx(MessageContent, { children: _jsx(Bubble, { variant: "muted", children: _jsx(BubbleContent, { children: "Understood. The migration lands after the 2pm review." }) }) }) }), _jsx(Message, { align: "end", children: _jsx(MessageContent, { children: _jsx(Bubble, { children: _jsx(BubbleContent, { children: "Then I will cut the tag straight after." }) }) }) })] }));
}
