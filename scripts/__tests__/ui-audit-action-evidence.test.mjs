import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {verifyActionObligations} from '../ui-audit-ledger.mjs';
const hash=x=>crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex');
function fixture(){
 const contract={actionObligations:[{id:'preserve',definition:'Real focused dirty transition',status:'pending execution',caseIds:['transition-before','transition-after']}]};
 const item={id:'actual',fingerprint:'current',expectedCases:['transition-before','transition-after'],cases:['transition-before','transition-after'].map(id=>({id,worker:{agent:'worker'},reviewer:{agent:'reviewer'}})),actionVerifications:[{id:'preserve',status:'verified',caseIds:['transition-before','transition-after'],fingerprint:'current',contractFingerprint:hash(contract),observation:'Actual value and focus retained across native transition',workerAgent:'worker',reviewerAgent:'reviewer'}]};
 return {contract,item};
}
test('immutable obligation definitions can retain pending wording while external evidence verifies execution',()=>{const {contract,item}=fixture();assert.doesNotThrow(()=>verifyActionObligations(item,contract));assert.equal(contract.actionObligations[0].status,'pending execution')});
test('mutating contract status cannot establish evidence',()=>{const {contract,item}=fixture();contract.actionObligations[0].status='verified';item.actionVerifications=[];assert.throws(()=>verifyActionObligations(item,contract),/action obligation/)});
test('partial, duplicate, or substituted action cases cannot satisfy definitions',()=>{for(const cases of [['transition-after'],['transition-after','transition-after'],['transition-before','unrelated']]){const {contract,item}=fixture();item.actionVerifications[0].caseIds=cases;assert.throws(()=>verifyActionObligations(item,contract),/explicit cases/)}});
test('action evidence must be independently owned and current',()=>{for(const field of ['fingerprint','contractFingerprint','reviewerAgent','observation']){const {contract,item}=fixture();item.actionVerifications[0][field]=field==='reviewerAgent'?'worker':field==='observation'?'':'stale';assert.throws(()=>verifyActionObligations(item,contract),/action evidence/)}});
test('obligations require predetermined cases and reject undeclared extra evidence',()=>{const {contract,item}=fixture();contract.actionObligations[0].caseIds=[];assert.throws(()=>verifyActionObligations(item,contract),/explicit cases/);const next=fixture();next.item.actionVerifications.push({...next.item.actionVerifications[0],id:'invented'});assert.throws(()=>verifyActionObligations(next.item,next.contract),/undeclared|duplicate/)});
