import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_ERROR } from './searchAction';

const initialState = {
  posts: [],
  error: '',
  status: '',
  after: '',
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        status: state.posts.length > 0 ? 'loaded' : 'loading',
        error: '',
      };

    case SEARCH_SUCCESS:
      return {
        ...state,
        posts: action.posts,
        after: action.after,
        status: 'loaded',
      };

    case SEARCH_ERROR:
      return {
        ...state,
        error: action.error,
        status: 'error',
      };

    default:
      return state;
  }
};
