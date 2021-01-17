import React from 'react';
import './PopupWithForm.css';

function PopupWithForm({title, onSwitchPopup, textSwitch, submitButtonText, isOpen, onClose, onSubmit, children, onEmailValid, onPasswordValid, onReqError}) {
  const [emailValid, setEmailValid] = React.useState(false);
  const [passwordValid, setPasswordValid] = React.useState(false);
  const [emailInvalid, setEmailInvalid] = React.useState(false);
  const [passwordInvalid, setPasswordInvalid] = React.useState(false);

  function handleEmailChange(e) {
    setEmailValid(e.target.validity.valid);
  }

  function handlePasswordChange(e) {
    setPasswordValid(e.target.validity.valid);
  }

  function handleEmailError() {
    setEmailInvalid(true);
  }

  function handlePasswordError() {
    setPasswordInvalid(true);
  }

  function handleCloseError() {
    setEmailInvalid(false);
    setPasswordInvalid(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleCloseError();
    if (!emailValid) {
      handleEmailError();
    }
    if (!passwordValid) {
      handlePasswordError();
    }
    onSubmit();
  }


  function handleSwitch() {
    onClose();
    onSwitchPopup();
  }

  function handleKeyClosePopup(e) {
    if (e.keyCode === 27) {
      onClose();
    }
  }

  function handleClickClosePopup(e) {
    if (!(e.target.closest('.popup__container'))) {
      onClose();
    }
  }

  return (
    <div className={isOpen ? 'popup popup_opened': 'popup'} onClick={handleClickClosePopup} onKeyDown={handleKeyClosePopup}>
      <form className="popup__container" onSubmit={handleSubmit} noValidate>
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <h2 className="popup__main-title">{title}</h2>
        <h3 className="popup__title">Email</h3>
        <input className="popup__input" type="email" name="email" placeholder="Введите почту" onChange={handleEmailChange} required></input>
        <span className={`popup__error ${emailInvalid ? 'popup__error_opened' : ''}`}>Неправильный формат email</span>
        <h3 className="popup__title">Пароль</h3>
        <input className="popup__input" type="password" name="password" onChange={handlePasswordChange} placeholder="Введите пароль" required></input>
        <span className={`popup__error ${passwordInvalid ? 'popup__error_opened' : ''}`}>Это обязательное поле</span>
        {children}
        <span className="popup__form-error">{onReqError}</span>
        <button type="submit" className="popup__submit-button" disabled={(emailValid) && (passwordValid) ? false : true}>{submitButtonText}</button>
        <span className="popup__switch-container">или <button type="button" onClick={handleSwitch} className="popup__switch-button">{textSwitch}</button></span>
      </form>
    </div>
  );
}

export default PopupWithForm;
