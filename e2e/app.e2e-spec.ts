import { TodolistPage } from './app.po';

describe('todolist App', () => {
  let page: TodolistPage;

  beforeEach(() => {
    page = new TodolistPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
