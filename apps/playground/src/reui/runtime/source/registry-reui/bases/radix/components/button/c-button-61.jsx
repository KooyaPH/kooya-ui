"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const [theme, setTheme] = useState("light");
    return (_jsxs(Button, { variant: "outline", size: "icon", onClick: () => setTheme(theme === "light" ? "dark" : "light"), "aria-label": `Switch to ${theme === "dark" ? "light" : "dark"} mode`, children: [_jsx(IconPlaceholder, { lucide: "SunIcon", tabler: "IconSun", hugeicons: "Sun01Icon", phosphor: "SunIcon", remixicon: "RiSunLine", className: cn("size-4 transition-all duration-300", theme === "dark"
                    ? "scale-0 -rotate-90 opacity-0"
                    : "scale-100 rotate-0 opacity-100") }), _jsx(IconPlaceholder, { lucide: "MoonIcon", tabler: "IconMoon", hugeicons: "Moon02Icon", phosphor: "MoonIcon", remixicon: "RiMoonLine", className: cn("absolute size-4 transition-all duration-300", theme === "dark"
                    ? "scale-100 rotate-0 opacity-100"
                    : "scale-0 rotate-90 opacity-0") }), _jsx("span", { className: "sr-only", children: "Toggle theme" })] }));
}
