import { AspectRatio } from "../../../../../registry/bases/radix/ui/aspect-ratio.tsx"

export default function Pattern() {
  return (
    <div className="w-full max-w-xs">
      <AspectRatio
        ratio={1 / 1}
        className="bg-muted rounded-xl overflow-hidden border"
      >
        <img
          src="/reui-assets/images/2f95edd007f2710283bc.jpg"
          alt="1:1"
          width={1000}
          height={800}
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  )
}
