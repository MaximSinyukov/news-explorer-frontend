import React from 'react';
import './Main.css';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';

function Main({newsRoute, onError, userName, onSubmit, onNoResult, onPreloader, cards}) {
  return (
    <main className="main">
      <SearchForm onSubmit={onSubmit} />
      <NewsCardList newsRoute={newsRoute} onError={onError} userName={userName} onNoResult={onNoResult} onPreloader={onPreloader} cards={cards}/>
      <About />
    </main>
  )
}

export default Main;
