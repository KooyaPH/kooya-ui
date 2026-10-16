// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "../../../adapters/layout.tsx"
import { Switch } from "../../../adapters/controls.tsx"

export default function Pattern() {
  return (
    <div className="mx-auto w-full max-w-xs">
      <FieldLabel htmlFor="sw-danger">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle className="text-destructive">
              Delete all data on sign out
            </FieldTitle>
            <FieldDescription>
              When enabled, all local data will be permanently removed when you
              sign out. This action cannot be undone.
            </FieldDescription>
          </FieldContent>
          <Switch id="sw-danger" className="data-checked:bg-destructive" />
        </Field>
      </FieldLabel>
    </div>
  )
}
