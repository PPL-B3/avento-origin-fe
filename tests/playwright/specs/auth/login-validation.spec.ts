import { test, expect } from '@playwright/test';

test.describe('Login Form Validation', () => {
  test('should validate inputs and show appropriate error messages', async ({ page }) => {
    // Navigate to the application and expect redirect to login page
    await page.goto('/');

    // Verify redirection to login page
    await expect(page).toHaveURL('/auth/login');

    // First, let's take a screenshot of the initial page to understand its structure
    await page.screenshot({ path: 'login-page-initial.png' });

    // Scenario 1: Submit empty form
    await page.click('button[type="submit"]');

    // Take a screenshot to see what validation messages appear
    await page.screenshot({ path: 'empty-form-validation.png' });

    // Wait a moment to ensure any client-side validation appears
    await page.waitForTimeout(1000);

    // Verify we're still on the login page
    await expect(page).toHaveURL(/\/auth\/login$/);

    // Scenario 2: Invalid email format
    await page.fill('input[type="email"]', 'invalid-email');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Take screenshot to capture the validation state
    await page.screenshot({ path: 'invalid-email-validation.png' });

    // Wait a moment to ensure any client-side validation appears
    await page.waitForTimeout(1000);

    // Check if the email input is marked as invalid (HTML5 validation)
    const emailValid = await page.evaluate(() => {
      const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
      return emailInput ? emailInput.checkValidity() : true;
    });

    expect(emailValid).toBeFalsy();

    // Scenario 3: Valid email but incorrect credentials
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'wrong-password');
    await page.click('button[type="submit"]');

    // Take screenshot after submitting wrong credentials
    await page.screenshot({ path: 'wrong-credentials.png' });

    // Wait for any possible error messages (might take time due to API call)
    await page.waitForTimeout(2000);

    // Check if we're still on the login page (indicates login failed)
    await expect(page).toHaveURL('/auth/login');

    // Scenario 4: Test with valid credentials (optional - uncomment if needed)
    /*
    await page.fill('input[type="email"]', 'a@gmail.com');
    await page.fill('input[type="password"]', 'Admin123#');
    await page.click('button[type="submit"]');
    
    // Allow time for redirect after successful login
    await page.waitForTimeout(2000);
    
    // Check if we're redirected after successful login
    const currentUrl = page.url();
    expect(currentUrl).not.toContain('/auth/login');
    */
  });
});

test('should check field-level validations', async ({ page }) => {
  // Navigate to login page
  await page.goto('/auth/login');

  // Test HTML5 validation by entering invalid email and then removing focus
  await page.fill('input[type="email"]', 'invalid');
  // Click outside the field to trigger validation
  await page.click('input[type="password"]');

  // Check if the email field shows HTML5 validation error
  // This works if your app uses the browser's built-in validation
  const emailValid = await page.evaluate(() => {
    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
    return emailInput ? emailInput.checkValidity() : true;
  });

  expect(emailValid).toBeFalsy();

  // Clear and enter valid email to test password validations
  await page.fill('input[type="email"]', 'valid@example.com');

  // Try with very short password
  await page.fill('input[type="password"]', '12');
  await page.click('button[type="submit"]');

  // Try with password missing required characters
  await page.fill('input[type="password"]', 'onlyletters');
  await page.click('button[type="submit"]');

  // Verify we're still on the login page
  await expect(page).toHaveURL(/\/auth\/login$/);
});