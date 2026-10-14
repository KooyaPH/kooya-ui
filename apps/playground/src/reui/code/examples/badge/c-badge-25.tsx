// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Badge } from "../../../adapters/structured.tsx"

export default function Pattern() {
  return (
    <Badge variant="outline">
      <img
        src="/reui-assets/images/fc1500f50b187595f88d.svg"
        alt="US"
        width={18}
        height={18}
        className="rounded-xs"
      />
      USA
    </Badge>
  )
}
