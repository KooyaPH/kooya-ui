import { jsx as _jsx } from "react/jsx-runtime";
import { PhoneInput } from "../../reui/phone-input.jsx";
export default function Pattern() {
    return (_jsx(PhoneInput, { readOnly: true, value: "+12125551234", placeholder: "Enter phone number" }));
}
