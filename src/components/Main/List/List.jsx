import style from './List.module.css';
import Post from './Post';
import { usePostsData } from '../../../hooks/usePostsData';

export const List = () => {
  const { data, loading, error } = usePostsData('best');

  return (
    <>
      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && data.length === 0 && (
        <p>Нет доступных постов...</p>
      )}
      {!loading && !error && data.length > 0 && (
        <ul className={style.list}>
          {data.map(({ data }) => (
            <Post key={data.id} postData={data} />
          ))}
        </ul>
      )}
    </>
  );
};
