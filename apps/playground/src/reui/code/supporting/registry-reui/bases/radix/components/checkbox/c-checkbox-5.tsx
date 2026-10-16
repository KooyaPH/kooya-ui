import { Checkbox } from "../../../../../../../adapters/controls.tsx"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "../../../../../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <Field orientation="horizontal" className="w-auto max-w-xs">
      <Checkbox id="terms-2" defaultChecked />
      <FieldContent>
        <FieldLabel htmlFor="terms-2">Accept terms and conditions</FieldLabel>
        <FieldDescription>
          This checkbox is used to accept the terms and conditions.
        </FieldDescription>
      </FieldContent>
    </Field>
  )
}
