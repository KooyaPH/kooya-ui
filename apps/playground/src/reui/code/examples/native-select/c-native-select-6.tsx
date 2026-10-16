// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  NativeSelect,
  NativeSelectOption,
} from "../../supporting/registry/bases/radix/ui/native-select.tsx"

export default function Pattern() {
  return (
    <NativeSelect aria-invalid="true" className="w-full max-w-xs">
      <NativeSelectOption value="">Invalid Select</NativeSelectOption>
      <NativeSelectOption value="1">Option 1</NativeSelectOption>
    </NativeSelect>
  )
}
