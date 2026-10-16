import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { createRoot } from 'react-dom/client';
import { KooyaProvider } from '@kooyaph/ui';
import { getVariant } from '../registry/catalog';
import { PreviewBoundary } from '../site/Preview';
import { isPreviewSettings } from '../site/model';
import { FeedbackBridge } from '../reui/adapters/feedback';
import '@fontsource-variable/dm-sans';
import '@fontsource/syncopate/700.css';
import '@kooyaph/ui/styles.css';
import '../reui/reui.css';
import '../site/site.css';

type FixtureProps = { profile: string };
const fixtures = import.meta.glob<{ default: React.ComponentType<FixtureProps> }>('./fixtures/*.tsx');
function RenderCommitted() {
  useEffect(() => {
    const element = document.querySelector<HTMLElement>('[data-audit-item]');
    if (element) element.dataset.auditReady = 'true';
    return () => { if (element) delete element.dataset.auditReady; };
  }, []);
  return null;
}
function Harness() {
  const query = new URLSearchParams(location.search);
  const item = query.get('item') ?? 'c-textarea-6';
  const fixture = query.get('fixture') ?? 'catalog';
  const profile = query.get('profile') ?? 'default';
  const [appearance, setAppearance] = useState({ mode: query.get('mode') === 'dark' ? 'dark' as const : 'light' as const, density: query.get('density') === 'compact' ? 'compact' as const : 'comfortable' as const });
  const { mode, density } = appearance;
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.source === window.parent && event.origin === location.origin && isPreviewSettings(event.data)) setAppearance({mode: event.data.mode, density: event.data.density});
    };
    window.addEventListener('message', receive);
    return () => window.removeEventListener('message', receive);
  }, []);
  const rawWidth = Number(query.get('container'));
  const container = rawWidth > 0 && rawWidth <= 4096 ? rawWidth : undefined;
  const Demo = useMemo(() => {
    if (fixture === 'catalog') {
      const found = getVariant(item);
      if (!found) throw Error(`Unregistered audit item: ${item}`);
      return lazy(found.variant.load);
    }
    const load = fixtures[`./fixtures/${item}.tsx`];
    if (!load) throw Error(`No real-prop fixture registered for ${item}`);
    return lazy(load);
  }, [item, fixture]);
  document.documentElement.dataset.mode = mode;
  document.documentElement.dataset.density = density;
  document.documentElement.dataset.kooyaPreview = 'true';
  return <KooyaProvider mode={mode} density={density} className="preview-root style-vega">
    <FeedbackBridge />
    <MotionConfig reducedMotion="user">
    <main className="preview-document" data-audit-item={item} data-audit-profile={profile} style={{ width: container, maxWidth: '100%', marginInline: 'auto' }}>
      <h1 className="sr-only">{item} audit example</h1>
      <PreviewBoundary><Suspense fallback={<p role="status" data-audit-loading>Loading audit fixture</p>}><Demo profile={profile} /><RenderCommitted /></Suspense></PreviewBoundary>
    </main>
    </MotionConfig>
  </KooyaProvider>;
}
const root = document.getElementById('root');
if (!root) throw Error('Missing audit root');
createRoot(root).render(<React.StrictMode><PreviewBoundary><Harness /></PreviewBoundary></React.StrictMode>);
