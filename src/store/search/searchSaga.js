import { takeLatest, put, select } from 'redux-saga/effects';
import { URL_API } from '../../api/constants';
import axios from 'axios';
import { SEARCH_REQUEST, searchSuccess, searchError } from './searchAction';

function* fetchSearch(search) {
  const token = yield select(state => state.token.token);

  try {
    const request = yield axios(`${URL_API}/search?q=${search}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    yield put(searchSuccess(request.data.data));
  } catch (error) {
    yield put(searchError(error));
  }
}

export function* watchSearch() {
  yield takeLatest(SEARCH_REQUEST, fetchSearch);
}
