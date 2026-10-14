// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { AspectRatio } from "../../supporting/registry/bases/radix/ui/aspect-ratio.tsx"

export default function Pattern() {
  return (
    <div className="w-full max-w-md">
      <AspectRatio
        ratio={16 / 10}
        className="bg-muted rounded-xl overflow-hidden border"
      >
        <img
          src="/reui-assets/images/355afce7afc66d079f8e.jpg"
          alt="16:10"
          width={1000}
          height={800}
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  )
}
