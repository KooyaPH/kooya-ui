import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { KooyaProvider } from '../src/foundations';
import { Table } from '../src/components';
it('retains caller ARIA ownership on actual virtual table container',()=>{
 render(<KooyaProvider><Table role="table" aria-label="Virtual records" aria-rowcount={3} aria-colcount={1} virtual scroll={{x:400,y:200}} pagination={false} columns={[{title:'Name',dataIndex:'name'}]} dataSource={[{key:'a',name:'First'},{key:'b',name:'Second'}]}/></KooyaProvider>);
 const owner=screen.getAllByRole('table',{name:'Virtual records'}).find(element=>element.classList.contains('ant-table-virtual'));
 expect(owner).toHaveClass('ant-table-virtual');
 expect(owner).toHaveAttribute('aria-rowcount','3');
 expect(owner).toHaveAttribute('aria-colcount','1');
});
