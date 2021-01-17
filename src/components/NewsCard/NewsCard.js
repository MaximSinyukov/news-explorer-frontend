import React from 'react';
import './NewsCard.css';

function NewsCard({cardId, keyword, title, text, date, source, link, image, userName, newsRoute}) {
  const [savedCard, setSavedCard] = React.useState(false);

  function savedNews() {
    const value = savedCard;
    setSavedCard(!value);
  }

  function deleteNews() {
  }

  function clickListener(evt) {
    if (evt.target.classList.contains('news-card__button')) {
      return;
    }
    window.open(link, '_blank');
  }

  return (
      <figure className="news-card" onClick={clickListener}>
        <div className="news-card__photo-block">
          <img src={image} alt="Здесь должно быть фото из новости" className="news-card__image" />
          {newsRoute ? <span className="news-card__keyword">{keyword}</span> : ''}
          <button type="button" className={`news-card__button ${newsRoute ? 'news-card__button_saved-news' : (savedCard ? 'news-card__button_saved' : '')} `} disabled={userName ? false : true} onClick={newsRoute ? deleteNews: savedNews}></button>
        </div>
        <figcaption className="news-card__description-block">
          <span className="news-card__date">{date}</span>
          <h2 className="news-card__title">{title}</h2>
          <p className="news-card__text">{text}</p>
          <span className="news-card__source">{source}</span>
        </figcaption >
      </figure>
  )
}

export default NewsCard;
