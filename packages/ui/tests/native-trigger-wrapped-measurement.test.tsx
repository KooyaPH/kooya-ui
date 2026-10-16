import {createRequire} from 'node:module';
import {act,renderHook} from '@testing-library/react';
import {afterEach,expect,it,vi} from 'vitest';
const antRequire=createRequire(createRequire(import.meta.url).resolve('antd'));
const triggerRequire=createRequire(antRequire.resolve('@rc-component/trigger'));
const useAlign=triggerRequire('./hooks/useAlign').default;
afterEach(()=>vi.restoreAllMocks());
it.each(['','272px'])('measures position-dependent wrapped height and preserves caller width %s',async originalWidth=>{
 const popup=document.createElement('div'),target=document.createElement('button');document.body.append(target,popup);
 popup.style.cssText='position:absolute;left:48px;top:567px';if(originalWidth)popup.style.setProperty('width',originalWidth,'important');
 const originalPriority=popup.style.getPropertyPriority('width');
 // jsdom has no layout. Model the observed real Chromium shrink-to-fit behavior:
 // origin reset widens 272→288 and reduces wrapped height 338→316 unless width is held.
 const rect=(x:number,y:number,width:number,height:number)=>({x,y,left:x,top:y,right:x+width,bottom:y+height,width,height,toJSON(){return this}});
 const measure=()=>{const width=popup.style.width?parseFloat(popup.style.width):popup.style.left==='0px'?288:272;return{width,height:width===272?338:316}};
 vi.spyOn(popup,'getBoundingClientRect').mockImplementation(()=>{const m=measure();return rect(parseFloat(popup.style.left)||0,parseFloat(popup.style.top)||0,m.width,m.height)});
 vi.spyOn(target,'getBoundingClientRect').mockReturnValue(rect(48,519,128,44));
 Object.defineProperty(target,'offsetParent',{configurable:true,get:()=>document.body});
 for(const [key,value] of Object.entries({clientWidth:320,clientHeight:900,scrollWidth:320,scrollHeight:905,scrollTop:0,scrollLeft:0}))vi.spyOn(document.documentElement,key as 'clientWidth','get').mockReturnValue(value);
 const nativeComputed=window.getComputedStyle.bind(window);
 vi.spyOn(window,'getComputedStyle').mockImplementation((node,pseudo)=>{const style=nativeComputed(node,pseudo);return node===popup?new Proxy(style,{get(s,key){if(key==='width')return measure().width+'px';if(key==='height')return measure().height+'px';return Reflect.get(s,key)}}):style});
 const aligned=vi.fn(),placements={bottomLeft:{points:['tl','bl'],offset:[0,4],overflow:{adjustY:true}}};
 const hook=renderHook(()=>useAlign(true,popup,target,'bottomLeft',placements,{},aligned,false));
 await act(async()=>{hook.result.current[10]();await Promise.resolve()});
 expect(aligned).toHaveBeenCalled();expect(aligned.mock.calls.at(-1)?.[1].points).toEqual(['bl','tl']);
 expect(popup.style.width).toBe(originalWidth);expect(popup.style.getPropertyPriority('width')).toBe(originalPriority);
 hook.unmount();target.remove();popup.remove();
});
