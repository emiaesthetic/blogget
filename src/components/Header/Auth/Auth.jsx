import { useState } from 'react';
import style from './Auth.module.css';
import urlAuth from '../../../api/auth';
import { Text } from '../../../ui/Text';
import { Preloader } from '../../../ui/Preloader';
import { useDispatch } from 'react-redux';
import { deleteToken } from '../../../store/token/tokenAction';
import { useAuth } from '../../../hooks/useAuth';
import Notification from './Notification';

import { ReactComponent as LoginIcon } from './img/login.svg';

export const Auth = () => {
  const { auth, error, status, resetAuth } = useAuth();
  const [isLogout, setIsLogout] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    resetAuth();
    setIsLogout(false);
    dispatch(deleteToken());
  };

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return <Preloader size={30} />;

      case 'error':
        return (
          <Text className={style.authLink} As="a" href={urlAuth}>
            <LoginIcon className={style.svg} />
          </Text>
        );

      case 'loaded':
        return (
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
        );

      default:
        return (
          <Text className={style.authLink} As="a" href={urlAuth}>
            <LoginIcon className={style.svg} />
          </Text>
        );
    }
  };

  return (
    <div className={style.container}>
      {renderContent()}
      <Notification message={error} />
    </div>
  );
};
