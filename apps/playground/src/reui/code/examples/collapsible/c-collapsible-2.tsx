// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Button } from "../../../adapters/controls.tsx"
import { Card } from "../../../adapters/layout.tsx"
import { Checkbox } from "../../../adapters/controls.tsx"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../adapters/navigation.tsx"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "../../../adapters/layout.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

const settings = [
  { id: "push", label: "Push notifications", defaultChecked: true },
  { id: "email", label: "Email notifications", defaultChecked: false },
  { id: "sms", label: "SMS notifications", defaultChecked: false },
]

export default function Pattern() {
  return (
    <div className="h-40 w-full max-w-xs">
      <Collapsible className="flex flex-col gap-2" defaultOpen>
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className="bg-background! w-full justify-start"
          >
            <IconPlaceholder
              lucide="ChevronRightIcon"
              tabler="IconChevronRight"
              hugeicons="ArrowRight01Icon"
              phosphor="CaretRightIcon"
              remixicon="RiArrowRightSLine"
              aria-hidden="true"
              className="size-4 group-data-panel-open/button:rotate-90"
            />
            <span className="sr-only">Toggle notification settings</span>
            Notification settings
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <Card className="p-0">
            <FieldGroup className="gap-0 divide-y">
              {settings.map((item) => (
                <Field key={item.id}>
                  <FieldLabel className="px-3 py-2">
                    <Checkbox defaultChecked={item.defaultChecked} />
                    <FieldTitle>{item.label}</FieldTitle>
                  </FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
