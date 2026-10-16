// Owned correction for the adapted REUI recipe; retain the local adapters.
// Owned responsive correction to the actual attributed REUI recipe.
"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { Button } from "../../../adapters/controls";
import { ButtonGroup } from "../../../adapters/controls";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../adapters/overlays";
import { IconPlaceholder } from "../../../adapters/icons";

const orderTypes = [
  {
    id: "market",
    label: "Market",
    tooltip: "Execute immediately at best available price",
    icon: (
      <IconPlaceholder
        lucide="TrendingUpIcon"
        tabler="IconTrendingUp"
        hugeicons="TrendUp01Icon"
        phosphor="TrendUpIcon"
        remixicon="RiStockLine"
        aria-hidden="true"
      />
    ),
  },
  {
    id: "limit",
    label: "Limit",
    tooltip: "Execute only at your specified price or better",
    icon: (
      <IconPlaceholder
        lucide="TargetIcon"
        tabler="IconTarget"
        hugeicons="Target01Icon"
        phosphor="TargetIcon"
        remixicon="RiFocus3Line"
        aria-hidden="true"
      />
    ),
  },
  {
    id: "stop",
    label: "Stop",
    tooltip: "Trigger a market order at stop level",
    icon: (
      <IconPlaceholder
        lucide="ShieldAlertIcon"
        tabler="IconShieldExclamation"
        hugeicons="SecurityPasswordIcon"
        phosphor="ShieldWarningIcon"
        remixicon="RiShieldLine"
        aria-hidden="true"
      />
    ),
  },
  {
    id: "stop-limit",
    label: "Stop-Limit",
    tooltip: "Trigger a limit order at stop level",
    icon: (
      <IconPlaceholder
        lucide="ShieldCheckIcon"
        tabler="IconShieldCheck"
        hugeicons="SecurityCheckIcon"
        phosphor="ShieldCheckIcon"
        remixicon="RiShieldCheckLine"
        aria-hidden="true"
      />
    ),
  },
];

export default function Pattern() {
  const [active, setActive] = useState("market");

  const container = useRef<HTMLDivElement>(null);
  const [vertical, setVertical] = useState(false);
  useLayoutEffect(() => {
    const node = container.current;
    if (!node) return;
    // The actual original native row needs 396px (100 + 86 + 86 + 124).
    const update = () => setVertical(node.clientWidth < 396);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={container}
      role="group"
      aria-label="Order type"
      style={{ width: "100%", maxWidth: 396, minWidth: 0 }}
    >
      <TooltipProvider>
        <ButtonGroup
          orientation={vertical ? "vertical" : "horizontal"}
          style={{ width: vertical ? "100%" : undefined, gap: 0 }}
        >
          {orderTypes.map((type) => (
            <Tooltip key={type.id}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  aria-pressed={active === type.id}
                  style={{
                    width: vertical ? "100%" : undefined,
                    background:
                      active === type.id ? "var(--ku-subtle)" : undefined,
                    borderColor:
                      active === type.id ? "var(--ku-focus)" : undefined,
                  }}
                  onClick={() => setActive(type.id)}
                >
                  {type.icon}
                  {type.label}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-52 text-center">
                {type.tooltip}
              </TooltipContent>
            </Tooltip>
          ))}
        </ButtonGroup>
      </TooltipProvider>
    </div>
  );
}
