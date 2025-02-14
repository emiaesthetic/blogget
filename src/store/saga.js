import { all } from 'redux-saga/effects';
import { watchPosts } from './posts/postsSaga';
import { watchComments } from './comments/commentsSaga';

export default function* rootSaga() {
  yield all([watchPosts(), watchComments()]);
}
