// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Checkbox } from "../../../adapters/controls.tsx"
import { Field, FieldLabel } from "../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <Field orientation="horizontal" data-disabled className="w-auto">
      <Checkbox id="disabled-2" disabled defaultChecked />
      <FieldLabel htmlFor="disabled-2">Disabled checkbox</FieldLabel>
    </Field>
  )
}
