import { Page, Locator, expect } from '@playwright/test';

export class TodoDetailPage {
    private readonly todoDetail: (taskName: string) => Locator;
    private readonly expandedIcon: Locator;
    private readonly detailIcon: Locator;
    private readonly backIcon: Locator
    constructor(page: Page) {
        this.todoDetail = (taskName: string) => page.getByText(taskName);
        this.expandedIcon = page.locator('svg.cursor-pointer');
        this.detailIcon = page.locator('li', { hasText: 'Task details' });
        this.backIcon = page.locator('svg.cursor-pointer');
    }

    async clickExpandedIcon() {
        await this.expandedIcon.first().click();
    }

    async clickDetailIcon() {
        await this.detailIcon.first().click();
    }

    async clickBackIcon() {
        await this.backIcon.click();
    }

    async verifyUrlDetail(url: string) {
        await expect(url).toMatch(/.*\/todo\/[a-f0-9-]{36}/);
    }

    async verifyTodoDetailExist(taskName: string) {
        await expect(this.todoDetail(taskName)).toBeVisible();
    }
}