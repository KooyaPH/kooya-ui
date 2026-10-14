import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { InputOTP, InputOTPGroup, InputOTPSlot, } from "../../../../../../../adapters/selection.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "digits-only", children: "Digits Only" }), _jsx(InputOTP, { id: "digits-only", maxLength: 6, pattern: REGEXP_ONLY_DIGITS, children: _jsxs(InputOTPGroup, { children: [_jsx(InputOTPSlot, { index: 0 }), _jsx(InputOTPSlot, { index: 1 }), _jsx(InputOTPSlot, { index: 2 }), _jsx(InputOTPSlot, { index: 3 }), _jsx(InputOTPSlot, { index: 4 }), _jsx(InputOTPSlot, { index: 5 })] }) })] }) }));
}
