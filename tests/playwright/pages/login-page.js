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
exports.LoginPage = void 0;
class LoginPage {
    constructor(page) {
        // Selectors - adjust these based on your actual application
        this.usernameInput = 'input[name="email"]';
        this.passwordInput = 'input[name="password"]';
        this.loginButton = 'button[type="submit"]';
        this.errorMessage = '[data-testid="error-message"]';
        this.welcomeMessage = '[data-testid="welcome-message"]';
        this.logoutButton = '[data-testid="logout-button"]';
        this.page = page;
    }
    navigate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.goto('/auth/login');
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.fill(this.usernameInput, username);
            yield this.page.fill(this.passwordInput, password);
            yield this.page.click(this.loginButton);
        });
    }
    getErrorMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            const error = yield this.page.locator(this.errorMessage);
            return yield error.textContent();
        });
    }
    isLoggedIn() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.page.locator(this.welcomeMessage).isVisible();
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.click(this.logoutButton);
        });
    }
    getCurrentUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.page.url();
        });
    }
}
exports.LoginPage = LoginPage;
