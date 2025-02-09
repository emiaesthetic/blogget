import {
  CHANGE_PAGE,
  POSTS_REQUEST,
  POSTS_SUCCESS,
  POSTS_SUCCESS_AFTER,
  POSTS_ERROR,
} from './postsAction';

const initialState = {
  data: [],
  error: '',
  status: '',
  after: '',
  isLast: false,
  page: '',
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_REQUEST:
      return {
        ...state,
        error: '',
        status: state.data.length ? 'loaded' : 'loading',
      };

    case POSTS_SUCCESS:
      return {
        ...state,
        data: action.data,
        status: 'loaded',
        after: action.after,
        isLast: !action.after,
      };

    case POSTS_SUCCESS_AFTER:
      return {
        ...state,
        data: [...state.data, ...action.data],
        after: action.after,
        isLast: !action.after,
      };

    case POSTS_ERROR:
      return {
        ...state,
        error: action.error,
        status: 'error',
      };

    case CHANGE_PAGE:
      return {
        ...state,
        page: action.page,
        after: '',
        isLast: false,
      };

    default:
      return state;
  }
};
