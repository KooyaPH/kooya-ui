// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client"

import { useMemo, useState } from "react"
import { useCopyToClipboard } from "../../supporting/registry-reui/bases/radix/hooks/use-copy-to-clipboard.tsx"
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
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from "../../supporting/registry-reui/bases/radix/reui/data-grid/data-grid-table.tsx"
import {
  ColumnDef,
  PaginationState,
  Row,
  SortingState,
  useTable,
} from "@tanstack/react-table"
import { toast } from "../../../adapters/feedback.tsx"

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../adapters/menus.tsx"
import { Separator } from "../../../adapters/layout.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

interface IData {
  id: string
  name: string
  avatar: string
  role: string
  status: "Active" | "Inactive" | "Pending" | "Blocked"
  balance: number
}

const demoData: IData[] = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar:
      "/reui-assets/images/e93553df2422635515ee.jpg",
    role: "CEO",
    status: "Active",
    balance: 5143.03,
  },
  {
    id: "2",
    name: "Sarah Chen",
    avatar:
      "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
    role: "CTO",
    status: "Inactive",
    balance: 4321.87,
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    avatar:
      "/reui-assets/images/4349381d8a8476edbc4c.jpg",
    role: "Designer",
    status: "Blocked",
    balance: 7654.98,
  },
  {
    id: "4",
    name: "Emma Wilson",
    avatar:
      "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
    role: "Developer",
    status: "Inactive",
    balance: 3456.45,
  },
  {
    id: "5",
    name: "David Kim",
    avatar:
      "/reui-assets/images/973d47055c51440af7dc.jpg",
    role: "Lawyer",
    status: "Active",
    balance: 9876.54,
  },
  {
    id: "6",
    name: "Aron Thompson",
    avatar:
      "/reui-assets/images/df73db9a2c25069a422d.jpg",
    role: "Director",
    status: "Pending",
    balance: 6214.22,
  },
  {
    id: "7",
    name: "James Brown",
    avatar:
      "/reui-assets/images/c75592a667f30cfd44b0.jpg",
    role: "Product Manager",
    status: "Inactive",
    balance: 5321.77,
  },
  {
    id: "8",
    name: "Maria Garcia",
    avatar:
      "/reui-assets/images/067c566cd567259bb9aa.jpg",
    role: "Marketing Lead",
    status: "Blocked",
    balance: 8452.39,
  },
  {
    id: "9",
    name: "Nick Johnson",
    avatar:
      "/reui-assets/images/f1d4253436738aaf8fdf.jpg",
    role: "Data Scientist",
    status: "Pending",
    balance: 7345.1,
  },
  {
    id: "10",
    name: "Liam Thompson",
    avatar:
      "/reui-assets/images/a3afee2f77d259ce6a59.jpg",
    role: "Engineer",
    status: "Inactive",
    balance: 5214.88,
  },
]

function ActionsCell({ row }: { row: Row<DataGridFeatures, IData> }) {
  const { copyToClipboard } = useCopyToClipboard()
  const handleCopyId = () => {
    copyToClipboard(row.original.id)
    toast.success("Employee ID copied", { description: row.original.id })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-7" size="icon" variant="ghost">
          <IconPlaceholder
            lucide="MoreHorizontalIcon"
            tabler="IconDots"
            hugeicons="MoreHorizontalCircle01Icon"
            phosphor="DotsThreeIcon"
            remixicon="RiMoreLine"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start">
        <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyId}>Copy ID</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => {}}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function Pattern() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: false },
  ])

  const totalBalance = useMemo(
    () => demoData.reduce((sum, row) => sum + row.balance, 0),
    []
  )

  const columns = useMemo<ColumnDef<DataGridFeatures, IData>[]>(
    () => [
      {
        accessorKey: "id",
        id: "id",
        header: () => <DataGridTableRowSelectAll />,
        cell: ({ row }) => <DataGridTableRowSelect row={row} />,
        enableSorting: false,
        size: 35,
        enableResizing: false,
      },
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
        accessorKey: "role",
        id: "role",
        header: ({ column }) => (
          <DataGridColumnHeader title="Role" visibility column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-foreground font-medium">{row.original.role}</div>
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
            $
            {row.original.balance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </div>
        ),
        size: 130,
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => <ActionsCell row={row} />,
        size: 60,
        enableSorting: false,
        enableHiding: false,
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
    <DataGridTableFootRow>
      {/* Label spans checkbox + user + role + status */}
      <DataGridTableFootRowCell colSpan={visibleCount - 2}>
        <span className="text-muted-foreground">Total balance</span>
      </DataGridTableFootRowCell>
      {/* Balance total */}
      <DataGridTableFootRowCell className="font-bold tabular-nums">
        ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </DataGridTableFootRowCell>
      {/* Actions column - empty */}
      <DataGridTableFootRowCell />
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
      <Card className="w-full gap-0 py-0">
        <CardHeader className="flex items-center justify-between px-3.5 py-2">
          <div className="flex items-center gap-2">
            <IconPlaceholder
              lucide="TableIcon"
              tabler="IconTable"
              hugeicons="Table01Icon"
              phosphor="TableIcon"
              remixicon="RiTableLine"
              className="text-muted-foreground size-4"
            />
            <span className="text-foreground text-sm font-medium">
              Employee Balances
            </span>
          </div>
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
