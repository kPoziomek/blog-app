import store from '../../app/store';
import reducer, {
  articleReducer,
  articleSlice,
  postArticleRedux,
  initialState,
  getAllArticlesRedux,
} from '../../features/articleSlice';

import MockAdapter from 'axios-mock-adapter';
import { instance } from '../../helpers/axiosConfig';
import { user } from './mockUser';
var mock = new MockAdapter(instance);

describe('example clise', () => {
  describe('reducer', () => {
    const initialState = {
      articles: [],
      myArticles: [],
      article: [],

      loadingArticles: false,
      loadingMyArticle: false,
      isEdited: false,
      loadingSingleArticle: false,
      loadingDeletedArticle: false,
      loadingPostArticle: false,
      navigateToHome: false,
    };
    it('sets loadingArticles true when getAllArticlesRedux is pending', () => {
      const action = { type: getAllArticlesRedux.pending.type };

      const state = articleReducer(initialState, action);

      expect(state).toEqual({
        articles: [],
        myArticles: [],
        article: [],

        loadingArticles: true,
        loadingMyArticle: false,
        isEdited: false,
        loadingSingleArticle: false,
        loadingDeletedArticle: false,
        loadingPostArticle: false,
        navigateToHome: false,
      });
    });
    it('sets the articles and list when getAllArticlesRedux is fulfilled', () => {
      const action = {
        type: getAllArticlesRedux.fulfilled.type,
        payload: {
          articles: [
            {
              id: 1,
              createdAt: '2022-05-27T05:50:47.660Z',
              updatedAt: '2022-05-27T05:50:47.660Z',
              publishedAt: '2022-05-27T07:50:47.652Z',
              title: 'test1',
              summary: 'test1',
              content: 'test1',
              author: {
                id: 2,
                firstName: 'Esmeralda',
                lastName: 'Rippin',
                about: 'holistic embrace channels',
                createdAt: '2022-05-27T05:49:37.955Z',
                updatedAt: '2022-05-27T05:49:37.955Z',
              },
            },
          ],
        },
      };

      const state = articleReducer(initialState, action);

      expect(state).toEqual({
        articles: {
          articles: [
            {
              id: 1,
              createdAt: '2022-05-27T05:50:47.660Z',
              updatedAt: '2022-05-27T05:50:47.660Z',
              publishedAt: '2022-05-27T07:50:47.652Z',
              title: 'test1',
              summary: 'test1',
              content: 'test1',
              author: {
                id: 2,
                firstName: 'Esmeralda',
                lastName: 'Rippin',
                about: 'holistic embrace channels',
                createdAt: '2022-05-27T05:49:37.955Z',
                updatedAt: '2022-05-27T05:49:37.955Z',
              },
            },
          ],
        },
        myArticles: [],
        article: [],
        loadingArticles: false,
        loadingMyArticle: false,
        isEdited: false,
        loadingSingleArticle: false,
        loadingDeletedArticle: false,
        loadingPostArticle: false,
        navigateToHome: false,
      });
    });
    it('set loadingArticles false when getAllArticlesRedux is rejected', () => {
      const rejectedAction = {
        type: getAllArticlesRedux.rejected.type,
      };
      const state = articleReducer(initialState, rejectedAction);
      expect(state).toEqual({
        articles: [],
        myArticles: [],
        article: [],

        loadingArticles: false,
        loadingMyArticle: false,
        isEdited: false,
        loadingSingleArticle: false,
        loadingDeletedArticle: false,
        loadingPostArticle: false,
        navigateToHome: false,
      });
    });
  });
});
