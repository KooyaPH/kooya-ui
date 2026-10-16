import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../../../../../adapters/layout.tsx"
import { Kbd } from "../../../../../registry/bases/radix/ui/kbd.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <InputGroup className="max-w-xs">
        <InputGroupInput placeholder="Search…" />
        <InputGroupAddon>
          <Kbd>Space</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
