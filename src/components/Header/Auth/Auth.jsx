import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import style from './Auth.module.css';
import PropTypes from 'prop-types';
import urlAuth from '../../../api/auth';
import { Text } from '../../../ui/Text';

import { ReactComponent as LoginIcon } from './img/login.svg';

export const Auth = ({ token, removeToken }) => {
  const [auth, resetAuth] = useAuth(token, removeToken);
  const [isLogout, setIsLogout] = useState(false);

  const handleLogout = () => {
    resetAuth();
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
