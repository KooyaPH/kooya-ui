// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Field, FieldLabel } from "../../../adapters/layout.tsx"
import { Switch } from "../../../adapters/controls.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <Field orientation="horizontal">
        <Switch id="switch-basic" />
        <FieldLabel htmlFor="switch-basic">Airplane Mode</FieldLabel>
      </Field>
    </div>
  )
}
