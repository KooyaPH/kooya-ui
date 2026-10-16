// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { ColorPicker } from "../../supporting/registry-reui/bases/radix/reui/color-picker.tsx"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <div className="w-full max-w-xs">
      <Field>
        <FieldLabel id="accent-color-label" htmlFor="accent-color">
          Accent color
        </FieldLabel>
        {/* With no children the picker renders its own trigger and popover.
            `aria-labelledby` keeps the value in the trigger's name, so it
            reads "Accent color #0EA5E9" rather than the label alone. */}
        <ColorPicker
          id="accent-color"
          defaultValue="#0ea5e9"
          aria-labelledby="accent-color-label"
          aria-describedby="accent-color-description"
        />
        <FieldDescription id="accent-color-description">
          Used for links, focus rings and primary buttons.
        </FieldDescription>
      </Field>
    </div>
  )
}
