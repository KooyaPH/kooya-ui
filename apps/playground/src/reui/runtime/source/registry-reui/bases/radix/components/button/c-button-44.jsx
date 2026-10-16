"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Spinner } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const [status, setStatus] = useState("idle");
    useEffect(() => {
        if (status !== "success")
            return;
        const timer = setTimeout(() => setStatus("idle"), 2000);
        return () => clearTimeout(timer);
    }, [status]);
    return (_jsx(Button, { onClick: () => {
            if (status !== "idle")
                return;
            setStatus("loading");
            setTimeout(() => setStatus("success"), 900);
        }, disabled: status === "loading", "aria-busy": status === "loading", "aria-live": "polite", className: "min-w-32", children: status === "loading" ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { "aria-hidden": "true" }), "Saving\u2026"] })) : status === "success" ? (_jsxs(_Fragment, { children: [_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", "aria-hidden": "true" }), "Saved"] })) : ("Save changes") }));
}
