// Owned correction for the adapted REUI recipe; retain the local adapters.
// Owned responsive correction to the actual attributed REUI recipe.
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../../../adapters/data"
import { IconPlaceholder } from "../../../adapters/icons"

export default function Pattern() {
  return (
    <Pagination className="w-full max-w-xs [&_.ant-space-item:has(>span:empty)]:hidden [&_.ant-space-item]:min-w-0 [&_.ant-space-item]:max-w-full [&_.ant-pagination]:flex [&_.ant-pagination]:flex-wrap [&_.ant-pagination]:gap-2 [&_.ant-pagination>li]:m-0!">
      <PaginationContent className="w-full justify-between">
        <PaginationItem>
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
        </PaginationItem>
        <PaginationItem>
          <span className="text-muted-foreground text-xs">
            Page <span className="text-foreground font-medium">1</span> of{" "}
            <span className="text-foreground font-medium">10</span>
          </span>
        </PaginationItem>
        <PaginationItem>
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
      </PaginationContent>
    </Pagination>
  )
}
