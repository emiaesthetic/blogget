import RingLoader from 'react-spinners/RingLoader';

const override = {
  display: 'block',
  margin: '0 auto',
};

export const AuthLoader = () => (
  <RingLoader color="#cc6633" cssOverride={override} size={30} />
);
