import axios from 'axios';
import { URL_API } from '../../api/constants';

export const POSTS_REQUEST = 'GET_POSTS_REQUEST';
export const POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const POSTS_ERROR = 'GET_POSTS_ERROR';

export const postsRequest = () => ({
  type: POSTS_REQUEST,
});

export const postsSuccess = data => ({
  type: POSTS_SUCCESS,
  data,
});

export const postsError = error => ({
  type: POSTS_ERROR,
  error,
});

export const postsRequestAsync = endpoint => (dispatch, getState) => {
  const token = getState().token.token;

  if (!token) return;

  dispatch(postsRequest());

  axios(`${URL_API}/${endpoint}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then(
      ({
        data: {
          data: { children },
        },
      }) => {
        dispatch(postsSuccess(children));
      },
    )
    .catch(error => {
      dispatch(postsError(error.message));
    });
};
