import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, } from "../../../../../../../adapters/layout.tsx";
import { Spinner } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Empty, { className: "min-h-[300px] w-full max-w-md", children: [_jsxs(EmptyHeader, { children: [_jsx(EmptyMedia, { variant: "icon", children: _jsx(Spinner, { className: "size-4" }) }), _jsx(EmptyTitle, { children: "Loading projects" }), _jsx(EmptyDescription, { children: "Please wait while we fetch your project data. This should only take a moment." })] }), _jsx(EmptyContent, { children: _jsx(Button, { variant: "outline", disabled: true, children: "Cancel" }) })] }) }));
}
