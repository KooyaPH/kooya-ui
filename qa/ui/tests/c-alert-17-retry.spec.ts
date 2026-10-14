import { expect, test } from '@playwright/test';

for (const mode of ['light', 'dark'] as const) {
  test(`c-alert-17 Retry gives local feedback in ${mode} mode`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto(`/?mode=${mode}&density=comfortable#/preview/c-alert-17`);

    const alerts = page.getByRole('alert');
    await expect(alerts).toHaveCount(2);
    const retry = page.getByRole('button', { name: 'Retry', exact: true });
    await expect(retry).toBeVisible();
    await expect(retry).toBeEnabled();
    await expect(page.getByRole('status')).toHaveCount(0);

    await retry.click();
    const status = page.getByRole('status');
    await expect(status).toHaveText(
      'Local retry action recorded (1). This preview does not send an API request.',
    );

    await retry.focus();
    await page.keyboard.press('Enter');
    await expect(status).toHaveText(
      'Local retry action recorded (2). This preview does not send an API request.',
    );

    await page.keyboard.press('Space');
    await expect(status).toHaveText(
      'Local retry action recorded (3). This preview does not send an API request.',
    );
    await expect(retry).toBeEnabled();
  });
}
