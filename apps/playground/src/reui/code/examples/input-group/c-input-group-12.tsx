// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client"

import { useState } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../adapters/menus.tsx"
import { Field } from "../../../adapters/layout.tsx"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../../../adapters/layout.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

export default function Pattern() {
  const [country, setCountry] = useState("+1")

  return (
    <Field className="w-full max-w-xs">
      <InputGroup>
        <InputGroupAddon>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton variant="ghost">
                <span className="tabular-nums">{country}</span>
                <IconPlaceholder
                  lucide="ChevronDownIcon"
                  tabler="IconChevronDown"
                  hugeicons="ArrowDown01Icon"
                  phosphor="CaretDownIcon"
                  remixicon="RiArrowDownSLine"
                />
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-24">
              <DropdownMenuItem onClick={() => setCountry("+1")}>
                +1 (US)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCountry("+44")}>
                +44 (UK)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCountry("+61")}>
                +61 (AU)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
        <InputGroupInput type="tel" placeholder="123 456 7890" />
      </InputGroup>
    </Field>
  )
}
