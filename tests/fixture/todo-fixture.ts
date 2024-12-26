import { test as base } from '@playwright/test';
import { TodoPage } from '../objectModel/todos';
import { TodoDetailPage } from '../objectModel/todo-detail';
import { TodoAddPage } from '../objectModel/todo-add';
import { TodoEditPage } from '../objectModel/todo-edit';
import { TodoDeletePage } from '../objectModel/todo-delete';

type TodoFixtures = {
    todoPage: TodoPage;
    todoDetailPage: TodoDetailPage;
    todoAddPage: TodoAddPage;
    todoEditPage: TodoEditPage;
    todoDeletePage: TodoDeletePage
};

export const test = base.extend<TodoFixtures>({
    todoPage: async ({ page }, use) => {
        const todoPage = new TodoPage(page);
        await use(todoPage);
    },
    todoDetailPage: async ({ page }, use) => {
        const todoDetailPage = new TodoDetailPage(page);
        await use(todoDetailPage);
    },
    todoAddPage: async ({ page }, use) => {
        const todoAddPage = new TodoAddPage(page);
        await use(todoAddPage);
    },
    todoEditPage: async ({ page }, use) => {
        const todoEditPage = new TodoEditPage(page);
        await use(todoEditPage);
    },
    todoDeletePage: async ({ page }, use) => {
        const todoDeletePage = new TodoDeletePage(page);
        await use(todoDeletePage);
    }
});