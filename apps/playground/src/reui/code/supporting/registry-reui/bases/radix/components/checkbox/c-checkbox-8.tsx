import { Checkbox } from "../../../../../../../adapters/controls.tsx"
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <Field className="w-auto">
      <FieldLabel>Notification Settings</FieldLabel>
      <Field orientation="horizontal">
        <Checkbox id="group-1" defaultChecked />
        <FieldLabel htmlFor="group-1">Email notifications</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="group-2" />
        <FieldLabel htmlFor="group-2">SMS notifications</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="group-3" defaultChecked />
        <FieldLabel htmlFor="group-3">Push notifications</FieldLabel>
      </Field>
    </Field>
  )
}
