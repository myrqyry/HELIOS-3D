import { test, expect } from '@playwright/test';

test.setTimeout(30000);

test('home page renders hero, hopfion, and overview cards', async ({ page }) => {
  await page.goto('/HELIOS-3D/');
  await expect(page.getByRole('heading', { name: 'HELIOS-3D' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Architecture/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Material/i })).toBeVisible();
  await expect(page.locator('canvas')).toBeVisible();
});
