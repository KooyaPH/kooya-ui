// Owned correction for the adapted REUI recipe; retain the local adapters.
// Owned responsive correction to the actual attributed REUI recipe.
// @ts-expect-error attributed generated REUI native-select module has no declaration file
import { NativeSelect, NativeSelectOption } from "../../../runtime/source/registry/bases/radix/ui/native-select.jsx"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../../../adapters/data"
import { IconPlaceholder } from "../../../adapters/icons"

export default function Pattern() {
  return (
    <Pagination className="max-w-full [&_.ant-space-item:has(>span:empty)]:hidden [&_.ant-space-item]:min-w-0 [&_.ant-space-item]:max-w-full [&_.ant-pagination]:flex [&_.ant-pagination]:flex-wrap [&_.ant-pagination]:gap-2 [&_.ant-pagination>li]:m-0!">
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href="#" size="icon" aria-label="Go to first page">
            <IconPlaceholder
              lucide="ChevronFirstIcon"
              tabler="IconChevronLeftPipe"
              hugeicons="ArrowLeft03Icon"
              phosphor="CaretLineLeftIcon"
              remixicon="RiSkipLeftLine"
              className="size-4"
            />
          </PaginationLink>
        </PaginationItem>
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
          <NativeSelect className="w-26" defaultValue="1">
            <NativeSelectOption value="1">Page 1</NativeSelectOption>
            <NativeSelectOption value="2">Page 2</NativeSelectOption>
            <NativeSelectOption value="3">Page 3</NativeSelectOption>
            <NativeSelectOption value="4">Page 4</NativeSelectOption>
            <NativeSelectOption value="5">Page 5</NativeSelectOption>
            <NativeSelectOption value="6">Page 6</NativeSelectOption>
            <NativeSelectOption value="7">Page 7</NativeSelectOption>
            <NativeSelectOption value="8">Page 8</NativeSelectOption>
            <NativeSelectOption value="9">Page 9</NativeSelectOption>
            <NativeSelectOption value="10">Page 10</NativeSelectOption>
          </NativeSelect>
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
        <PaginationItem>
          <PaginationLink href="#" size="icon" aria-label="Go to last page">
            <IconPlaceholder
              lucide="ChevronLastIcon"
              tabler="IconChevronRightPipe"
              hugeicons="ArrowRight03Icon"
              phosphor="CaretLineRightIcon"
              remixicon="RiSkipRightLine"
              className="size-4"
            />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
