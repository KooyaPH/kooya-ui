// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { AspectRatio } from "../../supporting/registry/bases/radix/ui/aspect-ratio.tsx"

export default function Pattern() {
  return (
    <div className="w-full max-w-xs">
      <AspectRatio
        ratio={4 / 5}
        className="bg-muted rounded-xl overflow-hidden border"
      >
        <img
          src="/reui-assets/images/e143a8adf2e1915a25e3.jpg"
          alt="4:5"
          width={1000}
          height={800}
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  )
}
