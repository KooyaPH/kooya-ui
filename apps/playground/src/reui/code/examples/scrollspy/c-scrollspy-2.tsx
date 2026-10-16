// Owned correction for the adapted REUI recipe; retain the local adapters.
// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client"

import { useRef, useState } from "react"
// @ts-expect-error attributed generated REUI scrollspy module has no declaration file
import { Scrollspy } from "../../../runtime/source/registry-reui/bases/radix/reui/scrollspy.jsx"

import { Button } from "../../../adapters/controls"
// @ts-expect-error attributed generated REUI scroll-area module has no declaration file
import { ScrollArea } from "../../../runtime/source/registry/bases/radix/ui/scroll-area.jsx"

export default function Pattern() {
  const parentRef = useRef<HTMLDivElement>(null)
  const nav = [
    {
      id: "section-6",
      label: "Section 1",
    },
    {
      id: "section-7",
      label: "Section 2",
    },
    {
      id: "section-8",
      label: "Section 3",
    },
    {
      id: "section-9",
      label: "Section 4",
    },
    {
      id: "section-10",
      label: "Section 5",
    },
  ]

  const [active, setActive] = useState(nav[0]?.id ?? "")

  return (
    <div className="w-full space-y-5">
      <div role="navigation" aria-label="Section navigation" className="flex w-full min-w-0 gap-2">
        <Scrollspy offset={50} targetRef={parentRef} onUpdate={setActive} className="flex max-w-full min-w-0 flex-wrap gap-2.5">
          {nav.map((item) => (
            <Button
              key={item.id}
              variant="outline"
              data-scrollspy-anchor={item.id}
              aria-current={active === item.id ? "location" : undefined}
              style={{ maxWidth: "100%", minHeight: 44, height: "auto", whiteSpace: "normal", overflowWrap: "anywhere", flexShrink: 0 }}
              className={
                "data-[active=true]:bg-[var(--ku-accent)]! data-[active=true]:text-[var(--ku-accent-ink)]! data-[active=true]:border-[var(--ku-focus)]!"
              }
            >
              {item.label}
            </Button>
          ))}
        </Scrollspy>
      </div>
      <div className="w-full" ref={parentRef}>
        <ScrollArea className="h-[400px] grow">
          <div className="space-y-8">
            {nav.map((item) => (
              <div key={item.id} id={item.id} className="space-y-2.5">
                <h3 className="text-foreground text-base" style={{ color: "var(--ku-ink)" }}>{item.label}</h3>
                <div className="bg-muted rounded-2xl h-[350px]" style={{ background: "var(--ku-subtle)" }}></div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
