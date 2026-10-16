"use client"

import { useState } from "react"
import {
  ColorPicker,
  ColorPickerPanel,
} from "../../reui/color-picker.tsx"

import { Card, CardContent } from "../../../../../../../adapters/layout.tsx"

const SWATCHES = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
]

export default function Pattern() {
  const [value, setValue] = useState<string | null>("#6366f1")

  return (
    <Card className="w-full max-w-96">
      <CardContent>
        {/* `alpha` adds the opacity slider and field; `swatches` adds the
            presets row under the default panel. */}
        <ColorPicker
          value={value}
          onValueChange={setValue}
          alpha
          swatches={SWATCHES}
          aria-label="Fill color"
        >
          <ColorPickerPanel />
        </ColorPicker>
      </CardContent>
    </Card>
  )
}
