import PropTypes from 'prop-types';
import RingLoader from 'react-spinners/RingLoader';

const override = {
  display: 'block',
  margin: '0 auto',
};

export const Preloader = ({ size }) => (
  <RingLoader color="#cc6633" cssOverride={override} size={size} />
);

Preloader.propTypes = {
  size: PropTypes.number,
};
