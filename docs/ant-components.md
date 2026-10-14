# Canonical Ant components

Import controls from `@kooyaph/ui/components`. Every stable value exported by the
pinned `antd@6.6.5` public entry is re-exported directly, including newer families
such as BorderBeam, Listy, Masonry and Splitter. All public Ant type exports are
available from the same entry. No primitive wrapper changes component identity,
props, events, generic inference, refs or compound members. The unstable renderer
hook is excluded.

```tsx
import { createRef } from "react";
import { KooyaProvider } from "@kooyaph/ui/foundations";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Space,
  Upload,
  type InputRef,
} from "@kooyaph/ui/components";
import "@kooyaph/ui/styles.css";

const inputRef = createRef<InputRef>();

export function Example() {
  return (
    <KooyaProvider>
      <Form onFinish={(values) => console.log(values)}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input ref={inputRef} />
        </Form.Item>
        <Input.Password />
        <Input.Search />
        <Input.TextArea />
        <Input.OTP length={6} />
        <Radio.Group options={["One", "Two"]} />
        <DatePicker.RangePicker />
        <Space.Compact>
          <Button type="primary" htmlType="submit">
            Save locally
          </Button>
          <Button onClick={() => inputRef.current?.focus()}>Focus name</Button>
        </Space.Compact>
        <Upload.Dragger beforeUpload={() => false}>
          Choose fictional files
        </Upload.Dragger>
      </Form>
    </KooyaProvider>
  );
}
```

Use Ant props such as `Button type="primary"`, `Input onChange`, `Select onChange`
and `Switch onChange`. Legacy Kooya primitive aliases such as `Button
variant="primary"`, `TextField`, or `onCheckedChange` are not the canonical control
contract. During migration existing atomic collection imports and root aliases
remain to keep templates and Storybook buildable. `AntComponents` is a staged root
namespace for direct Ant access; `/components` is the canonical entry. Root alias
removal is coordinated after consumer migration.

The provider API lives at `/foundations` and the stylesheet at `/styles.css`.
React, React DOM and exact Ant peers remain external to the build; the component
entry is a re-export module. Existing `/templates` remains separate. New groups,
blocks, sections and advanced-engine entries are added only when their actual
implementations exist, so this foundation advertises no placeholder collections
and imports no heavy editor/chart/flow engines.

`packages/ui/tests/types/ant-consumer.tsx` compiles against built public package
entries and exercises compound controls, generic forms/selects/tables/numbers and
refs. `canonical-components.test.tsx` verifies identity, compounds, focus refs and
real Ant form submission/validation. `ant-foundation.browser.js` qualifies brand
contrast, native portal surfaces, density and motion in a real browser.
