import { createRequire } from 'node:module';
import { act, render, renderHook, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
const antRequire = createRequire(createRequire(import.meta.url).resolve('antd'));
const dropdownRequire = createRequire(antRequire.resolve('@rc-component/dropdown'));
const useAccessibility = dropdownRequire('./hooks/useAccessibility').default as (options: {
 visible: boolean; triggerRef: {current: HTMLElement}; overlayRef: {current: HTMLElement | {focus:()=>void}};
 autoFocus: boolean; onVisibleChange: (visible:boolean)=>void;
})=>void;
function pressTab() {
 const event=new KeyboardEvent('keydown',{key:'Tab',keyCode:9,bubbles:true,cancelable:true});
 act(()=>window.dispatchEvent(event));
 return event;
}
it('transfers focus from an unfocusable overlay to its first enabled visible control',()=>{
 render(<><button>Trigger</button><div data-testid="overlay"><button disabled>Disabled</button><button>Action</button></div></>);
 const trigger=screen.getByRole('button',{name:'Trigger'}),overlay=screen.getByTestId('overlay'),action=screen.getByRole('button',{name:'Action'});
 // jsdom has no layout; explicitly model the two attached controls as visible.
 for(const node of [action,screen.getByRole('button',{name:'Disabled'})])Object.defineProperty(node,'offsetParent',{get:()=>overlay});
 const close=vi.fn();
 renderHook(()=>useAccessibility({visible:true,triggerRef:{current:trigger},overlayRef:{current:overlay},autoFocus:false,onVisibleChange:close}));
 trigger.focus();
 expect(pressTab().defaultPrevented).toBe(true);
 expect(action).toHaveFocus();
 expect(close).not.toHaveBeenCalled();
});
it('preserves an existing successful imperative overlay focus handle',()=>{
 render(<><button>Trigger</button><button>Action</button></>);
 const trigger=screen.getByRole('button',{name:'Trigger'}),action=screen.getByRole('button',{name:'Action'});
 const focus=vi.fn(()=>action.focus());
 renderHook(()=>useAccessibility({visible:true,triggerRef:{current:trigger},overlayRef:{current:{focus}},autoFocus:false,onVisibleChange:vi.fn()}));
 trigger.focus();
 expect(pressTab().defaultPrevented).toBe(true);
 expect(focus).toHaveBeenCalledOnce();
 expect(action).toHaveFocus();
});
it('does not swallow Tab when a DOM overlay contains no focusable content',()=>{
 render(<><button>Trigger</button><div data-testid="overlay">Information only</div></>);
 const trigger=screen.getByRole('button',{name:'Trigger'}),overlay=screen.getByTestId('overlay'),close=vi.fn();
 renderHook(()=>useAccessibility({visible:true,triggerRef:{current:trigger},overlayRef:{current:overlay},autoFocus:false,onVisibleChange:close}));
 trigger.focus();
 expect(pressTab().defaultPrevented).toBe(false);
 expect(close).toHaveBeenCalledWith(false);
});

it('checks focus inside the overlay shadow root instead of the document host',()=>{
 render(<div data-testid="host" />);
 const host=screen.getByTestId('host'),shadow=host.attachShadow({mode:'open'});
 const trigger=document.createElement('button'),overlay=document.createElement('div'),action=document.createElement('button');
 trigger.textContent='Trigger';action.textContent='Action';overlay.append(action);shadow.append(trigger,overlay);
 Object.defineProperty(action,'offsetParent',{get:()=>overlay});
 const close=vi.fn();
 renderHook(()=>useAccessibility({visible:true,triggerRef:{current:trigger},overlayRef:{current:overlay},autoFocus:false,onVisibleChange:close}));
 trigger.focus();
 expect(pressTab().defaultPrevented).toBe(true);
 expect(shadow.activeElement).toBe(action);
 expect(document.activeElement).toBe(host);
 expect(close).not.toHaveBeenCalled();
});

it('continues past a candidate that rejects focus to a later usable control',()=>{
 render(<><button>Trigger</button><div data-testid="overlay"><button>Unavailable</button><button>Action</button></div></>);
 const trigger=screen.getByRole('button',{name:'Trigger'}),overlay=screen.getByTestId('overlay'),first=screen.getByRole('button',{name:'Unavailable'}),action=screen.getByRole('button',{name:'Action'});
 for(const node of [first,action])Object.defineProperty(node,'offsetParent',{get:()=>overlay});
 // Model browser rejection of focus on an inert or visibility-hidden candidate.
 vi.spyOn(first,'focus').mockImplementation(()=>{});
 const close=vi.fn();
 renderHook(()=>useAccessibility({visible:true,triggerRef:{current:trigger},overlayRef:{current:overlay},autoFocus:false,onVisibleChange:close}));
 trigger.focus();
 expect(pressTab().defaultPrevented).toBe(true);
 expect(action).toHaveFocus();
 expect(close).not.toHaveBeenCalled();
});
