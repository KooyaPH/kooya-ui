import { Checkbox } from "../../../../../../../adapters/controls.tsx"
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <Field orientation="horizontal" className="w-auto" data-invalid>
      <Checkbox id="invalid" aria-invalid />
      <FieldLabel htmlFor="invalid">Invalid checkbox</FieldLabel>
    </Field>
  )
}
