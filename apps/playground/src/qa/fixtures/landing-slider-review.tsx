import React, { useState } from 'react';
import { KooyaProvider } from '@kooyaph/ui';
import { Button, Slider, Progress } from '@kooyaph/ui/components';
/** Private Landing progress composition experiment; never a production route. */
export default function LandingSliderReview() {
  const query = new URLSearchParams(location.search);
  const placement = query.get('placement') === 'bottom' ? 'bottom' : 'top';
  const density = query.get('density') === 'compact' ? 'compact' : 'comfortable';
  const mode = query.get('mode') === 'dark' ? 'dark' : 'light';
  const [progress, setProgress] = useState(64);
  return <KooyaProvider mode={mode} density={density} className="catalog-site landing-slider-review-provider">
    <main className="landing" style={{padding:20}}>
      <div className="hero-demo" style={{maxWidth:460,margin:'40px auto'}}>
        <h2>A small idea.<br/>A good place to start.</h2>
        <div className="demo-progress" style={{display:'flow-root'}}>
          <span>Room to grow</span>
          <Slider ariaLabelForHandle="Room to grow" value={progress} onChange={setProgress} tooltip={{placement}}
            style={placement==='bottom'?{marginBlockEnd:'calc(var(--ku-control-height, 44px) + 4px)'}:{marginBlockStart:'calc(var(--ku-control-height, 44px) + 4px)'}} />
          <Progress percent={progress} showInfo={false}/>
        </div>
        <Button type="primary" size="large" block>Create a local project</Button>
        <p className="demo-status" role="status">Try the controls. Make yourself at home.</p>
      </div>
    </main>
  </KooyaProvider>;
}
