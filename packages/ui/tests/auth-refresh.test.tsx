import { expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  AuthLayout,
  AuthMethodChoice,
  AuthWorkspacePreview,
  OtpCodeInput,
} from "../src";

it("split auth retains one task heading and a native form without repeating identity", () => {
  const { container } = render(
    <AuthLayout
      presentation="split"
      brand="KooyaHQ"
      title="Sign in"
      introduction={<h2>Your team. One workspace.</h2>}
      visual={
        <AuthWorkspacePreview
          columns={[{ title: "Planned", cards: ["Sample task"] }]}
        />
      }
    >
      <form>
        <label>
          Email
          <input name="email" />
        </label>
        <button>Continue</button>
      </form>
    </AuthLayout>,
  );
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  expect(screen.getAllByText("KooyaHQ")).toHaveLength(1);
  expect(container.querySelector(".ku-auth-layout__task form")).not.toBeNull();
  expect(
    container.querySelector(".ku-auth-preview")?.getAttribute("aria-hidden"),
  ).toBe("true");
});
it("auth methods retain caller-owned actions and provider availability", () => {
  const onEmail = vi.fn(),
    onGoogle = vi.fn();
  render(
    <AuthMethodChoice
      googleAvailable={false}
      onEmail={onEmail}
      onGoogle={onGoogle}
    />,
  );
  expect(
    screen.queryByRole("button", { name: "Continue with Google" }),
  ).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Continue with email" }));
  expect(onEmail).toHaveBeenCalledOnce();
  expect(onGoogle).not.toHaveBeenCalled();
});
it("OTP paste retains the six-digit controlled value and focus movement", () => {
  const onChange = vi.fn();
  render(<OtpCodeInput value="" onChange={onChange} />);
  const first = screen.getByRole("textbox", { name: "Digit 1 of 6" });
  fireEvent.paste(first, { clipboardData: { getData: () => "12 34 56" } });
  expect(onChange).toHaveBeenCalledWith("123456");
  expect(document.activeElement).toBe(
    screen.getByRole("textbox", { name: "Digit 6 of 6" }),
  );
});
