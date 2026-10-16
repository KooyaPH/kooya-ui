import { Field } from "../../../../../../../adapters/layout.tsx"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../../../../../adapters/layout.tsx"
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <InputGroup>
        <InputGroupAddon>
          <IconPlaceholder
            lucide="SearchIcon"
            tabler="IconSearch"
            hugeicons="Search01Icon"
            phosphor="MagnifyingGlassIcon"
            remixicon="RiSearchLine"
          />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search..." />
      </InputGroup>
    </Field>
  )
}
