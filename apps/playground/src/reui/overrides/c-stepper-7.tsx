// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { Badge } from "../adapters/structured"
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "../adapters/structured"

import { Button } from "../adapters/controls"
import { IconPlaceholder } from "../adapters/icons"

const steps = [
  {
    title: "User Details",
    icon: (
      <IconPlaceholder
        lucide="BookUserIcon"
        tabler="IconUserSquareRounded"
        hugeicons="UserSquareIcon"
        phosphor="UserSquareIcon"
        remixicon="RiContactsBook2Line"
        className="size-4"
      />
    ),
  },
  {
    title: "Payment Info",
    icon: (
      <IconPlaceholder
        lucide="CreditCardIcon"
        tabler="IconCreditCard"
        hugeicons="CreditCardIcon"
        phosphor="CreditCardIcon"
        remixicon="RiBankCardLine"
        className="size-4"
      />
    ),
  },
  {
    title: "Auth OTP",
    icon: (
      <IconPlaceholder
        lucide="LockIcon"
        tabler="IconLock"
        hugeicons="SquareLock01Icon"
        phosphor="LockSimpleIcon"
        remixicon="RiLockLine"
        className="size-4"
      />
    ),
  },
]

export default function Pattern() {
  const [currentStep, setCurrentStep] = useState(2)
  const frame = useRef<HTMLDivElement>(null)
  const [vertical, setVertical] = useState(false)
  useLayoutEffect(() => {
    const node = frame.current
    if (!node) return
    const measure = () => setVertical(node.getBoundingClientRect().width < 440)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={frame} style={{ width: "100%", maxWidth: 576, minWidth: 0 }}>
    <Stepper
      orientation={vertical ? "vertical" : "horizontal"}
      value={currentStep}
      onValueChange={setCurrentStep}
      indicators={{
        completed: (
          <IconPlaceholder
            lucide="CheckIcon"
            tabler="IconCheck"
            hugeicons="Tick02Icon"
            phosphor="CheckIcon"
            remixicon="RiCheckLine"
            className="size-3.5"
          />
        ),
        loading: (
          <IconPlaceholder
            lucide="LoaderCircleIcon"
            tabler="IconLoader2"
            hugeicons="Loading02Icon"
            phosphor="CircleNotchIcon"
            remixicon="RiLoader4Line"
            className="size-3.5 animate-spin"
          />
        ),
      }}
      className="w-full max-w-xl space-y-8"
    >
      <StepperNav className="gap-3">
        {steps.map((step, index) => (
          <StepperItem
            key={index}
            step={index + 1}
            className="relative flex-1 items-start"
          >
            <StepperTrigger
              aria-label={step.title}
              style={{ width: "100%", minWidth: 0, minHeight: 44, height: "auto", padding: 0, whiteSpace: "normal", flexDirection: "column", alignItems: "flex-start", gap: 10 }}
              className="flex grow flex-col items-start justify-center gap-2.5"
              asChild
            >
              <StepperIndicator className="data-[state=inactive]:border-border data-[state=inactive]:text-muted-foreground data-[state=completed]:bg-success size-8 border-2 data-[state=completed]:text-white data-[state=inactive]:bg-transparent">
                {step.icon}
              </StepperIndicator>
              <div className="flex flex-col items-start gap-1">
                <div className="text-muted-foreground text-[10px] font-semibold uppercase">
                  Step {index + 1}
                </div>
                <StepperTitle className="group-data-[state=inactive]/step:text-muted-foreground text-start text-base font-semibold">
                  {step.title}
                </StepperTitle>
                <div>
                  <Badge
                    size="sm"
                    variant="primary-light"
                    className="hidden! group-data-[state=active]/step:inline-flex!"
                  >
                    In Progress
                  </Badge>
                  <Badge
                    variant="success-light"
                    size="sm"
                    className="hidden! group-data-[state=completed]/step:inline-flex!"
                  >
                    Completed
                  </Badge>
                  <Badge
                    variant="secondary"
                    size="sm"
                    className="text-muted-foreground hidden! group-data-[state=inactive]/step:inline-flex!"
                  >
                    Pending
                  </Badge>
                </div>
              </div>
            </StepperTrigger>

            {steps.length > index + 1 && (
              <StepperSeparator style={vertical ? { position: "static", marginInlineStart: 15, marginBlockStart: 8 } : { width: "calc(100% - 2rem)" }} className="group-data-[state=completed]/step:bg-success absolute inset-x-0 start-9 top-4 m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
            )}
          </StepperItem>
        ))}
      </StepperNav>

      <StepperPanel className="text-sm">
        {steps.map((step, index) => (
          <StepperContent
            key={index}
            value={index + 1}
            className="flex items-center justify-center"
          >
            {step.title} content
          </StepperContent>
        ))}
      </StepperPanel>

      <div className="flex items-center justify-between gap-2.5">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => setCurrentStep((prev) => prev + 1)}
          disabled={currentStep === steps.length}
        >
          Next
        </Button>
      </div>
    </Stepper>
    </div>
  )
}
