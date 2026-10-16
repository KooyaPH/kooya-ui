// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client"

import { useState } from "react"

import { Field } from "../../../adapters/layout.tsx"
import { Label } from "../../../adapters/layout.tsx"
import { Textarea } from "../../../adapters/controls.tsx"

export default function Pattern() {
  const [length, setLength] = useState(0)

  return (
    <Field className="w-full max-w-xs">
      <Label htmlFor="label-counter" className="justify-between">
        Bio
        <span className="text-muted-foreground">{length}/200</span>
      </Label>
      <Textarea
        id="label-counter"
        placeholder="Tell us about yourself…"
        maxLength={200}
        onChange={(e) => setLength(e.target.value.length)}
      />
    </Field>
  )
}
