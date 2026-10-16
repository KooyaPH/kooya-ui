import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"
import { Field, FieldLabel, FieldTitle } from "../../../../../../../adapters/layout.tsx"
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../../../../../adapters/controls.tsx"

export default function Pattern() {
  return (
    <RadioGroup defaultValue="emma" className="w-full max-w-xs">
      <FieldLabel htmlFor="emma-wilson" className="p-0!">
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
          <RadioGroupItem value="emma" id="emma-wilson" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="john-doe" className="p-0!">
        <Field orientation="horizontal">
          <FieldTitle className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src="/reui-assets/images/198127895366e0296d87.jpg"
                alt="John Doe"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold">John Doe</span>
              <span className="text-muted-foreground text-xs">@johndoe</span>
            </div>
          </FieldTitle>
          <RadioGroupItem value="john" id="john-doe" />
        </Field>
      </FieldLabel>
    </RadioGroup>
  )
}
