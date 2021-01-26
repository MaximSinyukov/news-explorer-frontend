import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './SavedNewsHeader.css';

function SavedNewsHeader({cards}) {
  const userContext = React.useContext(CurrentUserContext);
  const endingsArticleCount = [{one: 'ая', two: 'ья'}, {one: 'ые', two: 'ьи'}, {one: 'ых', two: 'ей'}];
  const endingsKeywordCount = [{one: 'й', two: 'ой'}, {one: 'м', two: 'им'}, {one: 'и', two: 'им'}];
  const endingsSubtitleCount = [{one: 'ому', two: 'у'}, {one: 'ым', two: 'ам'}];
  const [currentEndingArticle, setCurrentEndingArticle] = React.useState({one: '', two: '' });
  const [currentEndingKeyword, setCurrentEndingKeyword] = React.useState({one: '', two: '' });

  const [sortListKeywords, setSortListKeywords] = React.useState([]);

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

  React.useEffect(() => {
    const remainderTensArticle = cards.length % 10;
    const remainderHundredArticle = cards.length % 100;
    if ((4 < cards.length)&&(cards.length < 21)||(remainderTensArticle === 0)||(remainderHundredArticle > 4)&&(remainderHundredArticle < 21)||(remainderTensArticle > 4)&&(remainderTensArticle < 21)) {
      changeEndingArticle(endingsArticleCount[2]);
    } else if ((cards.length === 1)||(remainderTensArticle === 1)) {
      changeEndingArticle(endingsArticleCount[0]);
    } else {
      changeEndingArticle(endingsArticleCount[1]);
    }
  }, [cards.length]);

  React.useEffect(() => {
    const currentLength = sortListKeywords.length - 2;
    const remainderTensKeyword = currentLength % 10;
    const remainderHundredKeyword = currentLength % 100;
    if ((4 < currentLength)&&(currentLength < 21)||(remainderTensKeyword === 0)||(remainderHundredKeyword > 4)&&(remainderHundredKeyword < 21)||(remainderTensKeyword > 4)&&(remainderTensKeyword < 21)) {
      changeEndingKeyword(endingsKeywordCount[2]);
    } else if ((currentLength === 1)||(remainderTensKeyword === 1)) {
      changeEndingKeyword(endingsKeywordCount[0]);
    } else {
      changeEndingKeyword(endingsKeywordCount[1]);
    }
  }, [sortListKeywords.length]);

  function changeEndingArticle(data) {
    setCurrentEndingArticle({one: data.one, two: data.two });
  }

  function changeEndingKeyword(data) {
    setCurrentEndingKeyword({one: data.one, two: data.two });
  }

  return (
    <section className="saved-news-header">
      <h2 className="saved-news-header__title">Сохранённые статьи</h2>
      <p className="saved-news-header__number-news">{`${userContext.name}, у вас ${cards.length} сохранённ${currentEndingArticle.one} стат${currentEndingArticle.two}`}</p>
      { (sortListKeywords.length === 0)? '' :
        (<p className="saved-news-header__keywords">{`По ключев${sortListKeywords.length === 1 ? endingsSubtitleCount[0].one : endingsSubtitleCount[1].one } слов${sortListKeywords.length === 1 ? endingsSubtitleCount[0].two : endingsSubtitleCount[1].two }: `}<span className="saved-news-header__keyword">{sortListKeywords[0][0]}</span>{sortListKeywords.length > 1 ? (<span className="saved-news-header__keyword">, {sortListKeywords[1][0]} </span>): ''}{sortListKeywords.length > 2 ? 'и' : ''}{sortListKeywords.length > 2 ? (<span className="saved-news-header__keyword">{sortListKeywords.length === 3 ? ` ${sortListKeywords[2][0]}` : ` ${sortListKeywords.length - 2}-${currentEndingKeyword.one} друг${currentEndingKeyword.two}`}</span>) : ''}</p>)
      }
    </section>
  )
}

export default SavedNewsHeader;
