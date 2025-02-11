import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL_API } from '../../api/constants';
import { changePage } from './postsSlice';

export const postsRequestAsync = createAsyncThunk(
  'posts/fetch',
  (newPage, { dispatch, getState }) => {
    let page = getState().posts.page;
    if (newPage) {
      page = newPage;
      dispatch(changePage(page));
    }

    const token = getState().token.token;
    const after = getState().posts.after;
    const isLast = getState().posts.isLast;

    if (!token || isLast) return;

    return axios(
      `${URL_API}/${page}?limit=10&${after ? `after=${after}` : ''}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    )
      .then(
        ({
          data: {
            data: { children, after: newAfter },
          },
        }) => ({ children, after: newAfter, isAppending: !!after }),
      )
      .catch(error => {
        throw error.message;
      });
  },
);
