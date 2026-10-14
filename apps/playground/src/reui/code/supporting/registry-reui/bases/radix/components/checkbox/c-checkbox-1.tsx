import { Checkbox } from "../../../../../../../adapters/controls.tsx"
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <Field orientation="horizontal" className="w-auto">
      <Checkbox id="terms" />
      <FieldLabel htmlFor="terms">Basic checkbox</FieldLabel>
    </Field>
  )
}
