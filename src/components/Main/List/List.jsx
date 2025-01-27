import style from './List.module.css';
import Post from './Post';

export const List = () => {
  const postData = [
    {
      thumbnail: '',
      title: 'Title1',
      author: 'Author1',
      ups: 77,
      date: '2025-01-11T07:40:00.000Z',
      id: 879,
    },
    {
      thumbnail: '',
      title: 'Title2',
      author: 'Author2',
      ups: 17,
      date: '2025-01-25T07:40:00.000Z',
      id: 182,
    },
    {
      thumbnail: '',
      title: 'Title3',
      author: 'Author3',
      ups: 10,
      date: '2025-01-26T07:40:00.000Z',
      id: 239,
    },
    {
      thumbnail: '',
      title: 'Title4',
      author: 'Author4',
      ups: 30,
      date: '2025-01-21T07:40:00.000Z',
      id: 384,
    },
    {
      thumbnail: '',
      title: 'Title5',
      author: 'Author5',
      ups: 54,
      date: '2025-01-15T07:40:00.000Z',
      id: 125,
    },
  ];

  return (
    <ul className={style.list}>
      {postData.map(post => (
        <Post key={post.id} postData={post} />
      ))}
    </ul>
  );
};
