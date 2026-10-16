import { Field, FieldError } from "../../../../../../../adapters/layout.tsx"
import { Input } from "../../../../../../../adapters/controls.tsx"
import { Label } from "../../../../../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <Field className="w-full max-w-xs" data-invalid="true">
      <Label htmlFor="label-error">Email</Label>
      <Input
        id="label-error"
        type="email"
        defaultValue="invalid-email"
        aria-invalid="true"
      />
      <FieldError>Please enter a valid email address</FieldError>
    </Field>
  )
}
