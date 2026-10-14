"use client"

import { useState } from "react"
import { Badge } from "../../../../../../../adapters/structured.tsx"

import { cn } from "cn"
import { Button } from "../../../../../../../adapters/controls.tsx"
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../../../../adapters/overlays.tsx"
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

const models = [
  {
    id: "gpt4o",
    label: "GPT-4o",
    badge: "Fast",
    badgeVariant: "success-light" as const,
    tooltip: "128k context, fastest response",
    icon: (
      <IconPlaceholder
        lucide="ZapIcon"
        tabler="IconBolt"
        hugeicons="LightningIcon"
        phosphor="LightningIcon"
        remixicon="RiFlashlightLine"
        aria-hidden="true"
      />
    ),
  },
  {
    id: "claude",
    label: "Claude",
    badge: "Pro",
    badgeVariant: "info-light" as const,
    tooltip: "200k context, best for analysis",
    icon: (
      <IconPlaceholder
        lucide="BrainIcon"
        tabler="IconBrain"
        hugeicons="AiBrain01Icon"
        phosphor="BrainIcon"
        remixicon="RiBrainLine"
        aria-hidden="true"
      />
    ),
  },
  {
    id: "gemini",
    label: "Gemini",
    badge: "Preview",
    badgeVariant: "warning-light" as const,
    tooltip: "1M context, experimental",
    icon: (
      <IconPlaceholder
        lucide="FlaskConicalIcon"
        tabler="IconFlask"
        hugeicons="ExperimentIcon"
        phosphor="FlaskIcon"
        remixicon="RiFlaskLine"
        aria-hidden="true"
      />
    ),
  },
]

export default function Pattern() {
  const [active, setActive] = useState("claude")

  return (
    <ButtonGroup>
      <TooltipProvider>
        {models.map((model) => (
          <Tooltip key={model.id}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className={cn(active === model.id ? "bg-muted" : "")}
                onClick={() => setActive(model.id)}
              >
                {model.icon}
                {model.label}
                <Badge variant={model.badgeVariant} size="xs">
                  {model.badge}
                </Badge>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{model.tooltip}</TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </ButtonGroup>
  )
}
