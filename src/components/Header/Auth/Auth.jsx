import style from './Auth.module.css';

import { ReactComponent as LoginIcon } from './img/login.svg';

export const Auth = () => (
  <button className={style.button} aria-label="Авторизация">
    <LoginIcon className={style.svg} />
  </button>
);
