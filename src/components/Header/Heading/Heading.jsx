import PropTypes from 'prop-types';
import style from './Heading.module.css';
import { Text } from '../../../ui/Text';

export const Heading = ({ children }) => (
  <Text As="h1" size="22" tsize="26" center className={style.heading}>
    {children}
  </Text>
);

Heading.propTypes = {
  children: PropTypes.node.isRequired,
};
