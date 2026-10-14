import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Marker, MarkerContent, MarkerIcon, } from "../../../../../registry/bases/radix/ui/marker.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
// A step carries a finished icon element, not an icon name: every library prop
// has to stay a literal string for the registry installer to rewrite it, so
// nothing here can be looked up from the step.
const PHASES = [
    // Phases nest their steps instead of every step naming its own phase. The
    // separator row is the group boundary itself, so a flat list would need a
    // lookbehind on every row to work out where one phase ends and the next
    // one starts.
    {
        name: "Plan",
        steps: [
            {
                id: "scan",
                label: "Searched 214 files for rateLimit(",
                icon: (_jsx(IconPlaceholder, { lucide: "SearchIcon", tabler: "IconSearch", hugeicons: "Search01Icon", phosphor: "MagnifyingGlassIcon", remixicon: "RiSearchLine" })),
            },
            {
                id: "read",
                label: "Read src/lib/rate-limit.ts",
                icon: (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File02Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine" })),
            },
            {
                id: "outline",
                label: "Drafted a 3 step plan",
                icon: (_jsx(IconPlaceholder, { lucide: "ListChecksIcon", tabler: "IconListCheck", hugeicons: "TaskDone01Icon", phosphor: "ListChecksIcon", remixicon: "RiListCheck" })),
            },
        ],
    },
    {
        name: "Edit",
        steps: [
            {
                id: "window",
                label: "Widened the window to 60s",
                icon: (_jsx(IconPlaceholder, { lucide: "PencilIcon", tabler: "IconPencil", hugeicons: "PenIcon", phosphor: "PencilIcon", remixicon: "RiPencilLine" })),
            },
            {
                id: "route",
                label: "Wired the limiter into the send route",
                icon: (_jsx(IconPlaceholder, { lucide: "CodeIcon", tabler: "IconCode", hugeicons: "CodeIcon", phosphor: "CodeIcon", remixicon: "RiCodeLine" })),
            },
            {
                id: "commit",
                label: "Committed to fix/rate-limit-window",
                icon: (_jsx(IconPlaceholder, { lucide: "GitBranchIcon", tabler: "IconGitBranch", hugeicons: "GitBranchIcon", phosphor: "GitBranchIcon", remixicon: "RiGitBranchLine" })),
            },
        ],
    },
    {
        name: "Verify",
        // Verify is two steps where the others are three. A run log is whatever
        // the run actually did, and padding every phase to the same length turns
        // the example into a template no real run would produce.
        steps: [
            {
                id: "tests",
                label: "Ran pnpm test rate-limit",
                icon: (_jsx(IconPlaceholder, { lucide: "TerminalIcon", tabler: "IconTerminal", hugeicons: "ComputerTerminal01Icon", phosphor: "TerminalIcon", remixicon: "RiTerminalLine" })),
            },
            {
                id: "probe",
                label: "Confirmed the 429 no longer fires",
                icon: (_jsx(IconPlaceholder, { lucide: "FlaskConicalIcon", tabler: "IconFlask", hugeicons: "TestTube01Icon", phosphor: "FlaskIcon", remixicon: "RiFlaskLine" })),
            },
        ],
    },
];
// Phases are flat siblings in one column rather than a container each, so the
// separator keeps the same rhythm as the steps and a phase cannot end up with
// its own inherited spacing.
//
// A labeled divider takes no role of its own. A separator role draws its name
// from aria-label and treats its contents as presentational, so the phase name
// you can see would be the one thing never announced. Left as plain content it
// reads in document order, right before the steps it introduces.
//
// The rules either side are pseudo elements on the row itself and the label is
// an ordinary flex child between them, so it needs no background plate and
// nothing should be layered over it.
export default function Pattern() {
    return (_jsxs(Card, { className: "mx-auto w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Agent run" }), _jsx(CardDescription, { children: "auth-rate-limit, 1m 48s" })] }), _jsx(CardContent, { children: _jsx("div", { className: "flex flex-col gap-2", children: PHASES.map((phase) => (_jsxs(Fragment, { children: [_jsx(Marker, { variant: "separator", children: _jsx(MarkerContent, { children: phase.name }) }), phase.steps.map((step) => (_jsxs(Marker, { children: [_jsx(MarkerIcon, { children: step.icon }), _jsx(MarkerContent, { children: step.label })] }, step.id)))] }, phase.name))) }) })] }));
}
