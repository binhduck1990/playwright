import { expect } from '@playwright/test';
import { TODO_URL } from './todo.const';
import { test } from './fixture/todo-fixture';

test.describe('Todo-edit tests', () => {
    test.beforeEach(async ({ page, todoAddPage, todoPage, todoEditPage }) => {
        await page.goto(TODO_URL.addTodo);

        const taskName = 'Playwright';
        await todoAddPage.fillTaskDetails(taskName);
        await todoAddPage.submitForm();
        await page.waitForURL(TODO_URL.todos);
        await todoPage.verifyTodoExist(taskName);

        await todoEditPage.clickExpandedIcon();
        await todoEditPage.clickEditIcon();

        await page.waitForURL(TODO_URL.editTodo);
    });

    test('should not allow submitting the form when task name is empty', async ({ page, todoAddPage }) => {
        await todoAddPage.fillTaskDetails('');
        await todoAddPage.submitForm();
        await todoAddPage.verifyErrorMessage('Please enter a task name');

        expect(page.url()).toBe(TODO_URL.editTodo);
    });

    test('should not allow more than 3 categories to be selected', async ({ todoAddPage }) => {
        await todoAddPage.openCategorySelectBox();
        await todoAddPage.verifyCategoriesGreaterThanANumber(3);
        await todoAddPage.selectCategoriesByNumber(4);
        await todoAddPage.verifyCategoriesSelectedNumber(3);
        await todoAddPage.verifyErrorMessage('You cannot add more than 3 catagories');
    });

    test('should edit a todo', async ({ page, todoAddPage, todoPage }) => {
        const updatedTaskName = 'Playwright 2';
        await todoAddPage.fillTaskDetails(updatedTaskName);
        await todoAddPage.submitForm();
        await page.waitForURL(TODO_URL.todos);
        await todoPage.verifyTodoExist(updatedTaskName);
    });

    test('should cancel edit by click back-icon', async ({ page, todoEditPage }) => {
        await todoEditPage.clickBackIcon();

        expect(page.url()).toBe(TODO_URL.todos);
    });

    test('should cancel edit by click cancel-button', async ({ page, todoEditPage }) => {
        await todoEditPage.clickCancelButton();

        expect(page.url()).toBe(TODO_URL.todos);
    });
});