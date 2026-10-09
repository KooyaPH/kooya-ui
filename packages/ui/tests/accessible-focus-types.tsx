import { createRef } from "react";
import {
  Button,
  ChoiceSelect,
  Input,
  Popup,
  type ChoiceSelectProps,
  type ChoiceSelectRef,
  type InputRef,
} from "@kooyaph/ui";
import {
  ChoiceSelect as MoleculeChoice,
  type ChoiceSelectRef as MoleculeRef,
} from "@kooyaph/ui/molecules";
import { type InputRef as AtomInputRef } from "@kooyaph/ui/atoms";
const single = createRef<ChoiceSelectRef>(),
  multiple = createRef<MoleculeRef>(),
  input = createRef<InputRef>(),
  native = createRef<HTMLInputElement>();
const atom: AtomInputRef | null = input.current;
atom?.focus({ preventScroll: true });
single.current?.focus({ preventScroll: true });
multiple.current?.blur();
export const examples = (
  <>
    <ChoiceSelect
      ref={single}
      label="Single"
      options={[]}
      value="one"
      onValueChange={(value) => value.toUpperCase()}
    />
    <MoleculeChoice
      ref={multiple}
      label="Multiple"
      multiple
      options={[]}
      value={["one"]}
      onValueChange={(values) => values.map((value) => value.toUpperCase())}
    />
    <Popup
      label="Choice"
      trigger={<Button>Choice</Button>}
      initialFocusRef={single}
    >
      <ChoiceSelect
        ref={single}
        label="Search"
        options={[]}
        onValueChange={() => {}}
      />
    </Popup>
    <Popup
      label="Public input"
      trigger={<Button>Input</Button>}
      initialFocusRef={input}
    >
      <Input ref={input} />
    </Popup>
    <Popup
      label="Native"
      trigger={<Button>Native</Button>}
      initialFocusRef={native}
    >
      <input ref={native} />
    </Popup>
  </>
);
// @ts-expect-error Multiple choices require an array value.
const invalidValue: ChoiceSelectProps = {
  label: "Bad",
  options: [],
  multiple: true,
  value: "one",
  onValueChange: (_: string[]) => {},
};
const invalidCallback = (
  // @ts-expect-error Single choices emit a string, not an array.
  <ChoiceSelect
    ref={single}
    label="Bad"
    options={[]}
    onValueChange={(_: string[]) => {}}
  />
);
void invalidValue;
void invalidCallback;
