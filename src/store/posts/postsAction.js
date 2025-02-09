import axios from 'axios';
import { URL_API } from '../../api/constants';

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_SUCCESS = 'POSTS_SUCCESS';
export const POSTS_SUCCESS_AFTER = 'POSTS_SUCCESS_AFTER';
export const POSTS_ERROR = 'POSTS_ERROR';
export const CHANGE_PAGE = 'CHANGE_PAGE';

export const postsRequest = () => ({
  type: POSTS_REQUEST,
});

export const postsSuccess = data => ({
  type: POSTS_SUCCESS,
  data: data.children,
  after: data.after,
});

export const postsSuccessAfter = data => ({
  type: POSTS_SUCCESS_AFTER,
  data: data.children,
  after: data.after,
});

export const postsError = error => ({
  type: POSTS_ERROR,
  error,
});

export const changePage = page => ({
  type: CHANGE_PAGE,
  page,
});

export const postsRequestAsync = newPage => (dispatch, getState) => {
  let page = getState().posts.page;
  if (newPage) {
    page = newPage;
    dispatch(changePage(page));
  }

  const token = getState().token.token;
  const after = getState().posts.after;
  const loading = getState().posts.status === 'loading';
  const isLast = getState().posts.isLast;

  if (!token || loading || isLast) return;

  dispatch(postsRequest());

  axios(`${URL_API}/${page}?limit=10&${after ? `after=${after}` : ''}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then(({ data: { data } }) => {
      if (after) {
        dispatch(postsSuccessAfter(data));
      } else {
        dispatch(postsSuccess(data));
      }
    })
    .catch(error => {
      dispatch(postsError(error.message));
    });
};
