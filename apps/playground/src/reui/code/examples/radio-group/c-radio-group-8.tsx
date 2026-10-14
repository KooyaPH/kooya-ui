// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Card } from "../../../adapters/layout.tsx"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "../../../adapters/layout.tsx"
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../adapters/controls.tsx"
import { Separator } from "../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <Card className="w-full max-w-xs p-0">
      <RadioGroup defaultValue="standard">
        <FieldGroup className="gap-0">
          <Field>
            <FieldLabel className="px-4 py-3">
              <RadioGroupItem value="standard" id="ship-standard" />
              <FieldTitle>Standard Shipping</FieldTitle>
            </FieldLabel>
          </Field>
          <Separator />
          <Field>
            <FieldLabel className="px-4 py-3">
              <RadioGroupItem value="express" id="ship-express" />
              <FieldTitle>Express Shipping</FieldTitle>
            </FieldLabel>
          </Field>
          <Separator />
          <Field>
            <FieldLabel className="px-4 py-3">
              <RadioGroupItem value="overnight" id="ship-overnight" />
              <FieldTitle>Overnight Shipping</FieldTitle>
            </FieldLabel>
          </Field>
        </FieldGroup>
      </RadioGroup>
    </Card>
  )
}
