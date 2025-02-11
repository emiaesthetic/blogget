import { createSlice } from '@reduxjs/toolkit';
import { postsRequestAsync } from './postsAction';

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
    changePage: (state, action) => {
      state.after = '';
      state.isLast = false;
      state.page = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(postsRequestAsync.pending, state => {
        state.error = '';
        state.status = state.data.length ? 'loaded' : 'loading';
      })
      .addCase(postsRequestAsync.fulfilled, (state, action) => {
        if (!action.payload) {
          console.warn('Payload is undefined:', action);
          return;
        }

        const { children, after, isAppending } = action.payload;

        if (isAppending) {
          state.data.push(...children);
        } else {
          state.data = children;
          state.status = 'loaded';
        }

        state.after = after;
        state.isLast = !after;
      })
      .addCase(postsRequestAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'error';
      });
  },
});

export const { changePage } = postsSlice.actions;

export default postsSlice.reducer;
