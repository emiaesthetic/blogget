import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  post: {},
  comments: [],
  error: '',
  status: '',
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentsRequest: state => {
      state.error = '';
      state.status = 'loading';
    },
    commentsSuccess: (state, action) => {
      state.post = action.payload.post;
      state.comments = action.payload.comments;
      state.status = 'loaded';
    },
    commentsError: (state, action) => {
      state.error = action.payload;
      state.status = 'error';
    },
  },
});

export const { commentsRequest, commentsSuccess, commentsError } =
  commentsSlice.actions;

export default commentsSlice.reducer;
