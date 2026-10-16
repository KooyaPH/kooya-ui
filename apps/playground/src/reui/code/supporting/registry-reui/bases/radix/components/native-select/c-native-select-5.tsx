import {
  NativeSelect,
  NativeSelectOption,
} from "../../../../../registry/bases/radix/ui/native-select.tsx"

export default function Pattern() {
  return (
    <NativeSelect disabled className="w-full max-w-xs">
      <NativeSelectOption value="">Disabled Select</NativeSelectOption>
      <NativeSelectOption value="1">Option 1</NativeSelectOption>
    </NativeSelect>
  )
}
