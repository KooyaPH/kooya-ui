import React, { useLayoutEffect, useRef, useState } from 'react';
import { KooyaProvider, useKooyaOptions } from '@kooyaph/ui';
import { ConfigProvider, Divider, type DividerProps } from '@kooyaph/ui/components';

export const dividerCases = ['canonical-shortlabel', 'unlabelled-horizontal', 'vertical-orientation', 'vertical-boolean', 'legacy-type-vertical', 'plain-horizontal', 'title-start-ltr', 'title-end-ltr', 'title-left-rtl', 'title-right-rtl', 'title-start-rtl', 'title-end-rtl', 'variant-solid', 'variant-dashed', 'variant-dotted', 'legacy-dashed', 'size-small', 'size-middle', 'size-medium', 'size-large', 'rich-reactnode', 'long-sentence-180', 'unbroken-token-180', 'unicode-180', 'empty-string', 'numeric-zero', 'semantic-content-margin'] as const;
type Case = typeof dividerCases[number];
function parameter<const T extends readonly string[]>(query: URLSearchParams, key: string, values: T, fallback: T[number]): T[number] {
  const entries = query.getAll(key);
  if (entries.length > 1) throw Error(`Ambiguous Divider ${key}`);
  if (entries.length === 0) return fallback;
  if (!values.includes(entries[0])) throw Error(`Unsupported Divider ${key}: ${entries[0]}`);
  return entries[0] as T[number];
}
const sentence = 'Design and deliver a complete project with every collaborator, deadline and milestone kept clearly visible.';
function scenario(name: Case): { props: DividerProps; label: React.ReactNode; direction: 'ltr' | 'rtl'; width?: number } {
  const result: { props: DividerProps; label: React.ReactNode; direction: 'ltr' | 'rtl'; width?: number } = { props: {}, label: 'Milestones', direction: name.endsWith('-rtl') ? 'rtl' : 'ltr' };
  if (name === 'canonical-shortlabel') result.label = 'Next';
  if (name === 'unlabelled-horizontal' || name.startsWith('vertical-') || name === 'legacy-type-vertical') result.label = null;
  if (name === 'vertical-orientation') result.props.orientation = 'vertical';
  if (name === 'vertical-boolean') result.props.vertical = true;
  if (name === 'legacy-type-vertical') result.props.type = 'vertical';
  if (name === 'plain-horizontal') { result.props.plain = true; result.label = 'Project milestones'; }
  if (name.startsWith('title-')) { result.props.titlePlacement = name.split('-')[1] as DividerProps['titlePlacement']; result.label = result.direction === 'rtl' ? 'المشروع' : 'Project milestones'; }
  if (name.startsWith('variant-')) result.props.variant = name.slice(8) as DividerProps['variant'];
  if (name === 'legacy-dashed') result.props.dashed = true;
  if (name.startsWith('size-')) result.props.size = name.slice(5) as DividerProps['size'];
  if (name === 'rich-reactnode') result.label = <strong>Project <em>milestones</em></strong>;
  if (name.endsWith('-180')) result.width = 180;
  if (name === 'long-sentence-180') result.label = sentence;
  if (name === 'unbroken-token-180') result.label = 'W'.repeat(512);
  if (name === 'unicode-180') { result.props.plain = true; result.label = '日本語の設計 — مشروع جديد 🧑🏽‍💻 é'; }
  if (name === 'empty-string') result.label = '';
  if (name === 'numeric-zero') result.label = 0;
  if (name === 'semantic-content-margin') result.props = { titlePlacement: 'start', styles: { content: { marginInlineStart: 12, marginInlineEnd: 12 } } };
  return result;
}
export default function DividerReview({ profile = 'signature' }: { profile?: string }) {
  if (!['signature', 'canvas', 'client', 'mosaic'].includes(profile)) throw Error(`Unsupported Divider profile ${profile}`);
  const inherited = useKooyaOptions();
  const query = new URLSearchParams(location.search);
  const name = parameter(query, 'case', dividerCases, 'canonical-shortlabel');
  const config = scenario(name);
  const ref = useRef<{ nativeElement: HTMLDivElement }>(null), parent = useRef<HTMLDivElement>(null);
  const [refMatches, setRefMatches] = useState(false);
  useLayoutEffect(() => { setRefMatches(ref.current?.nativeElement === parent.current?.querySelector('[data-divider-subject]')); }, [name]);
  const vertical = config.props.orientation === 'vertical' || config.props.vertical || config.props.type === 'vertical';
  const subject = <Divider {...config.props} ref={ref} data-divider-subject={name}>{config.label}</Divider>;
  return <KooyaProvider theme={profile as 'signature' | 'canvas' | 'client' | 'mosaic'} mode={inherited.mode} density={inherited.density} reducedMotion={inherited.reducedMotion}>
    <ConfigProvider direction={config.direction}>
      <section data-divider-fixture={name}>
        <div ref={parent} data-divider-parent style={{ width: config.width ?? '100%', maxWidth: '100%', minWidth: 0, marginInline: 'auto' }}>
          {vertical ? <div style={{ textAlign: 'center' }}><span>Before</span>{subject}<span>After</span></div> : <div>Before section{subject}After section</div>}
        </div>
        <output data-divider-ref-match={String(refMatches)} aria-label="Native Divider ref result">{refMatches ? 'Native ref matches' : 'Native ref pending'}</output>
      </section>
    </ConfigProvider>
  </KooyaProvider>;
}
