import { useState, useEffect, useContext } from 'react';
import { URL_API } from '../api/constants';
import { tokenContext } from '../context/tokenContext';

export const useAuth = () => {
  const [auth, setAuth] = useState({});
  const { token, removeToken } = useContext(tokenContext);

  useEffect(() => {
    if (!token) return;

    fetch(`${URL_API}/api/v1/me`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }

        return response.json();
      })
      .then(({ name, icon_img: iconImg }) => {
        if (iconImg) {
          const img = iconImg.replace(/\?.*$/, '');
          setAuth({ name, img });
        }
      })
      .catch(error => {
        if (error.message === '401') {
          removeToken();
        }

        setAuth({});
      });
  }, [token]);

  const resetAuth = () => setAuth({});

  return [auth, resetAuth];
};
