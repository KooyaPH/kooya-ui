import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Field, FieldDescription, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
import { InputOTP, InputOTPGroup, InputOTPSlot, } from "../../../../../../../adapters/selection.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "four-digits", children: "4-Digit PIN" }), _jsx(FieldDescription, { children: "Common pattern for PIN codes." }), _jsx(InputOTP, { id: "four-digits", maxLength: 4, pattern: REGEXP_ONLY_DIGITS, children: _jsxs(InputOTPGroup, { children: [_jsx(InputOTPSlot, { index: 0 }), _jsx(InputOTPSlot, { index: 1 }), _jsx(InputOTPSlot, { index: 2 }), _jsx(InputOTPSlot, { index: 3 })] }) })] }) }));
}
