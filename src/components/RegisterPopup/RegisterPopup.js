import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './RegisterPopup.css';

function RegisterPopup({isOpen, onClose, onSubmit, onSwitchPopup, onReqError}) {
  const [nameValid, setNameValid] = React.useState(false);
  const [nameInvalid, setNameInvalid] = React.useState(false);

  function handleNameChange(e) {
    setNameValid(e.target.validity.valid);
  }

  function handleNameError() {
    setNameInvalid(true);
  }

  function handleCloseError() {
    setNameInvalid(false);
  }

  function handleSubmit() {
    handleCloseError();
    if (!nameValid) {
      handleNameError();
    }
    onSubmit();
  }

  return (
    <PopupWithForm title="Регистрация" textSwitch="Войти" onSwitchPopup={onSwitchPopup} submitButtonText="Зарегистрироваться" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} onReqError={onReqError}>
      <h3 className="register__title">Имя</h3>
      <input className="register__input" type="text" onChange={handleNameChange} placeholder="Введите своё имя" required></input>
      <span className={`register__error ${nameInvalid ? 'register__error_opened' : ''}`}>Это обязательное поле</span>
    </PopupWithForm>
  )
}

export default RegisterPopup;
