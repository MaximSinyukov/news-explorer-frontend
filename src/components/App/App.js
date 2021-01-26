import React from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import LoginPopup from '../LoginPopup/LoginPopup';
import SuccessPopup from '../SuccessPopup/SuccessPopup';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import searchApi from '../../utils/NewsApi';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { searchDatesPeriod } from '../../utils/constants';
import './App.css';

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState('');
  const [errorSearch, setErrorSearch] = React.useState(false);
  const [errorPopup, setErrorPopup] = React.useState(false);
  const [preloader, setPreloader] = React.useState(false);
  const [searchCards, setSearchCards] = React.useState([]);
  const [savedCards, setSavedCards] = React.useState([]);
  const [noResult, setNoResult] = React.useState(false);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);
  const [submitFrom, setSubmitFrom] = React.useState(true);

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      loginUser(token);
    } else {
      handleLoggedIn();
    }
  }, []);

  React.useEffect(() => {
    let storageCards = [];
    if (localStorage.getItem('cards')) {
      storageCards = JSON.parse(localStorage.getItem('cards'));
    }
    setSearchCards(storageCards);
  }, []);

  function calcDays(date, days) {
    const newDate = new Date(Number(date));
    newDate.setDate(newDate.getDate() - days);
    return newDate;
  }

  const handleLogin = (data) => {
    setSubmitFrom(false);
    setErrorPopup(false);
    mainApi.loginUser(data)
      .then((res) => {
        localStorage.removeItem('cards');
        localStorage.removeItem('keyword');
        setSearchCards([]);
        localStorage.setItem('token', res.token);
        loginUser(res.token);
      })
      .then((res) => {
        setLoggedIn(true);
        closeAllPopups();
        setSubmitFrom(true);
      })
      .catch((err) => {
        setErrorPopup(true);
        setSubmitFrom(true);
      })

  }

  const handleRegister = (data) => {
    setSubmitFrom(false);
    setErrorPopup(false);
    mainApi.registerUser(data)
      .then((res) => {
        closeAllPopups();
        handleSuccessPopupClick();
        setSubmitFrom(true);
      })
      .catch((err) =>{
        setErrorPopup(true);
        setSubmitFrom(true);
      });
  }

  function loginUser(data) {
    mainApi.getUser(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        handleLoggedIn();
        console.log('Ошибка проверки токена');
      });
    mainApi.getSavedNews(data)
      .then((res) => {
        setSavedCards(res.reverse());
      })
      .catch((err) => {
        console.log('Упс, что-то пошло не так. Мы уже работаем над этим.');
      });
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('cards');
    localStorage.removeItem('keyword');
    history.push('/');
    setLoggedIn(false);
    setNoResult(false);
    setCurrentUser('');
    setSavedCards([]);
    setSearchCards([]);
  }

  const handleSearchNews = ({keyword}) => {
    setSearchCards([]);
    setPreloader(true);
    setNoResult(false);
    setErrorSearch(false);
    const currentDate = new Date();
    const calcDate = calcDays(currentDate, searchDatesPeriod.datesPeriod);
    searchApi.searchNews({
      keyword: keyword,
      dateFrom: `${calcDate.getFullYear()}-${('0' + (calcDate.getMonth()+1)).slice(-2)}-${('0' + calcDate.getDate()).slice(-2)}`,
      dateCurrent: `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth()+1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}`
    })
      .then((data) => {
        localStorage.setItem('keyword', keyword);
        localStorage.setItem('cards', JSON.stringify(data.articles));
        setSearchCards(data.articles);
      })
      .then((res) => {
        setPreloader(false);
        setNoResult(true);
      })
      .catch((err) => {
        setPreloader(false);
        setNoResult(true);
        setErrorSearch(true);
      })
  }

  const handleSaveNews = (data) => {
    const token = localStorage.getItem('token');
    mainApi.createSavedNews(data, token)
      .then((newCard) => {
        setSavedCards([newCard, ...savedCards]);
      })
      .catch((err) => {
        console.log(`Ошибка создания карточки: ${err}`);
      });
  }

  const handleDeleteNews = (data) => {
    const token = localStorage.getItem('token');
    mainApi.deleteSavedNews(data._id, token)
      .then((res) => {
        const newCards = savedCards.filter((c) => {
          return !(c._id === data._id)
        });
        setSavedCards(newCards);
      })
      .catch((err) => {
        console.log(`Ошибка удаления карточки: ${err}`);
      });
  }

  const handleLoggedIn = () => {
    setLoggedIn(false);
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
    setErrorPopup(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} onLogin={handleLoginPopupClick} popupOpen={popupOpen} onClose={closeAllPopups} onSignOut={handleSignOut} />
        <Switch>
          <Route exact path="/">
            <Main newsRoute={false} onError={errorSearch} loggedIn={loggedIn} onDeleteNews={handleDeleteNews} onSaveNews={handleSaveNews} onSubmit={handleSearchNews} onRegister={handleRegisterPopupClick} onNoResult={noResult} onPreloader={preloader} cards={searchCards} savedCards={savedCards} />
          </Route>
          <ProtectedRoute path="/saved-news" loggedIn={loggedIn} component={SavedNews} newsRoute={true} onError={errorSearch} onDeleteNews={handleDeleteNews} onNoResult={noResult} onPreloader={preloader} cards={savedCards} onLogin={handleLoginPopupClick} />
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
        <Footer />
        <RegisterPopup isOpen={isRegisterPopupOpen} onSubmit={handleRegister} onSubmitDisable={submitFrom} onSwitchPopup={handleLoginPopupClick} onClose={closeAllPopups} onReqError={errorPopup}/>
        <LoginPopup isOpen={isLoginPopupOpen} onSubmit={handleLogin} onSubmitDisable={submitFrom} onSwitchPopup={handleRegisterPopupClick} onClose={closeAllPopups} onReqError={errorPopup}/>
        <SuccessPopup isOpen={isSuccessPopupOpen} onClose={closeAllPopups} onLogin={handleLoginPopupClick} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
