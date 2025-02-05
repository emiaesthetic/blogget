import axios from 'axios';
import { URL_API } from '../../api/constants';

export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS';
export const COMMENTS_ERROR = 'COMMENTS_ERROR';

export const commentsRequest = () => ({
  type: COMMENTS_REQUEST,
});

export const commentsSuccess = data => ({
  type: COMMENTS_SUCCESS,
  data,
});

export const commentsError = error => ({
  type: COMMENTS_ERROR,
  error,
});

export const commentsRequestAsync = id => (dispatch, getState) => {
  const token = getState().token.token;

  if (!token) return;

  dispatch(commentsRequest());

  axios(`${URL_API}/comments/${id}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then(({ data }) => {
      const {
        title,
        author,
        selftext: markdown,
      } = data[0].data.children[0].data;
      const comments = data[1].data.children;
      dispatch(commentsSuccess({ title, author, markdown, comments }));
    })
    .catch(error => {
      dispatch(commentsError(error.message));
    });
};
