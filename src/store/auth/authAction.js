import axios from 'axios';
import { URL_API } from '../../api/constants';
import { deleteToken } from '../token/tokenAction';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';
export const AUTH_REQUEST_ERROR = 'AUTH_REQUEST_ERROR';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const authRequest = () => ({
  type: AUTH_REQUEST,
});

export const authRequestSuccess = data => ({
  type: AUTH_REQUEST_SUCCESS,
  data,
});

export const authRequestError = error => ({
  type: AUTH_REQUEST_ERROR,
  error,
});

export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

export const authRequestAsync = () => (dispatch, getState) => {
  const token = getState().token.token;

  if (!token) return;

  dispatch(authRequest());

  axios(`${URL_API}/api/v1/me`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then(({ data: { name, icon_img: iconImg } }) => {
      if (iconImg) {
        const img = iconImg.replace(/\?.*$/, '');
        const data = { name, img };
        dispatch(authRequestSuccess(data));
      }
    })
    .catch(error => {
      dispatch(deleteToken());
      dispatch(authRequestError(error.message));
    });
};
