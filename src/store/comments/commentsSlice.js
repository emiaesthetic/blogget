import { createSlice } from '@reduxjs/toolkit';
import { commentsRequestAsync } from './commentsAction';

const initialState = {
  post: {},
  comments: [],
  error: '',
  status: '',
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(commentsRequestAsync.pending, state => {
        state.error = '';
        state.status = 'loading';
      })
      .addCase(commentsRequestAsync.fulfilled, (state, action) => {
        state.post = action.payload.post;
        state.comments = action.payload.comments;
        state.status = 'loaded';
      })
      .addCase(commentsRequestAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'error';
      });
  },
});

export default commentsSlice.reducer;
