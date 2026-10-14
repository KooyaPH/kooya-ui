// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "../../supporting/registry/bases/radix/ui/native-select.tsx"

export default function Pattern() {
  return (
    <NativeSelect className="w-full max-w-xs">
      <NativeSelectOption value="">Select a food</NativeSelectOption>
      <NativeSelectOptGroup label="Fruits">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
        <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Vegetables">
        <NativeSelectOption value="carrot">Carrot</NativeSelectOption>
        <NativeSelectOption value="broccoli">Broccoli</NativeSelectOption>
        <NativeSelectOption value="spinach">Spinach</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  )
}
