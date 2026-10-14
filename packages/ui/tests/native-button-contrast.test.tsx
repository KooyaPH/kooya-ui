import {createRequire} from 'node:module';
import {theme} from 'antd';
import {expect,it} from 'vitest';
const nativeRequire=createRequire(import.meta.url);
const prepare=nativeRequire('antd/lib/button/style/token').prepareComponentToken;
it('repairs native solid purple contrast while preserving readable supplied ink',()=>{
 const token=theme.defaultAlgorithm(theme.defaultSeed);
 expect(prepare({...token,colorTextLightSolid:'#0f0e13'}).purpleSolidTextColor).toBe('#ffffff');
 expect(prepare({...token,colorTextLightSolid:'#ffffff'}).purpleSolidTextColor).toBe('#ffffff');
});
it('preserves caller foreground across transparent preset solid states',()=>{
 const token=theme.defaultAlgorithm(theme.defaultSeed);
 const result=prepare({...token,colorTextLightSolid:'#ff00ff',purple6:'transparent',purpleHover:' TRANSPARENT ',purpleActive:'transparent'});
 expect(result.purpleSolidTextColor).toBe('#ff00ff');
 expect(result.purpleSolidTextHoverColor).toBe('#ff00ff');
 expect(result.purpleSolidTextActiveColor).toBe('#ff00ff');
});
