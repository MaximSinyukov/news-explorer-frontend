import React from 'react';
import './PopupWithForm.css';

function PopupWithForm({title, onSwitchPopup, textSwitch, submitButtonText, isOpen, onClose, onSubmit, children,  onReqError, registerPopup, registerNameValid, onSubmitDisable}) {
  const [formValid, setFormValid] = React.useState(true);
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const [emailValid, setEmailValid] = React.useState(false);
  const [passwordValid, setPasswordValid] = React.useState(false);
  const [emailInvalid, setEmailInvalid] = React.useState(true);
  const [passwordInvalid, setPasswordInvalid] = React.useState(false);

  React.useEffect(() => {
    setEmailValue('');
    setPasswordValue('');
    handleCloseError();
    setEmailValid(false);
    setPasswordValid(false);
  }, [isOpen]);

  function handleEmailChange(e) {
    setEmailValue(e.target.value);
    setEmailValid(e.target.validity.valid);
    setEmailInvalid(!e.target.validity.valid);
  }

  function handlePasswordChange(e) {
    setPasswordValid(e.target.validity.valid);
    setPasswordValue(e.target.value);
  }

  function handleEmailError() {
    setFormValid(false);
  }

  function handlePasswordError() {
    setPasswordInvalid(true);
    setFormValid(false);
  }

  function handleCloseError() {
    setEmailInvalid(false);
    setPasswordInvalid(false);
    setFormValid(true);
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
    if (registerPopup) {
      onSubmit({email: emailValue, password: passwordValue}, formValid);
    } else if (formValid) {
      onSubmit({email: emailValue, password: passwordValue});
    }
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
        <input className="popup__input" type="email" name="email" value={emailValue} placeholder="Введите почту" onChange={handleEmailChange} disabled={onSubmitDisable ? false : true} required></input>
        <span className={`popup__error ${emailInvalid ? 'popup__error_opened' : ''}`}>Неправильный формат email</span>
        <h3 className="popup__title">Пароль</h3>
        <input className="popup__input" type="password" name="password" value={passwordValue} onChange={handlePasswordChange} placeholder="Введите пароль" disabled={onSubmitDisable ? false : true} required></input>
        <span className={`popup__error ${passwordInvalid ? 'popup__error_opened' : ''}`}>Это обязательное поле</span>
        {children}
        <span className="popup__form-error">{onReqError ? (registerPopup ? 'Такой пользователь уже есть' : 'Неправильный логин или пароль') : ''}</span>
        <button type="submit" className="popup__submit-button" disabled={(onSubmitDisable)&&(emailValid)&&(passwordValid)&&(registerPopup ? registerNameValid : true) ? false : true}>{submitButtonText}</button>
        <span className="popup__switch-container">или <button type="button" onClick={handleSwitch} className="popup__switch-button">{textSwitch}</button></span>
      </form>
    </div>
  );
}

export default PopupWithForm;
