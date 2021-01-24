import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import logoutImage from '../../images/header__logout-button.svg';
import logoutImageNews from '../../images/header__logout-button_news.svg';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Header.css';

function Header({loggedIn, onLogin, popupOpen, onClose, onSignOut}) {
  const userContext = React.useContext(CurrentUserContext);
  const [mobileButton, setMobileButton] = React.useState(true);
  const [newsRoute, setNewsRoute] = React.useState(false);

  React.useEffect(() => {
    if (window.location.pathname === '/saved-news') {
      handleNewsRoute();
    } else {
      handleStartRoute();
    }
  }, [window.location.pathname]);

  function handleNewsRoute() {
    setNewsRoute(true);
  }

  function handleStartRoute() {
    setNewsRoute(false);
  }

  function changeMobileButton() {
    const value = !mobileButton;
    setMobileButton(value);
  }

  function handleLogin() {
    if(mobileButton === false) {
      changeMobileButton();
    }
    onLogin();
  }

  return (
    <header className={`header ${mobileButton ? '' : 'header_dark'} ${(newsRoute)&&(mobileButton) ? 'header_news' : ''}`}>
      <h2 className="header__logo"><a href="/" className={`header__logo-link ${newsRoute ? 'header__logo-link_news' : ''} ${(!mobileButton) ? 'header__logo-link_news_opened' : ''}`}>NewsExplorer</a></h2>
      <button type="button" className={`header__mobile-button ${(newsRoute)&&(mobileButton) ? 'header__menu-button_news' : ''} ${(!mobileButton)||(popupOpen) ? 'header__close-button' : 'header__menu-button '}` } onClick={popupOpen ? onClose : changeMobileButton }></button>
      <Navigation darkText={mobileButton} disableNavigation={mobileButton} newsRoute={newsRoute} onMainClick={handleStartRoute}>
        {loggedIn ?
          (<li className="header__li"><Link to="/saved-news" onClick={handleNewsRoute} className={`header__saved-link ${newsRoute ? 'header__saved-link_news' : ''} ${(!mobileButton) ? 'header__saved-link_news_opened' : ''}`}>Сохранённые статьи</Link></li>) : ''}
        {loggedIn ?
            (<li className="header__li"><button  type="button" onClick={onSignOut} className={`header__logout ${newsRoute ? 'header__logout_news' : ''}`}><span className={`header__name ${newsRoute ? 'header__name_news' : ''}`}>{userContext.name}</span><img className={`header__image-logout ${newsRoute ? 'header__image-logout_news' : ''}`} src={newsRoute ? logoutImageNews: logoutImage} alt="стрелочка выходящая в квадрат"/></button></li>)
          :
            (<li className="header__li"><button type="button" className="header__auth" onClick={handleLogin}>Авторизоваться</button></li>) }
      </Navigation>
    </header>
  )
}

export default Header;
