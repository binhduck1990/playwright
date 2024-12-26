import { test } from './fixture/todo-fixture';
import { TODO_URL } from './todo.const';

test.describe('Todo-list tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(TODO_URL.todos);
    });

    test('should show empty page', async ({ todoPage }) => {
        await todoPage.verifyEmptyPage();
    });

    test('should show task, progress summery information and search', async ({ page, todoAddPage, todoPage }) => {
        await page.goto(TODO_URL.addTodo);

        const taskName = 'Playwright';
        await todoAddPage.fillTaskDetails(taskName)
        await todoAddPage.submitForm();
        await page.waitForURL(TODO_URL.todos);

        await todoPage.verifyTodoExist(taskName);
        await todoPage.verifyTodoSummeryInformation();
        await todoPage.verifyTodoSearch();
    });

    test('should mark as done a task', async ({ page, todoAddPage, todoPage }) => {
        await page.goto(TODO_URL.addTodo);

        const taskName = 'Playwright';
        await todoAddPage.fillTaskDetails(taskName)
        await todoAddPage.submitForm();
        await page.waitForURL(TODO_URL.todos);
        await todoPage.verifyTodoExist(taskName);

        await todoPage.clickExpandedIcon();
        await todoPage.clickMarkAsDoneIcon();

        await todoPage.verifyTodoSummeryInformationMarkAsDone();
        await todoPage.verifyTaskInformationMarkAsDone(taskName);
    });

    test('should make a copy', async ({ page, todoAddPage, todoPage }) => {
        await page.goto(TODO_URL.addTodo);

        const taskName = 'Playwright';
        await todoAddPage.fillTaskDetails(taskName)
        await todoAddPage.submitForm();
        await page.waitForURL(TODO_URL.todos);
        await todoPage.verifyTodoExist(taskName);

        await todoPage.clickExpandedIcon();
        await todoPage.clickCopyIcon();

        await todoPage.verifyTodoCopy(taskName);
    });

    test('should allow search', async ({ page, todoAddPage, todoPage }) => {
        await page.goto(TODO_URL.addTodo);

        const taskName = 'Playwright';
        await todoAddPage.fillTaskDetails(taskName)
        await todoAddPage.submitForm();
        await page.waitForURL(TODO_URL.todos);
        await todoPage.verifyTodoExist(taskName);

        await todoPage.verifyTodoSearch();
        await todoPage.searchTodo('123');
        await todoPage.verifyTodoNotExist(taskName);
        await todoPage.searchTodo('');
        await todoPage.verifyTodoExist(taskName);
        await todoPage.searchTodo('Play');
        await todoPage.verifyTodoExist(taskName);
    });
});