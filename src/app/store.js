import { configureStore } from '@reduxjs/toolkit';

import { articleSlice } from '../features/articleSlice';

export const store = configureStore({
  reducer: {
    articles: articleSlice.reducer,
  },
});

export const createStore = () =>
  configureStore({
    reducer: {
      articles: articleSlice.reducer,
    },
  });
