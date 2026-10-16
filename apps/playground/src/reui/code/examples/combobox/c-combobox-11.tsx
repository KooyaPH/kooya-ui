// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client"

import { FormEvent } from "react"
import { toast } from "../../../adapters/feedback.tsx"

import { Button } from "../../../adapters/controls.tsx"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../supporting/registry/bases/radix/ui/combobox.tsx"
import { Field, FieldLabel } from "../../../adapters/layout.tsx"

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export default function Pattern() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const framework = formData.get("framework") as string
    toast(`You selected ${framework} as your framework.`)
  }

  return (
    <form
      id="form-with-combobox"
      onSubmit={handleSubmit}
      className="w-full max-w-xs space-y-4"
    >
      <Field>
        <FieldLabel htmlFor="framework">Framework</FieldLabel>
        <Combobox items={frameworks}>
          <ComboboxInput
            id="framework"
            name="framework"
            placeholder="Select a framework"
            required
          />
          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
      <Button type="submit" form="form-with-combobox" className="w-full">
        Submit
      </Button>
    </form>
  )
}
