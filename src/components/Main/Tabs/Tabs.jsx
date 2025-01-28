import { useState, useEffect } from 'react';
import style from './Tabs.module.css';
import assignID from '../../../utils/generateRandomID';
import debounceRaf from '../../../utils/debounce';

import { ReactComponent as ArrowIcon } from './img/arrow.svg';
import { ReactComponent as EyeIcon } from './img/eye.svg';
import { ReactComponent as HomeIcon } from './img/home.svg';
import { ReactComponent as PostIcon } from './img/post.svg';
import { ReactComponent as SaveIcon } from './img/save.svg';

const menuList = [
  { value: 'Главная', Icon: HomeIcon },
  { value: 'Просмотренные', Icon: EyeIcon },
  { value: 'Сохраненные', Icon: SaveIcon },
  { value: 'Мои посты', Icon: PostIcon },
].map(assignID);

export const Tabs = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(true);
  const [currentTab, setCurrentTab] = useState(menuList[0]);

  const handleResize = () => {
    if (document.documentElement.clientWidth < 768) {
      setIsDropdown(true);
    } else {
      setIsDropdown(false);
    }
  };

  useEffect(() => {
    const debounceResize = debounceRaf(handleResize);
    debounceResize();
    window.addEventListener('resize', debounceResize);

    return () => {
      window.removeEventListener('resize', debounceResize);
    };
  }, []);

  return (
    <div className={style.container}>
      {isDropdown && (
        <div className={style.wrapperBtn}>
          <button
            className={style.btn}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label="Меню"
          >
            {currentTab.value}
            <ArrowIcon width={15} height={15} />
          </button>
        </div>
      )}

      {(isDropdownOpen || !isDropdown) && (
        <ul className={style.list} onClick={() => setIsDropdownOpen(false)}>
          {menuList.map(({ value, id, Icon }) => (
            <li className={style.item} key={id}>
              <button
                className={style.btn}
                onClick={() => setCurrentTab({ value, id })}
              >
                {value}
                {Icon && <Icon width={30} height={30} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
