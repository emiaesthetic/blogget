import { put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { URL_API } from '../../api/constants';
import {
  commentsRequest,
  commentsSuccess,
  commentsError,
} from './commentsSlice';

function* fetchComments(action) {
  const { payload: id } = action;

  const token = yield select(state => state.token.token);
  if (!token) return;

  try {
    const request = yield axios(`${URL_API}/comments/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    const data = request.data;
    const post = data[0].data.children[0].data;
    const comments = data[1].data.children.map(item => item.data);
    yield put(commentsSuccess({ post, comments }));
  } catch (error) {
    yield put(commentsError(error.message));
  }
}

export function* watchComments() {
  yield takeLatest(commentsRequest.type, fetchComments);
}
