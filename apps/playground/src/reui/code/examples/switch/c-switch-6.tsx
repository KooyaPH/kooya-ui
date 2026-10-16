// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Card } from "../../../adapters/layout.tsx"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "../../../adapters/layout.tsx"
import { Separator } from "../../../adapters/layout.tsx"
import { Switch } from "../../../adapters/controls.tsx"

export default function Pattern() {
  return (
    <Card className="w-full max-w-xs p-0">
      <FieldGroup className="gap-0">
        <Field>
          <FieldLabel className="justify-between px-4 py-3">
            <FieldTitle>Push notifications</FieldTitle>
            <Switch defaultChecked />
          </FieldLabel>
        </Field>
        <Separator />
        <Field>
          <FieldLabel className="justify-between px-4 py-3">
            <FieldTitle>Email notifications</FieldTitle>
            <Switch />
          </FieldLabel>
        </Field>
        <Separator />
        <Field>
          <FieldLabel className="justify-between px-4 py-3">
            <FieldTitle>SMS notifications</FieldTitle>
            <Switch />
          </FieldLabel>
        </Field>
      </FieldGroup>
    </Card>
  )
}
