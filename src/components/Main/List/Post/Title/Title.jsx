import style from './Title.module.css';
import PropTypes from 'prop-types';

export const Title = ({ title, url }) => (
  <h2>
    <a className={style.linkPost} href={url}>
      {title}
    </a>
  </h2>
);

Title.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
};
