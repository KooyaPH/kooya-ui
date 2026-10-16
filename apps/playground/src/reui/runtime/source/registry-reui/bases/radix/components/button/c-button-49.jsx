import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx(Button, { variant: "link", asChild: true, children: _jsxs("a", { href: "#", children: [_jsx(IconPlaceholder, { lucide: "ChevronLeftIcon", tabler: "IconChevronLeft", hugeicons: "ArrowLeft01Icon", phosphor: "CaretLeftIcon", remixicon: "RiArrowLeftSLine", "data-icon": "inline-start", "aria-hidden": "true" }), "Go back"] }) }));
}
