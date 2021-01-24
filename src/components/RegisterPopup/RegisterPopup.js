import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './RegisterPopup.css';

function RegisterPopup({isOpen, onClose, onSubmit, onSwitchPopup, onReqError}) {
  const [nameValue, setNameValue] = React.useState('');
  const [nameValid, setNameValid] = React.useState(false);
  const [nameInvalid, setNameInvalid] = React.useState(false);
  const [submitDisable, setSubmitDisable] = React.useState(true);

  React.useEffect(() => {
    setNameValue('');
    handleCloseError();
    setNameValid(false);
  }, [onClose]);

  function handleNameChange(e) {
    setNameValid(e.target.validity.valid);
    setNameValue(e.target.value);
  }

  function handleNameError() {
    setNameInvalid(true);
  }

  function handleCloseError() {
    setNameInvalid(false);
  }

  function handleSubmit(data, formValid) {
    setSubmitDisable(false);
    handleCloseError();
    if (!nameValid) {
      handleNameError();
      formValid = false;
    }
    if (formValid) {
      onSubmit({email: data.email, password: data.password, name: nameValue});
    }
    setSubmitDisable(true);
  }

  return (
    <PopupWithForm title="Регистрация" textSwitch="Войти" onSwitchPopup={onSwitchPopup} submitButtonText="Зарегистрироваться" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} onReqError={onReqError} registerPopup={true} registerNameValid={nameValid}>
      <h3 className="register__title">Имя</h3>
      <input className="register__input" type="text" value={nameValue} onChange={handleNameChange} placeholder="Введите своё имя" disabled={submitDisable ? false : true} required></input>
      <span className={`register__error ${nameInvalid ? 'register__error_opened' : ''}`}>Это обязательное поле</span>
    </PopupWithForm>
  )
}

export default RegisterPopup;
