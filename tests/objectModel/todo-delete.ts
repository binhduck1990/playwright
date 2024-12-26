import { Page, Locator } from '@playwright/test';

export class TodoDeletePage {
    private readonly expandedIcon: Locator;
    private readonly deletedIcon: Locator;
    constructor(page: Page) {
        this.expandedIcon = page.locator('svg.cursor-pointer');
        this.deletedIcon = page.locator('li', { hasText: 'Delete' });
    }

    async clickExpandedIcon() {
        await this.expandedIcon.first().click();
    }

    async clickDeletedIcon() {
        await this.deletedIcon.first().click();
    }
}