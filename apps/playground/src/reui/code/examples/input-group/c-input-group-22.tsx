// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Field } from "../../../adapters/layout.tsx"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../../../adapters/layout.tsx"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../../../adapters/overlays.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <InputGroup className="gap-0">
        <InputGroupAddon>
          <Popover>
            <PopoverTrigger asChild>
              <InputGroupButton
                variant="ghost"
                size="icon-xs"
                className="cursor-help"
              >
                <IconPlaceholder
                  lucide="ShieldCheckIcon"
                  tabler="IconShieldCheck"
                  hugeicons="ShieldEnergyIcon"
                  phosphor="ShieldCheckIcon"
                  remixicon="RiShieldCheckLine"
                  className="text-emerald-500"
                />
              </InputGroupButton>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-72">
              <PopoverHeader>
                <PopoverTitle>Secure Connection</PopoverTitle>
                <PopoverDescription>
                  Your data is encrypted end-to-end using industry-standard
                  protocols.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
        <InputGroupInput
          defaultValue="https://reui.com"
          className="pl-0.5!"
          readOnly
        />
      </InputGroup>
    </Field>
  )
}
