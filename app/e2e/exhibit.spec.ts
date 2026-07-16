import { test, expect } from '@playwright/test';

test('loads the explore exhibit and primary narrative', async ({ page }) => {
  await page.goto('/explore');
  await expect(page).toHaveTitle(/HELIOS-3D/);
  await expect(page.getByRole('heading', { name: /magnetic knots/i })).toBeVisible();
  await expect(page.getByText('Store', { exact: true })).toBeVisible();
  await expect(page.getByText('Compute', { exact: true })).toBeVisible();
  await expect(page.getByText('Read', { exact: true })).toBeVisible();
});

test('preserves the evidence route as a curated destination', async ({ page }) => {
  await page.goto('/evidence');
  await expect(page.getByRole('heading', { name: /evidence/i })).toBeVisible();
  await expect(page.getByText(/demonstrated/i).first()).toBeVisible();
});
