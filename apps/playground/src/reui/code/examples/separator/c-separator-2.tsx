// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Separator } from "../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex h-5 items-center gap-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  )
}
