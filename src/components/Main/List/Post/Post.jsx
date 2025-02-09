import style from './Post.module.css';
import PropTypes from 'prop-types';
import Thumbnail from './Thumbnail';
import Title from './Title';
import Author from './Author';
import Rating from './Rating';
import Date from '../../../Date';
import DeleteButton from './DeleteButton';

export const Post = ({ postData }) => {
  const { id, thumbnail, title, author, ups, created: date } = postData;

  return (
    <li className={style.post}>
      <Thumbnail src={thumbnail} alt={title} />

      <div className={style.content}>
        <Title id={id} title={title} />
        <Author author={author} />
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
