// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Field } from "../../../adapters/layout.tsx"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" />
      </InputGroup>
    </Field>
  )
}
