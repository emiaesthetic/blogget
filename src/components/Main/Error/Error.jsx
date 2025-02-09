import style from './Error.module.css';
import { Text } from '../../../ui/Text';

export const Error = () => (
  <Text
    As="h2"
    className={style.error}
    size="18"
    tsize="24"
    weight="bold"
    color="orange"
    center
  >
    Ошибка 404
  </Text>
);
