import {test,expect} from '@playwright/test';
test('production consumer shares canonical Ant values and provider token context',async({page})=>{
  await page.goto('/audit.html?item=ant-identity-review&fixture=contract&mode=dark&density=comfortable');
  await expect(page.getByTestId('native-identity')).toHaveText('[]');
  const provider=JSON.parse(await page.getByTestId('canonical-token').textContent()??'{}');
  const consumer=JSON.parse(await page.getByTestId('consumer-token').textContent()??'{}');
  expect(provider).toMatchObject({height:44,surface:'#1f1e19'});
  expect(consumer).toEqual(provider);
});
