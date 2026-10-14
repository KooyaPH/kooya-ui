// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { TimePicker } from "../../supporting/registry-reui/bases/radix/reui/time-picker.tsx"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <div className="w-full max-w-xs">
      <Field>
        <FieldLabel id="standup-time-label" htmlFor="standup-time">
          Standup time
        </FieldLabel>
        {/* With no children the picker renders its own trigger and popover.
            `aria-labelledby` keeps the value in the trigger's name, so it
            reads "Standup time 09:30" rather than the label alone. */}
        <TimePicker
          id="standup-time"
          aria-labelledby="standup-time-label"
          aria-describedby="standup-time-description"
        />
        <FieldDescription id="standup-time-description">
          Reminders go out 10 minutes before.
        </FieldDescription>
      </Field>
    </div>
  )
}
