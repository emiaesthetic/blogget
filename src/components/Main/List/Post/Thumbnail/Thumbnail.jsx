import style from './Thumbnail.module.css';
import PropTypes from 'prop-types';
import noPhoto from './img/no-photo.jpg';

export const Thumbnail = ({ src, alt }) => (
  <img className={style.img} src={src || noPhoto} alt={alt} />
);

Thumbnail.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};
