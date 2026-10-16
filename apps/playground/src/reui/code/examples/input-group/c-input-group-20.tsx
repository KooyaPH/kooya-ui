// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Field, FieldLabel } from "../../../adapters/layout.tsx"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../adapters/layout.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="search-input">Search Components</FieldLabel>
      <InputGroup>
        <InputGroupAddon>
          <IconPlaceholder
            lucide="SearchIcon"
            tabler="IconSearch"
            hugeicons="Search01Icon"
            phosphor="MagnifyingGlassIcon"
            remixicon="RiSearchLine"
            className="text-muted-foreground"
          />
        </InputGroupAddon>
        <InputGroupInput id="search-input" placeholder="Search..." />
      </InputGroup>
    </Field>
  )
}
