"use client"

import { useState } from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"
import { Button } from "../../../../../../../adapters/controls.tsx"
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../../../../adapters/selection.tsx"
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

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
]

export default function Pattern() {
  const [selectedUserId, setSelectedUserId] = useState<string>("3")

  return (
    <ButtonGroup>
      <Select value={selectedUserId} onValueChange={setSelectedUserId}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select user" />
        </SelectTrigger>
        <SelectContent position="popper" className="min-w-[200px]">
          <SelectGroup>
            <SelectLabel>Team Members</SelectLabel>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                <span className="flex items-center gap-2">
                  <Avatar className="size-5">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-[10px]">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate">{user.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button variant="outline" size="icon" aria-label="Add Tag">
        <IconPlaceholder
          lucide="PlusIcon"
          tabler="IconPlus"
          hugeicons="PlusSignIcon"
          phosphor="PlusIcon"
          remixicon="RiAddLine"
          aria-hidden="true"
        />
      </Button>
      <Button variant="outline" size="icon" aria-label="Settings">
        <IconPlaceholder
          lucide="Settings2Icon"
          tabler="IconAdjustmentsHorizontal"
          hugeicons="FilterHorizontalIcon"
          phosphor="SlidersHorizontalIcon"
          remixicon="RiEqualizer2Line"
          aria-hidden="true"
        />
      </Button>
    </ButtonGroup>
  )
}
