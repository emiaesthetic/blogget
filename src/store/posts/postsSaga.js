import { put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { URL_API } from '../../api/constants';
import {
  postsRequest,
  postsSuccess,
  postsSuccessAfter,
  postsError,
  changePage,
  searchRequest,
} from './postsSlice';

function* fetchPosts() {
  const state = yield select();

  const token = state.token.token;
  const page = state.posts.page;
  const after = state.posts.after;
  const isLast = state.posts.isLast;
  const search = state.posts.search;

  if (!token || isLast) return;

  try {
    const queryParams = {
      limit: 10,
      after: after || undefined,
      q: search || undefined,
    };

    const queryString = new URLSearchParams(queryParams).toString();
    const URL = `${URL_API}/${search ? 'search' : page}?${queryString}`;

    const request = yield axios(URL, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    const { data } = request.data;

    if (after) {
      yield put(postsSuccessAfter(data));
    } else {
      yield put(postsSuccess(data));
    }
  } catch (error) {
    yield put(postsError(error.message));
  }
}

export function* watchPosts() {
  yield takeLatest(changePage.type, fetchPosts);
  yield takeLatest(postsRequest.type, fetchPosts);
  yield takeLatest(searchRequest.type, fetchPosts);
}
