import {render,screen,waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Button,Dropdown} from 'antd';
import {expect,it} from 'vitest';
it('exposes native menu availability and current open state',async()=>{
 const user=userEvent.setup();
 render(<Dropdown trigger={['click']} menu={{items:[{key:'edit',label:'Edit'}]}}><Button>Actions</Button></Dropdown>);
 const trigger=screen.getByRole('button',{name:'Actions'});
 expect(trigger).toHaveAttribute('aria-haspopup','menu');
 expect(trigger).toHaveAttribute('aria-expanded','false');
 await user.click(trigger);
 await waitFor(()=>expect(trigger).toHaveAttribute('aria-expanded','true'));
 await user.keyboard('{Escape}');
 await waitFor(()=>expect(trigger).toHaveAttribute('aria-expanded','false'));
});
it('preserves caller semantics and does not label custom content as a menu',()=>{
 render(<><Dropdown menu={{items:[{key:'edit',label:'Edit'}]}}><Button aria-haspopup="dialog" aria-expanded={false}>Caller</Button></Dropdown><Dropdown popupRender={()=> <section>Custom content</section>}><Button>Custom</Button></Dropdown></>);
 expect(screen.getByRole('button',{name:'Caller'})).toHaveAttribute('aria-haspopup','dialog');
 expect(screen.getByRole('button',{name:'Caller'})).toHaveAttribute('aria-expanded','false');
 expect(screen.getByRole('button',{name:'Custom'})).not.toHaveAttribute('aria-haspopup');
 expect(screen.getByRole('button',{name:'Custom'})).not.toHaveAttribute('aria-expanded');
});
