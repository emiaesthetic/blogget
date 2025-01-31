import { useContext } from 'react';
import style from './List.module.css';
import Post from './Post';
import { postsContext } from '../../../context/postsContext';

export const List = () => {
  const { posts, loading, error } = useContext(postsContext);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;
  if (!posts || posts.length === 0) return <p>Нет доступных постов</p>;

  return (
    <ul className={style.list}>
      {posts.map(({ data }) => (
        <Post key={data.id} postData={data} />
      ))}
    </ul>
  );
};
