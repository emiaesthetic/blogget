import { useState, useContext } from 'react';
import style from './Auth.module.css';
import urlAuth from '../../../api/auth';
import { Text } from '../../../ui/Text';
import { tokenContext } from '../../../context/tokenContext.jsx';
import { authContext } from '../../../context/authContext';

import { ReactComponent as LoginIcon } from './img/login.svg';

export const Auth = () => {
  const { removeToken } = useContext(tokenContext);
  const { auth, resetAuth } = useContext(authContext);
  const [isLogout, setIsLogout] = useState(false);

  const handleLogout = () => {
    resetAuth();
    setIsLogout(false);
    removeToken();
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
