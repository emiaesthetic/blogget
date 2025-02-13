import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  error: '',
  status: '',
  after: '',
  isLast: false,
  page: '',
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsRequest: state => {
      state.error = '';
      state.status = state.data.length ? 'loaded' : 'loading';
    },
    postsSuccess: (state, action) => {
      const { children, after } = action.payload;
      state.data = children;
      state.status = 'loaded';
      state.after = after;
      state.isLast = !after;
    },
    postsSuccessAfter: (state, action) => {
      const { children, after } = action.payload;
      state.data = [...state.data, ...children];
      state.after = after;
      state.isLast = !after;
    },
    postsError: (state, action) => {
      state.error = action.payload;
      state.status = 'error';
    },
    changePage: (state, action) => {
      state.after = '';
      state.isLast = false;
      state.page = action.payload;
    },
  },
});

export const {
  postsRequest,
  postsSuccess,
  postsSuccessAfter,
  postsError,
  changePage,
} = postsSlice.actions;

export default postsSlice.reducer;
