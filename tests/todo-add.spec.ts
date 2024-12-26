import { expect } from '@playwright/test';
import { TODO_URL } from './todo.const';
import { test } from './fixture/todo-fixture';

test.describe('Todo-add tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(TODO_URL.addTodo);
    });

    test('should not allow submitting the form when task name is empty', async ({ page, todoAddPage }) => {
        await todoAddPage.submitForm();
        await todoAddPage.verifyErrorMessage('Please enter a task name');
        expect(page.url()).toBe(TODO_URL.addTodo);
    });

    test('should not allow more than 3 categories to be selected', async ({ todoAddPage }) => {
        await todoAddPage.openCategorySelectBox();
        await todoAddPage.verifyCategoriesGreaterThanANumber(3);
        await todoAddPage.selectCategoriesByNumber(4);
        await todoAddPage.verifyCategoriesSelectedNumber(3);
        await todoAddPage.verifyErrorMessage('You cannot add more than 3 catagories');
    });

    test('should add a new todo', async ({ page, todoAddPage, todoPage }) => {
        const taskName = 'Playwright';
        const taskDescription = 'Learn playwright';

        await todoAddPage.fillTaskDetails(taskName, taskDescription);
        await todoAddPage.openCategorySelectBox();
        await todoAddPage.selectFirstCategory();
        await todoAddPage.submitForm();
        await page.waitForURL(TODO_URL.todos);
        await todoPage.verifyTodoExist(taskName);
    });
});