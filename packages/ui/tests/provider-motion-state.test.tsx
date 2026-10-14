import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { KooyaProvider } from '../src/foundations';
import { Input } from '../src/components';

function Draft() {
  const [value, setValue] = useState('');
  return <Input aria-label="Draft" value={value} onChange={event => setValue(event.target.value)} />;
}
it('preserves child state and focus when reduced motion changes in both directions', async () => {
  const user = userEvent.setup();
  const { rerender } = render(<KooyaProvider reducedMotion={false}><Draft /></KooyaProvider>);
  const input = screen.getByRole('textbox', { name: 'Draft' });
  await user.type(input, 'Unsubmitted changes');
  rerender(<KooyaProvider reducedMotion><Draft /></KooyaProvider>);
  expect(screen.getByRole('textbox', { name: 'Draft' })).toBe(input);
  expect(input).toHaveValue('Unsubmitted changes');
  expect(input).toHaveFocus();
  rerender(<KooyaProvider reducedMotion={false}><Draft /></KooyaProvider>);
  expect(screen.getByRole('textbox', { name: 'Draft' })).toBe(input);
  expect(input).toHaveValue('Unsubmitted changes');
});
