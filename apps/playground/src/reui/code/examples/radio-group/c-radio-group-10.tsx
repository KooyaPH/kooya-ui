// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  Frame,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "../../supporting/registry-reui/bases/radix/reui/frame.tsx"

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
    <Frame className="w-full max-w-xs" spacing="sm">
      <FrameHeader>
        <FrameTitle>Language</FrameTitle>
      </FrameHeader>
      <FramePanel className="overflow-hidden p-0!">
        <RadioGroup defaultValue="en">
          <FieldGroup className="gap-0">
            <Field>
              <FieldLabel className="p-3">
                <RadioGroupItem value="en" id="lang-en" />
                <FieldTitle>English</FieldTitle>
              </FieldLabel>
            </Field>
            <Separator />
            <Field>
              <FieldLabel className="p-3">
                <RadioGroupItem value="es" id="lang-es" />
                <FieldTitle>Spanish</FieldTitle>
              </FieldLabel>
            </Field>
            <Separator />
            <Field>
              <FieldLabel className="p-3">
                <RadioGroupItem value="fr" id="lang-fr" />
                <FieldTitle>French</FieldTitle>
              </FieldLabel>
            </Field>
            <Separator />
            <Field>
              <FieldLabel className="p-3">
                <RadioGroupItem value="de" id="lang-de" />
                <FieldTitle>German</FieldTitle>
              </FieldLabel>
            </Field>
          </FieldGroup>
        </RadioGroup>
      </FramePanel>
    </Frame>
  )
}
