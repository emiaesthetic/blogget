import { useState, useEffect } from 'react';
import { URL_API } from '../api/constants';

export const useAuth = (token, removeToken) => {
  const [auth, setAuth] = useState({});

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
