import {render,screen} from '@testing-library/react';
import {Divider} from 'antd';
import {expect,it} from 'vitest';
it('exposes the actual vertical native separator orientation',()=>{
 render(<Divider orientation="vertical" />);
 expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation','vertical');
});
it('preserves an explicit caller aria orientation',()=>{
 render(<Divider orientation="vertical" aria-orientation="horizontal" />);
 expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation','horizontal');
});
