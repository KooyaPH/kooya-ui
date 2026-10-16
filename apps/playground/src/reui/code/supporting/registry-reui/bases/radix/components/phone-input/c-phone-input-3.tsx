import { PhoneInput } from "../../reui/phone-input.tsx"

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
