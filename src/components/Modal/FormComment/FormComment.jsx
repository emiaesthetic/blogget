import { useState, useEffect, useContext, useRef } from 'react';
import style from './FormComment.module.css';
import { Text } from '../../../ui/Text';
import { authContext } from '../../../context/authContext';

export const FormComment = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { auth } = useContext(authContext);
  const commentRef = useRef(null);

  const handleSubmit = event => {
    event.preventDefault();
    console.log(commentRef.current.value);
    commentRef.current.value = '';
    setIsFormVisible(false);
  };

  useEffect(() => {
    if (isFormVisible && commentRef.current) {
      commentRef.current.focus();
    }
  }, [isFormVisible]);

  return (
    <>
      {!isFormVisible && (
        <button className={style.btn} onClick={() => setIsFormVisible(true)}>
          Написать комментарий
        </button>
      )}
      {isFormVisible && (
        <form className={style.form} onSubmit={handleSubmit}>
          <Text As="h3" size={14} tsize={18}>
            {auth.name}
          </Text>
          <textarea className={style.textarea} ref={commentRef}></textarea>
          <button className={style.btn}>Отправить</button>
        </form>
      )}
    </>
  );
};
