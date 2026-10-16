import React, { useEffect, useState } from 'react';
import { KooyaProvider } from '@kooyaph/ui';
import { Button, Space } from '@kooyaph/ui/components';
import { Landing } from '../../site/Landing';
import type { Appearance } from '../../site/model';

const presets = ['signature', 'canvas', 'client', 'mosaic'] as const;
type Preset = typeof presets[number];

/** Private audit fixture; the production Site exposes mode/density, not preset selection. */
export default function LandingReview() {
  const query = new URLSearchParams(location.search);
  const requested = query.get('theme');
  const [theme, setTheme] = useState<Preset>(presets.includes(requested as Preset) ? requested as Preset : 'signature');
  const [appearance, setAppearance] = useState<Appearance>({
    mode: query.get('mode') === 'dark' ? 'dark' : 'light',
    density: query.get('density') === 'compact' ? 'compact' : 'comfortable',
  });
  useEffect(() => {
    document.documentElement.dataset.mode = appearance.mode;
    document.documentElement.dataset.density = appearance.density;
  }, [appearance.mode, appearance.density]);
  return <KooyaProvider {...appearance} theme={theme} className="catalog-site landing-review-provider" data-review-preset={theme}>
    <aside aria-label="Private landing review controls" style={{ padding: 12 }}>
      <Space wrap>
        {presets.map(preset => <Button key={preset} aria-label={`Review preset ${preset}`} aria-pressed={preset === theme} onClick={() => setTheme(preset)}>{preset}</Button>)}
        <Button aria-label="Review toggle mode" onClick={() => setAppearance(current => ({ ...current, mode: current.mode === 'light' ? 'dark' : 'light' }))}>Toggle mode</Button>
        <Button aria-label="Review toggle density" onClick={() => setAppearance(current => ({ ...current, density: current.density === 'comfortable' ? 'compact' : 'comfortable' }))}>Toggle density</Button>
      </Space>
    </aside>
    <Landing appearance={appearance} onAppearance={setAppearance} />
  </KooyaProvider>;
}
