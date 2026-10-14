// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client"

import { useState } from "react"

import { Calendar } from "../../supporting/registry/bases/radix/ui/calendar.tsx"
import { Card, CardContent } from "../../../adapters/layout.tsx"

export default function Pattern() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <Calendar
          mode="single"
          numberOfMonths={2}
          onSelect={setDate}
          selected={date}
        />
      </CardContent>
    </Card>
  )
}
