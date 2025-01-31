import style from './Post.module.css';
import PropTypes from 'prop-types';
import Thumbnail from './Thumbnail';
import Title from './Title';
import Author from './Author';
import Rating from './Rating';
import Date from './Date';
import DeleteButton from './DeleteButton';

export const Post = ({ postData }) => {
  const { thumbnail, title, author, ups, created: date, url } = postData;

  return (
    <li className={style.post}>
      <Thumbnail src={thumbnail} alt={title} />

      <div className={style.content}>
        <Title title={title} url={url} />
        <Author
          author={author}
          url={`https://www.reddit.com/user/${author}/`}
        />
      </div>

      <Rating ups={ups} />
      <Date date={date} />

      <DeleteButton onClick={() => console.log('Delete')} />
    </li>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
};
