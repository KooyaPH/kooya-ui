import { jsx as _jsx } from "react/jsx-runtime";
import { PhoneInput } from "../../reui/phone-input.jsx";
export default function Pattern() {
    return (_jsx(PhoneInput, { variant: "lg", placeholder: "Enter phone number", defaultCountry: "US", value: "+12125551234" }));
}
