import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"
import { Checkbox } from "../../../../../../../adapters/controls.tsx"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "../../../../../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <FieldGroup className="w-full max-w-xs">
      <FieldLabel className="relative p-0">
        <Field orientation="horizontal">
          <FieldTitle className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src="/reui-assets/images/e53b6c9adff882773afd.jpg"
                alt="Emma Wilson"
              />
              <AvatarFallback>EW</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold">Emma Wilson</span>
              <span className="text-muted-foreground text-xs">@emmawilson</span>
            </div>
          </FieldTitle>
          <Checkbox defaultChecked />
        </Field>
      </FieldLabel>
    </FieldGroup>
  )
}
