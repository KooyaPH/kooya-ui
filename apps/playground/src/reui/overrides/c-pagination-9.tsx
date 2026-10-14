// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../adapters/data"

export default function Pattern() {
  return (
    <Pagination className="w-full max-w-xs reui-pagination-nine" style={{ width: "100%", maxWidth: 320, minWidth: 0 }} styles={{ item: { minWidth: 0, maxWidth: "100%" } }}>
      <PaginationContent className="w-full justify-between">
        <PaginationItem>
          <span className="text-muted-foreground text-xs">
            Page <span className="text-foreground font-medium">1</span> of{" "}
            <span className="text-foreground font-medium">10</span>
          </span>
        </PaginationItem>
        <PaginationItem className="flex gap-1">
          <PaginationPrevious href="#" />
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
