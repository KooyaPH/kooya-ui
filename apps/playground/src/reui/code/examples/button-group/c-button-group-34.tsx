// Owned correction for the adapted REUI recipe; retain the local adapters.
// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { cn } from "cn";
import { Button } from "../../../adapters/controls";
import { ButtonGroup } from "../../../adapters/controls";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../adapters/menus";
import { IconPlaceholder } from "../../../adapters/icons";

const items = [
  {
    id: "Routes",
    label: "Routes",
    icon: (
      <IconPlaceholder
        lucide="RouteIcon"
        tabler="IconRoute"
        hugeicons="Route01Icon"
        phosphor="PathIcon"
        remixicon="RiRouteLine"
        aria-hidden="true"
        className="size-3.5 opacity-60"
      />
    ),
  },
  {
    id: "Paths",
    label: "Paths",
    icon: (
      <IconPlaceholder
        lucide="WaypointsIcon"
        tabler="IconEaseInOutControlPoints"
        hugeicons="EaseCurveControlPointsIcon"
        phosphor="LineSegmentsIcon"
        remixicon="RiRouteLine"
        aria-hidden="true"
        className="size-3.5 opacity-60"
      />
    ),
  },
  {
    id: "Bot Name",
    label: "Bot Name",
    icon: (
      <IconPlaceholder
        lucide="BotIcon"
        tabler="IconRobotFace"
        hugeicons="RoboticIcon"
        phosphor="RobotIcon"
        remixicon="RiRobot2Line"
        aria-hidden="true"
        className="size-3.5 opacity-60"
      />
    ),
  },
];

export default function Pattern() {
  const [active, setActive] = useState("Paths");
  const container = useRef<HTMLDivElement>(null);
  const [vertical, setVertical] = useState(false);
  useLayoutEffect(() => {
    const node = container.current;
    if (!node) return;
    // The unwrapped native group occupies 336px; smaller containers stack
    // before flex shrinking can break short labels into separate lines.
    const update = () => setVertical(node.clientWidth < 336);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={container} style={{ width: "100%", maxWidth: 384, minWidth: 0 }}>
      <ButtonGroup
        data-kooya-button-group-34
        orientation={vertical ? "vertical" : "horizontal"}
        style={{ maxWidth: "100%", width: vertical ? "100%" : undefined }}
      >
        {items.map((item) => (
          <Button
            key={item.id}
            variant="outline"
            aria-pressed={active === item.id}
            style={{
              borderColor: active === item.id ? "var(--ku-focus)" : undefined,
              backgroundColor:
                active === item.id ? "var(--ku-subtle)" : undefined,
              whiteSpace: "normal",
              overflowWrap: "anywhere",
              height: "auto",
              minHeight: "var(--ant-control-height)",
            }}
            className={cn(active === item.id ? "bg-muted" : "")}
            onClick={() => setActive(item.id)}
          >
            {item.icon}
            {item.label}
          </Button>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="More route options"
              style={{ width: vertical ? "100%" : undefined }}
            >
              <IconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDown01Icon"
                phosphor="CaretDownIcon"
                remixicon="RiArrowDownSLine"
                aria-hidden="true"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-40">
            <DropdownMenuItem>Filter by Group</DropdownMenuItem>
            <DropdownMenuItem>Sort by Name</DropdownMenuItem>
            <DropdownMenuItem>Export Data</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </div>
  );
}
