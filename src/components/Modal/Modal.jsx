import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import style from './Modal.module.css';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import { useCommentsData } from '../../hooks/useCommentsData';
import { Text } from '../../ui/Text';
import Comments from './Comments';
import FormComment from './FormComment';

import { ReactComponent as CloseIcon } from './img/close.svg';

export const Modal = ({ id, closeModal }) => {
  const overlayRef = useRef(null);
  const { data, loading, error } = useCommentsData(id);
  const { title, author, markdown, comments } = data || {};

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

  const renderContent = () => {
    if (error) return <p>{error}</p>;

    if (loading) return <p>Загрузка...</p>;

    return (
      <>
        <Text As="h2" className={style.title}>
          {title}
        </Text>

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

        <Text As="p" className={style.author}>
          {author}
        </Text>

        <FormComment />

        <Comments comments={comments} />
      </>
    );
  };

  return ReactDOM.createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        {renderContent()}
        <button className={style.close} onClick={closeModal}>
          <CloseIcon />
        </button>
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
};

Modal.propTypes = {
  id: PropTypes.string,
  closeModal: PropTypes.func,
};
