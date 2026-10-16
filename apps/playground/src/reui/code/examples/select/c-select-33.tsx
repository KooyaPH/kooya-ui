// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Field } from "../../../adapters/layout.tsx"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../adapters/selection.tsx"

const sizes = [
  { label: "Select a size", value: null },
  { label: "Small", value: "sm" },
  { label: "Medium", value: "md" },
  { label: "Large", value: "lg" },
  { label: "Extra Large", value: "xl" },
]

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <Select>
        <SelectTrigger size="sm">
          <SelectValue placeholder="Select a size" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {sizes.map((size) => (
              <SelectItem key={size.value} value={size.value as string}>
                {size.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}
