import {render,screen,waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect,it} from 'vitest';
import {nativeDemos} from '../../../apps/playground/src/reui/native';
import {KooyaProvider} from '../src/foundations';
it.each(['{Enter}',' '])('opens the actual Dropdown catalog demo with %s',async key=>{
 const user=userEvent.setup();const Demo=nativeDemos.Dropdown;
 render(<KooyaProvider><Demo /></KooyaProvider>);
 screen.getByRole('button',{name:'Open actions'}).focus();await user.keyboard(key);
 await waitFor(()=>expect(screen.getByRole('menu')).toBeVisible());
});
