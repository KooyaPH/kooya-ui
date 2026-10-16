import {fireEvent,render,screen,waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Button,Dropdown} from 'antd';
import {expect,it,vi} from 'vitest';
it.each(['{Enter}',' '])('opens a default native hover Dropdown button with %s without suppressing caller clicks',async key=>{
 const user=userEvent.setup(),click=vi.fn();
 render(<Dropdown menu={{items:[{key:'edit',label:'Edit'}]}}><Button onClick={click}>Actions</Button></Dropdown>);
 screen.getByRole('button',{name:'Actions'}).focus();await user.keyboard(key);
 await waitFor(()=>expect(screen.getByRole('menu')).toBeVisible());expect(click).toHaveBeenCalledOnce();
});
it('honors a trigger keyboard handler that prevents native activation',async()=>{
 const user=userEvent.setup();render(<Dropdown menu={{items:[{key:'edit',label:'Edit'}]}}><Button onKeyDown={e=>e.preventDefault()}>Actions</Button></Dropdown>);
 screen.getByRole('button',{name:'Actions'}).focus();await user.keyboard('{Enter}');expect(screen.queryByRole('menu')).not.toBeInTheDocument();
});

it.each(['input','textarea','select','editable'] as const)('preserves ArrowDown on a native %s hover trigger',kind=>{
 const keyboard=vi.fn();
 const props={'aria-label':'Editable actions',onKeyDown:keyboard};
 const child=kind==='input'?<input {...props}/>:kind==='textarea'?<textarea {...props}/>:kind==='select'?<select {...props}><option>First</option><option>Second</option></select>:<div {...props} contentEditable suppressContentEditableWarning tabIndex={0}>Editable text</div>;
 render(<Dropdown menu={{items:[{key:'edit',label:'Edit'}]}}>{child}</Dropdown>);
 const trigger=screen.getByLabelText('Editable actions');trigger.focus();
 // jsdom does not implement isContentEditable; expose the actual browser property.
 if(kind==='editable')Object.defineProperty(trigger,'isContentEditable',{value:true});
 expect(fireEvent.keyDown(trigger,{key:'ArrowDown',code:'ArrowDown'})).toBe(true);
 expect(keyboard).toHaveBeenCalledOnce();
 expect(keyboard.mock.calls[0][0].defaultPrevented).toBe(false);
 expect(screen.queryByRole('menu')).not.toBeInTheDocument();
});
