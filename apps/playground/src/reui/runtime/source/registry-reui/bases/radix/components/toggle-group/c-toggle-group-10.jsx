import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ToggleGroup, ToggleGroupItem, } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(ToggleGroup, { type: "single", defaultValue: "light", variant: "outline", children: [_jsxs(ToggleGroupItem, { value: "light", "aria-label": "Light theme", children: [_jsx(IconPlaceholder, { lucide: "SunIcon", tabler: "IconSun", hugeicons: "Sun01Icon", phosphor: "SunIcon", remixicon: "RiSunLine" }), "Light"] }), _jsxs(ToggleGroupItem, { value: "dark", "aria-label": "Dark theme", children: [_jsx(IconPlaceholder, { lucide: "MoonIcon", tabler: "IconMoon", hugeicons: "Moon02Icon", phosphor: "MoonIcon", remixicon: "RiMoonLine" }), "Dark"] }), _jsxs(ToggleGroupItem, { value: "system", "aria-label": "System theme", children: [_jsx(IconPlaceholder, { lucide: "MonitorIcon", tabler: "IconDeviceDesktop", hugeicons: "ComputerIcon", phosphor: "MonitorIcon", remixicon: "RiComputerLine" }), "System"] })] }) }));
}
