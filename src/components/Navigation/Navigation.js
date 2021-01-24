import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation({children, darkText, newsRoute, disableNavigation, onMainClick}) {
  return (
    <nav className="navigation">
      <ul className={`navigation__links ${disableNavigation ? '' : `${darkText ? 'navigation__links_dark_opened' : 'navigation__links_opened'}`}`}>
        <li className="navigation__li"><Link to="/" onClick={onMainClick} className={`navigation__stable-link ${newsRoute ? 'navigation__stable-link_dark' : ''} ${(!darkText) ? 'navigation__stable-link_dark_opened ' : ''}`}>Главная</Link></li>
        {children}
      </ul>
    </nav>
  )
}

export default Navigation;
