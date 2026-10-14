// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Field, FieldLabel } from "../../../adapters/layout.tsx"
import { Input } from "../../../adapters/controls.tsx"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-demo-file">File</FieldLabel>
      <Input id="input-demo-file" type="file" />
    </Field>
  )
}
