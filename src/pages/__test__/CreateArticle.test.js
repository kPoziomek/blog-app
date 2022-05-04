import { BrowserRouter } from 'react-router-dom';
import {
  render,
  screen,
  fireEvent,
  act,
  prettyDOM,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { store } from '../../app/store';
import CreateArticle from '../CreateArticle';
import ArticleForm from '../components/ArticleForm';
import UiQuillComponent from '../components/UI/UiQuillComponent';
import ApiProvider from '../../contexts/ApiProvider';
import ReactQuill from 'react-quill';

describe('Create Article Component', () => {
  it.only('should render empty form', () => {
    render(
      <BrowserRouter>
        <ApiProvider store={store}>
          <CreateArticle>
            <ArticleForm>
              <UiQuillComponent>
                <ReactQuill />
              </UiQuillComponent>
            </ArticleForm>
          </CreateArticle>
        </ApiProvider>
      </BrowserRouter>
    );

    const postInput = screen.getByLabelText('Post');
    const titleInput = screen.getByRole('textbox', { name: 'Title' });
    const summaryInput = screen.getByRole('textbox', { name: 'Summary' });
    // eslint-disable-next-line testing-library/no-node-access
    const quillDiv = document.getElementById('content');
    // eslint-disable-next-line testing-library/no-node-access
    const quillInput = quillDiv.querySelector('input');

    expect(postInput).not.toBeChecked();
    expect(titleInput.value).toBe('');
    expect(summaryInput.value).toBe('');
    expect(quillInput.value).toBe('');
  });
});
