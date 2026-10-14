import {render,screen,waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Table,Dropdown,Button,Menu} from 'antd';
import {createRef,type ComponentRef} from 'react';
import {expect,it} from 'vitest';
it('restores the native table filter trigger when portal Escape closes a focused menu',async()=>{
 const user=userEvent.setup();
 render(<Table pagination={false} columns={[{title:'Category',dataIndex:'category',filters:[{text:'Design',value:'Design'}]}]} dataSource={[{key:'one',category:'Design'}]} />);
 const trigger=screen.getByRole('button',{name:/filter/i});
 await user.click(trigger);
 await waitFor(()=>expect(screen.getByRole('menu')).toBeVisible());
 screen.getByRole('menu').focus();
 await user.keyboard('{Escape}');
 await waitFor(()=>expect(trigger).toHaveFocus());
});
it.each([false,true])('preserves controlled close-request focus behavior when rejected=%s',async rejected=>{
 const user=userEvent.setup();
 const {useState}=await import('react');
 function Controlled(){const [open,setOpen]=useState(false);return <Table pagination={false} columns={[{title:'Category',dataIndex:'category',filters:[{text:'Design',value:'Design'}],filterDropdownProps:{open,onOpenChange:next=>{if(next||!rejected)setOpen(next);}}}]} dataSource={[{key:'one',category:'Design'}]} />;}
 render(<Controlled />);
 const trigger=screen.getByRole('button',{name:/filter/i});
 await user.click(trigger);await waitFor(()=>expect(screen.getByRole('menu')).toBeVisible());
 screen.getByRole('menu').focus();await user.keyboard('{Escape}');
 await waitFor(()=>expect(trigger).toHaveFocus());
 expect(trigger).toHaveAttribute('aria-expanded',String(rejected));
});
it('preserves focus transferred to an outside pointer target',async()=>{
 const user=userEvent.setup();
 render(<><button>Outside action</button><Table pagination={false} columns={[{title:'Category',dataIndex:'category',filters:[{text:'Design',value:'Design'}]}]} dataSource={[{key:'one',category:'Design'}]} /></>);
 await user.click(screen.getByRole('button',{name:/filter/i}));await waitFor(()=>expect(screen.getByRole('menu')).toBeVisible());
 screen.getByRole('menu').focus();await user.click(screen.getByRole('button',{name:'Outside action'}));
 expect(screen.getByRole('button',{name:'Outside action'})).toHaveFocus();
});

it('restores public Dropdown menu focus without changing its native Menu ref',async()=>{
 const user=userEvent.setup();const ref=createRef<ComponentRef<typeof Menu>>();
 render(<Dropdown trigger={['click']} popupRender={()=> <Menu ref={ref} items={[{key:'one',label:'Action'}]} />}><Button>Open actions</Button></Dropdown>);
 const trigger=screen.getByRole('button',{name:'Open actions'});await user.click(trigger);
 await waitFor(()=>expect(screen.getByRole('menu')).toBeVisible());
 expect(ref.current!.menu.list).toBe(screen.getByRole('menu'));expect(typeof ref.current!.focus).toBe('function');
 screen.getByRole('menu').focus();await user.keyboard('{Escape}');
 await waitFor(()=>expect(trigger).toHaveFocus());
});
it('restores focus for the native Dropdown menu configuration API',async()=>{
 const user=userEvent.setup();
 render(<Dropdown trigger={['click']} menu={{items:[{key:'one',label:'Action'}]}}><Button>Configured actions</Button></Dropdown>);
 const trigger=screen.getByRole('button',{name:'Configured actions'});await user.click(trigger);
 await waitFor(()=>expect(screen.getByRole('menu')).toBeVisible());
 screen.getByRole('menu').focus();await user.keyboard('{Escape}');
 await waitFor(()=>expect(trigger).toHaveFocus());
});
