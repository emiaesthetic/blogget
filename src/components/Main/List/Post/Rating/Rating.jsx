import style from './Rating.module.css';
import PropTypes from 'prop-types';
import { Text } from '../../../../../ui/Text';

export const Rating = ({ ups }) => (
  <div className={style.rating}>
    <button className={style.up} aria-label="Увеличить рейтинг" />
    <Text As="p" className={style.ups}>
      {ups}
    </Text>
    <button className={style.down} aria-label="Уменьшить рейтинг" />
  </div>
);

Rating.propTypes = {
  ups: PropTypes.number,
};
