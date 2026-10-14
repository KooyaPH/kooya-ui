import { render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { KooyaProvider } from '../src/foundations';
import { Table } from '../src/components';

it.each(['{Enter}', ' '])('opens the actual native category filter with %s', async key => {
  const user = userEvent.setup();
  render(<KooyaProvider><Table pagination={false} columns={[{ title: 'Category', dataIndex: 'category', filters: [{text: 'Design', value: 'Design'}] }]} dataSource={[{key:'one', category:'Design'}]} /></KooyaProvider>);
  const trigger = screen.getByRole('button', {name: /filter/i});
  expect(trigger).toHaveAttribute('tabindex', '0');
  trigger.focus();
  await user.keyboard(key);
  await waitFor(() => expect(screen.getByRole('menu')).toBeVisible());
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
});

it('opens the actual native tree filter without claiming menu semantics', async () => {
  const user = userEvent.setup();
  render(<KooyaProvider><Table pagination={false} columns={[{title:'Category',dataIndex:'category',filterMode:'tree',filters:[{text:'Design',value:'Design'}]}]} dataSource={[{key:'one',category:'Design'}]} /></KooyaProvider>);
  const trigger=screen.getByRole('button',{name:/filter/i});
  expect(trigger).not.toHaveAttribute('aria-haspopup');
  trigger.focus();
  await user.keyboard('{Enter}');
  await waitFor(()=>expect(screen.getByRole('tree')).toBeVisible());
  expect(trigger).toHaveAttribute('aria-expanded','true');
});

it('preserves controlled native filter visibility during keyboard toggling', async () => {
  function ControlledFilter() {
    const [open,setOpen]=useState(false);
    return <Table pagination={false} columns={[{title:'Category',dataIndex:'category',filters:[{text:'Design',value:'Design'}],filterDropdownProps:{open,onOpenChange:next=>setOpen(next)}}]} dataSource={[{key:'one',category:'Design'}]} />;
  }
  const user=userEvent.setup();
  render(<KooyaProvider><ControlledFilter /></KooyaProvider>);
  const trigger=screen.getByRole('button',{name:/filter/i});
  trigger.focus();
  await user.keyboard('{Enter}');
  await waitFor(()=>expect(screen.getByRole('menu')).toBeVisible());
  expect(trigger).toHaveAttribute('aria-expanded','true');
  await user.keyboard(' ');
  expect(trigger).toHaveAttribute('aria-expanded','false');
  await waitFor(()=>expect(screen.queryByRole('menu')).not.toBeInTheDocument());
});

it('names a ReactNode-title filter using the actual localized menu title', () => {
  render(<KooyaProvider><Table locale={{filterTitle: 'Filtrar columna'}} pagination={false} columns={[{title:<span>Category</span>,dataIndex:'category',filterIcon:<span aria-hidden="true">◆</span>,filters:[{text:'Design',value:'Design'}]}]} dataSource={[{key:'one',category:'Design'}]} /></KooyaProvider>);
  expect(screen.getByRole('button', {name:'Filtrar columna'})).toHaveAttribute('tabindex', '0');
});

it('retains custom filter rendering without declaring a nonexistent menu popup', async () => {
  const user=userEvent.setup();
  render(<KooyaProvider><Table pagination={false} columns={[{title:'Category',dataIndex:'category',filters:[{text:'Design',value:'Design'}],filterDropdownProps:{dropdownRender:()=> <section>Custom filter panel</section>}}]} dataSource={[{key:'one',category:'Design'}]} /></KooyaProvider>);
  const trigger=screen.getByRole('button',{name:/filter/i});
  expect(trigger).not.toHaveAttribute('aria-haspopup');
  trigger.focus();
  await user.keyboard('{Enter}');
  await waitFor(()=>expect(screen.getByText('Custom filter panel')).toBeVisible());
  expect(trigger).toHaveAttribute('aria-expanded','true');
});
