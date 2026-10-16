import { Field, FieldDescription } from "../../../../../../../adapters/layout.tsx"
import { Input } from "../../../../../../../adapters/controls.tsx"
import { Label } from "../../../../../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <div className="flex flex-col gap-1">
        <Label htmlFor="label-helper">API Key</Label>
        <FieldDescription>
          Your secret key for API authentication
        </FieldDescription>
      </div>
      <Input
        id="label-helper"
        placeholder="sk_live_..."
        className="font-mono"
      />
    </Field>
  )
}
