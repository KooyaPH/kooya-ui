import React, { useState } from 'react';
import { Button, Drawer, Input } from '@kooyaph/ui/components';
export default function DrawerIndependentFixture({profile='nested-lock'}:{profile?:string}) {
  const [open,setOpen]=useState(false), [child,setChild]=useState(false);
  const empty=profile==='no-focusable';
  return <>
    <Button onClick={()=>setOpen(true)}>Open drawer</Button>
    <Input aria-label="Outside context" />
    <Drawer title="Parent project settings" open={open} onClose={()=>setOpen(false)} closable={!empty}>
      {empty ? <><p>Read-only project settings</p><Input disabled aria-label="Disabled project" /></> : <>
        <Input aria-label="Parent project" />
        <Button onClick={()=>setChild(true)}>Open child drawer</Button>
        <Drawer title="Child project settings" open={child} onClose={()=>setChild(false)}>
          <Input aria-label="Child project" />
          <Button onClick={()=>setChild(false)}>Finish child</Button>
        </Drawer>
      </>}
    </Drawer>
  </>;
}
