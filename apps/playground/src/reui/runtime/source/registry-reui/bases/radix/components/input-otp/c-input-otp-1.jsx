import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, } from "../../../../../../../adapters/selection.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "simple-otp", children: "Simple OTP" }), _jsxs(InputOTP, { id: "simple-otp", maxLength: 6, children: [_jsxs(InputOTPGroup, { children: [_jsx(InputOTPSlot, { index: 0 }), _jsx(InputOTPSlot, { index: 1 }), _jsx(InputOTPSlot, { index: 2 })] }), _jsx(InputOTPSeparator, {}), _jsxs(InputOTPGroup, { children: [_jsx(InputOTPSlot, { index: 3 }), _jsx(InputOTPSlot, { index: 4 }), _jsx(InputOTPSlot, { index: 5 })] })] })] }) }));
}
