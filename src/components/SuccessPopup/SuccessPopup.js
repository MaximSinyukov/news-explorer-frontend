import React from 'react';
import './SuccessPopup.css';

function SuccessPopup({isOpen, onClose, onLogin}) {

  const handleSwitchPopup = () => {
    onClose();
    onLogin();
  }

  return (
    <div className={isOpen ? 'success-popup success-popup_opened': 'success-popup'}>
      <div className="success-popup__container">
        <button type="button" className="success-popup__close-button" onClick={onClose}></button>
        <h2 className="success-popup__title">Пользователь успешно зарегистрирован!</h2>
        <button type="button" className="success-popup__login-button" onClick={handleSwitchPopup}>Войти</button>
      </div>
    </div>
  )
}

export default SuccessPopup;
