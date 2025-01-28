import style from './DeleteButton.module.css';
import PropTypes from 'prop-types';

import { ReactComponent as DeleteIcon } from './img/delete.svg';

export const DeleteButton = ({ onClick }) => (
  <button className={style.delete} onClick={onClick} aria-label="Удалить пост">
    <DeleteIcon />
  </button>
);

DeleteButton.propTypes = {
  onClick: PropTypes.func,
};
