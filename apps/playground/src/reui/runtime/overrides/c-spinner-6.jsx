import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Button } from "../../adapters/controls";
import { Spinner } from "../../adapters/controls";
export default function Pattern() {
    return (_jsxs("div", { className: "flex max-w-full flex-wrap items-center justify-center gap-3 [&_button]:shrink-0", children: [_jsxs(Button, { disabled: true, children: [_jsx(Spinner, {}), "Saving..."] }), _jsxs(Button, { variant: "outline", disabled: true, children: [_jsx(Spinner, {}), "Loading"] }), _jsxs(Button, { variant: "secondary", disabled: true, children: [_jsx(Spinner, {}), "Processing"] })] }));
}
