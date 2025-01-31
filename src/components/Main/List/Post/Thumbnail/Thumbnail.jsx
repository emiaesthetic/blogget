import style from './Thumbnail.module.css';
import PropTypes from 'prop-types';
import noPhoto from './img/no-photo.jpg';

const isImgURL = src => {
  const imageRegex = /^https:\/\/.*(?:png|jpg|avif|webp)$/i;
  return imageRegex.test(src);
};

export const Thumbnail = ({ src, alt }) => {
  const validSrc = isImgURL(src) ? src : noPhoto;
  return <img className={style.img} src={validSrc} alt={alt} />;
};

Thumbnail.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};
