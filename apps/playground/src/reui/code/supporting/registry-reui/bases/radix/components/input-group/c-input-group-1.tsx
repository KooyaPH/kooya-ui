import { Field } from "../../../../../../../adapters/layout.tsx"
import {
  InputGroup,
  InputGroupInput,
} from "../../../../../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
      </InputGroup>
    </Field>
  )
}
