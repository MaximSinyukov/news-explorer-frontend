import React from 'react';
import './SavedNews.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews({newsRoute, onError, loggedIn, onNoResult, onPreloader, cards, onDeleteNews}) {
  return (
    <main className="saved-news">
      <SavedNewsHeader cards={cards} />
      <NewsCardList newsRoute={newsRoute} onError={onError} loggedIn={loggedIn} onDeleteNews={onDeleteNews} onNoResult={onNoResult} onPreloader={onPreloader} cards={cards} />
    </main>
  )
}

export default SavedNews;
