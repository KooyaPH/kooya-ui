import { jsx as _jsx } from "react/jsx-runtime";
import { PhoneInput } from "../../reui/phone-input.jsx";
export default function Pattern() {
    return (_jsx(PhoneInput, { variant: "sm", placeholder: "Enter phone number", defaultCountry: "NL", value: "+31612345678" }));
}
