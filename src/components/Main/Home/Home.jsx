import style from './Home.module.css';
import { Text } from '../../../ui/Text';

export const Home = () => (
  <div className={style.container}>
    <Text As="h2" size="18" tsize="24" weight="bold">
      Главная страница
    </Text>

    <Text As="p" size="16" tsize="20">
      Добро пожаловать!
    </Text>

    <Text size="14" tsize="18">
      Выберите категорию
    </Text>
  </div>
);
