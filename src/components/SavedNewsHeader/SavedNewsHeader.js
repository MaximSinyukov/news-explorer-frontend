import React from 'react';
import './SavedNewsHeader.css';

function SavedNewsHeader({cards, userName}) {
  return (
    <section className="saved-news-header">
      <h2 className="saved-news-header__title">Сохранённые статьи</h2>
      <p className="saved-news-header__number-news">{`${userName}, у вас ${cards.length} сохранённых статей`}</p>
      <p className="saved-news-header__keywords">По ключевым словам: <span className="saved-news-header__keyword">Природа</span>, <span className="saved-news-header__keyword">Тайга</span> и <span className="saved-news-header__keyword">2-м другим</span></p>
    </section>
  )
}

export default SavedNewsHeader;
