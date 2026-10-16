import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { KooyaProvider } from "@kooyaph/ui/foundations";
import {
  Stepper,
  StepperItem,
  StepperNav,
  StepperTrigger,
  StepperIndicator,
} from "../../../apps/playground/src/reui/adapters/structured";
import {
  Timeline,
  TimelineItem,
  TimelineTitle,
} from "../../../apps/playground/src/reui/adapters/structured";
import { TimelineDate as SDate } from "../../../apps/playground/src/reui/adapters/structured";
import { Badge } from "../../../apps/playground/src/reui/adapters/structured";

describe("REUI native structured engines", () => {
  it("renders compound steps through actual Ant Steps", () => {
    const { container } = render(
      <KooyaProvider>
        <Stepper>
          <StepperNav>
            <StepperItem step={1}>
              <StepperTrigger>
                <StepperIndicator>1</StepperIndicator>First step
              </StepperTrigger>
            </StepperItem>
          </StepperNav>
        </Stepper>
      </KooyaProvider>,
    );
    expect(screen.getByRole("tab", { name: /First step/ })).toBeInTheDocument();
    expect(container.querySelector(".ant-steps")).toBeInTheDocument();
  });
  it("renders timeline composition through actual Ant Timeline", () => {
    const { container } = render(
      <KooyaProvider>
        <Timeline>
          <TimelineItem step={1}>
            <TimelineTitle>Fictional event</TimelineTitle>
          </TimelineItem>
        </Timeline>
      </KooyaProvider>,
    );
    expect(screen.getByText("Fictional event")).toBeInTheDocument();
    expect(container.querySelector(".ant-timeline")).toBeInTheDocument();
  });
  it("renders badge content through actual Ant Tag", () => {
    render(
      <KooyaProvider>
        <Badge variant="success" size="lg">
          Saved locally
        </Badge>
      </KooyaProvider>,
    );
    expect(screen.getByText("Saved locally")).toHaveClass("ant-tag");
  });
});

it("preserves external navigation, loading indicators and controlled step panels", async () => {
  const { useState } = await import("react");
  const { default: userEvent } = await import("@testing-library/user-event");
  const S = await import(
    "../../../apps/playground/src/reui/adapters/structured"
  );
  function Actions() {
    const context = S.useStepper();
    return (
      <>
        <button onClick={() => context.setActiveStep(context.activeStep - 1)}>
          Previous
        </button>
        <button onClick={() => context.setActiveStep(context.activeStep + 1)}>
          Next
        </button>
      </>
    );
  }
  function Icon() {
    const item = S.useStepItem();
    return <span>{item.isLoading ? "Saving step" : item.state}</span>;
  }
  function Fixture() {
    const [value, setValue] = useState(1);
    return (
      <KooyaProvider>
        <S.Stepper
          value={value}
          onValueChange={setValue}
          indicators={{ loading: <Icon /> }}
        >
          <S.StepperNav>
            <S.StepperItem step={1} loading>
              <S.StepperTrigger>
                <S.StepperIndicator>One</S.StepperIndicator>Details
              </S.StepperTrigger>
            </S.StepperItem>
            <S.StepperItem step={2}>
              <S.StepperTrigger>Review</S.StepperTrigger>
            </S.StepperItem>
          </S.StepperNav>
          <S.StepperPanel>
            <S.StepperContent value={1}>First panel</S.StepperContent>
            <S.StepperContent value={2}>Review panel</S.StepperContent>
          </S.StepperPanel>
          <Actions />
        </S.Stepper>
      </KooyaProvider>
    );
  }
  render(<Fixture />);
  const user = userEvent.setup();
  expect(screen.getByText("Saving step")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Next" }));
  expect(screen.getByRole("tab", { name: "Review" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Review panel");
  await user.click(screen.getByRole("button", { name: "Previous" }));
  expect(screen.getByRole("tabpanel")).toHaveTextContent("First panel");
});

it("skips disabled tabs during keyboard navigation and honors canceled asChild activation", async () => {
  const { default: userEvent } = await import("@testing-library/user-event");
  const S = await import(
    "../../../apps/playground/src/reui/adapters/structured"
  );
  render(
    <KooyaProvider>
      <S.Stepper>
        <S.StepperNav>
          <S.StepperItem step={1}>
            <S.StepperTrigger>First</S.StepperTrigger>
          </S.StepperItem>
          <S.StepperItem step={2} disabled>
            <S.StepperTrigger>Disabled</S.StepperTrigger>
          </S.StepperItem>
          <S.StepperItem step={3}>
            <S.StepperTrigger asChild>
              <button onClick={(event) => event.preventDefault()}>
                Canceled
              </button>
            </S.StepperTrigger>
          </S.StepperItem>
        </S.StepperNav>
      </S.Stepper>
    </KooyaProvider>,
  );
  const user = userEvent.setup();
  screen.getByRole("tab", { name: "First" }).focus();
  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("tab", { name: "Canceled" })).toHaveFocus();
  await user.keyboard("{Enter}");
  expect(screen.getByRole("tab", { name: "First" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  expect(screen.getByRole("tab", { name: "Disabled" })).toBeDisabled();
});

it("retains semantic timeline dates and linked badges with readable secondary text", () => {
  const { container } = render(
    <KooyaProvider>
      <Timeline>
        <TimelineItem step={1}>
          <TimelineTitle>Record created</TimelineTitle>
          <SDate dateTime="2026-10-13">October 13</SDate>
        </TimelineItem>
      </Timeline>
      <Badge variant="secondary" asChild>
        <a href="#local-record">Open record</a>
      </Badge>
    </KooyaProvider>,
  );
  expect(container.querySelector("time")).toHaveAttribute(
    "datetime",
    "2026-10-13",
  );
  expect(screen.getByRole("link", { name: "Open record" })).toHaveAttribute(
    "href",
    "#local-record",
  );
  const tag = container.querySelector(".ant-tag") as HTMLElement;
  expect(tag.style.color).not.toBe(tag.style.background);
});
