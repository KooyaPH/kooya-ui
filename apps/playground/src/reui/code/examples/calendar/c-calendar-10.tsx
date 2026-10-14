// Owned correction for the adapted REUI recipe; retain the local adapters.
// Owned responsive correction to the actual attributed REUI recipe.
"use client";

import { useState } from "react";
import type { WeekNumberProps } from "react-day-picker";

// @ts-expect-error attributed generated REUI module has no declaration file
import { Calendar } from "../../../runtime/source/registry/bases/radix/ui/calendar.jsx";
import { Card, CardContent } from "../../../adapters/layout";

export default function Pattern() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="p-0" style={{ width: "fit-content", maxWidth: "100%" }}>
      <CardContent className="p-0">
        <Calendar
          className="max-[480px]:[&[data-slot=calendar]_.rdp-day]:size-8! max-[480px]:[&[data-slot=calendar]_.rdp-day_button]:size-8! max-[480px]:[&[data-slot=calendar]_.rdp-month_grid]:w-64! max-[480px]:[&[data-slot=calendar]_.rdp-weekdays]:w-64! [&_.rdp-day_button[data-selected-single=true]]:bg-[var(--ku-accent)]! [&_.rdp-day_button[data-selected-single=true]]:text-[var(--ku-accent-ink)]! [&_.rdp-day_button[data-selected-single=true]]:border! [&_.rdp-day_button[data-selected-single=true]]:border-[var(--ku-focus)]! [&_.rdp-today:not([data-selected=true])]:bg-[var(--ku-subtle)]! [&_.rdp-today:not([data-selected=true])_.rdp-day_button]:text-[var(--ku-ink)]! [&_.rdp-weekday]:text-[var(--ku-muted)]! [&_.rdp-week>th>span]:text-[var(--ku-muted)]!"
          components={{
            WeekNumber: ({ week, ...props }: WeekNumberProps) => {
              return (
                <th {...props}>
                  <span className="text-muted-foreground inline-flex size-8 items-center justify-center text-sm font-normal">
                    {week.weekNumber}
                  </span>
                </th>
              );
            },
          }}
          fixedWeeks
          mode="single"
          onSelect={setDate}
          selected={date}
          showWeekNumber
        />
      </CardContent>
    </Card>
  );
}
