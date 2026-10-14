// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Kbd, KbdGroup } from "../../supporting/registry/bases/radix/ui/kbd.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
    </div>
  )
}
