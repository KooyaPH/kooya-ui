// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { PhoneInput } from "../../supporting/registry-reui/bases/radix/reui/phone-input.tsx"

export default function Pattern() {
  return (
    <PhoneInput
      variant="sm"
      placeholder="Enter phone number"
      defaultCountry="NL"
      value="+31612345678"
    />
  )
}
