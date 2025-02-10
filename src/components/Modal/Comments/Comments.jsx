import style from './Comments.module.css';
import PropTypes from 'prop-types';
import { Text } from '../../../ui/Text';
import Date from '../../Date';

export const Comments = ({ comments }) => {
  if (!comments || comments.length === 0) return <p>Нет комментариев</p>;

  return (
    <ul className={style.list}>
      {comments.map(
        ({ id, author, body, created: date }) =>
          body && (
            <li className={style.item} key={id}>
              <Text As="h3" className={style.author} size={18} tsize={22}>
                {author}
              </Text>

              <Text As="p" className={style.comment} size={14} tsize={18}>
                {body}
              </Text>

              {date && <Date date={date} />}
            </li>
          ),
      )}
    </ul>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
};
