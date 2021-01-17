import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import Preloader from '../Preloader/Preloader';
import noResultImage from '../../images/news-card-list__no-result.svg';

function NewsCardList({newsRoute, onNoResult, onError, userName, onPreloader, cards}) {

  return (
    <section className="news-card-list">
      <div className={`news-card-list__results ${ cards.length > 0 ? 'news-card-list__results_opened' : ''}`}>
        {newsRoute ? '' : (<h2 className="news-card-list__results-title">Результаты поиска</h2>)}
        <div className="news-card-list__results-news-container">
          {
            cards.map(({_id, ...props}) =>
            <NewsCard key={_id} cardId={_id} {...props} userName={userName} newsRoute={newsRoute} />)
          }
        </div>
        {newsRoute ? '' : (<button type="button" className="news-card-list__results-add-button">Показать еще</button>)}
      </div>
      <div className={`news-card-list__preloader ${onPreloader ? 'news-card-list__preloader_opened' : ''}`}>
        <Preloader />
        <h2 className="news-card-list__preloader-title">{newsRoute ? 'Идет загрузка новостей...' :'Идет поиск новостей...'}</h2>
      </div>
      <div className={`news-card-list__no-result ${onNoResult ? 'news-card-list__no-result_opened' : '' }`}>
        <img src={noResultImage} alt="лупа с грустным лицом" className="news-card-list__no-result-image" />
        <h2 className="news-card-list__no-result-title">{onError ? 'Упс, что-то пошло не так' : (newsRoute ? 'Нет сохраненных статей' :'Ничего не найдено')}</h2>
        <p className="news-card-list__no-result-text">{onError ? 'Мы уже работаем над этим.' : (newsRoute ? 'К сожалению Вы еще не сохранили статьи' :'К сожалению по вашему запросу ничего не найдено.')}</p>
      </div>
    </section>
  )
}

export default NewsCardList;
