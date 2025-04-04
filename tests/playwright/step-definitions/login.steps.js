"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
const login_page_1 = require("../pages/login-page");
let browser;
let page;
let loginPage;
// Hooks
(0, cucumber_1.Before)(() => __awaiter(void 0, void 0, void 0, function* () {
    browser = yield test_1.chromium.launch({ headless: false });
    const context = yield browser.newContext();
    page = yield context.newPage();
    loginPage = new login_page_1.LoginPage(page);
}));
(0, cucumber_1.After)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield browser.close();
}));
// Step definitions
(0, cucumber_1.Given)('I am on the login page', () => __awaiter(void 0, void 0, void 0, function* () {
    yield loginPage.navigate();
}));
(0, cucumber_1.When)('I enter valid username and password', () => __awaiter(void 0, void 0, void 0, function* () {
    // Replace with actual test credentials
    yield loginPage.login('testuser@example.com', 'password123');
}));
(0, cucumber_1.When)('I enter invalid username or password', () => __awaiter(void 0, void 0, void 0, function* () {
    yield loginPage.login('invalid@example.com', 'wrongpassword');
}));
(0, cucumber_1.When)('I click the login button', () => __awaiter(void 0, void 0, void 0, function* () {
    // Already handled in login method
}));
(0, cucumber_1.Then)('I should be redirected to the dashboard page', () => __awaiter(void 0, void 0, void 0, function* () {
    const currentUrl = yield loginPage.getCurrentUrl();
    (0, test_1.expect)(currentUrl).toContain('/dashboard');
}));
(0, cucumber_1.Then)('I should see a welcome message', () => __awaiter(void 0, void 0, void 0, function* () {
    const isLoggedIn = yield loginPage.isLoggedIn();
    (0, test_1.expect)(isLoggedIn).toBeTruthy();
}));
(0, cucumber_1.Then)('I should see an error message', () => __awaiter(void 0, void 0, void 0, function* () {
    const errorMessage = yield loginPage.getErrorMessage();
    (0, test_1.expect)(errorMessage).not.toBeNull();
}));
(0, cucumber_1.Then)('I should remain on the login page', () => __awaiter(void 0, void 0, void 0, function* () {
    const currentUrl = yield loginPage.getCurrentUrl();
    (0, test_1.expect)(currentUrl).toContain('/login');
}));
(0, cucumber_1.Given)('I am logged in', () => __awaiter(void 0, void 0, void 0, function* () {
    yield loginPage.navigate();
    yield loginPage.login('testuser@example.com', 'password123');
    const isLoggedIn = yield loginPage.isLoggedIn();
    (0, test_1.expect)(isLoggedIn).toBeTruthy();
}));
(0, cucumber_1.When)('I click the logout button', () => __awaiter(void 0, void 0, void 0, function* () {
    yield loginPage.logout();
}));
(0, cucumber_1.Then)('I should be logged out of the system', () => __awaiter(void 0, void 0, void 0, function* () {
    const isLoggedIn = yield loginPage.isLoggedIn();
    (0, test_1.expect)(isLoggedIn).toBeFalsy();
}));
