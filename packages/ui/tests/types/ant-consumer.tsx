import { createRef } from "react";
import { KooyaProvider, useKooyaFeedback } from "@kooyaph/ui/foundations";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Table,
  Upload,
  type ButtonProps,
  type FormInstance,
  type GetRef,
  type InputRef,
  type RefSelectProps,
  type TableColumnsType,
  type TableRef,
  type UploadRef,
} from "@kooyaph/ui/components";

interface Row {
  key: string;
  name: string;
}
const input = createRef<InputRef>();
const select = createRef<RefSelectProps>();
const table = createRef<TableRef>();
const upload = createRef<UploadRef>();
const range = createRef<GetRef<typeof DatePicker.RangePicker>>();
const number = createRef<GetRef<typeof InputNumber>>();
const button = createRef<GetRef<typeof Button>>();
const form = createRef<FormInstance<{ name: string }>>();
const columns: TableColumnsType<Row> = [{ dataIndex: "name", title: "Name" }];
const action: ButtonProps = {
  type: "primary",
  htmlType: "submit",
  loading: false,
};

function LocalForm() {
  const feedback = useKooyaFeedback();
  return (
    <Form<{ name: string }>
      ref={form}
      onFinish={(values) => feedback.message.success(values.name)}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input ref={input} />
      </Form.Item>
      <Input.Password />
      <Input.Search onSearch={(value) => feedback.message.info(value)} />
      <Input.TextArea />
      <Input.OTP length={6} />
      <InputNumber<number>
        ref={number}
        onChange={(value) => {
          const n: number | null = value;
          void n;
        }}
      />
      <Select<string>
        ref={select}
        options={[{ value: "local", label: "Local" }]}
        onChange={(value) => {
          const text: string = value;
          void text;
        }}
      />
      <Radio.Group options={["One", "Two"]} />
      <DatePicker.RangePicker ref={range} />
      <Space.Compact>
        <Button {...action} ref={button}>
          Save
        </Button>
        <Button>Reset</Button>
      </Space.Compact>
      <Table<Row>
        ref={table}
        columns={columns}
        dataSource={[{ key: "local", name: "Fictional" }]}
      />
      <Upload ref={upload} beforeUpload={() => false}>
        <Button>Pick file</Button>
      </Upload>
      <Upload.Dragger beforeUpload={() => false}>Drop locally</Upload.Dragger>
    </Form>
  );
}
export function Consumer() {
  return (
    <KooyaProvider mode="dark" density="compact" reducedMotion>
      <LocalForm />
    </KooyaProvider>
  );
}
input.current?.focus();
select.current?.focus();
table.current?.scrollTo({ key: "local" });
range.current?.focus();
number.current?.focus();
button.current?.focus();
form.current?.validateFields();
// @ts-expect-error Actual Ant props do not accept the legacy wrapper variant.
const invalid: ButtonProps = { variant: "primary" };
void invalid;
