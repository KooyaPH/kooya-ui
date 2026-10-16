// Owned correction for the adapted REUI recipe; retain the local adapters.
// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../../../adapters/data"
import { IconPlaceholder } from "../../../adapters/icons"

export default function Pattern() {
  return (
    <Pagination className="w-full max-w-xs reui-pagination-seven" style={{ width: "100%", maxWidth: 320, minWidth: 0 }} styles={{ item: { minWidth: 0, maxWidth: "100%" } }}>
      <PaginationContent className="w-full justify-between">
        <PaginationItem>
          <PaginationLink href="#" size="default" className="gap-2">
            <IconPlaceholder
              lucide="ArrowLeftIcon"
              tabler="IconArrowLeft"
              hugeicons="ArrowLeft02Icon"
              phosphor="ArrowLeftIcon"
              remixicon="RiArrowLeftLine"
              className="size-4"
            />
            Previous
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="default" className="gap-2">
            Next
            <IconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              className="size-4"
            />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
