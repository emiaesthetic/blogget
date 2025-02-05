import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { tokenReducer, tokenMiddleware } from './tokenReducer';
import { commentReducer } from './commentReducer';
import { authReducer } from './auth/authReducer';
import { postsReducer } from './posts/postsReducer';
import { commentsReducer } from './comments/commentsReducer';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
  token: tokenReducer,
  comment: commentReducer,
  auth: authReducer,
  posts: postsReducer,
  comments: commentsReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(tokenMiddleware, thunk)),
);
