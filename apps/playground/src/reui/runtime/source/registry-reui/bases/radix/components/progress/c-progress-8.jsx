"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Progress } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    const [progress, setProgress] = useState(45);
    useEffect(() => {
        const timer = setTimeout(() => setProgress(75), 500);
        return () => clearTimeout(timer);
    }, []);
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-xs flex-col gap-6", children: [_jsx(Progress, { value: progress, className: "**:data-[slot=progress-indicator]:bg-green-500" }), _jsx(Progress, { value: progress, className: "**:data-[slot=progress-indicator]:bg-yellow-500" }), _jsx(Progress, { value: progress, className: "**:data-[slot=progress-indicator]:bg-fuchsia-500" }), _jsx(Progress, { value: progress, className: "**:data-[slot=progress-indicator]:bg-indigo-500" }), _jsx(Progress, { value: progress, className: "**:data-[slot=progress-indicator]:bg-violet-500" })] }));
}
