import {render,screen,waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Button,Dropdown} from 'antd';
import {expect,it} from 'vitest';
it('names a native submenu from its label without announcing its decorative direction arrow',async()=>{
 const user=userEvent.setup();
 render(<Dropdown trigger={['click']} menu={{items:[{key:'more',label:'More actions',children:[{key:'edit',label:'Edit'}]}]}}><Button>Actions</Button></Dropdown>);
 await user.click(screen.getByRole('button',{name:'Actions'}));
 await waitFor(()=>expect(screen.getByRole('menuitem',{name:'More actions',exact:true})).toBeVisible());
 expect(screen.getByRole('menuitem',{name:'More actions',exact:true})).toHaveAttribute('aria-haspopup','true');
});
