// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client"

import { useState } from "react"
import {
  TimePicker,
  TimePickerPanel,
} from "../../supporting/registry-reui/bases/radix/reui/time-picker.tsx"

import { Card } from "../../../adapters/layout.tsx"

export default function Pattern() {
  /* `HH:mm` in 24-hour time, or `null` once Clear empties it. Preselected
     so each column opens centered on its selected row. */
  const [value, setValue] = useState<string | null>("14:30")

  return (
    <div className="flex flex-col items-center gap-3">
      {/* `py-0` lets the panel sit flush, so it reads like the popover. */}
      <Card className="w-fit py-0">
        <TimePicker
          value={value}
          onValueChange={setValue}
          aria-label="Meeting time"
        >
          <TimePickerPanel />
        </TimePicker>
      </Card>
      <p role="status" className="text-muted-foreground text-sm">
        {value ? `Meeting at ${value}` : "No meeting time set"}
      </p>
    </div>
  )
}
