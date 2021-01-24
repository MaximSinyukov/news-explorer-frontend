import React, { useRef } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './SavedNewsHeader.css';

function SavedNewsHeader({cards}) {
  const userContext = React.useContext(CurrentUserContext);
  const endingsArray = [{one: 'ая', two: 'ья'}, {one: 'ые', two: 'ьи'}, {one: 'ых', two: 'ей'}];
  const [currentEnding, setCurrentEnding] = React.useState({one: '', two: '' });

  const [sortListKeywords, setSortListKeywords] = React.useState([]);

  React.useEffect(() => {
    const remainder = cards.length % 10;
    if (remainder === 1) {
      handleChangeEnding(endingsArray[0]);
    } else if ((remainder > 1)&&(remainder < 5)) {
      handleChangeEnding(endingsArray[1]);
    } else {
      handleChangeEnding(endingsArray[2]);
    }

  }, [cards.length]);

  React.useEffect(() => {
    let keywordsArray = [];

    cards.forEach((card) => {
    keywordsArray = [{keyword: card.keyword}, ...keywordsArray];
    });

    const countKeywords = keywordsArray.reduce(function (prevVal, obj) {
      if (!prevVal[obj.keyword]) {
        prevVal[obj.keyword] = 1;
      } else {
        prevVal[obj.keyword] += 1;
      }
      return prevVal;
    }, {});

    const sortKeywords = Object.entries(countKeywords).sort((firstArr, secondArr) => {
      firstArr = firstArr[1];
      secondArr = secondArr[1];
      return secondArr - firstArr;
    });
    const currentKeywords = sortKeywords;
    setSortListKeywords(currentKeywords);
  }, [cards]);

  function handleChangeEnding(data) {
    setCurrentEnding({one: data.one, two: data.two });
  }

  // {sortListKeywords[0][0]}
  // {sortListKeywords[1][0]}
  // {sortikKeywords[0][0]}

  return (
    <section className="saved-news-header">
      <h2 className="saved-news-header__title">Сохранённые статьи</h2>
      <p className="saved-news-header__number-news">{`${userContext.name}, у вас ${cards.length} сохранённ${currentEnding.one} стат${currentEnding.two}`}</p>
      { (cards.length === 0)? '' :
        (<p className="saved-news-header__keywords">По ключевым словам: <span className="saved-news-header__keyword">{sortListKeywords[0][0]}</span>, <span className="saved-news-header__keyword">{sortListKeywords[1][0]}</span> и <span className="saved-news-header__keyword">2-м другим</span></p>)
      }
    </section>
  )
}

export default SavedNewsHeader;
