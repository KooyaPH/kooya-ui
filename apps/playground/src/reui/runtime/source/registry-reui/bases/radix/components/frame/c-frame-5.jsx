import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "../../../../../../../adapters/navigation.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx(Frame, { className: "w-full", stacked: true, children: _jsxs(Collapsible, { defaultOpen: true, className: "group/collapsible", children: [_jsx(CollapsibleTrigger, { className: "w-full", children: _jsxs(FrameHeader, { className: "flex grow flex-row items-center justify-between gap-2", children: [_jsx(FrameTitle, { children: "Start" }), _jsx(IconPlaceholder, { lucide: "ChevronRightIcon", tabler: "IconChevronRight", hugeicons: "ArrowRight01Icon", phosphor: "CaretRightIcon", remixicon: "RiArrowRightSLine", className: "text-muted-foreground size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })] }) }), _jsx(CollapsibleContent, { children: _jsx(FramePanel, { children: _jsx("p", { className: "text-muted-foreground text-sm", children: "Initialize run to answer a user question using uploaded files and the knowledge base; cite sources when relevant." }) }) })] }) }));
}
