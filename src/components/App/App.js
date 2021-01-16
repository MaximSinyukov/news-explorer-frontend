import React from 'react';
import { Route, Switch  } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import LoginPopup from '../LoginPopup/LoginPopup';
import SuccessPopup from '../SuccessPopup/SuccessPopup';
import './App.css';

function App() {
  const [userName, setUserName] = React.useState('Мария');
  const [error, setError] = React.useState(false);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);

  const handleLoginUser = () => {
  }

  const handleRegisterUser = () => {
  }

  const handleSearchNews = () => {
  }

  const handleLoginPopupClick = () => {
    setIsLoginPopupOpen(true);
    setPopupOpen(true);
  }

  const handleRegisterPopupClick = () => {
    setIsRegisterPopupOpen(true);
    setPopupOpen(true);
  }

  const handleSuccessPopupClick = () => {
    setIsSuccessPopupOpen(true);
    setPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsRegisterPopupOpen(false);
    setIsLoginPopupOpen(false);
    setIsSuccessPopupOpen(false);
    setPopupOpen(false);
  };

  const newCards = [{_id: 4011511111, keyword: 'Природа',title: 'Национальное достояние – парки', text: 'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.', date: '2 августа, 2019', source: 'Дзен', link: 'https://yandex.ru', image: 'https://images.unsplash.com/photo-1610338724170-5406cb1991ad?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80' },
  {_id: 40111361111, keyword: 'Природа',title: 'Национальное достояние – парки', text: 'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.', date: '2 августа, 2019', source: 'Дзен', link: 'https://yandex.ru', image: 'https://images.unsplash.com/photo-1610338724170-5406cb1991ad?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80' },
  {_id: 4011116111, keyword: 'Природа',title: 'Национальное достояние – парки', text: 'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.', date: '2 августа, 2019', source: 'Дзен', link: 'https://yandex.ru', image: 'https://images.unsplash.com/photo-1610338724170-5406cb1991ad?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80' },
  {_id: 4011211111, keyword: 'Природа',title: 'Национальное достояние – парки', text: 'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.', date: '2 августа, 2019', source: 'Дзен', link: 'https://yandex.ru', image: 'https://images.unsplash.com/photo-1610338724170-5406cb1991ad?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80' }
];

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Header userName={userName} newsRoute={false} onLogin={handleLoginPopupClick} popupOpen={popupOpen} onClose={closeAllPopups} />
          <Main newsRoute={false} onError={error} userName={userName} onSubmit={handleSearchNews} onNoResult={false} onPreloader={false} cards={newCards} />
        </Route>
        <Route path="/saved-news">
          <Header userName={userName} newsRoute={true} />
          <SavedNews newsRoute={true} onError={error} userName={userName} onNoResult={false} onPreloader={false} cards={newCards} />
        </Route>
      </Switch>
      <Footer />
      <RegisterPopup isOpen={isRegisterPopupOpen} onSubmit={handleRegisterUser} onSwitchPopup={handleLoginPopupClick} onClose={closeAllPopups} onReqError={error}/>
      <LoginPopup isOpen={isLoginPopupOpen} onSubmit={handleLoginUser} onSwitchPopup={handleRegisterPopupClick} onClose={closeAllPopups} onReqError={error}/>
      <SuccessPopup isOpen={isSuccessPopupOpen} onClose={closeAllPopups} onLogin={handleLoginPopupClick} />
    </div>
  );
}

export default App;
