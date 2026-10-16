// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  NativeSelect,
  NativeSelectOption,
} from "../../supporting/registry/bases/radix/ui/native-select.tsx"

export default function Pattern() {
  return (
    <NativeSelect size="sm" className="w-full max-w-xs">
      <NativeSelectOption value="">Small Select</NativeSelectOption>
      <NativeSelectOption value="1">Option 1</NativeSelectOption>
      <NativeSelectOption value="2">Option 2</NativeSelectOption>
    </NativeSelect>
  )
}
