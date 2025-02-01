import { useState } from 'react';
import style from './Post.module.css';
import PropTypes from 'prop-types';
import Thumbnail from './Thumbnail';
import Title from './Title';
import Author from './Author';
import Rating from './Rating';
import Date from '../../../Date';
import DeleteButton from './DeleteButton';
import Modal from '../../../Modal';

export const Post = ({ postData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id, thumbnail, title, author, ups, created: date } = postData;

  return (
    <li className={style.post}>
      <Thumbnail src={thumbnail} alt={title} />

      <div className={style.content}>
        <Title title={title} onClick={() => setIsModalOpen(true)} />
        <Author author={author} />

        {isModalOpen && (
          <Modal id={id} closeModal={() => setIsModalOpen(false)} />
        )}
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
