// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client"

import { useEffect, useState } from "react"

import { Spinner } from "../../../adapters/controls.tsx"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"

export default function Pattern() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => setLoading((prev) => !prev), 2000) // Toggle loading state every 3 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <Avatar>
        <AvatarImage src="/reui-assets/images/0a10b9bc070f3bdf606f.jpg" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {loading && (
        <div className="bg-background/60 absolute inset-0 flex items-center justify-center rounded-full">
          <Spinner className="text-primary" />
        </div>
      )}
    </div>
  )
}
