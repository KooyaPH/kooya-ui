// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
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
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <IconPlaceholder
            lucide="ChevronsRightIcon"
            tabler="IconChevronsRight"
            hugeicons="ArrowRightDoubleIcon"
            phosphor="CaretDoubleRightIcon"
            remixicon="RiArrowRightDoubleLine"
          />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Resources</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <IconPlaceholder
            lucide="ChevronsRightIcon"
            tabler="IconChevronsRight"
            hugeicons="ArrowRightDoubleIcon"
            phosphor="CaretDoubleRightIcon"
            remixicon="RiArrowRightDoubleLine"
          />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Documentation</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
