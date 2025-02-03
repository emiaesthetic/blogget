import { useState, useEffect, useContext, useRef } from 'react';
import style from './FormComment.module.css';
import { Text } from '../../../ui/Text';
import { authContext } from '../../../context/authContext';
import { commentContext } from '../../../context/commentContext';

export const FormComment = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { auth } = useContext(authContext);
  const { value, setValue } = useContext(commentContext);
  const commentRef = useRef(null);

  const handleSubmit = event => {
    event.preventDefault();
    console.log(value);
    setIsFormVisible(false);
  };

  const handleChange = event => {
    setValue(event.target.value);
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
          <textarea
            className={style.textarea}
            value={value}
            onChange={handleChange}
            ref={commentRef}
          ></textarea>
          <button className={style.btn}>Отправить</button>
        </form>
      )}
    </>
  );
};
