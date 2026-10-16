import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Progress } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const steps = [
    { label: "Account", completed: true },
    { label: "Profile", completed: true },
    { label: "Preferences", completed: false },
    { label: "Review", completed: false },
];
export default function Pattern() {
    const completedSteps = steps.filter((s) => s.completed).length;
    const progressValue = (completedSteps / steps.length) * 100;
    return (_jsxs("div", { className: "mx-auto w-full max-w-xs space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm font-medium", children: "Setup Progress" }), _jsxs("span", { className: "text-muted-foreground text-xs", children: [completedSteps, " of ", steps.length, " steps"] })] }), _jsx(Progress, { value: progressValue }), _jsx("div", { className: "flex flex-col gap-2", children: steps.map((step) => (_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [step.completed ? (_jsx(IconPlaceholder, { lucide: "CircleCheckIcon", tabler: "IconCircleCheck", hugeicons: "CheckmarkCircle01Icon", phosphor: "CheckCircleIcon", remixicon: "RiCheckboxCircleLine", className: "text-success size-4", "aria-hidden": "true" })) : (_jsx(IconPlaceholder, { lucide: "CircleIcon", tabler: "IconCircle", hugeicons: "CircleIcon", phosphor: "CircleIcon", remixicon: "RiCircleLine", className: "text-muted-foreground size-4", "aria-hidden": "true" })), _jsx("span", { className: step.completed ? "text-foreground" : "text-muted-foreground", children: step.label })] }, step.label))) })] }));
}
