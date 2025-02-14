import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import style from './List.module.css';
import Post from './Post';
import { Preloader } from '../../../ui/Preloader';
import {
  postsRequest,
  searchRequest,
  changePage,
} from '../../../store/posts/postsSlice.js';

export const List = () => {
  const data = useSelector(state => state.posts.data);
  const status = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);

  const endList = useRef(null);
  const dispatch = useDispatch();
  const { filter, page } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (filter === 'search') {
      const search = searchParams.get('q');
      searchRequest(search);
    } else {
      dispatch(changePage(page));
    }
  }, [filter, page]);

  useEffect(() => {
    if (!endList.current) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          dispatch(postsRequest());
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
      <Outlet />
    </>
  );
};
