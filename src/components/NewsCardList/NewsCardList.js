import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import Preloader from '../Preloader/Preloader';
import noResultImage from '../../images/news-card-list__no-result.svg';
import './NewsCardList.css';

function NewsCardList({newsRoute, onNoResult, onError, loggedIn, onPreloader, cards, onRegister, onDeleteNews, onSaveNews, savedCards}) {
  const [currentCards, setCurrentCards] = React.useState([]);
  const counterRef = React.useRef(0);

  React.useEffect(() => {
    counterRef.current = 0;
    addCards();
  }, [cards.length]);

  function addCards() {
    counterRef.current = counterRef.current + 3;
    const newCards = cards.slice(0, counterRef.current);
    setCurrentCards(newCards);
  }

  return (
    <section className="news-card-list">
      <div className={`news-card-list__results ${ (cards.length > 0)&&(!onPreloader) ? 'news-card-list__results_opened' : ''}`}>
        {newsRoute ? '' : (<h2 className="news-card-list__results-title">Результаты поиска</h2>)}
        <div className="news-card-list__results-news-container">
          { newsRoute ?
            cards.map(({_id, text, date, link, image, ...props}) =>
            <NewsCard key={_id} cardId={_id} {...props} description={text} publishedAt={date} url={link} urlToImage={image} onRegister={onRegister} loggedIn={loggedIn} onDeleteNews={onDeleteNews} newsRoute={newsRoute} />)
            :
            currentCards.map(({_id, ...props}, i) =>
            <NewsCard key={_id ? _id : i} cardId={_id ? _id : i} {...props} onRegister={onRegister} savedCards={savedCards} loggedIn={loggedIn} newsRoute={newsRoute} onDeleteNews={onDeleteNews} onSaveNews={onSaveNews} />)
          }
        </div>
        {newsRoute? '' : ((counterRef.current < cards.length) ? (<button type="button" onClick={addCards} className="news-card-list__results-add-button">Показать еще</button>) : '')}
      </div>
      <div className={`news-card-list__preloader ${onPreloader ? 'news-card-list__preloader_opened' : ''}`}>
        <Preloader />
        <h2 className="news-card-list__preloader-title">{newsRoute ? 'Идет загрузка новостей...' :'Идет поиск новостей...'}</h2>
      </div>
      <div className={`news-card-list__no-result ${((onNoResult)||(newsRoute))&&(cards.length === 0) ? 'news-card-list__no-result_opened' : '' }`}>
        <img src={noResultImage} alt="лупа с грустным лицом" className="news-card-list__no-result-image" />
        <h2 className="news-card-list__no-result-title">{onError ? 'Упс, что-то пошло не так' : (newsRoute ? 'Нет сохраненных статей' :'Ничего не найдено')}</h2>
        <p className="news-card-list__no-result-text">{onError ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.' : (newsRoute ? 'К сожалению, вы еще не сохранили статьи' :'К сожалению, по вашему запросу ничего не найдено.')}</p>
      </div>
    </section>
  )
}

export default NewsCardList;
