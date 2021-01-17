import React from 'react';
import './Footer.css';
import Navigation from '../Navigation/Navigation';

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">&#169; 2020 Supersite, Powered by News API</h2>
      <Navigation darkText={true} disableNavigation={false} newsRoute={true}>
        <li className="footer__li"><a href="https://praktikum.yandex.ru/" target="_blank" className="footer__praktikum-link">Яндекс.Практикум</a></li>
        <li className="footer__li"><a target="_blank" href="https://github.com/MaximSinyukov" className="footer__github-link footer__social-link"></a></li>
        <li className="footer__li"><a target="_blank" href="https://ru-ru.facebook.com/" className="footer__facebook-link footer__social-link"></a></li>
      </Navigation>
    </footer>
  )
}

export default Footer;
