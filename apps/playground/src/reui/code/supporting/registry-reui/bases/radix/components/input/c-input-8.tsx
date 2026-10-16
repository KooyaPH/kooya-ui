import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx"
import { Input } from "../../../../../../../adapters/controls.tsx"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-demo-tel">Phone</FieldLabel>
      <Input id="input-demo-tel" type="tel" placeholder="+1 (555) 123-4567" />
    </Field>
  )
}
