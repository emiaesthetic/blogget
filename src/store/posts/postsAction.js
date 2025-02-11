import axios from 'axios';
import { URL_API } from '../../api/constants';
import { postsSlice } from './postsSlice';

export const postsRequestAsync = newPage => (dispatch, getState) => {
  let page = getState().posts.page;
  if (newPage) {
    page = newPage;
    dispatch(postsSlice.actions.changePage(page));
  }

  const token = getState().token.token;
  const after = getState().posts.after;
  const loading = getState().posts.status === 'loading';
  const isLast = getState().posts.isLast;

  if (!token || loading || isLast) return;

  dispatch(postsSlice.actions.postsRequest());

  axios(`${URL_API}/${page}12?limit=10&${after ? `after=${after}` : ''}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then(({ data: { data } }) => {
      if (after) {
        dispatch(postsSlice.actions.postsSuccessAfter(data));
      } else {
        dispatch(postsSlice.actions.postsSuccess(data));
      }
    })
    .catch(error => {
      dispatch(postsSlice.actions.postsError(error.message));
    });
};
