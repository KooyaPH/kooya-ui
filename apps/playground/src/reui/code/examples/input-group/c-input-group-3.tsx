// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Field } from "../../../adapters/layout.tsx"
import {
  InputGroup,
  InputGroupInput,
} from "../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <Field className="max-w-xs" data-invalid="true">
      <InputGroup>
        <InputGroupInput placeholder="Invalid field" aria-invalid="true" />
      </InputGroup>
    </Field>
  )
}
