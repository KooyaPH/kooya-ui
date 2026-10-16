// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client"

import { useState } from "react"

import { Toggle } from "../../../adapters/selection.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

export default function Pattern() {
  const [muted, setMuted] = useState(false)

  return (
    <div className="flex items-center justify-center">
      <Toggle
        size="lg"
        variant="outline"
        aria-label="Toggle mute"
        pressed={muted}
        onPressedChange={setMuted}
      >
        {muted ? (
          <IconPlaceholder
            lucide="VolumeOffIcon"
            tabler="IconVolumeOff"
            hugeicons="VolumeOffIcon"
            phosphor="SpeakerSlashIcon"
            remixicon="RiVolumeOffVibrateLine"
          />
        ) : (
          <IconPlaceholder
            lucide="Volume2Icon"
            tabler="IconVolume"
            hugeicons="VolumeHighIcon"
            phosphor="SpeakerHighIcon"
            remixicon="RiVolumeUpLine"
          />
        )}
        {muted ? "Muted" : "Sound"}
      </Toggle>
    </div>
  )
}
