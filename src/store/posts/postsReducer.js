import { POSTS_REQUEST, POSTS_SUCCESS, POSTS_ERROR } from './postsAction';

const initialState = {
  data: [],
  loading: false,
  error: '',
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };

    case POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };

    case POSTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
