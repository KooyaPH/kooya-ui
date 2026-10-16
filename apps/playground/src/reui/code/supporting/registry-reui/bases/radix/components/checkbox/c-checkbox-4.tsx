import { Checkbox } from "../../../../../../../adapters/controls.tsx"
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <Field orientation="horizontal" className="w-auto">
      <Checkbox id="indeterminate" checked="indeterminate" />
      <FieldLabel htmlFor="indeterminate">Indeterminate state</FieldLabel>
    </Field>
  )
}
