import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Field, FieldDescription, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, } from "../../../../../../../adapters/selection.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "alphanumeric", children: "Alphanumeric OTP" }), _jsx(FieldDescription, { children: "Accepts both letters and numbers." }), _jsxs(InputOTP, { id: "alphanumeric", maxLength: 6, pattern: REGEXP_ONLY_DIGITS_AND_CHARS, children: [_jsxs(InputOTPGroup, { children: [_jsx(InputOTPSlot, { index: 0 }), _jsx(InputOTPSlot, { index: 1 }), _jsx(InputOTPSlot, { index: 2 })] }), _jsx(InputOTPSeparator, {}), _jsxs(InputOTPGroup, { children: [_jsx(InputOTPSlot, { index: 3 }), _jsx(InputOTPSlot, { index: 4 }), _jsx(InputOTPSlot, { index: 5 })] })] })] }) }));
}
