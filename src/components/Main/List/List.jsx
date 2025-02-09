import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import style from './List.module.css';
import Post from './Post';
import { usePostsData } from '../../../hooks/usePostsData';
import { Preloader } from '../../../ui/Preloader';
import { postsRequestAsync } from '../../../store/posts/postsAction';

export const List = () => {
  const { data, error, status, isAutoLoadEnabled } = usePostsData();
  const endList = useRef(null);
  const dispatch = useDispatch();
  const { page } = useParams();

  useEffect(() => {
    dispatch(postsRequestAsync(page));
  }, [page]);

  useEffect(() => {
    if (!endList.current || !isAutoLoadEnabled) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          dispatch(postsRequestAsync());
        }
      },
      {
        rootMargin: '100px',
      },
    );
    observer.observe(endList.current);
    return () => observer.disconnect();
  }, [data.length]);

  const preloaderStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    inset: 0,
    zIndex: 100,
  };

  if (status === 'lading' && data.length === 0) {
    return (
      <div style={preloaderStyles}>
        <Preloader size={70} />
      </div>
    );
  }

  if (status === 'error') {
    return <p>{error}</p>;
  }

  if (status === 'loaded' && data.length === 0) {
    return <p>Нет постов...</p>;
  }

  return (
    <>
      {status === 'loaded' && (
        <>
          <ul className={style.list}>
            {data.map(({ data }) => (
              <Post key={data.id} postData={data} />
            ))}

            {isAutoLoadEnabled && (
              <li key="end" className={style.end} ref={endList} />
            )}
          </ul>

          {!isAutoLoadEnabled && (
            <button
              className={style.button}
              onClick={() => dispatch(postsRequestAsync())}
            >
              Загрузить еще
            </button>
          )}
        </>
      )}
      <Outlet />
    </>
  );
};
