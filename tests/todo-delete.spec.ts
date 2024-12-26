import { test } from './fixture/todo-fixture';
import { TODO_URL } from './todo.const';

test.describe('Todo-delete tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(TODO_URL.addTodo);
    });

    test('should delete a todo', async ({ page, todoDeletePage, todoAddPage, todoPage }) => {
        const taskName = 'Playwright';
        await todoAddPage.fillTaskDetails(taskName);
        await todoAddPage.submitForm();
        await page.waitForURL(TODO_URL.todos);

        await todoPage.verifyTodoExist(taskName);

        await todoDeletePage.clickExpandedIcon();
        await todoDeletePage.clickDeletedIcon();

        await todoPage.verifyTodoDeleted(taskName);
    });
});