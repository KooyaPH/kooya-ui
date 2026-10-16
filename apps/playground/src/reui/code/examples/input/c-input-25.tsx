// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Field, FieldLabel } from "../../../adapters/layout.tsx"
import { Input } from "../../../adapters/controls.tsx"

export default function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="custom-focus">Custom Focus</FieldLabel>
      <Input
        id="custom-focus"
        className="focus-visible:border-emerald-500 focus-visible:ring-emerald-500/50"
        placeholder="Green focus ring"
      />
    </Field>
  )
}
