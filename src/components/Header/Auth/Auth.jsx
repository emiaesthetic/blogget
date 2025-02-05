import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import style from './Auth.module.css';
import urlAuth from '../../../api/auth';
import { Text } from '../../../ui/Text';
import { Preloader } from '../../../ui/Preloader';
import { useDispatch } from 'react-redux';
import { deleteToken } from '../../../store/token/tokenAction';
import { useAuth } from '../../../hooks/useAuth';

import { ReactComponent as LoginIcon } from './img/login.svg';
import { ReactComponent as CloseIcon } from './img/close.svg';

const Notify = ({ message, onClick }) => (
  <div className={style.notify}>
    <Text As="p" size={14} tsize={18}>
      {message}
    </Text>
    <button className={style.close} type="button" onClick={onClick}>
      <CloseIcon />
    </button>
  </div>
);

export const Auth = () => {
  const { auth, error, status, resetAuth } = useAuth();
  const [isLogout, setIsLogout] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    resetAuth();
    setIsLogout(false);
    dispatch(deleteToken());
  };

  useEffect(() => {
    if (error && !isNotifyOpen) {
      setIsNotifyOpen(true);
      setTimeout(() => {
        setIsNotifyOpen(false);
      }, 3000);
    }
  }, [error]);

  return (
    <div className={style.container}>
      {status === 'loading' && <Preloader size={30} />}
      {status === 'error' &&
        isNotifyOpen &&
        ReactDOM.createPortal(
          <Notify message={error} onClick={() => setIsNotifyOpen(false)} />,
          document.getElementById('auth-notify'),
        )}
      {status === 'loaded' && auth.name && (
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
      )}
      {(status === '' || status === 'error') && (
        <Text className={style.authLink} As="a" href={urlAuth}>
          <LoginIcon className={style.svg} />
        </Text>
      )}
    </div>
  );
};

Notify.propTypes = {
  message: PropTypes.string,
  onClick: PropTypes.func,
};
