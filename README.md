# Проект NewsExplorer Front-end

<p>
  <img alt="Status" src="https://img.shields.io/badge/status-released-green" >
  <img alt="Author" src="https://img.shields.io/badge/author-MaximSinyukov-blue" />
</p>

**Бэкенд часть проекта: [NewsExplorer API](https://github.com/MaximSinyukov/news-explorer-api)**

**API для поиска статей: [NewsAPI](https://newsapi.org/)**

## :book: Суть проекта

Фронтенд часть проекта `News`. Проект позволяет любому пользователю искать новости за последние 7 дней. Авторизованные пользователи получают возможность сохранять статьи. Возможности и особенности проекта:

* На "главной" всегда отображается результат поиска.
* По клику на статью можно перейти на ее источник.
* Реализована регистрация и авторизация пользователя. Тогда он получает возможность сохранять нужные статьи по клику на кнопку закладки. По повторному клику происходит удаление из сохраненных статей.
* У неавторизованного пользователя по клику на закладку возникает окно авторизации.
* При наведении на закладку/корзину возникают информационные сообщения для десктопных разрешений.
* На вкладке "главная" статьи отображаются по 3 штуки.
* У регистрированного пользователя появляется вторая вкладка с "сохраненными статьями".
* На вкладке "сохраненные статьи" у статей отображаются ключевые слова по которым они найдены.
* На вкладке "сохраненные статьи" отображается список наиболее популярных ключевых слов в порядке убывания.
* На вкладке "сохраненные статьи" отображается количество статей пользователя.
* Настроена работа между вкладками с помощью React Route.
* Во время поиска новостей отображается прелоадер.
* После поиска новостей они сохраняются в localStorage.
* При входе на сайт проверяется наличие токена и новостей в localStorage.
* При логауте или логине очищается localStorage.
* Кнопка выхода перенаправляет на "главную" страницу.
* Каждое поле ввода валидируется.
* Кнопки сабмита форм недоступны при ошибках валидации.
* В проекте реализована работа с двумя API. `NewsAPI` для поиска новостей. `NewsExplorer API` для хранения статей и пользователей.
* При помощи hoc-компонента защищен роут `/saved-news`.
* В проекте есть переиспользуемые компоненты.

## :wrench: О работе с проектом

1. Перед работой установите необходимые зависимости через - `npm install`
2. Для локального запуска проекта используйте - `npm run start`
3. Для итоговой сборки проекта воспользуйтесь - `npm run build`

## :bookmark_tabs: Стек

- JavaScript
- HTML
- CSS
- React

## :mag_right: Полученные навыки

* проект адаптирован под разные разрешения экранов
* подключены и настроены CSS стили, работа выполнена с использованием grid и flex верстки
* настроены всплывающие окна
* реализована работа с формами и их валидацией на стороне пользователя
* настроены fetch запросы к двум API (поиска новостей и сохранения новостей, регистрации, авторизации)
* подключен https протокол
* реализована быстрая авторизация через сохраняемый токен
* настроена работа с локальным хранилищем
* развернут проект CRA
* разметка портирована в JSX
* используются React Hooks
* настроена работа React Route
* подключен React Context
* использован hoc-компонент
