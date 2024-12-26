import { expect } from '@playwright/test';
import { TODO_URL } from './todo.const';
import { test } from './fixture/todo-fixture';

test.describe('Todo-detail tests', () => {
    test.beforeEach(async ({ page, todoAddPage, todoPage, todoDetailPage }) => {
        await page.goto(TODO_URL.addTodo);

        const taskName = 'Playwright';
        await todoAddPage.fillTaskDetails(taskName);
        await todoAddPage.submitForm();
        await page.waitForURL(TODO_URL.todos);
        await todoPage.verifyTodoExist(taskName);

        await todoDetailPage.clickExpandedIcon();
        await todoDetailPage.clickDetailIcon();

        await page.waitForURL(TODO_URL.detailTodo);
    });

    test('should show a task details', async ({ page, todoDetailPage }) => {
        const taskName = 'Playwright';

        await todoDetailPage.verifyUrlDetail(page.url());
        await todoDetailPage.verifyTodoDetailExist(taskName);
    });

    test('should go back to the list page', async ({ page, todoDetailPage }) => {
        await todoDetailPage.clickBackIcon();

        expect(page.url()).toBe(TODO_URL.todos);
    });
});