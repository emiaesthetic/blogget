import { POSTS_REQUEST, POSTS_SUCCESS, POSTS_ERROR } from './postsAction';

const initialState = {
  data: [],
  error: '',
  status: '',
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_REQUEST:
      return {
        ...state,
        error: '',
        status: 'loading',
      };

    case POSTS_SUCCESS:
      return {
        ...state,
        data: action.data,
        status: 'loaded',
      };

    case POSTS_ERROR:
      return {
        ...state,
        error: action.error,
        status: 'error',
      };

    default:
      return state;
  }
};
