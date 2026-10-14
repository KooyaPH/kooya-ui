// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client"

import { useMemo, useState } from "react"
import { Badge } from "../../../adapters/structured.tsx"
import {
  DataGrid,
  dataGridFeatures,
  type DataGridFeatures,
} from "../../supporting/registry-reui/bases/radix/reui/data-grid/data-grid.tsx"
import { DataGridColumnHeader } from "../../supporting/registry-reui/bases/radix/reui/data-grid/data-grid-column-header.tsx"
import { DataGridPagination } from "../../supporting/registry-reui/bases/radix/reui/data-grid/data-grid-pagination.tsx"
import { DataGridScrollArea } from "../../supporting/registry-reui/bases/radix/reui/data-grid/data-grid-scroll-area.tsx"
import {
  DataGridTable,
  DataGridTableFootRow,
  DataGridTableFootRowCell,
} from "../../supporting/registry-reui/bases/radix/reui/data-grid/data-grid-table.tsx"
import {
  ColumnDef,
  PaginationState,
  SortingState,
  useTable,
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
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../adapters/layout.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

interface IData {
  id: string
  name: string
  avatar: string
  location: string
  flag: string
  status: "Active" | "Inactive" | "Pending" | "Blocked"
  balance: number
}

const demoData: IData[] = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar:
      "/reui-assets/images/e93553df2422635515ee.jpg",
    location: "United States",
    flag: "us",
    status: "Active",
    balance: 5143.03,
  },
  {
    id: "2",
    name: "Sarah Chen",
    avatar:
      "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
    location: "United Kingdom",
    flag: "gb",
    status: "Inactive",
    balance: 4321.87,
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    avatar:
      "/reui-assets/images/4349381d8a8476edbc4c.jpg",
    location: "Canada",
    flag: "ca",
    status: "Blocked",
    balance: 7654.98,
  },
  {
    id: "4",
    name: "Emma Wilson",
    avatar:
      "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
    location: "Australia",
    flag: "au",
    status: "Inactive",
    balance: 3456.45,
  },
  {
    id: "5",
    name: "David Kim",
    avatar:
      "/reui-assets/images/973d47055c51440af7dc.jpg",
    location: "Germany",
    flag: "de",
    status: "Active",
    balance: 9876.54,
  },
  {
    id: "6",
    name: "Aron Thompson",
    avatar:
      "/reui-assets/images/df73db9a2c25069a422d.jpg",
    location: "Malaysia",
    flag: "my",
    status: "Pending",
    balance: 6214.22,
  },
  {
    id: "7",
    name: "James Brown",
    avatar:
      "/reui-assets/images/c75592a667f30cfd44b0.jpg",
    location: "Spain",
    flag: "es",
    status: "Inactive",
    balance: 5321.77,
  },
  {
    id: "8",
    name: "Maria Garcia",
    avatar:
      "/reui-assets/images/067c566cd567259bb9aa.jpg",
    location: "Japan",
    flag: "jp",
    status: "Blocked",
    balance: 8452.39,
  },
  {
    id: "9",
    name: "Nick Johnson",
    avatar:
      "/reui-assets/images/f1d4253436738aaf8fdf.jpg",
    location: "France",
    flag: "fr",
    status: "Pending",
    balance: 7345.1,
  },
  {
    id: "10",
    name: "Liam Thompson",
    avatar:
      "/reui-assets/images/a3afee2f77d259ce6a59.jpg",
    location: "Italy",
    flag: "it",
    status: "Inactive",
    balance: 5214.88,
  },
]

export default function Pattern() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: false },
  ])

  const stats = useMemo(() => {
    const count = demoData.length
    const activeCount = demoData.filter((r) => r.status === "Active").length
    const balances = demoData.map((r) => r.balance)
    const minBalance = Math.min(...balances)
    const maxBalance = Math.max(...balances)
    const avgBalance = balances.reduce((a, b) => a + b, 0) / count
    return { count, activeCount, minBalance, maxBalance, avgBalance }
  }, [])

  const fmt = (n: number) =>
    "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 })

  const columns = useMemo<ColumnDef<DataGridFeatures, IData>[]>(
    () => [
      {
        accessorKey: "name",
        id: "name",
        header: ({ column }) => (
          <DataGridColumnHeader title="User" visibility column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="size-8">
              <AvatarImage src={row.original.avatar} alt={row.original.name} />
              <AvatarFallback>
                {row.original.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-foreground font-medium">
              {row.original.name}
            </div>
          </div>
        ),
        size: 220,
        meta: {
          autoSize: true,
        },
        enableSorting: true,
        enableHiding: false,
        enableResizing: true,
      },
      {
        accessorKey: "location",
        id: "location",
        header: ({ column }) => (
          <DataGridColumnHeader title="Location" visibility column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5">
            <img
              src={`https://flagcdn.com/${row.original.flag}.svg`}
              alt={row.original.flag}
              className="size-4 rounded-full object-cover"
            />
            <div className="text-foreground font-medium">
              {row.original.location}
            </div>
          </div>
        ),
        size: 150,
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
      },
      {
        accessorKey: "status",
        id: "status",
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" visibility column={column} />
        ),
        cell: ({ row }) => {
          const s = row.original.status
          if (s === "Active")
            return <Badge variant="success-outline">Active</Badge>
          if (s === "Blocked")
            return <Badge variant="destructive-outline">Blocked</Badge>
          if (s === "Inactive")
            return <Badge variant="info-outline">Inactive</Badge>
          return <Badge variant="warning-outline">Pending</Badge>
        },
        size: 110,
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
      },
      {
        accessorKey: "balance",
        id: "balance",
        header: ({ column }) => (
          <DataGridColumnHeader title="Balance" visibility column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-foreground font-medium tabular-nums">
            {fmt(row.original.balance)}
          </div>
        ),
        size: 130,
        enableSorting: true,
        enableHiding: true,
        enableResizing: false,
      },
    ],
    []
  )

  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((c) => c.id as string)
  )

  const table = useTable({
    features: dataGridFeatures,
    columns,
    data: demoData,
    pageCount: Math.ceil(demoData.length / pagination.pageSize),
    getRowId: (row: IData) => row.id,
    state: { pagination, sorting, columnOrder },
    onColumnOrderChange: setColumnOrder,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
  })

  const visibleCount = table.getVisibleLeafColumns().length

  const footer = (
    <>
      {/* Row 1: record count, min balance, max balance */}
      <DataGridTableFootRow>
        <DataGridTableFootRowCell
          colSpan={visibleCount - 2}
        ></DataGridTableFootRowCell>
        <DataGridTableFootRowCell>
          <div className="flex flex-col gap-0.5">
            <span className="text-muted-foreground text-xs">Min</span>
            <span className="tabular-nums">{fmt(stats.minBalance)}</span>
          </div>
        </DataGridTableFootRowCell>
        <DataGridTableFootRowCell>
          <div className="flex flex-col gap-0.5">
            <span className="text-muted-foreground text-xs">Max</span>
            <span className="tabular-nums">{fmt(stats.maxBalance)}</span>
          </div>
        </DataGridTableFootRowCell>
      </DataGridTableFootRow>
      {/* Row 2: avg balance, active count */}
      <DataGridTableFootRow>
        <DataGridTableFootRowCell colSpan={visibleCount - 2}>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Avg balance</span>
            <span className="tabular-nums">{fmt(stats.avgBalance)}</span>
          </div>
        </DataGridTableFootRowCell>
        <DataGridTableFootRowCell colSpan={2}>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Active</span>
            <Badge variant="success" size="sm">
              {stats.activeCount}
            </Badge>
          </div>
        </DataGridTableFootRowCell>
      </DataGridTableFootRow>
    </>
  )

  return (
    <DataGrid
      table={table}
      recordCount={demoData.length}
      tableLayout={{
        columnsPinnable: true,
        columnsResizable: true,
        columnsVisibility: true,
      }}
    >
      <Card className="w-full gap-0 p-0">
        <CardHeader className="flex items-center justify-between px-3.5 py-2">
          <div className="flex items-center gap-2">
            <IconPlaceholder
              lucide="BarChartIcon"
              tabler="IconChartBar"
              hugeicons="BarChart01Icon"
              phosphor="ChartBarIcon"
              remixicon="RiBarChartLine"
              className="text-muted-foreground size-4"
            />
            <span className="text-foreground text-sm font-medium">
              Team Summary
            </span>
          </div>
          <CardAction>
            <Button variant="outline" size="sm">
              <IconPlaceholder
                lucide="RefreshCwIcon"
                tabler="IconRefresh"
                hugeicons="RefreshIcon"
                phosphor="ArrowClockwiseIcon"
                remixicon="RiRefreshLine"
              />
              Refresh
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="border-y px-0">
          <DataGridScrollArea>
            <DataGridTable footerContent={footer} />
          </DataGridScrollArea>
        </CardContent>
        <CardFooter className="border-none bg-transparent! px-2.5 py-2">
          <DataGridPagination />
        </CardFooter>
      </Card>
    </DataGrid>
  )
}
