"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Spinner } from "../../../../../../../adapters/controls.tsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const interval = setInterval(() => setLoading((prev) => !prev), 2000); // Toggle loading state every 3 seconds
        return () => clearInterval(interval);
    }, []);
    return (_jsxs("div", { className: "relative", children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "/reui-assets/images/0a10b9bc070f3bdf606f.jpg", alt: "@shadcn" }), _jsx(AvatarFallback, { children: "CN" })] }), loading && (_jsx("div", { className: "bg-background/60 absolute inset-0 flex items-center justify-center rounded-full", children: _jsx(Spinner, { className: "text-primary" }) }))] }));
}
