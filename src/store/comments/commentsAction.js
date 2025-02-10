import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL_API } from '../../api/constants';

export const commentsRequestAsync = createAsyncThunk(
  'comments/fetch',
  (id, { getState }) => {
    const token = getState().token.token;
    if (!token) return;

    return axios(`${URL_API}/comments/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then(
        ({
          data: [
            {
              data: {
                children: [{ data: post }],
              },
            },
            {
              data: { children },
            },
          ],
        }) => {
          const comments = children.map(item => item.data);
          return { post, comments };
        },
      )
      .catch(error => {
        throw error.message;
      });
  },
);
