import { AspectRatio } from "../../../../../registry/bases/radix/ui/aspect-ratio.tsx"

export default function Pattern() {
  return (
    <div className="w-full max-w-md">
      <AspectRatio
        ratio={4 / 3}
        className="bg-muted rounded-xl overflow-hidden border"
      >
        <img
          src="/reui-assets/images/afb744cd7d1af1b5c620.jpg"
          alt="4:3"
          width={1000}
          height={800}
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  )
}
