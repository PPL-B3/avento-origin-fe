import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

// Hooks
Before(async () => {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  loginPage = new LoginPage(page);
});

After(async () => {
  await browser.close();
});

// Step definitions
Given('I am on the login page', async () => {
  await loginPage.navigate();
});

When('I enter valid username and password', async () => {
  // Replace with actual test credentials
  await loginPage.login('testuser@example.com', 'password123');
});

When('I enter invalid username or password', async () => {
  await loginPage.login('invalid@example.com', 'wrongpassword');
});

When('I click the login button', async () => {
  // Already handled in login method
});

Then('I should be redirected to the dashboard page', async () => {
  const currentUrl = await loginPage.getCurrentUrl();
  expect(currentUrl).toContain('/dashboard');
});

Then('I should see a welcome message', async () => {
  const isLoggedIn = await loginPage.isLoggedIn();
  expect(isLoggedIn).toBeTruthy();
});

Then('I should see an error message', async () => {
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).not.toBeNull();
});

Then('I should remain on the login page', async () => {
  const currentUrl = await loginPage.getCurrentUrl();
  expect(currentUrl).toContain('/login');
});

Given('I am logged in', async () => {
  await loginPage.navigate();
  await loginPage.login('testuser@example.com', 'password123');
  const isLoggedIn = await loginPage.isLoggedIn();
  expect(isLoggedIn).toBeTruthy();
});

When('I click the logout button', async () => {
  await loginPage.logout();
});

Then('I should be logged out of the system', async () => {
  const isLoggedIn = await loginPage.isLoggedIn();
  expect(isLoggedIn).toBeFalsy();
});
