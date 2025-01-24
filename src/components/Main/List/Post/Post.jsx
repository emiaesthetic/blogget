import style from './Post.module.css';
import PropTypes from 'prop-types';
import noPhoto from './img/no-photo.jpg';
import formatDate from '../../../../utils/formatDate';

export const Post = ({ postData }) => {
  const { title, author, ups, date } = postData;

  return (
    <li className={style.post}>
      <img className={style.img} src={noPhoto} alt={title} />

      <div className={style.content}>
        <h2 className={style.title}>
          <a className={style.linkPost} href="#post">
            {title}
          </a>
        </h2>
        <a className={style.linkAuthor} href="#author">
          {author}
        </a>
      </div>

      <div className={style.rating}>
        <button className={style.up} aria-label="Увеличить рейтинг" />
        <p className={style.ups}>{ups}</p>
        <button className={style.down} aria-label="Уменьшить рейтинг" />
      </div>

      <time className={style.date} dateTime={date}>
        {formatDate(date)}
      </time>
    </li>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
};
