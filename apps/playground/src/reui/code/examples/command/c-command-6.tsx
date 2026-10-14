// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client"

import { useState } from "react"
import { Badge } from "../../../adapters/structured.tsx"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"
import { Button } from "../../../adapters/controls.tsx"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../supporting/registry/bases/radix/ui/command.tsx"

const users = [
  {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar:
      "/reui-assets/images/e93553df2422635515ee.jpg",
    role: "Admin",
  },
  {
    name: "Sarah Chen",
    email: "sarah@example.com",
    avatar:
      "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
    role: "Editor",
  },
  {
    name: "David Kim",
    email: "david@example.com",
    avatar:
      "/reui-assets/images/973d47055c51440af7dc.jpg",
    role: "Viewer",
  },
  {
    name: "Emma Wilson",
    email: "emma@example.com",
    avatar:
      "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
    role: "Admin",
  },
  {
    name: "Michael Rodriguez",
    email: "michael@example.com",
    avatar:
      "/reui-assets/images/4349381d8a8476edbc4c.jpg",
    role: "Editor",
  },
]

export default function Pattern() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline">
        Search Users
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="**:data-[selected=true]:bg-muted **:data-selected:bg-transparent">
          <CommandInput placeholder="Search by name or email..." />
          <CommandList>
            <CommandEmpty>No users found.</CommandEmpty>
            <CommandGroup heading="Team Members">
              {users.map((user) => (
                <CommandItem key={user.email} className="gap-2 py-2">
                  <Avatar className="size-6 shrink-0">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-xs">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-muted-foreground text-xs">
                      {user.email}
                    </span>
                  </div>
                  <div className="ml-auto" data-slot="command-shortcut">
                    <Badge
                      variant={
                        user.role === "Admin"
                          ? "primary-light"
                          : user.role === "Editor"
                            ? "info-light"
                            : "success-light"
                      }
                      size="sm"
                    >
                      {user.role}
                    </Badge>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
