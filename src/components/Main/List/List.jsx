import style from './List.module.css';
import Post from './Post';
import { usePostsData } from '../../../hooks/usePostsData';
import { Preloader } from '../../../ui/Preloader';

export const List = () => {
  const { data, error, status } = usePostsData('best');

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
      {status === 'loading' && (
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
        </ul>
      )}
    </>
  );
};
