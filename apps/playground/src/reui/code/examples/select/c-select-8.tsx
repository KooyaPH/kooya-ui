// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "../../../adapters/layout.tsx"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../adapters/selection.tsx"

const items = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
]

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="select-fruit">Favorite Fruit</FieldLabel>
      <Select>
        <SelectTrigger id="select-fruit">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value as string}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldDescription>
        Choose your favorite fruit from the list.
      </FieldDescription>
    </Field>
  )
}
