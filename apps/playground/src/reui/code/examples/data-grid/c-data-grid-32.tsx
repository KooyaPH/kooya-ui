// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client"

import { useMemo, useState } from "react"
import {
  DataGrid,
  DataGridContainer,
  dataGridFeatures,
  type DataGridFeatures,
} from "../../supporting/registry-reui/bases/radix/reui/data-grid/data-grid.tsx"
import { DataGridColumnHeader } from "../../supporting/registry-reui/bases/radix/reui/data-grid/data-grid-column-header.tsx"
import { DataGridScrollArea } from "../../supporting/registry-reui/bases/radix/reui/data-grid/data-grid-scroll-area.tsx"
import { DataGridTableVirtual } from "../../supporting/registry-reui/bases/radix/reui/data-grid/data-grid-table-virtual.tsx"
import { useTable } from "@tanstack/react-table"
import type {
  ColumnDef,
  ColumnPinningState,
  SortingState,
} from "@tanstack/react-table"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"
import { Button } from "../../../adapters/controls.tsx"
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "../../../adapters/layout.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

interface IPerson {
  name: string
  avatar: string
  initials: string
}

interface IData {
  id: string
  person: IPerson
  metrics: number[]
  total: number
}

const METRIC_COLUMN_COUNT = 36
const ROW_COUNT = 1000
const COLUMN_JUMP_SIZE = 8
const METRIC_IDS = Array.from(
  { length: METRIC_COLUMN_COUNT },
  (_, metricIndex) => `metric-${metricIndex + 1}`
)
const COLUMN_IDS = ["id", "name", ...METRIC_IDS, "total"]
const columnVirtualizerOptions = { enabled: true, overscan: 3 }
const numberFormatter = new Intl.NumberFormat("en-US")
const PEOPLE: IPerson[] = [
  {
    name: "Alex Johnson",
    avatar:
      "/reui-assets/images/e93553df2422635515ee.jpg",
    initials: "AJ",
  },
  {
    name: "Sarah Chen",
    avatar:
      "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
    initials: "SC",
  },
  {
    name: "Michael Rodriguez",
    avatar:
      "/reui-assets/images/4349381d8a8476edbc4c.jpg",
    initials: "MR",
  },
  {
    name: "Emma Wilson",
    avatar:
      "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
    initials: "EW",
  },
  {
    name: "David Kim",
    avatar:
      "/reui-assets/images/973d47055c51440af7dc.jpg",
    initials: "DK",
  },
  {
    name: "Aron Thompson",
    avatar:
      "/reui-assets/images/df73db9a2c25069a422d.jpg",
    initials: "AT",
  },
  {
    name: "James Brown",
    avatar:
      "/reui-assets/images/c75592a667f30cfd44b0.jpg",
    initials: "JB",
  },
  {
    name: "Maria Garcia",
    avatar:
      "/reui-assets/images/067c566cd567259bb9aa.jpg",
    initials: "MG",
  },
  {
    name: "Nick Johnson",
    avatar:
      "/reui-assets/images/f1d4253436738aaf8fdf.jpg",
    initials: "NJ",
  },
  {
    name: "Liam Thompson",
    avatar:
      "/reui-assets/images/a3afee2f77d259ce6a59.jpg",
    initials: "LT",
  },
]

// Deterministic pseudo-data: the same grid on every load, no Math.random.
function generateData(count: number): IData[] {
  return Array.from({ length: count }, (_, rowIndex) => {
    const metrics = Array.from(
      { length: METRIC_COLUMN_COUNT },
      (_, metricIndex) => 100 + ((rowIndex * 37 + metricIndex * 19) % 900)
    )

    return {
      id: String(rowIndex + 1),
      person: PEOPLE[rowIndex % PEOPLE.length]!,
      metrics,
      total: metrics.reduce((sum, value) => sum + value, 0),
    }
  })
}

const allData = generateData(ROW_COUNT)

export default function Pattern() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    start: ["id", "name"],
    end: ["total"],
  })
  const [targetMetricIndex, setTargetMetricIndex] = useState(0)

  const columns = useMemo<ColumnDef<DataGridFeatures, IData>[]>(() => {
    const metricColumns = Array.from(
      { length: METRIC_COLUMN_COUNT },
      (_, metricIndex): ColumnDef<DataGridFeatures, IData> => {
        const metricLabel = `Metric ${String(metricIndex + 1).padStart(2, "0")}`

        return {
          id: METRIC_IDS[metricIndex]!,
          accessorFn: (row) => row.metrics[metricIndex],
          header: ({ column }) => (
            <DataGridColumnHeader title={metricLabel} column={column} />
          ),
          cell: ({ row }) => (
            <span className="block text-right font-mono tabular-nums">
              {numberFormatter.format(row.original.metrics[metricIndex]!)}
            </span>
          ),
          size: 124,
        }
      }
    )

    return [
      {
        accessorKey: "id",
        id: "id",
        header: ({ column }) => (
          <DataGridColumnHeader title="#" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-muted-foreground tabular-nums">
            {row.original.id}
          </span>
        ),
        size: 72,
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "name",
        accessorFn: (row) => row.person.name,
        header: ({ column }) => (
          <DataGridColumnHeader title="Team member" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage
                src={row.original.person.avatar}
                alt={row.original.person.name}
              />
              <AvatarFallback className="text-[10px]">
                {row.original.person.initials}
              </AvatarFallback>
            </Avatar>
            <span className="text-foreground truncate font-medium">
              {row.original.person.name}
            </span>
          </div>
        ),
        size: 190,
        enableHiding: false,
      },
      ...metricColumns,
      {
        accessorKey: "total",
        id: "total",
        header: ({ column }) => (
          <DataGridColumnHeader title="Total" column={column} />
        ),
        cell: ({ row }) => (
          <span className="block text-right font-medium tabular-nums">
            {numberFormatter.format(row.original.total)}
          </span>
        ),
        size: 132,
        enableHiding: false,
      },
    ]
  }, [])

  const table = useTable({
    features: dataGridFeatures,
    columns,
    data: allData,
    enableColumnPinning: true,
    getRowId: (row: IData) => row.id,
    state: { columnPinning, sorting },
    onColumnPinningChange: setColumnPinning,
    onSortingChange: setSorting,
    // The whole set is already client-side: without this, v9's registered
    // paginated row model would clip the virtual grid to one page.
    manualPagination: true,
  })

  // The jump scrolls by CENTER column index, and pinning changes which
  // columns are centered, so the target metric is looked up among the
  // unpinned ones. A pinned metric is already in view: no scroll (-1).
  const centerMetricIndex = COLUMN_IDS.filter(
    (id) =>
      !columnPinning.start?.includes(id) && !columnPinning.end?.includes(id)
  ).indexOf(METRIC_IDS[targetMetricIndex]!)

  return (
    <DataGrid
      table={table}
      recordCount={allData.length}
      tableLayout={{
        width: "fixed",
        dense: true,
        columnsPinnable: true,
        columnsResizable: true,
        headerSticky: true,
      }}
      tableClassNames={{
        /* z-40, not z-10: pinned BODY cells are sticky at z-30, and a lower
           thead would let them paint over the header band while rows scroll
           under it. 40 is the primitive's sticky-header plane. */
        headerSticky: "sticky top-0 z-40 bg-muted/90 backdrop-blur-xs",
      }}
    >
      {/* No footer here, so the grid itself closes the card: pb-0 removes
          the empty strip below the container, and overflow-hidden lets the
          card's own radius clip the grid's square bottom corners. */}
      <Card className="w-full gap-3 overflow-hidden py-3.5 pb-0">
        <CardHeader className="items-center px-3.5">
          <CardTitle>Performance Matrix</CardTitle>
          <CardAction className="flex items-center gap-2">
            <span className="text-muted-foreground hidden text-xs tabular-nums sm:inline">
              Metric {String(targetMetricIndex + 1).padStart(2, "0")} of{" "}
              {METRIC_COLUMN_COUNT}
            </span>
            <Button
              aria-label="Show previous metric columns"
              title="Show previous metric columns"
              className="size-8"
              disabled={targetMetricIndex === 0}
              size="icon"
              variant="outline"
              onClick={() =>
                setTargetMetricIndex((current) =>
                  Math.max(0, current - COLUMN_JUMP_SIZE)
                )
              }
            >
              <IconPlaceholder
                lucide="ChevronLeftIcon"
                tabler="IconChevronLeft"
                hugeicons="ArrowLeft01Icon"
                phosphor="CaretLeftIcon"
                remixicon="RiArrowLeftSLine"
                aria-hidden="true"
              />
            </Button>
            <Button
              aria-label="Show next metric columns"
              title="Show next metric columns"
              className="size-8"
              disabled={targetMetricIndex === METRIC_COLUMN_COUNT - 1}
              size="icon"
              variant="outline"
              onClick={() =>
                setTargetMetricIndex((current) =>
                  Math.min(METRIC_COLUMN_COUNT - 1, current + COLUMN_JUMP_SIZE)
                )
              }
            >
              <IconPlaceholder
                lucide="ChevronRightIcon"
                tabler="IconChevronRight"
                hugeicons="ArrowRight01Icon"
                phosphor="CaretRightIcon"
                remixicon="RiArrowRightSLine"
                aria-hidden="true"
              />
            </Button>
          </CardAction>
        </CardHeader>
        <DataGridContainer className="border-t">
          <DataGridScrollArea className="h-[480px]">
            <DataGridTableVirtual
              estimateSize={41}
              overscan={8}
              columnVirtualizerOptions={columnVirtualizerOptions}
              scrollBehavior="smooth"
              scrollToColumnAlign="center"
              scrollToColumnIndex={
                centerMetricIndex >= 0 ? centerMetricIndex : undefined
              }
            />
          </DataGridScrollArea>
        </DataGridContainer>
      </Card>
    </DataGrid>
  )
}
