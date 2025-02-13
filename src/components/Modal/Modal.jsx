import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';
import style from './Modal.module.css';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import { Text } from '../../ui/Text';
import { Preloader } from '../../ui/Preloader';
import { useParams, useNavigate } from 'react-router-dom';
import Comments from './Comments';
import FormComment from './FormComment';
import { commentsRequest } from '../../store/comments/commentsSlice';

import { ReactComponent as CloseIcon } from './img/close.svg';

export const Modal = () => {
  const { id, page } = useParams();
  const navigate = useNavigate();
  const overlayRef = useRef(null);

  const post = useSelector(state => state.comments.post);
  const comments = useSelector(state => state.comments.comments);
  const error = useSelector(state => state.comments.error);
  const status = useSelector(state => state.comments.status);
  const dispatch = useDispatch();

  const handleClick = ({ target }) => {
    if (target === overlayRef.current) {
      navigate(`/category/${page}`);
    }
  };

  const handleEscBtn = ({ key }) => {
    if (key === 'Escape') {
      navigate(`/category/${page}`);
    }
  };

  useEffect(() => {
    dispatch(commentsRequest(id));
  }, [id]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEscBtn);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEscBtn);
    };
  }, []);

  const preloaderStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  };

  return ReactDOM.createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        {status === 'loading' && (
          <div style={preloaderStyles}>
            <Preloader size={70} />
          </div>
        )}
        {status === 'error' && <p>{error}</p>}
        {status === 'loaded' && (
          <>
            <Text As="h2" className={style.title}>
              {post.title}
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
                {post.selftext}
              </Markdown>
            </div>

            <Text As="p" className={style.author}>
              {post.author}
            </Text>

            <FormComment />

            <Comments comments={comments} />
          </>
        )}
        <button
          className={style.close}
          onClick={() => navigate(`/category/${page}`)}
        >
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
