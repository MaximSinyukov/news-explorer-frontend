import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './LoginPopup.css';

function LoginPopup({isOpen, onClose, onSubmit, onSwitchPopup, onReqError, onSubmitDisable}) {
  return (
    <PopupWithForm title="Вход" textSwitch="Зарегистрироваться" onSwitchPopup={onSwitchPopup} submitButtonText="Войти" isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} onReqError={onReqError} registerPopup={false} onSubmitDisable={onSubmitDisable}>
    </PopupWithForm>
  )
}

export default LoginPopup;
