import React from 'react';
import './Main.css';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';

function Main({newsRoute, onError, loggedIn, onSubmit, onNoResult, onPreloader, cards, onRegister, onDeleteNews, onSaveNews, savedCards}) {
  return (
    <main className="main">
      <SearchForm onSubmit={onSubmit} />
      <NewsCardList newsRoute={newsRoute} onError={onError} loggedIn={loggedIn} onDeleteNews={onDeleteNews} onSaveNews={onSaveNews} onRegister={onRegister} onNoResult={onNoResult} onPreloader={onPreloader} cards={cards} savedCards={savedCards} />
      <About />
    </main>
  )
}

export default Main;
