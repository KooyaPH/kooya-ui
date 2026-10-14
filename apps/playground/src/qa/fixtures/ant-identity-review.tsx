import * as direct from 'antd';
import * as canonical from '@kooyaph/ui/components';

export default function IdentityFixture() {
  const {token:provider} = canonical.theme.useToken();
  const {token:consumer} = direct.theme.useToken();
  const mismatches = Object.entries(canonical).filter(([name, value]) => value !== (direct as Record<string, unknown>)[name]).map(([name]) => name);
  return <section aria-label="Native public contract probe">
    <output data-testid="native-identity">{JSON.stringify(mismatches)}</output>
    <output data-testid="canonical-token">{JSON.stringify({height:provider.controlHeight,surface:provider.colorBgContainer})}</output>
    <output data-testid="consumer-token">{JSON.stringify({height:consumer.controlHeight,surface:consumer.colorBgContainer})}</output>
  </section>;
}
