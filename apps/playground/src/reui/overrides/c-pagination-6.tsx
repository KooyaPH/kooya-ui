// Owned responsive correction to the actual attributed REUI recipe.
import { Card, CardContent } from "../adapters/layout"
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
    <Card className="p-2" style={{ width: "fit-content", maxWidth: "100%" }}>
      <CardContent className="p-0">
        <Pagination className="max-w-full [&_.ant-space-item:has(>span:empty)]:hidden [&_.ant-space-item]:min-w-0 [&_.ant-space-item]:max-w-full [&_.ant-pagination]:flex [&_.ant-pagination]:flex-wrap [&_.ant-pagination]:gap-2 [&_.ant-pagination>li]:m-0!">
          <PaginationContent>
            {/* Previous */}
            <PaginationItem>
              <PaginationLink
                href="#"
                size="icon"
                aria-label="Go to previous page"
                className="hover:bg-muted h-8 w-8 rounded-full"
              >
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

            {[1, 2, 3].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === 1}
                  className={
                    page === 1
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "hover:bg-muted"
                  }
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            {[10, 11, 12].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink href="#">{page}</PaginationLink>
              </PaginationItem>
            ))}

            {/* Next */}
            <PaginationItem>
              <PaginationLink
                href="#"
                size="icon"
                aria-label="Go to next page"
                className="hover:bg-muted h-8 w-8 rounded-full"
              >
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
      </CardContent>
    </Card>
  )
}
