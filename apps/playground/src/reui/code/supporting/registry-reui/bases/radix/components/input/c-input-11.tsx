import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx"
import { Input } from "../../../../../../../adapters/controls.tsx"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-demo-date">Date</FieldLabel>
      <Input id="input-demo-date" type="date" />
    </Field>
  )
}
