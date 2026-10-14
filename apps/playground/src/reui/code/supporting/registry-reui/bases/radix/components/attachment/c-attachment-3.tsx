"use client"

import { useState } from "react"

import {
  Attachment,
  AttachmentContent,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "../../../../../registry/bases/radix/ui/attachment.tsx"

type Shot = {
  id: string
  name: string
  dimensions: string
  src: string
  alt: string
}

// Thumbnails are requested at the card width and twice the density, so the
// strip never pulls a full size screenshot down to paint a 120px square.
const SHOTS: Shot[] = [
  {
    id: "gradient",
    name: "brand-gradient.png",
    dimensions: "2400 x 1600",
    src: "/reui-assets/images/b5a8406d913545dc0cee.jpg",
    alt: "Purple and orange gradient artwork",
  },
  {
    id: "mesh",
    name: "mesh-backdrop.png",
    dimensions: "1800 x 1200",
    src: "/reui-assets/images/1350f821433b98ad1528.jpg",
    alt: "Blue and violet mesh render",
  },
  {
    id: "spectrum",
    name: "spectrum-wash.jpg",
    dimensions: "3000 x 2000",
    src: "/reui-assets/images/32316c4a6ca2376bd187.jpg",
    alt: "Soft rainbow spectrum wash",
  },
  {
    id: "waves",
    name: "wave-pattern.png",
    dimensions: "1200 x 1200",
    src: "/reui-assets/images/4d3ac3f3881ec891b958.jpg",
    alt: "Magenta and violet wave pattern",
  },
  {
    id: "ink",
    name: "ink-render.png",
    dimensions: "2000 x 1400",
    src: "/reui-assets/images/76562ec89257456438c3.jpg",
    alt: "Colourful ink dispersing in water",
  },
]

export default function Pattern() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Boots with nothing chosen so the first click is the thing on show, and
  // the selected shot is looked up during render rather than duplicated.
  const selected = SHOTS.find((shot) => shot.id === selectedId) ?? null

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-2">
      <AttachmentGroup role="group" aria-label="Screenshots in this thread">
        {SHOTS.map((shot) => (
          /*
           * A vertical card takes its own fixed width, so a w-full here would
           * collapse the strip into one column and kill the snap scrolling.
           */
          <Attachment key={shot.id} orientation="vertical">
            <AttachmentMedia variant="image">
              {/*
               * No classes on the image: variant="image" already crops every
               * child img square and covers the frame. The alt describes the
               * picture, and the title below it names the file.
               */}
              <img
                src={shot.src}
                alt={shot.alt}
                width={120}
                height={120}
                loading="lazy"
                decoding="async"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{shot.name}</AttachmentTitle>
            </AttachmentContent>
            {/*
             * The trigger reports aria-pressed because it selects rather than
             * navigates, and it renders below the actions slot in the stacking
             * order, so a card can carry a full card select and its own buttons.
             */}
            <AttachmentTrigger
              type="button"
              aria-label={`Preview ${shot.name}`}
              aria-pressed={selectedId === shot.id}
              onClick={() => setSelectedId(shot.id)}
            />
          </Attachment>
        ))}
      </AttachmentGroup>
      <p className="text-muted-foreground text-xs" aria-live="polite">
        {selected ? (
          <>
            {selected.name}
            <span
              aria-hidden="true"
              className="bg-muted-foreground/40 mx-1.5 inline-block size-1 rounded-full align-middle"
            />
            {selected.dimensions}
          </>
        ) : (
          "Select a shot to see its details."
        )}
      </p>
    </div>
  )
}
