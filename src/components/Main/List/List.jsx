import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import style from './List.module.css';
import Post from './Post';
import { usePostsData } from '../../../hooks/usePostsData';
import { Preloader } from '../../../ui/Preloader';
import { postsRequestAsync } from '../../../store/posts/postsAction';

export const List = () => {
  const { data, error, status } = usePostsData();
  const endList = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!endList.current) return;

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
  }, [data.length]);

  const preloaderStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    inset: 0,
    zIndex: 100,
  };

  return (
    <>
      {status === 'loading' && data.length === 0 && (
        <div style={preloaderStyles}>
          <Preloader size={70} />
        </div>
      )}
      {status === 'error' && <p>{error}</p>}
      {status === 'loaded' && data.length === 0 && <p>Нет постов...</p>}
      {status === 'loaded' && data.length > 0 && (
        <ul className={style.list}>
          {data.map(({ data }) => (
            <Post key={data.id} postData={data} />
          ))}

          <li key="end" className={style.end} ref={endList} />
        </ul>
      )}
    </>
  );
};
