import React from 'react';
import './SearchForm.css';

function SearchForm({onSubmit}) {
  const [inputValid, setInputValid] = React.useState(false);
  const [inputInvalid, setInputInvalid] = React.useState(false);

  function handleInputChange(e) {
    setInputValid(e.target.validity.valid);
  }

  function handleInputError() {
    setInputInvalid(true);
  }

  function handleCloseError() {
    setInputInvalid(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleCloseError();
    if (!inputValid) {
      handleInputError();
    }
    onSubmit();
  }
  return (
    <section className="search-form">
      <h1 className="search-form__title">Что творится в мире?</h1>
      <p className="search-form__text">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
      <form className="search-form__form" onSubmit={handleSubmit} noValidate>
        <input type="text" minLength="2" className="search-form__input" onChange={handleInputChange} placeholder="Введите тему новости" required></input>
        <button type="submit" className="search-form__button">Искать</button>
        <span className={`search-form__error ${inputInvalid ? 'search-form__error_visible' : ''}`}>А что будем искать ? :)</span>
      </form>
    </section>
  )
}

export default SearchForm;
