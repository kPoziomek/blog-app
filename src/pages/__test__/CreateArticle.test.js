import { BrowserRouter } from 'react-router-dom';
import {
  render,
  screen,
  fireEvent,
  act,
  prettyDOM,
  waitFor,
  logDOM,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { createStore } from '../../app/store';
import CreateArticle from '../CreateArticle';
import ArticleForm from '../components/ArticleForm';
import { Provider } from 'react-redux';

import MockAdapter from 'axios-mock-adapter';

import user from '@testing-library/user-event';
let store = null;
let spy = null;
describe('Create Article Component', () => {
  beforeEach(() => {
    store = createStore();
    spy = jest.spyOn(store, 'dispatch');
  });
  afterAll(() => {
    spy.mockClear();
  });
  it('should render empty form', () => {
    render(
      <Provider store={store}>
        <ArticleForm></ArticleForm>
      </Provider>
    );
    const postInput = screen.getByLabelText('Post');
    const titleInput = screen.getByRole('textbox', { name: 'Title' });
    const summaryInput = screen.getByRole('textbox', { name: 'Summary' });
    const content = screen.getByRole('textbox', { name: /content/i });
    expect(postInput).not.toBeChecked();
    expect(titleInput.value).toBe('');
    expect(summaryInput.value).toBe('');
    expect(content.value).toBe('');
  });
  it('onSubmit is called when all fields pass validation', async () => {
    const handlePostSend = jest.fn();

    render(
      <Provider store={store}>
        <ArticleForm onSubmit={handlePostSend}></ArticleForm>
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox', {
      name: /post/i,
    });
    await user.click(checkbox);

    const title = screen.getByRole('textbox', {
      name: /title/i,
    });
    await user.type(title, 'Title');

    const content = screen.getByRole('textbox', { name: /content/i });

    await user.type(content, 'content');

    const summary = screen.getByRole('textbox', {
      name: /summary/i,
    });
    await user.type(summary, 'summary');

    await user.click(
      screen.getByRole('button', {
        name: /submit post/i,
      })
    );

    await waitFor(async () => {
      expect(handlePostSend).toHaveBeenCalledTimes(1);
    });
    await waitFor(() =>
      expect(handlePostSend).toHaveBeenCalledWith({
        title: 'Title',
        summary: 'summary',
        content: 'content',
        publish: true,
      })
    );
  });
});
