import style from './Search.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchRequest } from '../../../store/posts/postsSlice';

import { ReactComponent as SearchIcon } from './img/search.svg';

export const Search = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(searchRequest(search));
    navigate(`search?q=${search}`);
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
