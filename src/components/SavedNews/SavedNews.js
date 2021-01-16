import React from 'react';
import './SavedNews.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews({newsRoute, onError, userName, onNoResult, onPreloader, cards}) {
  return (
    <main className="saved-news">
      <SavedNewsHeader userName={userName} cards={cards} />
      <NewsCardList newsRoute={newsRoute} onError={onError} userName={userName} onNoResult={onNoResult} onPreloader={onPreloader} cards={cards} />
    </main>
  )
}

export default SavedNews;
