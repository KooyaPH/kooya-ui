// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Frame, FramePanel } from "../../supporting/registry-reui/bases/radix/reui/frame.tsx"

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
    <Frame>
      <FramePanel className="gap-2 px-3! py-2!">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="flex items-center gap-1.5">
                <IconPlaceholder
                  lucide="HouseIcon"
                  tabler="IconHome"
                  hugeicons="Home03Icon"
                  phosphor="HouseIcon"
                  remixicon="RiHome5Line"
                  className="size-4"
                  aria-hidden="true"
                />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">
                Checkout
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </FramePanel>
    </Frame>
  )
}
