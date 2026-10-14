// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"
import { Button } from "../../../adapters/controls.tsx"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "../../supporting/registry/bases/radix/ui/combobox.tsx"
import { Field } from "../../../adapters/layout.tsx"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../../../adapters/layout.tsx"

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

const members = users.map((user, index) => ({
  ...user,
  position: [
    "Software Engineer",
    "Product Manager",
    "UX Designer",
    "Technical Lead",
    "CTO",
  ][index % 5],
}))

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <Combobox
        items={members}
        defaultValue={members[0]}
        itemToStringValue={(member: (typeof members)[number]) => member.name}
      >
        <ComboboxTrigger
          render={
            <Button
              variant="outline"
              className="w-full justify-between font-normal"
            />
          }
        >
          <ComboboxValue>
            {(member: (typeof members)[number]) =>
              member ? (
                <span className="flex items-center gap-2">
                  <Avatar className="size-5">
                    <AvatarImage src={member?.avatar} alt={member?.name} />
                    <AvatarFallback>{member?.initials}</AvatarFallback>
                  </Avatar>
                  <span>{member?.name}</span>
                </span>
              ) : (
                <span className="text-muted-foreground">Select a member</span>
              )
            }
          </ComboboxValue>
        </ComboboxTrigger>
        <ComboboxContent className="max-w-(--anchor-width) min-w-(--anchor-width)">
          <ComboboxInput showTrigger={false} placeholder="Search members..." />
          <ComboboxEmpty>No members found.</ComboboxEmpty>
          <ComboboxList>
            {(member) => (
              <ComboboxItem key={member.id} value={member}>
                <Item size="xs" className="p-0">
                  <Avatar className="size-6">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <ItemContent>
                    <ItemTitle className="whitespace-nowrap">
                      {member.name}
                    </ItemTitle>
                    <ItemDescription>{member.position}</ItemDescription>
                  </ItemContent>
                </Item>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  )
}
