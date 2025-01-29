import { useState, useEffect } from 'react';
import style from './Auth.module.css';
import PropTypes from 'prop-types';
import urlAuth from '../../../api/auth';
import { URL_API } from '../../../api/constants';
import { Text } from '../../../ui/Text';

import { ReactComponent as LoginIcon } from './img/login.svg';

export const Auth = ({ token }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    fetch(`${URL_API}/api/v1/me`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(({ name, icon_img: iconImg }) => {
        if (iconImg) {
          const img = iconImg.replace(/\?.*$/, '');
          setAuth({ name, img });
        }
      })
      .catch(error => {
        console.log(error);
        setAuth({});
      });
  }, [token]);

  return (
    <div className={style.container}>
      {auth.name ? (
        <button className={style.btn}>
          <img
            className={style.img}
            src={auth.img}
            title={auth.name}
            alt={`Фото профиля ${auth.name}`}
          />
        </button>
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
};
