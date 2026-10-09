import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, ChoiceSelect, Popup, type ChoiceSelectRef } from "@kooyaph/ui";
const meta: Meta = { title: "Molecules/Anchored search" };
export default meta;
export const InitialSearchFocus: StoryObj = {
  render: function Example() {
    const ref = useRef<ChoiceSelectRef>(null);
    const [value, setValue] = useState<string>();
    return (
      <Popup
        label="Choose a person"
        initialFocusRef={ref}
        trigger={<Button>Choose person</Button>}
      >
        <ChoiceSelect
          ref={ref}
          label="Search people"
          value={value}
          options={[
            { value: "alex", label: "Alex" },
            { value: "sam", label: "Sam" },
          ]}
          onValueChange={setValue}
          footer={
            <Button onClick={() => setValue(undefined)}>Reset person</Button>
          }
        />
      </Popup>
    );
  },
};
