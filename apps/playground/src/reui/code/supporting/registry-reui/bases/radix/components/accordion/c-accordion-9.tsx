import { Badge } from "../../../../../../../adapters/structured.tsx"
import { Frame, FramePanel } from "../../reui/frame.tsx"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../../../../adapters/selection.tsx"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"

const users = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@apple.com",
    role: "Admin",
    avatar:
      "/reui-assets/images/e93553df2422635515ee.jpg",
    initials: "AJ",
    content:
      "Alex has full administrative access to the platform, including billing management, user provisioning, and security configurations.",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@openai.com",
    role: "Viewer",
    avatar:
      "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
    initials: "SC",
    content:
      "Sarah has read-only access to projects and reports. She cannot modify settings or invite new members.",
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    email: "michael@meta.com",
    role: "Editor",
    avatar:
      "/reui-assets/images/4349381d8a8476edbc4c.jpg",
    initials: "MR",
    content:
      "Michael is part of the design team and has permissions to edit projects, manage assets, and update design system components.",
  },
]

export default function Pattern() {
  return (
    <div className="mx-auto mb-auto w-full max-w-lg">
      <Frame stacked spacing="sm">
        {users.map((user) => (
          <FramePanel key={user.id}>
            <Accordion
              type="single"
              collapsible
              defaultValue="1"
              className="border-none"
            >
              <AccordionItem
                value={user.id}
                className="border-none bg-transparent p-0 **:data-[slot=accordion-content]:p-0!"
              >
                <AccordionTrigger className="items-center px-1 py-1 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-8 border">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-xs">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="inline-flex items-center gap-2">
                      <span className="text-foreground/90 font-semibold tracking-tight">
                        {user.name}
                      </span>
                      <Badge
                        variant={
                          user.role === "Admin" ? "success-light" : "secondary"
                        }
                        size="sm"
                      >
                        {user.role}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground py-0 pl-11">
                  {user.content}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </FramePanel>
        ))}
      </Frame>
    </div>
  )
}
