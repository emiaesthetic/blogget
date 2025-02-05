import {
  COMMENTS_REQUEST,
  COMMENTS_SUCCESS,
  COMMENTS_ERROR,
} from './commentsAction';

const initialState = {
  data: [],
  loading: false,
  error: '',
};

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };

    case COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };

    case COMMENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
