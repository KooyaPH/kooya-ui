// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { PhoneInput } from "../../supporting/registry-reui/bases/radix/reui/phone-input.tsx"

export default function Pattern() {
  return (
    <PhoneInput
      variant="lg"
      placeholder="Enter phone number"
      defaultCountry="US"
      value="+12125551234"
    />
  )
}
