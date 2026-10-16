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

const users = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar:
      "/reui-assets/images/e93553df2422635515ee.jpg",
    initials: "AJ",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@example.com",
    avatar:
      "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
    initials: "SC",
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    email: "michael@example.com",
    avatar:
      "/reui-assets/images/4349381d8a8476edbc4c.jpg",
    initials: "MR",
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma@example.com",
    avatar:
      "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
    initials: "EW",
  },
  {
    id: "5",
    name: "David Kim",
    email: "david@example.com",
    avatar:
      "/reui-assets/images/973d47055c51440af7dc.jpg",
    initials: "DK",
  },
  {
    id: "6",
    name: "Aron Thompson",
    email: "lisa@example.com",
    avatar:
      "/reui-assets/images/df73db9a2c25069a422d.jpg",
    initials: "LT",
  },
  {
    id: "7",
    name: "James Brown",
    email: "james@example.com",
    avatar:
      "/reui-assets/images/c75592a667f30cfd44b0.jpg",
    initials: "JB",
  },
  {
    id: "8",
    name: "Maria Garcia",
    email: "maria@example.com",
    avatar:
      "/reui-assets/images/067c566cd567259bb9aa.jpg",
    initials: "MG",
  },
  {
    id: "9",
    name: "Nick Johnson",
    email: "nick@example.com",
    avatar:
      "/reui-assets/images/f1d4253436738aaf8fdf.jpg",
    initials: "NJ",
  },
  {
    id: "10",
    name: "Liam Thompson",
    email: "liam@example.com",
    avatar:
      "/reui-assets/images/a3afee2f77d259ce6a59.jpg",
    initials: "LT",
  },
]

export default function Pattern() {
  const mappedUsers = users.map((user) => ({
    value: user.id,
    label: user.name,
    avatar: user.avatar,
    initials: user.initials,
  }))

  return (
    <Field className="max-w-xs">
      <Select defaultValue={mappedUsers[2].value}>
        <SelectTrigger>
          <SelectValue placeholder="Select a user" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            <SelectLabel>Select a user</SelectLabel>
            {mappedUsers.map((user) => (
              <SelectItem key={user.value} value={user.value}>
                <span className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src={user.avatar} alt={user.label} />
                    <AvatarFallback>{user.initials}</AvatarFallback>
                  </Avatar>
                  <span>{user.label}</span>
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}
