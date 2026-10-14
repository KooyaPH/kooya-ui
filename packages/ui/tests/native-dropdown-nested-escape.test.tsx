import {render,screen,waitFor,fireEvent,act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Button,Dropdown} from 'antd';
import {expect,it} from 'vitest';
it('closes only the owned submenu on its first Escape',async()=>{
 const user=userEvent.setup();
 render(<Dropdown trigger={['click']} menu={{items:[{key:'parent',label:'More actions',children:[{key:'child',label:'Nested action'}]}]}}><Button>Actions</Button></Dropdown>);
 const trigger=screen.getByRole('button',{name:'Actions'});await user.click(trigger);
 const parent=await screen.findByRole('menuitem',{name:'More actions',exact:true});act(()=>parent.focus());
 fireEvent.keyDown(parent,{key:'ArrowRight',keyCode:39,which:39});
 const child=await screen.findByRole('menuitem',{name:'Nested action',exact:true});
 act(()=>child.focus());fireEvent.keyDown(child,{key:'Escape',keyCode:27,which:27});
 await waitFor(()=>expect(child).not.toBeVisible());
 expect(parent).toBeVisible();await waitFor(()=>expect(parent).toHaveFocus());
 fireEvent.keyDown(parent,{key:'Escape',keyCode:27,which:27});
 await waitFor(()=>expect(parent).not.toBeVisible());expect(trigger).toHaveFocus();
});
