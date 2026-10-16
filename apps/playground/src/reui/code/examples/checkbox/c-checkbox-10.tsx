// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  Frame,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "../../supporting/registry-reui/bases/radix/reui/frame.tsx"

import { Checkbox } from "../../../adapters/controls.tsx"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "../../../adapters/layout.tsx"
import { Separator } from "../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <Frame className="w-full max-w-xs" spacing="sm">
      <FrameHeader>
        <FrameTitle>Notification Settings</FrameTitle>
      </FrameHeader>
      <FramePanel className="overflow-hidden p-0!">
        <FieldGroup className="gap-0">
          <Field>
            <FieldLabel className="p-3">
              <Checkbox defaultChecked />
              <FieldTitle>Push notifications</FieldTitle>
            </FieldLabel>
          </Field>
          <Separator />
          <Field>
            <FieldLabel className="p-3">
              <Checkbox />
              <FieldTitle>Email notifications</FieldTitle>
            </FieldLabel>
          </Field>
          <Separator />
          <Field>
            <FieldLabel className="p-3">
              <Checkbox />
              <FieldTitle>SMS notifications</FieldTitle>
            </FieldLabel>
          </Field>
        </FieldGroup>
      </FramePanel>
    </Frame>
  )
}
