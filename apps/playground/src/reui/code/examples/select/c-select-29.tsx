// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"
import { Field } from "../../../adapters/layout.tsx"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../adapters/selection.tsx"

const members = [
  {
    value: "sarah",
    label: "Sarah Chen",
    initials: "SC",
    avatar:
      "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
  },
  {
    value: "alex",
    label: "Alex Kim",
    initials: "AK",
    avatar:
      "/reui-assets/images/e93553df2422635515ee.jpg",
  },
  {
    value: "maria",
    label: "Maria Garcia",
    initials: "MG",
    avatar:
      "/reui-assets/images/067c566cd567259bb9aa.jpg",
  },
  {
    value: "james",
    label: "James Wilson",
    initials: "JW",
    avatar:
      "/reui-assets/images/c75592a667f30cfd44b0.jpg",
  },
]

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <Select defaultValue={members[0].value}>
        <SelectTrigger>
          <SelectValue placeholder="Select member" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            <SelectLabel>Assign to</SelectLabel>
            {members.map((member) => (
              <SelectItem key={member.value} value={member.value}>
                <span className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src={member.avatar} alt={member.label} />
                    <AvatarFallback className="text-xs">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span>{member.label}</span>
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}
