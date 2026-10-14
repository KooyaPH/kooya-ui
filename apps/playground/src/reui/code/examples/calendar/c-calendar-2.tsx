// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client"

import { useState } from "react"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"

import { Calendar } from "../../supporting/registry/bases/radix/ui/calendar.tsx"
import { Card, CardContent } from "../../../adapters/layout.tsx"

export default function Pattern() {
  const today = new Date()
  const [date, setDate] = useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 5),
  })

  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <Calendar mode="range" onSelect={setDate} selected={date} />
      </CardContent>
    </Card>
  )
}
