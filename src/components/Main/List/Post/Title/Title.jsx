import style from './Title.module.css';
import PropTypes from 'prop-types';
import { Text } from '../../../../../ui/Text';
import { Link, useParams } from 'react-router-dom';

export const Title = ({ id, title }) => {
  const { page } = useParams();

  return (
    <h2>
      <Link className={style.linkPost} to={`/category/${page}/post/${id}`}>
        <Text size="18" tsize="24" weight="bold">
          {title}
        </Text>
      </Link>
    </h2>
  );
};

Title.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
};
