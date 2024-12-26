import { expect, Page, Locator } from '@playwright/test';

export class TodoAddPage {
    private readonly taskNameInput: Locator;
    private readonly taskDescriptionInput: Locator;
    private readonly categorySelectBox: Locator;
    private readonly categoryItems: Locator;
    private readonly categorySelectedItems: Locator;
    private readonly submitButton: Locator;
    private readonly errorMessage: Locator;
    constructor(page: Page) {
        this.taskNameInput = page.locator('#taskName');
        this.taskDescriptionInput = page.locator('#taskDescription');
        this.categorySelectBox = page.locator('.bg-white');
        this.categoryItems = page.locator('li.text-base');
        this.categorySelectedItems = page.locator('.bg-purple-500');
        this.submitButton = page.locator('button[type="submit"]');
        this.errorMessage = page.locator('.border-red-600');
    }

    async fillTaskDetails(name: string, description: string = '') {
        await this.taskNameInput.fill(name);
        await this.taskDescriptionInput.fill(description);
    }

    async openCategorySelectBox() {
        await this.categorySelectBox.click();
    }

    async selectFirstCategory() {
        const categoriesCount = await this.categoryItems.count();
        if (categoriesCount > 0) {
            await this.categoryItems.nth(0).click();
        }
    }

    async submitForm() {
        await this.submitButton.click();
    }

    async verifyCategoriesGreaterThanANumber(number: number) {
        const categoriesCount: number = await this.categoryItems.count();
        expect(categoriesCount).toBeGreaterThan(number);
    }

    async selectCategoriesByNumber(number: number) {
        for (let i = 0; i < number; i++) {
            await this.categoryItems.nth(i).click();
        }
    }

    async verifyCategoriesSelectedNumber(number: number) {
        const categoriesSelectedCount: number = await this.categorySelectedItems.count();
        expect(categoriesSelectedCount).toBe(number);
    }

    async verifyErrorMessage(expectedMessage: string) {
        await expect(this.errorMessage).toHaveText(expectedMessage);
    }
}