// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client"

import { useEffect, useState } from "react"

import { Button } from "../../../adapters/controls.tsx"
import { Spinner } from "../../../adapters/controls.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

type Status = "idle" | "loading" | "success"

export default function Pattern() {
  const [status, setStatus] = useState<Status>("idle")

  useEffect(() => {
    if (status !== "success") return

    const timer = setTimeout(() => setStatus("idle"), 2000)
    return () => clearTimeout(timer)
  }, [status])

  return (
    <Button
      onClick={() => {
        if (status !== "idle") return

        setStatus("loading")
        setTimeout(() => setStatus("success"), 900)
      }}
      disabled={status === "loading"}
      aria-busy={status === "loading"}
      aria-live="polite"
      className="min-w-32"
    >
      {status === "loading" ? (
        <>
          <Spinner aria-hidden="true" />
          Saving…
        </>
      ) : status === "success" ? (
        <>
          <IconPlaceholder
            lucide="CheckIcon"
            tabler="IconCheck"
            hugeicons="Tick02Icon"
            phosphor="CheckIcon"
            remixicon="RiCheckLine"
            aria-hidden="true"
          />
          Saved
        </>
      ) : (
        "Save changes"
      )}
    </Button>
  )
}
