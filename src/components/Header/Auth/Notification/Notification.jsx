import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import style from './Notification.module.css';
import PropTypes from 'prop-types';
import { Text } from '../../../../ui/Text';

import { ReactComponent as CloseIcon } from './img/close.svg';

export const Notification = ({ message }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setIsOpen(true);
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!isOpen || !message) return null;

  return ReactDOM.createPortal(
    <div className={style.notification}>
      <Text As="p" size={14} tsize={18}>
        {message}
      </Text>
      <button
        className={style.close}
        type="button"
        onClick={() => setIsOpen(false)}
      >
        <CloseIcon />
      </button>
    </div>,
    document.getElementById('auth-notify'),
  );
};

Notification.propTypes = {
  message: PropTypes.string,
};
