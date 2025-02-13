import { all } from 'redux-saga/effects';
import { watchPosts } from './posts/postsSaga';
import { watchSearch } from './search/searchSaga';
import { watchComments } from './comments/commentsSaga';

export default function* rootSaga() {
  yield all([watchPosts(), watchSearch(), watchComments()]);
}
