// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Frame, FramePanel } from "../../supporting/registry-reui/bases/radix/reui/frame.tsx"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../adapters/utility.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <Frame spacing="sm">
      <FramePanel>
        <Breadcrumb>
          <BreadcrumbList className="gap-3">
            <BreadcrumbItem>
              <BreadcrumbLink
                href="#"
                className="text-foreground flex items-center gap-2"
              >
                <Avatar className="size-6">
                  <AvatarImage src="/reui-assets/images/f02f62535eba25f67477.png" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="text-muted-foreground/60">
              /
            </BreadcrumbSeparator>

            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="flex items-center gap-3">
                <Avatar className="size-6">
                  <AvatarImage
                    src="/reui-assets/images/0a10b9bc070f3bdf606f.jpg"
                    className="object-cover"
                  />
                  <AvatarFallback>MP</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-foreground leading-tight font-medium">
                    shadcn
                  </span>
                  <span className="text-muted-foreground leading-tight">
                    ui@shadcn.com
                  </span>
                </div>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="text-muted-foreground/60">
              /
            </BreadcrumbSeparator>

            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-2.5">
                <span className="flex size-6 items-center justify-center rounded-md bg-sky-100 text-sky-500 dark:bg-sky-500/10 dark:text-sky-400">
                  <IconPlaceholder
                    lucide="FileTextIcon"
                    tabler="IconFileText"
                    hugeicons="File02Icon"
                    phosphor="FileTextIcon"
                    remixicon="RiFileTextLine"
                    className="size-3.5"
                  />
                </span>
                <div className="flex flex-col">
                  <span className="text-foreground leading-tight font-medium">
                    Document
                  </span>
                  <span className="text-muted-foreground flex items-center gap-1 leading-tight">
                    agents.md
                  </span>
                </div>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </FramePanel>
    </Frame>
  )
}
