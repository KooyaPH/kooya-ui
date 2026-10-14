import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { it, expect } from 'vitest';
import { App, ConfigProvider } from 'antd';
import { Button, Input, Checkbox, Switch } from '../../../apps/playground/src/reui/adapters/controls';

const wrap = (children: React.ReactNode) => render(<ConfigProvider><App>{children}</App></ConfigProvider>);

it('adapted source buttons are actual Ant buttons with native submit semantics', () => {
  wrap(<Button type="submit" variant="destructive">Save</Button>);
  const button = screen.getByRole('button', { name: 'Save' });
  expect(button).toHaveClass('ant-btn');
  expect(button).toHaveAttribute('type', 'submit');
  expect(button).toHaveClass('ant-btn-dangerous');
});

it('adapted source fields preserve controlled typing through the actual Ant input', async () => {
  function Example() { const [value, setValue] = useState(''); return <label>Name<Input value={value} onChange={e => setValue(e.target.value)} /></label>; }
  wrap(<Example />);
  const input = screen.getByRole('textbox', { name: 'Name' });
  expect(input).toHaveClass('ant-input');
  await userEvent.type(input, 'Kooya');
  expect(input).toHaveValue('Kooya');
});

it('Ant checkbox and switch translate upstream checked callbacks and disabled states', async () => {
  function Example() { const [checked, setChecked] = useState(false); return <><Checkbox aria-label="Updates" checked={checked} onCheckedChange={setChecked} /><Switch aria-label="Delivery" checked={checked} onCheckedChange={setChecked} /><Checkbox aria-label="Unavailable" disabled /></>; }
  wrap(<Example />);
  await userEvent.click(screen.getByRole('checkbox', { name: 'Updates' }));
  expect(screen.getByRole('switch', { name: 'Delivery' })).toBeChecked();
  await userEvent.click(screen.getByRole('switch', { name: 'Delivery' }));
  expect(screen.getByRole('checkbox', { name: 'Updates' })).not.toBeChecked();
  expect(screen.getByRole('checkbox', { name: 'Unavailable' })).toBeDisabled();
});
