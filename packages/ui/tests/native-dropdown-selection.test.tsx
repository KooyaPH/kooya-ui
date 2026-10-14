import {render,screen,waitFor,fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Button,Dropdown} from 'antd';
import {expect,it,vi} from 'vitest';
it('returns focus to the native Dropdown trigger after keyboard item selection',async()=>{
 const user=userEvent.setup(),selected=vi.fn();
 render(<Dropdown trigger={['click']} menu={{items:[{key:'edit',label:'Edit'}],onClick:selected}}><Button>Open actions</Button></Dropdown>);
 const trigger=screen.getByRole('button',{name:'Open actions'});await user.click(trigger);
 await waitFor(()=>expect(screen.getByRole('menu')).toBeVisible());
 screen.getByRole('menuitem',{name:'Edit',exact:true}).focus();fireEvent.keyDown(screen.getByRole('menuitem',{name:'Edit',exact:true}),{key:'Enter',code:'Enter',keyCode:13,which:13});
 expect(selected).toHaveBeenCalledOnce();await waitFor(()=>expect(screen.getByRole('menu',{hidden:true})).not.toBeVisible());
 expect(trigger).toHaveFocus();
});
it('preserves focus deliberately moved by the caller item callback',async()=>{
 const user=userEvent.setup();
 render(<><Button>Next action</Button><Dropdown trigger={['click']} menu={{items:[{key:'edit',label:'Edit'}],onClick:()=>screen.getByRole('button',{name:'Next action'}).focus()}}><Button>Open actions</Button></Dropdown></>);
 await user.click(screen.getByRole('button',{name:'Open actions'}));await waitFor(()=>expect(screen.getByRole('menu')).toBeVisible());
 screen.getByRole('menuitem',{name:'Edit',exact:true}).focus();fireEvent.keyDown(screen.getByRole('menuitem',{name:'Edit',exact:true}),{key:'Enter',code:'Enter',keyCode:13,which:13});
 expect(screen.getByRole('button',{name:'Next action'})).toHaveFocus();
});
