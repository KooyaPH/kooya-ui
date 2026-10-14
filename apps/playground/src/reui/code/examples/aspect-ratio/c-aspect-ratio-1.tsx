// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { AspectRatio } from "../../supporting/registry/bases/radix/ui/aspect-ratio.tsx"

export default function Pattern() {
  return (
    <div className="w-full max-w-md">
      <AspectRatio
        ratio={16 / 9}
        className="bg-muted rounded-xl overflow-hidden border"
      >
        <img
          src="/reui-assets/images/b7c3c9f06c829166588e.jpg"
          alt="16:9"
          width={1000}
          height={800}
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  )
}
