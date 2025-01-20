import PropTypes from 'prop-types';
import style from './Heading.module.css';

export const Heading = ({ children }) => (
  <h1 className={style.heading}>{children}</h1>
);

Heading.propTypes = {
  children: PropTypes.node.isRequired,
};
