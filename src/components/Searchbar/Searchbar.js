import { useState } from 'react';
import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import PropTypes from 'prop-types';
import style from '../Searchbar/Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      alert({
        text: 'Enter the title!',
        delay: 1000,
      });

      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={style.Searchbar}>
      <form onSubmit={handleSubmit} className={style.Searchbar}>
        <button type="submit" className={style.SearchFormButton}>
          <span className={style.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={style.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
