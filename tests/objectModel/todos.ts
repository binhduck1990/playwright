import { expect, Page, Locator } from '@playwright/test';

export class TodoPage {
    private readonly todo: (taskName: string) => Locator;
    private readonly emptyTodo: Locator;

    private readonly todoProgressSummery: Locator;
    private readonly totalTask: Locator;
    private readonly todoProgressStatus: Locator;
    private readonly todoProgressStatusDone: Locator;
    private readonly todoProgress: Locator;
    private readonly todoProgressDone: Locator;
    private readonly todoSearch: Locator;

    private readonly expandedIcon: Locator;
    private readonly markAsDoneIcon: Locator;
    private readonly copyIcon: Locator;

    private readonly taskIconDone: Locator;
    private readonly taskNameDone: (taskName: string) => Locator;
    private readonly taskDateDone: Locator;

    constructor(page: Page) {
        this.todo = (taskName: string) => page.locator('h2.displayInput', { hasText: taskName });
        this.emptyTodo = page.getByText('You don\'t have any tasks');

        this.todoProgressSummery = page.getByText('Progress summery');
        this.totalTask = page.getByText('1 Task');
        this.todoProgressStatus = page.getByText('Progress (No tasks completed)');
        this.todoProgress = page.getByText('0%');
        this.todoSearch = page.getByPlaceholder('Search for task...');

        this.expandedIcon = page.locator('svg.cursor-pointer');
        this.markAsDoneIcon = page.locator('li', { hasText: 'Mark as done' });
        this.copyIcon = page.locator('li', { hasText: 'Copy' });

        this.todoProgressStatusDone = page.getByText('Progress (All tasks completed)');
        this.todoProgressDone = page.getByText('100%');

        this.taskIconDone = page.locator('.bg-purple-500 svg.text-4xl');
        this.taskNameDone = (taskName: string) => page.locator('h2.line-through', { hasText: taskName });
        this.taskDateDone = page.locator('p.line-through:visible');
    }

    async verifyTodoExist(taskName: string) {
        await expect(this.todo(taskName)).toBeVisible();
    }

    async verifyTodoNotExist(taskName: string) {
        await expect(this.todo(taskName)).not.toBeVisible();
    }

    async verifyTodoDeleted(taskName: string) {
        await expect(this.todo(taskName)).not.toBeVisible();
    }

    async verifyTodoCopy(taskName: string) {
        await expect(this.todo(taskName)).toHaveCount(2);
    }

    async verifyEmptyPage() {
        await expect(this.emptyTodo).toBeVisible();
    }

    async verifyTodoSummeryInformation() {
        await expect(this.todoProgressSummery).toBeVisible();
        await expect(this.totalTask).toBeVisible();
        await expect(this.todoProgressStatus).toBeVisible();
        await expect(this.todoProgress).toBeVisible();
    }

    async verifyTodoSummeryInformationMarkAsDone() {
        await expect(this.todoProgressSummery).toBeVisible();
        await expect(this.totalTask).toBeVisible();
        await expect(this.todoProgressStatusDone).toBeVisible();
        await expect(this.todoProgressDone).toBeVisible();
    }

    async verifyTaskInformationMarkAsDone(taskName: string) {
        await expect(this.taskIconDone).toBeVisible();
        await expect(this.taskNameDone(taskName)).toBeVisible();
        await expect(this.taskDateDone).toBeVisible();
    }

    async verifyTodoSearch() {
        await expect(this.todoSearch).toBeVisible();
    }

    async searchTodo(name: string) {
        await this.todoSearch.fill(name);
    }

    async clickExpandedIcon() {
        await this.expandedIcon.first().click();
    }

    async clickMarkAsDoneIcon() {
        await this.markAsDoneIcon.first().click();
    }

    async clickCopyIcon() {
        await this.copyIcon.first().click();
    }
}