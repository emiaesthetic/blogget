import style from './Search.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchRequest } from '../../../store/search/searchAction';

import { ReactComponent as SearchIcon } from './img/search.svg';

export const Search = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(searchRequest(search));
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <input
        className={style.search}
        type="search"
        onChange={event => setSearch(event.target.value)}
        value={search}
      />
      <button className={style.button} type="submit">
        <SearchIcon className={style.svg} />
      </button>
    </form>
  );
};
