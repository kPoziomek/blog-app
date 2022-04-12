import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteMyArticle,
  editSingleArticle,
  getArticles,
  getMyArticles,
  getSingleArticle,
  postMyArticle,
} from '../helpers/axiosConfig';

const initialState = {
  articles: [],
  myArticles: [],
  article: {},

  loadingArticles: false,
  loadingMyArticle: false,
  isEdited: false,
  loadingSingleArticle: false,
  loadingDeletedArticle: false,
  loadingPostArticle: false,
};

/// actions
export const getAllArticlesRedux = createAsyncThunk(
  'articles/getArticles',
  async () => {
    const res = await getArticles();
    return res.data;
  }
);

export const getMyArticlesRedux = createAsyncThunk(
  'articles/getMyArticles',

  async () => {
    const res = await getMyArticles();
    return res.data;
  }
);
export const getSingleArticleRedux = createAsyncThunk(
  'articles/getSingleArticle',
  async (id) => {
    const res = await getSingleArticle(id);
    return res.data;
  }
);
export const editSingleArticleRedux = createAsyncThunk(
  'articles/editSingleArticle',
  async ({ id, values }) => {
    const res = await editSingleArticle(id, values);
    return res.data;
  }
);

export const deleteMyArticleRedux = createAsyncThunk(
  'articles/deleteMyArticle',

  async (id) => {
    const res = await deleteMyArticle(id);

    return res.data;
  }
);

export const postMyArticleRedux = createAsyncThunk(
  'articles/postMyArticle',
  async (id) => {
    const res = await postMyArticle(id);
    return res.data;
  }
);
// index lub slice
export const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: {
    // articles
    [getAllArticlesRedux.pending]: (state) => {
      state.loadingArticles = true;
    },
    [getAllArticlesRedux.fulfilled]: (state, { payload }) => {
      state.loadingArticles = false;
      state.articles = payload;
    },
    [getAllArticlesRedux.rejected]: (state) => {
      state.loadingArticles = false;
    },
    // myArticles
    [getMyArticlesRedux.pending]: (state) => {
      state.loadingMyArticle = true;
    },
    [getMyArticlesRedux.fulfilled]: (state, { payload }) => {
      state.loadingMyArticle = false;
      state.myArticles = payload;
    },
    [getMyArticlesRedux.rejected]: (state) => {
      state.loadingMyArticle = false;
    },
    //singleArticle
    [getSingleArticleRedux.pending]: (state) => {
      state.loadingSingleArticle = true;
    },
    [getSingleArticleRedux.fulfilled]: (state, { payload }) => {
      state.loadingSingleArticle = false;
      state.article = payload;
    },
    [getSingleArticleRedux.rejected]: (state) => {
      state.loadingSingleArticle = false;
    },
    //editArticle
    [editSingleArticleRedux.pending]: (state) => {
      state.loadingEditedArticle = true;
      state.isEdited = false;
    },
    [editSingleArticleRedux.fulfilled]: (state, { payload }) => {
      state.loadingEditedArticle = false;
      state.editedArticle = payload;
      state.isEdited = true;
    },
    [editSingleArticleRedux.rejected]: (state) => {
      state.loadingEditedArticle = false;
      state.isEdited = false;
    },
    //deleteMyArticleRedux
    [deleteMyArticleRedux.pending]: (state) => {
      state.loadingDeletedArticle = true;
    },
    [deleteMyArticleRedux.fulfilled]: (state, { payload }) => {
      state.loadingDeletedArticle = false;
      /// helpers można zrobić

      state.myArticles = state.myArticles.filter((article) => {
        return article.createdAt !== payload.createdAt;
      });
    },
    [deleteMyArticleRedux.rejected]: (state) => {
      state.loadingDeletedArticle = false;
    },
    [postMyArticleRedux.pending]: (state) => {
      state.loadingPostArticle = true;
    },
    [postMyArticleRedux.fulfilled]: (state, { payload }) => {
      state.article = payload;
      state.myArticles = state.myArticles.map((element) => {
        return element.id === payload.id ? payload : element;
      });
    },
    [postMyArticleRedux.rejected]: (state) => {
      state.loadingPostArticle = false;
    },
  },
});

export const articleReducer = articleSlice.reducer;
