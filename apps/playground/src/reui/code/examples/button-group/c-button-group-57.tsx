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

const modes = [
  {
    id: "assist",
    label: "Assist",
    icon: (
      <IconPlaceholder
        lucide="MessageSquareIcon"
        tabler="IconMessageCircle"
        hugeicons="Message02Icon"
        phosphor="ChatCircleIcon"
        remixicon="RiChat3Line"
        className="size-3.5 opacity-60"
        aria-hidden="true"
      />
    ),
  },
  {
    id: "review",
    label: "Review",
    icon: (
      <IconPlaceholder
        lucide="ShieldCheckIcon"
        tabler="IconShieldCheck"
        hugeicons="ShieldEnergyIcon"
        phosphor="ShieldCheckIcon"
        remixicon="RiShieldCheckLine"
        className="size-3.5 opacity-60"
        aria-hidden="true"
      />
    ),
  },
  {
    id: "auto",
    label: "Auto",
    icon: (
      <IconPlaceholder
        lucide="ZapIcon"
        tabler="IconBolt"
        hugeicons="LightningIcon"
        phosphor="LightningIcon"
        remixicon="RiFlashlightLine"
        className="size-3.5 opacity-60"
        aria-hidden="true"
      />
    ),
  },
] as const;

const limits = ["2k credits", "10k credits", "Unlimited"];

type ModeId = (typeof modes)[number]["id"];

export default function Pattern() {
  const [active, setActive] = useState<ModeId>("review");
  const [limit, setLimit] = useState(limits[1]);

  const container = useRef<HTMLDivElement>(null);
  const [vertical, setVertical] = useState(false);
  useLayoutEffect(() => {
    const node = container.current;
    if (!node) return;
    const update = () => setVertical(node.clientWidth < 352);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={container}
      role="group"
      aria-label="AI mode and credit cap"
      style={{ width: "100%", maxWidth: 384, minWidth: 0 }}
    >
      <ButtonGroup
        orientation={vertical ? "vertical" : "horizontal"}
        style={{ maxWidth: "100%", width: vertical ? "100%" : undefined }}
      >
        {modes.map((mode) => (
          <Button
            key={mode.id}
            variant="outline"
            size="sm"
            aria-pressed={active === mode.id}
            style={{
              backgroundColor:
                active === mode.id ? "var(--ku-subtle)" : undefined,
              borderColor: active === mode.id ? "var(--ku-focus)" : undefined,
            }}
            className={cn(active === mode.id && "bg-muted")}
            onClick={() => setActive(mode.id)}
          >
            {mode.icon}
            {mode.label}
          </Button>
        ))}
        <ButtonGroupSeparator />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
              aria-label="Select credit cap"
            >
              {limit}
              <IconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDown01Icon"
                phosphor="CaretDownIcon"
                remixicon="RiArrowDownSLine"
                className="size-3 opacity-60"
                aria-hidden="true"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuGroup>
              {limits.map((item) => (
                <DropdownMenuItem key={item} onClick={() => setLimit(item)}>
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </div>
  );
}
