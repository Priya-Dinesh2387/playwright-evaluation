import { Locator, Page } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');
        this.errorMessage = page.locator('.oxd-alert-content-text');
    }

    public async navigate(): Promise<void> {
        await this.page.goto(
            'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
        );
    }

    public async login(
        username: string,
        password: string
    ): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    public async getErrorMessage(): Promise<string> {
        const message: string =
            (await this.errorMessage.textContent()) ?? '';

        return message.trim();
    }
}