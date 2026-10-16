// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Field } from "../../../adapters/layout.tsx"
import {
  InputGroup,
  InputGroupInput,
} from "../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <Field className="max-w-xs" data-disabled="true">
      <InputGroup>
        <InputGroupInput placeholder="Disabled field" disabled />
      </InputGroup>
    </Field>
  )
}
