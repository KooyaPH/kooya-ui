// Owned correction for the adapted REUI recipe; retain the local adapters.
// Owned responsive correction to the actual attributed REUI recipe.
"use client";

import { ChangeEvent, ChangeEventHandler, useState } from "react";
import type { DropdownNavProps, DropdownProps } from "react-day-picker";

// @ts-expect-error attributed generated REUI module has no declaration file
import { Calendar } from "../../../runtime/source/registry/bases/radix/ui/calendar.jsx";
import { Card, CardContent } from "../../../adapters/layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../adapters/selection";

export default function Pattern() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleCalendarChange = (
    _value: string | number,
    _e: ChangeEventHandler<HTMLSelectElement>,
  ) => {
    const _event = {
      target: {
        value: String(_value),
      },
    } as ChangeEvent<HTMLSelectElement>;
    _e(_event);
  };

  return (
    <Card className="p-0" style={{ width: "fit-content", maxWidth: "100%" }}>
      <CardContent className="p-0">
        <Calendar
          captionLayout="dropdown"
          className="[&_.rdp-day_button[data-selected-single=true]]:bg-[var(--ku-accent)]! [&_.rdp-day_button[data-selected-single=true]]:text-[var(--ku-accent-ink)]! [&_.rdp-day_button[data-selected-single=true]]:border! [&_.rdp-day_button[data-selected-single=true]]:border-[var(--ku-focus)]! [&_.rdp-today:not([data-selected=true])]:bg-[var(--ku-subtle)]! [&_.rdp-today:not([data-selected=true])_.rdp-day_button]:text-[var(--ku-ink)]! [&_.rdp-weekday]:text-[var(--ku-muted)]! [&_.rdp-week>th>span]:text-[var(--ku-muted)]!"
          classNames={{
            month_caption: "mx-0",
          }}
          components={{
            Dropdown: (props: DropdownProps) => {
              return (
                <Select
                  onValueChange={(value) => {
                    if (props.onChange && value !== null) {
                      handleCalendarChange(value, props.onChange);
                    }
                  }}
                  value={String(props.value)}
                >
                  <SelectTrigger
                    aria-label={props["aria-label"]}
                    disabled={props.disabled}
                    style={{ flex: 1, minWidth: 0 }}
                    className="first:grow"
                  >
                    <SelectValue>
                      {
                        props.options?.find(
                          (option) => option.value === props.value,
                        )?.label
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent align="start">
                    {props.options?.map((option) => (
                      <SelectItem
                        disabled={option.disabled}
                        key={option.value}
                        value={String(option.value)}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            },
            DropdownNav: (props: DropdownNavProps) => {
              return (
                <div className="flex w-full items-center gap-2">
                  {props.children}
                </div>
              );
            },
          }}
          defaultMonth={new Date()}
          hideNavigation
          mode="single"
          onSelect={setDate}
          selected={date}
          startMonth={new Date(1980, 6)}
        />
      </CardContent>
    </Card>
  );
}
