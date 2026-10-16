import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertDescription, AlertTitle, } from "../../reui/alert.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(Alert, { variant: "success", children: [_jsx(IconPlaceholder, { lucide: "CircleCheckIcon", tabler: "IconCircleCheck", hugeicons: "CheckmarkCircle01Icon", phosphor: "CheckCircleIcon", remixicon: "RiCheckboxCircleLine" }), _jsx(AlertTitle, { children: "Success! All good" }), _jsx(AlertDescription, { children: "Everything is working as expected. You can continue with your task." })] }));
}
