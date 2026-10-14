import { Field, FieldError, FieldLabel } from "../../../../../../../adapters/layout.tsx"
import { Input } from "../../../../../../../adapters/controls.tsx"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-demo-error">Email</FieldLabel>
      <Input
        id="input-demo-error"
        type="email"
        placeholder="name@example.com"
        aria-invalid="true"
      />
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  )
}
