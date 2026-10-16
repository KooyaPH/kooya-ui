"use client"

import { useMemo, useState } from "react"
import { Badge } from "../../../../../../../adapters/structured.tsx"
import {
  DataGrid,
  dataGridFeatures,
  type DataGridFeatures,
} from "../../reui/data-grid/data-grid.tsx"
import { DataGridColumnHeader } from "../../reui/data-grid/data-grid-column-header.tsx"
import { DataGridPagination } from "../../reui/data-grid/data-grid-pagination.tsx"
import { DataGridScrollArea } from "../../reui/data-grid/data-grid-scroll-area.tsx"
import {
  DataGridTable,
  DataGridTableFootRow,
  DataGridTableFootRowCell,
} from "../../reui/data-grid/data-grid-table.tsx"
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
} from "../../../../../../../adapters/layout.tsx"
import { Button } from "../../../../../../../adapters/controls.tsx"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../../../adapters/layout.tsx"
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

interface IData {
  id: string
  name: string
  avatar: string
  status: "Active" | "Inactive" | "Pending" | "Blocked"
  balance: number
  transactions: number
}

const demoData: IData[] = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar:
      "/reui-assets/images/e93553df2422635515ee.jpg",
    status: "Active",
    balance: 5143.03,
    transactions: 48,
  },
  {
    id: "2",
    name: "Sarah Chen",
    avatar:
      "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
    status: "Inactive",
    balance: 4321.87,
    transactions: 31,
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    avatar:
      "/reui-assets/images/4349381d8a8476edbc4c.jpg",
    status: "Blocked",
    balance: 7654.98,
    transactions: 67,
  },
  {
    id: "4",
    name: "Emma Wilson",
    avatar:
      "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
    status: "Inactive",
    balance: 3456.45,
    transactions: 22,
  },
  {
    id: "5",
    name: "David Kim",
    avatar:
      "/reui-assets/images/973d47055c51440af7dc.jpg",
    status: "Active",
    balance: 9876.54,
    transactions: 93,
  },
  {
    id: "6",
    name: "Aron Thompson",
    avatar:
      "/reui-assets/images/df73db9a2c25069a422d.jpg",
    status: "Pending",
    balance: 6214.22,
    transactions: 55,
  },
  {
    id: "7",
    name: "James Brown",
    avatar:
      "/reui-assets/images/c75592a667f30cfd44b0.jpg",
    status: "Inactive",
    balance: 5321.77,
    transactions: 40,
  },
  {
    id: "8",
    name: "Maria Garcia",
    avatar:
      "/reui-assets/images/067c566cd567259bb9aa.jpg",
    status: "Blocked",
    balance: 8452.39,
    transactions: 74,
  },
  {
    id: "9",
    name: "Nick Johnson",
    avatar:
      "/reui-assets/images/f1d4253436738aaf8fdf.jpg",
    status: "Pending",
    balance: 7345.1,
    transactions: 61,
  },
  {
    id: "10",
    name: "Liam Thompson",
    avatar:
      "/reui-assets/images/a3afee2f77d259ce6a59.jpg",
    status: "Inactive",
    balance: 5214.88,
    transactions: 37,
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

  const aggregates = useMemo(() => {
    const n = demoData.length
    const balances = demoData.map((r) => r.balance)
    const txns = demoData.map((r) => r.transactions)
    return {
      avgBalance: balances.reduce((a, b) => a + b, 0) / n,
      minBalance: Math.min(...balances),
      maxBalance: Math.max(...balances),
      avgTxns: Math.round(txns.reduce((a, b) => a + b, 0) / n),
      minTxns: Math.min(...txns),
      maxTxns: Math.max(...txns),
    }
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
        minSize: 200,
        meta: {
          autoSize: true,
        },
        enableSorting: true,
        enableHiding: false,
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
        size: 150,
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
        size: 150,
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
      },
      {
        accessorKey: "transactions",
        id: "transactions",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Transactions"
            visibility
            column={column}
          />
        ),
        cell: ({ row }) => (
          <div className="text-foreground font-medium tabular-nums">
            {row.original.transactions}
          </div>
        ),
        size: 150,
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
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

  const footer = (
    <DataGridTableFootRow>
      <DataGridTableFootRowCell colSpan={2}>
        <div className="flex flex-col gap-0.5">
          <span className="text-muted-foreground">Summary</span>
          <span className="text-foreground font-medium">
            Across all members
          </span>
          <span className="text-muted-foreground tabular-nums">
            {demoData.length} members
          </span>
        </div>
      </DataGridTableFootRowCell>
      <DataGridTableFootRowCell>
        <div className="flex flex-col gap-0.5">
          <span className="text-muted-foreground">Avg</span>
          <span className="tabular-nums">{fmt(aggregates.avgBalance)}</span>
          <span className="text-muted-foreground tabular-nums">
            {fmt(aggregates.minBalance)} - {fmt(aggregates.maxBalance)}
          </span>
        </div>
      </DataGridTableFootRowCell>
      {/* Transactions aggregate */}
      <DataGridTableFootRowCell>
        <div className="flex flex-col gap-0.5">
          <span className="text-muted-foreground">Avg</span>
          <span className="tabular-nums">{aggregates.avgTxns}</span>
          <span className="text-muted-foreground tabular-nums">
            {aggregates.minTxns} - {aggregates.maxTxns}
          </span>
        </div>
      </DataGridTableFootRowCell>
    </DataGridTableFootRow>
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
        <CardHeader className="flex items-center justify-between gap-3 px-4 py-2">
          <CardTitle className="text-sm font-medium">
            Column Aggregates
          </CardTitle>
          <CardAction>
            <Button variant="outline" size="sm">
              <IconPlaceholder
                lucide="DownloadIcon"
                tabler="IconDownload"
                hugeicons="Download01Icon"
                phosphor="DownloadSimpleIcon"
                remixicon="RiDownloadLine"
              />
              Export
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="border-y px-0">
          <DataGridScrollArea>
            <DataGridTable footerContent={footer} />
          </DataGridScrollArea>
        </CardContent>
        <CardFooter className="border-none bg-transparent! px-3.5 py-2">
          <DataGridPagination />
        </CardFooter>
      </Card>
    </DataGrid>
  )
}
