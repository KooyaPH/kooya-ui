// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Checkbox } from "../../../adapters/controls.tsx"
import { Field } from "../../../adapters/layout.tsx"
import { Label } from "../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <Field orientation="horizontal" className="mx-auto w-auto">
      <Checkbox id="label-demo-terms" />
      <Label htmlFor="label-demo-terms">Accept terms and conditions</Label>
    </Field>
  )
}
