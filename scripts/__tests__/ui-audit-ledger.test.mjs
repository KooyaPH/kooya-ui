import { test } from 'node:test';
import assert from 'node:assert/strict';
import { acceptItem, reconcileItems, matrixCases } from '../ui-audit-ledger.mjs';

test('a test pass cannot accept missing screenshots or visual reviews', () => {
  const item = { id: 'one', fingerprint: 'a', status: 'review', expectedCases: ['one-case'], cases: [{ id: 'one-case', assertions: 'passed' }], defects: [] };
  assert.throws(() => acceptItem(item), /screenshot/);
});
test('review must be independent and bound to the exact rendering fingerprint', () => {
  const item = { id: 'one', fingerprint: 'a', status: 'review', expectedCases: ['one-case'], defects: [], cases: [{ id: 'one-case', assertions: 'passed', screenshot: 'one.png', screenshotSha256: 'sha', fingerprint: 'a', worker: { agent: 'alice', verdict: 'passed' }, reviewer: { agent: 'alice', verdict: 'passed' } }] };
  assert.throws(() => acceptItem(item), /independent/);
  item.cases[0].reviewer.agent = 'bob'; item.cases[0].fingerprint = 'old';
  assert.throws(() => acceptItem(item), /stale/);
});
test('an unresolved minor defect also prevents acceptance', () => {
  assert.throws(() => acceptItem({ id: 'one', expectedCases: ['case'], defects: [{ id: 'D1', status: 'open', severity: 'minor' }] }), /unresolved/);
});
test('coverage is exact and zero-case visual contracts cannot be accepted', () => {
  assert.throws(() => acceptItem({ id: 'one', expectedCases: [], defects: [], cases: [] }), /coverage/);
  assert.throws(() => acceptItem({ id: 'one', expectedCases: ['a', 'b'], defects: [], cases: [{ id: 'a' }] }), /coverage/);
});
test('changed dependencies invalidate acceptance without discarding evidence', () => {
  const previous = [{ id: 'one', fingerprint: 'a', status: 'accepted-local', cases: [{ id: 'old' }], defects: [] }];
  const [item] = reconcileItems(previous, [{ id: 'one', fingerprint: 'b' }]);
  assert.equal(item.status, 'stale'); assert.equal(item.cases[0].id, 'old'); assert.equal(item.fingerprint, 'b');
});
test('matrix crosses every state and appearance rather than sampling', () => {
  const cases = matrixCases('one', ['default', 'focused'], ['chromium', 'firefox', 'webkit']);
  assert.equal(cases.length, 384); assert.equal(new Set(cases.map(c => c.id)).size, 384);
  assert.equal(cases.filter(c => c.width === 320 && c.state === 'focused').length, 24);
});
test('invented evidence and unclassified surfaces cannot pass a caller supplied coverage list', () => {
  const item = { id: 'one', classification: 'classification-required', fingerprint: 'a', expectedCases: ['fake'], defects: [], cases: [{ id: 'fake', assertions: 'passed', fingerprint: 'a', screenshot: 'does-not-exist.png', screenshotSha256: 'not-a-hash', worker: {agent:'alice',verdict:'passed'}, reviewer:{agent:'bob',verdict:'passed'} }] };
  assert.throws(() => acceptItem(item), /classified contract/);
});
