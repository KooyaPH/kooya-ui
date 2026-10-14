import {createRequire} from 'node:module';
import {theme} from 'antd';
import {expect,it} from 'vitest';
const nativeRequire=createRequire(import.meta.url);
const prepare=nativeRequire('antd/lib/tooltip/style').prepareComponentToken;
it('pairs the native light purple preset with readable foreground',()=>{
 const token=theme.defaultAlgorithm(theme.defaultSeed);
 expect(prepare({...token,colorTextLightSolid:'#13120f'}).purplePresetTextColor).toBe('#ffffff');
});
it('pairs the native dark yellow preset with readable foreground',()=>{
 const token=theme.darkAlgorithm(theme.defaultSeed);
 expect(prepare({...token,colorTextLightSolid:'#f2eee3'}).yellowPresetTextColor).toBe('#000000');
});
it('retains a readable caller foreground and unresolved palette values',()=>{
 const token=theme.defaultAlgorithm(theme.defaultSeed);
 expect(prepare({...token,colorTextLightSolid:'#ffffff'}).purplePresetTextColor).toBe('#ffffff');
 expect(prepare({...token,colorTextLightSolid:'#ff00ff',purple6:'var(--caller-purple)'}).purplePresetTextColor).toBe('#ff00ff');
 expect(prepare({...token,colorTextLightSolid:'#ff00ff',purple6:'transparent'}).purplePresetTextColor).toBe('#ff00ff');
});
