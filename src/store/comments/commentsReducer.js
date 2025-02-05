import {
  COMMENTS_REQUEST,
  COMMENTS_SUCCESS,
  COMMENTS_ERROR,
} from './commentsAction';

const initialState = {
  data: [],
  error: '',
  status: '',
};

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_REQUEST:
      return {
        ...state,
        error: '',
        status: 'loading',
      };

    case COMMENTS_SUCCESS:
      return {
        ...state,
        data: action.data,
        status: 'loaded',
      };

    case COMMENTS_ERROR:
      return {
        ...state,
        error: action.error,
        status: 'error',
      };

    default:
      return state;
  }
};
