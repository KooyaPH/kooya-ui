// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Kbd } from "../../supporting/registry/bases/radix/ui/kbd.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Kbd>Ctrl</Kbd>
      <Kbd>⌘K</Kbd>
      <Kbd>Ctrl + B</Kbd>
    </div>
  )
}
