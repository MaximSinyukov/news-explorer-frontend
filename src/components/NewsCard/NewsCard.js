import React from 'react';
import './NewsCard.css';

function NewsCard({cardId, keyword, title, description, publishedAt, source, url, urlToImage, loggedIn, newsRoute, onRegister, onDeleteNews, onSaveNews, savedCards}) {
  const [savedCard, setSavedCard] = React.useState(false);

  React.useEffect(() => {
    if (!newsRoute) {
      const checkSave = savedCards.some((card) => {
        return (card.title === title)&&(card.text === description)&&(card.source === source.name)&&(card.link === url);
      });
      if (checkSave !== savedCard) {
        toggleSavedState();
      }
    }
  }, [savedCards]);

  const date = publishedAt.slice(0, 10).split('-');
  const incorrectMonth = date[1];
  const month = new Intl.DateTimeFormat('ru', {month: 'long', day: 'numeric'}).format(incorrectMonth).slice(2);

  function savedNews() {
    if (savedCard) {
      deleteNews();
    } else {
      const keyword = localStorage.getItem('keyword');
      onSaveNews({keyword, title, description, publishedAt, source, url, urlToImage});
    }
  }

  function toggleSavedState() {
    const value = savedCard;
    setSavedCard(!value);
  }

  function deleteNews() {
    if (newsRoute) {
      onDeleteNews({_id: cardId});
    } else {
      const findId = savedCards.find((card) => {
        return (card.title === title)&&(card.text === description)&&(card.source === source.name)&&(card.link === url);
      });
      const id = findId;
      onDeleteNews({_id: id._id});
    }
  }

  function unloggedNews() {
    onRegister();
  }

  function clickListener(evt) {
    if (evt.target.classList.contains('news-card__button')) {
      return;
    }
    window.open(url, '_blank');
  }

  return (
      <figure className="news-card" onClick={clickListener}>
        <div className="news-card__photo-block">
          <img src={urlToImage} alt="Здесь должно быть фото из новости" className="news-card__image" />
          {newsRoute ? <span className="news-card__keyword">{keyword}</span> : ''}
          <button type="button" className={`news-card__button ${newsRoute ? 'news-card__button_saved-news' : (savedCard ? 'news-card__button_saved' : (loggedIn ? '' : 'news-card__button_unlogged'))} `} onClick={newsRoute ? deleteNews: (loggedIn ? savedNews : unloggedNews)}></button>
        </div>
        <figcaption className="news-card__description-block">
          <span className="news-card__date">{`${date[2]} ${month}, ${date[0]}`}</span>
          <h2 className="news-card__title">{title}</h2>
          <p className="news-card__text">{description}</p>
          <span className="news-card__source">{source.name}</span>
        </figcaption >
      </figure>
  )
}

export default NewsCard;
