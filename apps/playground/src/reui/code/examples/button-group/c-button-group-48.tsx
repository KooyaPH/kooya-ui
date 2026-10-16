// Owned correction for the adapted REUI recipe; retain the local adapters.
// Owned responsive correction to the actual attributed REUI recipe.
"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { cn } from "cn";
import { Button } from "../../../adapters/controls";
import { ButtonGroup, ButtonGroupSeparator } from "../../../adapters/controls";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../adapters/menus";
import { IconPlaceholder } from "../../../adapters/icons";

const icons = {
  filter: (
    <IconPlaceholder
      lucide="ListFilterIcon"
      tabler="IconFilter"
      hugeicons="FilterIcon"
      phosphor="FunnelIcon"
      remixicon="RiFilterLine"
      aria-hidden="true"
    />
  ),
  download: (
    <IconPlaceholder
      lucide="DownloadIcon"
      tabler="IconDownload"
      hugeicons="Download01Icon"
      phosphor="DownloadSimpleIcon"
      remixicon="RiDownloadLine"
      aria-hidden="true"
    />
  ),
  chevronDown: (
    <IconPlaceholder
      lucide="ChevronDownIcon"
      tabler="IconChevronDown"
      hugeicons="ArrowDown01Icon"
      phosphor="CaretDownIcon"
      remixicon="RiArrowDownSLine"
      aria-hidden="true"
    />
  ),
  grid: (
    <IconPlaceholder
      lucide="LayoutGridIcon"
      tabler="IconLayoutGrid"
      hugeicons="GridViewIcon"
      phosphor="SquaresFourIcon"
      remixicon="RiGalleryView2"
      aria-hidden="true"
    />
  ),
  list: (
    <IconPlaceholder
      lucide="ListIcon"
      tabler="IconList"
      hugeicons="Menu01Icon"
      phosphor="ListIcon"
      remixicon="RiListUnordered"
      aria-hidden="true"
    />
  ),
  fileSpreadsheet: (
    <IconPlaceholder
      lucide="FileSpreadsheetIcon"
      tabler="IconFileSpreadsheet"
      hugeicons="GoogleSpreadsheetIcon"
      phosphor="FileXlsIcon"
      remixicon="RiFileExcel2Line"
      aria-hidden="true"
    />
  ),
  fileJson: (
    <IconPlaceholder
      lucide="FileJsonIcon"
      tabler="IconFileTypeJson"
      hugeicons="FileJsonIcon"
      phosphor="FilejsIcon"
      remixicon="RiFileCodeLine"
      aria-hidden="true"
    />
  ),
  filePdf: (
    <IconPlaceholder
      lucide="FileTextIcon"
      tabler="IconFileTypePdf"
      hugeicons="FilePdf01Icon"
      phosphor="FilePdfIcon"
      remixicon="RiFilePdf2Line"
      aria-hidden="true"
    />
  ),
};

export default function Pattern() {
  const [view, setView] = useState<"grid" | "list">("grid");

  const container = useRef<HTMLDivElement>(null);
  const [vertical, setVertical] = useState(false);
  useLayoutEffect(() => {
    const node = container.current;
    if (!node) return;
    const update = () => setVertical(node.clientWidth < 336);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={container}
      role="group"
      aria-label="Export and view options"
      style={{ width: "100%", maxWidth: 384, minWidth: 0 }}
    >
      <ButtonGroup
        orientation={vertical ? "vertical" : "horizontal"}
        style={{ maxWidth: "100%", width: vertical ? "100%" : undefined }}
      >
        <Button variant="outline">
          {icons.filter}
          Filter
        </Button>
        <ButtonGroupSeparator />
        <Button variant="outline">
          {icons.download}
          Export CSV
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0"
              aria-label="More export options"
            >
              {icons.chevronDown}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                {icons.fileSpreadsheet}
                Export Excel
              </DropdownMenuItem>
              <DropdownMenuItem>
                {icons.fileJson}
                Export JSON
              </DropdownMenuItem>
              <DropdownMenuItem>
                {icons.filePdf}
                Export PDF
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="outline"
          size="icon"
          aria-label="Grid view"
          aria-pressed={view === "grid"}
          style={{
            backgroundColor: view === "grid" ? "var(--ku-subtle)" : undefined,
            borderColor: view === "grid" ? "var(--ku-focus)" : undefined,
          }}
          className={cn(view === "grid" ? "bg-muted" : "")}
          onClick={() => setView("grid")}
        >
          {icons.grid}
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="List view"
          aria-pressed={view === "list"}
          style={{
            backgroundColor: view === "list" ? "var(--ku-subtle)" : undefined,
            borderColor: view === "list" ? "var(--ku-focus)" : undefined,
          }}
          className={cn(view === "list" ? "bg-muted" : "")}
          onClick={() => setView("list")}
        >
          {icons.list}
        </Button>
      </ButtonGroup>
    </div>
  );
}
