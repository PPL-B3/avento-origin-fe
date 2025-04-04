import { Before, After, setWorldConstructor } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';

// Define a custom world class for sharing context
class CustomWorld {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;

  async init() {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async cleanup() {
    await this.context?.close();
    await this.browser?.close();
  }
}

// Tell Cucumber to use our custom world
setWorldConstructor(CustomWorld);

// Setup and teardown hooks
Before(async function(this: CustomWorld) {
  await this.init();
});

After(async function(this: CustomWorld) {
  await this.cleanup();
});
