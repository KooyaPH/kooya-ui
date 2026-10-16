import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx"
import { Textarea } from "../../../../../../../adapters/controls.tsx"

export default function Pattern() {
  return (
    <div className="mx-auto w-full max-w-xs">
      <Field className="w-full">
        <FieldLabel htmlFor="textarea-disabled">Message (Disabled)</FieldLabel>
        <Textarea
          id="textarea-disabled"
          placeholder="Type your message here…"
          disabled
        />
      </Field>
    </div>
  )
}
