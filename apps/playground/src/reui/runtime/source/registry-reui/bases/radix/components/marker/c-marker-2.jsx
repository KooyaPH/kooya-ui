import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Marker, MarkerContent, MarkerIcon, } from "../../../../../registry/bases/radix/ui/marker.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
// Each row carries a finished icon element rather than an icon name, because
// every library prop below has to stay a literal string for the registry
// installer to rewrite it. A name looked up from the row would not survive.
//
// None of them takes a size class either. A marker sizes a plain svg child for
// you, and that size is smaller in the compact styles, so a fixed size here
// pins one icon to one style's scale and looks wrong in the rest.
const TOOL_CALLS = [
    {
        id: "checkout",
        label: "Checked out fix/rate-limit-window",
        icon: (_jsx(IconPlaceholder, { lucide: "GitBranchIcon", tabler: "IconGitBranch", hugeicons: "GitBranchIcon", phosphor: "GitBranchIcon", remixicon: "RiGitBranchLine" })),
    },
    {
        id: "search",
        label: "Searched 214 files for rateLimit(",
        icon: (_jsx(IconPlaceholder, { lucide: "SearchIcon", tabler: "IconSearch", hugeicons: "Search01Icon", phosphor: "MagnifyingGlassIcon", remixicon: "RiSearchLine" })),
    },
    {
        id: "read",
        label: "Read src/lib/rate-limit.ts",
        icon: (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File02Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine" })),
    },
    {
        id: "edit",
        label: "Edited src/lib/rate-limit.ts, 2 hunks",
        icon: (_jsx(IconPlaceholder, { lucide: "PencilIcon", tabler: "IconPencil", hugeicons: "PenIcon", phosphor: "PencilIcon", remixicon: "RiPencilLine" })),
    },
    {
        id: "test",
        label: "Ran pnpm test rate-limit",
        icon: (_jsx(IconPlaceholder, { lucide: "TerminalIcon", tabler: "IconTerminal", hugeicons: "ComputerTerminal01Icon", phosphor: "TerminalIcon", remixicon: "RiTerminalLine" })),
    },
    {
        id: "docs",
        label: "Read the Upstash quota docs",
        icon: (_jsx(IconPlaceholder, { lucide: "BookOpenIcon", tabler: "IconBook", hugeicons: "BookOpen01Icon", phosphor: "BookOpenIcon", remixicon: "RiBookOpenLine" })),
    },
];
// The icon slot is hidden from assistive tech by the primitive, along with
// everything inside it, so the label alone has to read as a complete line of
// the log. No row here says "this one" or leans on its glyph for meaning.
//
// No panel around the list on purpose: the default variant is chrome free, and
// wrapping it in a card would demonstrate the card instead of the icon slot.
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-full max-w-sm flex-col gap-3", children: TOOL_CALLS.map((call) => (_jsxs(Marker, { children: [_jsx(MarkerIcon, { children: call.icon }), _jsx(MarkerContent, { children: call.label })] }, call.id))) }));
}
