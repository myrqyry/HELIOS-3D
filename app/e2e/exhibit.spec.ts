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

test('exposes the source verification ledger', async ({ page }) => {
  await page.goto('/sources');
  await expect(page.getByRole('heading', { name: 'Sources' })).toBeVisible();
  await expect(page.getByLabel('Source verification summary').getByText('Missing URL', { exact: true })).toBeVisible();
  await expect(page.getByText('ConfSeq: 3D molecular structures and AI', { exact: true })).toBeVisible();
});
