// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { AspectRatio } from "../../supporting/registry/bases/radix/ui/aspect-ratio.tsx"

export default function Pattern() {
  return (
    <div className="w-full max-w-xs">
      <AspectRatio
        ratio={9 / 16}
        className="bg-muted rounded-xl overflow-hidden border"
      >
        <img
          src="/reui-assets/images/e18fa64c931e89f48032.jpg"
          alt="9:16"
          width={1000}
          height={800}
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  )
}
