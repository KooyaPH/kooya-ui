import { createRequire } from 'node:module';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
const antRequire = createRequire(createRequire(import.meta.url).resolve('antd'));
const useDelayState = antRequire('@rc-component/util/lib/hooks/useDelayState').default as <T>(value:T)=>[T,(next:T,delay:{ms:number}|{frame:number}|true)=>void];
describe('actual native delayed-state lifecycle',()=>{
 it.each([{ms:1000},{frame:2}])('cancels pending native work on unmount (%j)', delay=>{
  vi.useFakeTimers();
  try {
   const baseline=vi.getTimerCount();
   const hook=renderHook(()=>useDelayState('initial'));
   act(()=>hook.result.current[1]('pending',delay));
   expect(vi.getTimerCount()).toBeGreaterThan(baseline);
   hook.unmount();
   expect(vi.getTimerCount()).toBe(baseline);
   act(()=>vi.runOnlyPendingTimers());
  }finally{vi.useRealTimers();}
 });
 it('retains latest-wins and immediate updates',()=>{
  vi.useFakeTimers();
  try{
   const hook=renderHook(()=>useDelayState('initial'));
   act(()=>{hook.result.current[1]('old',{ms:100});hook.result.current[1]('latest',{ms:50});});
   act(()=>vi.advanceTimersByTime(50));expect(hook.result.current[0]).toBe('latest');
   act(()=>vi.advanceTimersByTime(100));expect(hook.result.current[0]).toBe('latest');
   act(()=>hook.result.current[1]('immediate',true));expect(hook.result.current[0]).toBe('immediate');
   hook.unmount();
  }finally{vi.useRealTimers();}
 });
});
