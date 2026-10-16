import {useState} from 'react';
import {render,screen,waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Button,Dropdown} from 'antd';
import {expect,it,vi} from 'vitest';
const menu={items:[{key:'disabled',label:'Unavailable',disabled:true},{key:'edit',label:'Edit'}]};
it.each(['{Enter}',' '])('focuses first enabled native menu item on default keyboard %s opening',async key=>{
 const user=userEvent.setup(),click=vi.fn();render(<Dropdown menu={menu}><Button onClick={click}>Actions</Button></Dropdown>);
 screen.getByRole('button',{name:'Actions'}).focus();await user.keyboard(key);
 await waitFor(()=>expect(screen.getByRole('menuitem',{name:'Edit'})).toHaveFocus());expect(click).toHaveBeenCalledOnce();
});
it('keeps a held Space on the trigger until keyup then preserves native click',async()=>{
 const user=userEvent.setup(),click=vi.fn();render(<Dropdown menu={menu}><Button onClick={click}>Actions</Button></Dropdown>);
 const trigger=screen.getByRole('button',{name:'Actions'});trigger.focus();await user.keyboard('[Space>]');
 expect(trigger).toHaveFocus();expect(screen.queryByRole('menu')).not.toBeInTheDocument();expect(click).not.toHaveBeenCalled();
 await user.keyboard('[/Space]');await waitFor(()=>expect(screen.getByRole('menuitem',{name:'Edit'})).toHaveFocus());expect(click).toHaveBeenCalledOnce();
});
it('preserves explicit autoFocus false on keyboard opening',async()=>{
 const user=userEvent.setup();render(<Dropdown autoFocus={false} menu={menu}><Button>Actions</Button></Dropdown>);const trigger=screen.getByRole('button',{name:'Actions'});trigger.focus();await user.keyboard('{Enter}');await waitFor(()=>expect(screen.getByRole('menu')).toBeVisible());expect(trigger).toHaveFocus();
});
it('preserves pointer-hover trigger focus',async()=>{
 const user=userEvent.setup();render(<Dropdown menu={menu}><Button>Actions</Button></Dropdown>);const trigger=screen.getByRole('button',{name:'Actions'});trigger.focus();await user.hover(trigger);await waitFor(()=>expect(screen.getByRole('menu')).toBeVisible());expect(trigger).toHaveFocus();
});
it('does not focus arbitrary custom popup on keyboard opening',async()=>{
 const user=userEvent.setup();render(<Dropdown popupRender={()=> <input aria-label="Popup input"/>}><Button>Actions</Button></Dropdown>);const trigger=screen.getByRole('button',{name:'Actions'});trigger.focus();await user.keyboard('{Enter}');await waitFor(()=>expect(screen.getByLabelText('Popup input')).toBeVisible());expect(trigger).toHaveFocus();
});
it('preserves caller focus moved outside during native click',async()=>{
 const user=userEvent.setup();render(<><button>Outside</button><Dropdown menu={menu}><Button onClick={()=>screen.getByRole('button',{name:'Outside'}).focus()}>Actions</Button></Dropdown></>);screen.getByRole('button',{name:'Actions'}).focus();await user.keyboard('{Enter}');await waitFor(()=>expect(screen.getByRole('menu')).toBeVisible());expect(screen.getByRole('button',{name:'Outside'})).toHaveFocus();
});
it.each(['{Enter}',' '])('focuses native click-trigger menu after keyboard %s activation',async key=>{
 const user=userEvent.setup(),click=vi.fn();render(<Dropdown trigger={['click']} menu={menu}><Button onClick={click}>Actions</Button></Dropdown>);screen.getByRole('button',{name:'Actions'}).focus();await user.keyboard(key);await waitFor(()=>expect(screen.getByRole('menuitem',{name:'Edit'})).toHaveFocus());expect(click).toHaveBeenCalledOnce();
});
it('preserves caller keyup cancellation of Space',async()=>{
 const user=userEvent.setup(),keyup=vi.fn(event=>event.preventDefault());render(<Dropdown menu={menu}><Button onKeyUp={keyup}>Actions</Button></Dropdown>);const trigger=screen.getByRole('button',{name:'Actions'});trigger.focus();await user.keyboard(' ');expect(keyup).toHaveBeenCalledOnce();expect(trigger).toHaveFocus();expect(screen.queryByRole('menu')).not.toBeInTheDocument();
});
it('preserves pointer-only contextMenu opening after unrelated keyboard input',async()=>{
 const user=userEvent.setup();render(<Dropdown trigger={['contextMenu']} menu={menu}><Button>Actions</Button></Dropdown>);const trigger=screen.getByRole('button',{name:'Actions'});trigger.focus();await user.keyboard('{Enter} ');expect(screen.queryByRole('menu')).not.toBeInTheDocument();await user.pointer({target:trigger,keys:'[MouseRight]'});await waitFor(()=>expect(screen.getByRole('menu')).toBeVisible());expect(trigger).toHaveFocus();
});

it('clears rejected keyboard intent before a subsequent caller-owned hover opening',async()=>{
 const user=userEvent.setup();function Controlled(){const[open,setOpen]=useState(false);return <Dropdown open={open} menu={menu}><Button onMouseEnter={()=>setOpen(true)}>Actions</Button></Dropdown>}
 render(<Controlled/>);const trigger=screen.getByRole('button',{name:'Actions'});trigger.focus();await user.keyboard('{Enter}');expect(screen.queryByRole('menu')).not.toBeInTheDocument();await user.hover(trigger);await waitFor(()=>expect(screen.getByRole('menu')).toBeVisible());expect(trigger).toHaveFocus();
});
