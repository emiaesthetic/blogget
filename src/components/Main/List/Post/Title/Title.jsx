import style from './Title.module.css';
import PropTypes from 'prop-types';
import { Text } from '../../../../../ui/Text';

export const Title = ({ title, onClick }) => (
  <h2>
    <Text
      As="a"
      size="18"
      tsize="24"
      weight="bold"
      className={style.linkPost}
      href="#post"
      onClick={onClick}
    >
      {title}
    </Text>
  </h2>
);

Title.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};
