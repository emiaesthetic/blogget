import { tokenReducer, tokenMiddleware } from './token/tokenReducer';
import { commentReducer } from './comment/commentReducer';
import { authReducer } from './auth/authReducer';
import postsReducer from './posts/postsSlice';
import commentsReducer from './comments/commentsSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    comment: commentReducer,
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(tokenMiddleware),
});
