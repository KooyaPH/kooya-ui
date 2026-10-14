import React, { useRef, useState } from 'react';
import { KooyaProvider, useKooyaOptions } from '@kooyaph/ui';
import { Button, Input, Space, type ButtonProps } from '@kooyaph/ui/components';
import { PlusOutlined } from '@ant-design/icons';
import { getNativeDemo } from '../../reui/native';

const CatalogButton = getNativeDemo('Button');
function enumValue<const T extends readonly string[]>(query: URLSearchParams, key: string, values: T, fallback?: T[number]): T[number] | undefined {
  const supplied = query.getAll(key);
  if (supplied.length > 1) throw Error(`Ambiguous Button ${key}: multiple values`);
  const value = supplied[0];
  if (value === undefined) return fallback;
  if (!values.includes(value)) throw Error(`Unsupported Button ${key}: ${value}`);
  return value as T[number];
}
function booleanValue(query: URLSearchParams, key: string, fallback = false): boolean {
  return enumValue(query, key, ['true', 'false'], fallback ? 'true' : 'false') === 'true';
}
function loadingDelay(query: URLSearchParams): number | undefined {
  const supplied = query.getAll('delay');
  if (supplied.length > 1) throw Error('Ambiguous Button loading delay: multiple values');
  if (supplied.length === 0) return undefined;
  const value = Number(supplied[0]);
  if (supplied[0].trim() === '' || !Number.isFinite(value) || value < 0 || value > 60_000) throw Error(`Unsupported Button loading delay: ${supplied[0]}`);
  return value;
}
const labels = {
  normal: 'Create project',
  sentence: 'Create a new project and invite everyone who will collaborate on its design and delivery',
  long: 'Create project with unusually detailed requirements and preserve every visible word. '.repeat(3),
  unbroken: 'W'.repeat(512),
  unicode: 'إنشاء مشروع جديد — 日本語 🧑🏽‍💻 e\u0301 / Z\u200dW\u200dJ',
  chinese: '确定',
  empty: '',
};
export default function ButtonReview({ profile = 'signature' }: { profile?: string }) {
  const inherited = useKooyaOptions();
  if (!['signature', 'canvas', 'client', 'mosaic'].includes(profile)) throw Error(`Unsupported Button preset ${profile}`);
  const query = new URLSearchParams(location.search);
  const [clicks, setClicks] = useState(0), [submits, setSubmits] = useState(0), [resets, setResets] = useState(0);
  const [busy, setBusy] = useState(booleanValue(query, 'loading'));
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const labelKey = enumValue(query, 'label', ['normal', 'sentence', 'long', 'unbroken', 'unicode', 'chinese', 'empty'], 'normal')!;
  const delay = loadingDelay(query);
  const narrow = booleanValue(query, 'narrow');
  const props: ButtonProps = {
    type: enumValue(query, 'type', ['default', 'primary', 'dashed', 'link', 'text'], 'primary'),
    size: enumValue(query, 'size', ['small', 'middle', 'large'], 'middle'),
    shape: enumValue(query, 'shape', ['default', 'circle', 'round', 'square'], 'default'),
    variant: enumValue(query, 'variant', ['outlined', 'dashed', 'solid', 'filled', 'text', 'link']),
    color: enumValue(query, 'color', ['default', 'primary', 'danger', 'blue', 'purple', 'cyan', 'green', 'magenta', 'pink', 'red', 'orange', 'yellow', 'volcano', 'geekblue', 'lime', 'gold']),
    iconPlacement: enumValue(query, 'iconPlacement', ['start', 'end'], 'start'),
    icon: booleanValue(query, 'icon') ? <PlusOutlined /> : undefined,
    danger: booleanValue(query, 'danger'), disabled: booleanValue(query, 'disabled'),
    block: booleanValue(query, 'block'), ghost: booleanValue(query, 'ghost'),
    autoInsertSpace: booleanValue(query, 'autoInsertSpace', true),
    loading: booleanValue(query, 'customLoading') ? { icon: <span role="img" aria-label="Saving">…</span> } : delay !== undefined ? { delay } : busy,
    htmlType: enumValue(query, 'htmlType', ['submit', 'button', 'reset'], 'button'),
    href: booleanValue(query, 'href') ? '#button-destination' : undefined,
    'aria-label': labelKey === 'empty' ? 'Create project' : undefined,
  };
  return <KooyaProvider theme={profile as 'signature' | 'canvas' | 'client' | 'mosaic'} mode={inherited.mode} density={inherited.density} reducedMotion={inherited.reducedMotion}>
    <section data-button-catalog><CatalogButton /></section>
    <section aria-label="Button API review" data-button-fixture style={{ marginBlockStart: 24, minWidth: 0 }}>
      <form onSubmit={event => { event.preventDefault(); setSubmits(value => value + 1); }} onReset={() => setResets(value => value + 1)}>
        <Input aria-label="Local project draft" defaultValue="Kooya draft" />
        <div data-button-constraint style={{ minWidth: 0, width: narrow ? 180 : undefined, maxWidth: '100%', marginBlock: 16 }}>
          <Button {...props} ref={ref} data-button-subject="true" onClick={() => setClicks(value => value + 1)}>{labels[labelKey]}</Button>
        </div>
      </form>
      <output aria-label="Button event counts" data-button-events>{JSON.stringify({ clicks, submits, resets })}</output>
      <Space wrap style={{ marginBlock: 16 }}>
        <button type="button" onClick={() => setBusy(value => !value)}>Toggle native loading</button>
        <button type="button" onClick={() => ref.current?.focus()}>Focus through native ref</button>
      </Space>
      <p id="button-destination">Local navigation destination</p>
    </section>
  </KooyaProvider>;
}
