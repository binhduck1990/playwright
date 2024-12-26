import { Page, Locator } from '@playwright/test';

export class TodoEditPage {
    private readonly expandedIcon: Locator;
    private readonly editIcon: Locator;
    private readonly backIcon: Locator
    private readonly cancelButton: Locator
    constructor(page: Page) {
        this.expandedIcon = page.locator('svg.cursor-pointer');
        this.editIcon = page.locator('li', { hasText: 'Edit' });
        this.backIcon = page.locator('svg.cursor-pointer');
        this.cancelButton = page.getByRole('button', { name: /Cancel/i });
    }

    async clickExpandedIcon() {
        await this.expandedIcon.first().click();
    }

    async clickEditIcon() {
        await this.editIcon.first().click();
    }

    async clickBackIcon() {
        await this.backIcon.click();
    }

    async clickCancelButton() {
        await this.cancelButton.click();
    }
}