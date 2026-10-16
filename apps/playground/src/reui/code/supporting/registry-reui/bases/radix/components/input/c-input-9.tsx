import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx"
import { Input } from "../../../../../../../adapters/controls.tsx"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-demo-url">URL</FieldLabel>
      <Input id="input-demo-url" type="url" placeholder="https://example.com" />
    </Field>
  )
}
