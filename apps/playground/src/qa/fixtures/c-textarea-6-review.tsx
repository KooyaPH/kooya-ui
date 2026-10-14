import React, { useState } from 'react';
import { KooyaProvider } from '@kooyaph/ui';
import Pattern from '../../reui/overrides/c-textarea-6';

const themes = ['signature', 'canvas', 'client', 'mosaic'] as const;
type Theme = typeof themes[number];

/** Private review fixture: real recipes and opt-in actual React prop transitions. */
export default function TextareaCompositionReview() {
  const query = new URLSearchParams(location.search);
  const requestedTheme = query.get('theme');
  const initialTheme = themes.includes(requestedTheme as Theme) ? requestedTheme as Theme : 'signature';
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [mode, setMode] = useState<'light' | 'dark'>(query.get('mode') === 'dark' ? 'dark' : 'light');
  const [density, setDensity] = useState<'comfortable' | 'compact'>(query.get('density') === 'compact' ? 'compact' : 'comfortable');
  const initialWidth = Number(query.get('reviewContainer'));
  const [containerWidth, setContainerWidth] = useState<number | undefined>([180, 240, 320].includes(initialWidth) ? initialWidth : undefined);
  const controls = query.get('controls') === 'true';
  // Real user pointer controls change React props while retaining the native textarea focus.
  const retainFocus = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();
  return <>
    {controls && <nav aria-label="Textarea review prop controls" style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:12}}>
      {themes.map(value => <button type="button" key={value} onMouseDown={retainFocus} onClick={() => setTheme(value)}>Preset {value}</button>)}
      {[180,240,320].map(value => <button type="button" key={value} onMouseDown={retainFocus} onClick={() => setContainerWidth(value)}>Container {value}</button>)}
      {(['light','dark'] as const).map(value => <button type="button" key={value} onMouseDown={retainFocus} onClick={() => setMode(value)}>Mode {value}</button>)}
      {(['comfortable','compact'] as const).map(value => <button type="button" key={value} onMouseDown={retainFocus} onClick={() => setDensity(value)}>Density {value}</button>)}
    </nav>}
    <KooyaProvider theme={theme} mode={mode} density={density} data-review-preset={theme} style={{width:'100%'}}>
      <div data-review-container={containerWidth ?? 'fluid'} style={{display:'grid',gridTemplateColumns:'minmax(0,1fr)',gap:24,padding:12,width:containerWidth,maxWidth:'100%',boxSizing:'border-box'}}>
        <section aria-label="First bio example"><Pattern /></section>
        <section aria-label="Second bio example"><Pattern /></section>
      </div>
    </KooyaProvider>
  </>;
}
