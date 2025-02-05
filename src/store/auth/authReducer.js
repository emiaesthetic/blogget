import {
  AUTH_REQUEST,
  AUTH_REQUEST_SUCCESS,
  AUTH_REQUEST_ERROR,
  AUTH_LOGOUT,
} from './authAction';

const initialState = {
  data: {},
  error: '',
  status: '',
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        error: '',
        status: 'loading',
      };

    case AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        status: 'loaded',
      };

    case AUTH_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        status: 'error',
      };

    case AUTH_LOGOUT:
      return {
        ...state,
        data: {},
        status: '',
      };

    default:
      return state;
  }
};
