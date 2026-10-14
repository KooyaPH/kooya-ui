// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Rating } from "../../../adapters/utility.tsx"

export default function Pattern() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Rating rating={4} size="sm" />
      <Rating rating={4} />
      <Rating rating={4} size="lg" />
    </div>
  )
}
