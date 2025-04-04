import { expect, test } from '@playwright/test';

test.describe('Login and File Upload Validation Flow', () => {
    test('should validate file upload constraints after login', async ({ page }) => {
        // Navigate to the login page
        await page.goto('/auth/login');

        // Verify we're on the login page
        await expect(page).toHaveURL(/\/auth\/login$/);
        await expect(page.locator('button[type="submit"]')).toBeVisible();

        // Fill in login credentials
        await page.fill('input[type="email"]', 'a@gmail.com');
        await page.fill('input[type="password"]', 'Admin123#');

        // Submit the form
        await page.click('button[type="submit"]');

        // Wait for navigation and verify we're logged in and on the upload document page
        await page.waitForSelector('text=Upload Document', { timeout: 5000 });
        await expect(page.locator('text=UPLOAD HERE!')).toBeVisible();

        // Verify file constraints are displayed correctly
        await expect(page.locator('text=max 8 MB')).toBeVisible();
        await expect(page.locator('text=*pdf')).toBeVisible();

        // Optionally, complete the upload flow
        // await uploadButton.click();
        // await page.waitForSelector('text=Upload Successful', { timeout: 10000 });

        // Clean up: Log out
        await page.click('text=Logout');
        await page.waitForSelector('input[type="email"]', { timeout: 5000 });
        await expect(page).toHaveURL(/\/auth\/login$/);
    });
});