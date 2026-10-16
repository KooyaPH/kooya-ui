// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Input } from "../adapters/controls"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../adapters/data"
import { IconPlaceholder } from "../adapters/icons"

export default function Pattern() {
  return (
    <Pagination className="w-full max-w-xs reui-pagination-five" style={{ width: "100%", maxWidth: 320, minWidth: 0 }} styles={{ item: { minWidth: 0, maxWidth: "100%" } }}>
      <PaginationContent className="justify-between gap-4">
        <PaginationItem className="flex items-center gap-1">
          <PaginationLink href="#" size="icon" aria-label="Go to previous page">
            <IconPlaceholder
              lucide="ChevronLeftIcon"
              tabler="IconChevronLeft"
              hugeicons="ArrowLeft01Icon"
              phosphor="CaretLeftIcon"
              remixicon="RiArrowLeftSLine"
              className="size-4"
            />
          </PaginationLink>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
          <PaginationLink href="#">2</PaginationLink>
          <PaginationLink href="#">3</PaginationLink>
          <PaginationEllipsis />
          <PaginationLink href="#" size="icon" aria-label="Go to next page">
            <IconPlaceholder
              lucide="ChevronRightIcon"
              tabler="IconChevronRight"
              hugeicons="ArrowRight01Icon"
              phosphor="CaretRightIcon"
              remixicon="RiArrowRightSLine"
              className="size-4"
            />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm whitespace-nowrap">
            Go to page
          </span>
          <Input
            type="number"
            min={1}
            max={10}
            defaultValue={1}
            className="h-9 w-14 text-center"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
