import { useContext } from 'react';
import style from './FormComment.module.css';
import { Text } from '../../../ui/Text';
import { authContext } from '../../../context/authContext';
import { useSelector, useDispatch } from 'react-redux';
import { updateComment } from '../../../store';

export const FormComment = () => {
  const { auth } = useContext(authContext);
  const value = useSelector(state => state.comment);
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    console.log(value);
  };

  const handleChange = event => {
    dispatch(updateComment(event.target.value));
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <Text As="h3" size={14} tsize={18}>
        {auth.name}
      </Text>
      <textarea
        className={style.textarea}
        value={value}
        onChange={handleChange}
      ></textarea>
      <button className={style.btn}>Отправить</button>
    </form>
  );
};
