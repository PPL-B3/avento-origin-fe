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
// Define a custom world class for sharing context
class CustomWorld {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.browser = yield test_1.chromium.launch({ headless: false });
            this.context = yield this.browser.newContext();
            this.page = yield this.context.newPage();
        });
    }
    cleanup() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            yield ((_a = this.context) === null || _a === void 0 ? void 0 : _a.close());
            yield ((_b = this.browser) === null || _b === void 0 ? void 0 : _b.close());
        });
    }
}
// Tell Cucumber to use our custom world
(0, cucumber_1.setWorldConstructor)(CustomWorld);
// Setup and teardown hooks
(0, cucumber_1.Before)(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.init();
    });
});
(0, cucumber_1.After)(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.cleanup();
    });
});
