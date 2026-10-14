import { createRef, useState } from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import * as Ant from "antd";
import * as Components from "../src/components";
import { KooyaProvider } from "../src/foundations";

describe("canonical Ant components", () => {
  it("retains every stable Ant export and excludes the unstable renderer hook", () => {
    for (const [name, value] of Object.entries(Ant)) {
      if (name === "unstableSetRender") continue;
      expect(Components[name as keyof typeof Components], name).toBe(value);
    }
    expect(Components).not.toHaveProperty("unstableSetRender");
  });

  it("preserves canonical compound controls without aliases or wrappers", () => {
    expect(Components.Input.Password).toBe(Ant.Input.Password);
    expect(Components.Input.Search).toBe(Ant.Input.Search);
    expect(Components.Input.TextArea).toBe(Ant.Input.TextArea);
    expect(Components.Input.OTP).toBe(Ant.Input.OTP);
    expect(Components.Form.Item).toBe(Ant.Form.Item);
    expect(Components.Form.List).toBe(Ant.Form.List);
    expect(Components.Radio.Group).toBe(Ant.Radio.Group);
    expect(Components.DatePicker.RangePicker).toBe(Ant.DatePicker.RangePicker);
    expect(Components.Space.Compact).toBe(Ant.Space.Compact);
    expect(Components.Upload.Dragger).toBe(Ant.Upload.Dragger);
    expect(Components.Table.Column).toBe(Ant.Table.Column);
  });

  it("retains Ant Input and Button imperative refs", async () => {
    const input = createRef<Components.InputRef>();
    const button = createRef<Components.GetRef<typeof Components.Button>>();
    render(
      <KooyaProvider>
        <Components.Input aria-label="Name" ref={input} />
        <Components.Button ref={button}>Continue</Components.Button>
      </KooyaProvider>,
    );
    act(() => input.current?.focus());
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveFocus();
    expect(input.current?.input).toBe(
      screen.getByRole("textbox", { name: "Name" }),
    );
    act(() => button.current?.focus());
    expect(screen.getByRole("button", { name: "Continue" })).toHaveFocus();
    await userEvent.type(
      screen.getByRole("textbox", { name: "Name" }),
      "Fictional user",
    );
    expect(input.current?.input?.value).toBe("Fictional user");
  });

  it("uses Ant Form.Item validation and native submit behavior", async () => {
    function LocalForm() {
      const [saved, setSaved] = useState("");
      return (
        <KooyaProvider reducedMotion>
          <Components.Form<{ name: string }>
            onFinish={(values) => setSaved(values.name)}
          >
            <Components.Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Enter a name" }]}
            >
              <Components.Input />
            </Components.Form.Item>
            <Components.Button htmlType="submit" type="primary">
              Save locally
            </Components.Button>
            <output aria-label="Saved name">{saved}</output>
          </Components.Form>
        </KooyaProvider>
      );
    }
    render(<LocalForm />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Save locally" }));
    expect(await screen.findByText("Enter a name")).toBeInTheDocument();
    await user.type(screen.getByRole("textbox", { name: "Name" }), "Morgan");
    await user.click(screen.getByRole("button", { name: "Save locally" }));
    await waitFor(() =>
      expect(screen.getByLabelText("Saved name")).toHaveTextContent("Morgan"),
    );
    // Ant delays clearing validation errors; observe that completion before teardown.
    await waitFor(() =>
      expect(screen.queryByText("Enter a name")).not.toBeInTheDocument(),
    );
  });
});
