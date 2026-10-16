// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Field, FieldLabel } from "../../../adapters/layout.tsx"
import { Textarea } from "../../../adapters/controls.tsx"

export default function Pattern() {
  return (
    <div className="mx-auto w-full max-w-xs">
      <Field className="w-full">
        <FieldLabel htmlFor="textarea-with-label">Your Message</FieldLabel>
        <Textarea
          id="textarea-with-label"
          placeholder="Type your message here…"
          rows={6}
        />
      </Field>
    </div>
  )
}
