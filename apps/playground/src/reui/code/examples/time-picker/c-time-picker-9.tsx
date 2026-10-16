// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  TimePicker,
  TimePickerClear,
  TimePickerColumns,
  TimePickerConfirm,
  TimePickerContent,
  TimePickerFooter,
  TimePickerTrigger,
  TimePickerValue,
} from "../../supporting/registry-reui/bases/radix/reui/time-picker.tsx"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "../../../adapters/layout.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <div className="w-full max-w-xs">
      <Field>
        <FieldLabel id="doors-open-label" htmlFor="doors-open">
          Doors open
        </FieldLabel>
        {/* The zone is a fixed label, not a conversion: the value is the
            venue's wall-clock time. The label and the value name the trigger,
            so the zone joins them as its description. */}
        <TimePicker
          id="doors-open"
          defaultValue="19:30"
          aria-labelledby="doors-open-label"
          aria-describedby="doors-open-zone doors-open-description"
        >
          <TimePickerTrigger>
            <TimePickerValue />
            <span
              id="doors-open-zone"
              className="text-muted-foreground ms-auto"
            >
              Berlin time
            </span>
            {/* Children replace the default value and clock, so the clock is
                added back; `data-icon` keeps the button's end padding. */}
            <span
              data-icon="inline-end"
              aria-hidden="true"
              className="text-muted-foreground flex"
            >
              <IconPlaceholder
                lucide="ClockIcon"
                tabler="IconClock"
                hugeicons="ClockIcon"
                phosphor="ClockIcon"
                remixicon="RiTimeLine"
                aria-hidden="true"
              />
            </span>
          </TimePickerTrigger>
          <TimePickerContent>
            <TimePickerColumns />
            {/* No Now: it would read the viewer's clock, not the venue's. */}
            <TimePickerFooter>
              <TimePickerClear />
              <TimePickerConfirm />
            </TimePickerFooter>
          </TimePickerContent>
        </TimePicker>
        <FieldDescription id="doors-open-description">
          Shown on every ticket in venue time, wherever the buyer is.
        </FieldDescription>
      </Field>
    </div>
  )
}
