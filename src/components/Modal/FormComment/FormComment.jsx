import { useRef } from 'react';
import style from './FormComment.module.css';
import { Text } from '../../../ui/Text';

export const FormComment = () => {
  const commentRef = useRef(null);

  const handleSubmit = event => {
    event.preventDefault();
    console.log(commentRef.current.value);
    commentRef.current.value = '';
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <Text As="h3" size={14} tsize={18}>
        Имя авторизованного пользователя
      </Text>
      <textarea className={style.textarea} ref={commentRef}></textarea>
      <button className={style.btn}>Отправить</button>
    </form>
  );
};
