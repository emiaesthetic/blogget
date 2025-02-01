import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import style from './Modal.module.css';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';

import { ReactComponent as CloseIcon } from './img/close.svg';

export const Modal = ({ title, markdown, author, closeModal }) => {
  const overlayRef = useRef(null);

  const handleClick = ({ target }) => {
    if (target === overlayRef.current) {
      closeModal();
    }
  };

  const handleEscBtn = ({ key }) => {
    if (key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEscBtn);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEscBtn);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        <h2 className={style.title}>{title}</h2>

        <div className={style.content}>
          <Markdown
            options={{
              overrides: {
                a: {
                  props: {
                    target: '_blank',
                  },
                },
              },
            }}
          >
            {markdown}
          </Markdown>
        </div>

        <p className={style.author}>{author}</p>

        <button className={style.close} onClick={closeModal}>
          <CloseIcon />
        </button>
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  markdown: PropTypes.string,
  author: PropTypes.string,
  closeModal: PropTypes.func,
};
