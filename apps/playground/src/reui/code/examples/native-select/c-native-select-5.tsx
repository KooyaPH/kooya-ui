// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  NativeSelect,
  NativeSelectOption,
} from "../../supporting/registry/bases/radix/ui/native-select.tsx"

export default function Pattern() {
  return (
    <NativeSelect disabled className="w-full max-w-xs">
      <NativeSelectOption value="">Disabled Select</NativeSelectOption>
      <NativeSelectOption value="1">Option 1</NativeSelectOption>
    </NativeSelect>
  )
}
