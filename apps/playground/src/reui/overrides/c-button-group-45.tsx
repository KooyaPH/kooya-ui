// Owned responsive correction to the actual attributed REUI recipe.
"use client";

import { useState } from "react";

import { cn } from "cn";
import { Button } from "../adapters/controls";
import { ButtonGroup, ButtonGroupText } from "../adapters/controls";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../adapters/overlays";
import { IconPlaceholder } from "../adapters/icons";

const environments = [
  {
    id: "development",
    label: "Dev",
    tooltip: "Local development environment",
    icon: (
      <IconPlaceholder
        lucide="Code2Icon"
        tabler="IconCode"
        hugeicons="Code01Icon"
        phosphor="CodeIcon"
        remixicon="RiCodeLine"
        aria-hidden="true"
      />
    ),
  },
  {
    id: "staging",
    label: "Staging",
    tooltip: "Pre-production mirror",
    icon: (
      <IconPlaceholder
        lucide="TestTube2Icon"
        tabler="IconTestPipe"
        hugeicons="TestTube01Icon"
        phosphor="TestTubeIcon"
        remixicon="RiTestTubeLine"
        aria-hidden="true"
      />
    ),
  },
  {
    id: "production",
    label: "Production",
    tooltip: "Live environment — affects real users",
    icon: (
      <IconPlaceholder
        lucide="GlobeIcon"
        tabler="IconWorld"
        hugeicons="Globe02Icon"
        phosphor="GlobeIcon"
        remixicon="RiGlobalLine"
        aria-hidden="true"
      />
    ),
  },
];

export default function Pattern() {
  const [active, setActive] = useState("development");

  return (
    <ButtonGroup
      role="group"
      aria-label="Environment"
      style={{ flexWrap: "wrap", gap: 8, maxWidth: 384, minWidth: 0 }}
    >
      <TooltipProvider>
        {environments.map((env) => (
          <Tooltip key={env.id}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                aria-pressed={active === env.id}
                style={{
                  backgroundColor:
                    active === env.id ? "var(--ku-subtle)" : undefined,
                  borderColor:
                    active === env.id ? "var(--ku-focus)" : undefined,
                }}
                className={cn(active === env.id ? "bg-muted" : "")}
                onClick={() => setActive(env.id)}
              >
                {env.icon}
                {env.label}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{env.tooltip}</TooltipContent>
          </Tooltip>
        ))}
        {active === "production" ? (
          <ButtonGroupText
            className="bg-transparent"
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <div className="bg-success size-1.5 rounded-full" />
            <span>Live</span>
          </ButtonGroupText>
        ) : null}
      </TooltipProvider>
    </ButtonGroup>
  );
}
