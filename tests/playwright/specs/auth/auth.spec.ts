import { expect, test } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should login and logout successfully', async ({ page }) => {
    // Navigate to the application
    await page.goto('/');

    // Verify we're on the login page
    await expect(page).toHaveURL(/\/auth\/login$/);

    // Fill in login credentials
    await page.fill('input[type="email"]', 'a@gmail.com');
    await page.fill('input[type="password"]', 'Admin123#');

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for navigation and verify we're logged in
    await page.waitForSelector('text=Upload Document', { timeout: 5000 });

    // Verify the upload document button is visible, indicating we're logged in
    const uploadButton = page.locator('text=Upload Document').first();
    await expect(uploadButton).toBeVisible();

    // Now logout
    await page.click('text=Logout');

    // Wait for navigation and verify we're logged out (back to login page)
    await page.waitForSelector('input[type="email"]', { timeout: 5000 });

    // Verify we're back at the login page
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
  });
});
