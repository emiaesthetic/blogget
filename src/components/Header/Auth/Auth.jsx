import { useState, useEffect } from 'react';
import style from './Auth.module.css';
import PropTypes from 'prop-types';
import urlAuth from '../../../api/auth';
import { URL_API } from '../../../api/constants';
import { Text } from '../../../ui/Text';

import { ReactComponent as LoginIcon } from './img/login.svg';

export const Auth = ({ token, removeToken }) => {
  const [auth, setAuth] = useState({});
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
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
        if (error.message === 401) {
          removeToken();
        }

        setAuth({});
      });
  }, [token]);

  const handleLogout = () => {
    setAuth({});
    setIsLogout(false);
    removeToken();
    window.location.href = '/';
  };

  return (
    <div className={style.container}>
      {auth.name ? (
        <>
          <button
            className={style.btn}
            type="button"
            onClick={() => setIsLogout(!isLogout)}
          >
            <img
              className={style.img}
              src={auth.img}
              title={auth.name}
              alt={`Фото профиля ${auth.name}`}
            />
          </button>
          {isLogout && (
            <button
              className={style.logout}
              type="button"
              onClick={handleLogout}
            >
              Выйти
            </button>
          )}
        </>
      ) : (
        <Text className={style.authLink} As="a" href={urlAuth}>
          <LoginIcon className={style.svg} />
        </Text>
      )}
    </div>
  );
};

Auth.propTypes = {
  token: PropTypes.string,
  removeToken: PropTypes.func,
};
