import {createRequire} from 'node:module';
import {act,renderHook} from '@testing-library/react';
import {afterEach,expect,it,vi} from 'vitest';
const antRequire=createRequire(createRequire(import.meta.url).resolve('antd'));
const triggerRequire=createRequire(antRequire.resolve('@rc-component/trigger'));
const useAlign=triggerRequire('./hooks/useAlign').default;
afterEach(()=>vi.restoreAllMocks());
it.each([0,12])('keeps bottom-shifted popup inside the viewport with %spx target offset',async gap=>{
 const popup=document.createElement('div'),target=document.createElement('button');document.body.append(target,popup);
 popup.style.cssText='position:absolute;width:250px;height:210px;left:0;top:84px';
 const rect=(x:number,y:number,width:number,height:number)=>({x,y,left:x,top:y,right:x+width,bottom:y+height,width,height,toJSON(){return this}});
 // Model native400% evidence (CSS viewport316x218, target at12..56).
 vi.spyOn(popup,'getBoundingClientRect').mockImplementation(()=>rect(parseFloat(popup.style.left)||0,parseFloat(popup.style.top)||0,250,210));
 vi.spyOn(target,'getBoundingClientRect').mockReturnValue(rect(12,12,150,44));
 Object.defineProperty(target,'offsetParent',{configurable:true,get:()=>document.body});
 for(const [key,value] of Object.entries({clientWidth:316,clientHeight:218,scrollWidth:316,scrollHeight:672,scrollTop:0,scrollLeft:0}))vi.spyOn(document.documentElement,key as 'clientWidth','get').mockReturnValue(value);
 const placements={top:{points:['bc','tc'],offset:[0,-gap],overflow:{adjustY:true,shiftY:true}}};
 const hook=renderHook(()=>useAlign(true,popup,target,'top',placements,{},undefined,false));
 await act(async()=>{hook.result.current[10]();await Promise.resolve()});
 expect(hook.result.current[2]+210).toBeLessThanOrEqual(218);expect(hook.result.current[2]).toBeGreaterThanOrEqual(0);
 hook.unmount();target.remove();popup.remove();
});
