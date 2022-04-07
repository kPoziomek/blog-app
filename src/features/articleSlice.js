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
  myArticlesState: [],
  singleArticle: [],
  editedArticle: [],

  loadingArticles: false,
  loadingMyArticle: false,
  loadingSingleArticle: false,
  loadingEditedArticle: false,
};
export const getAllArticlesRedux = createAsyncThunk(
  'articles/getArticles',
  async (thunkAPI) => {
    const res = await getArticles();

    const normalizedArticles = res.data.map((singleElement) => {
      const { id, title, summary, content, author } = singleElement;
      return {
        id,
        title,
        summary,
        content,
        authorFirstName: author.firstName,
        authorLastName: author.lastName,
        image: true,
      };
    });
    return normalizedArticles;
  }
);

export const getMyArticlesRedux = createAsyncThunk(
  'articles/getMyArticles',

  async () => {
    const res = await getMyArticles();

    let articlesData = res.data;
    const normalizedArticles = articlesData.map((singleElement) => {
      const { id, title, summary, content, publishedAt } = singleElement;
      return {
        id,
        title,
        summary,
        content,
        publishedAt,
      };
    });

    return normalizedArticles;
  }
);
export const getSingleArticleRedux = createAsyncThunk(
  'articles/getSingleArticle',
  async (id) => {
    const res = await getSingleArticle(id);
    let dataArticle = res.data;
    return dataArticle;
  }
);
export const editSingleArticleRedux = createAsyncThunk(
  'articles/editSingleArticle',
  async (data) => {
    const { id, values } = data;
    const res = await editSingleArticle(id, values);

    let editedArticle = res.data;
    return editedArticle;
  }
);

export const deleteMyArticleRedux = createAsyncThunk(
  'articles/deleteMyArticle',
  async (id) => {
    const res = await deleteMyArticle(id);
    if (res.status === 200) {
      return initialState.myArticlesState.filter((article) => {
        return article.id !== id;
      });
    }
  }
);

export const postMyArticleRedux = createAsyncThunk(
  'articles/postMyArticle',
  async (id) => {
    const res = await postMyArticle(id);
    if (res.status === 200) {
      const updatedArticle = res.data;
      return initialState.myArticlesState.map((element) => {
        return element.id === updatedArticle.id ? updatedArticle : element;
      });
    }
  }
);

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
      state.myArticlesState = payload;
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
      state.singleArticle = payload;
    },
    [getSingleArticleRedux.rejected]: (state) => {
      state.loadingSingleArticle = false;
    },
    //editArticle
    [editSingleArticleRedux.pending]: (state) => {
      state.loadingEditedArticle = true;
    },
    [editSingleArticleRedux.fulfilled]: (state, { payload }) => {
      state.loadingEditedArticle = false;
      state.editedArticle = payload;
    },
    [editSingleArticleRedux.rejected]: (state) => {
      state.loadingEditedArticle = false;
    },
  },
});

export const articleReducer = articleSlice.reducer;
