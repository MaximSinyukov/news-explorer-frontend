import React from 'react';
import './About.css';
import authorImage from '../../images/about__image.jpg'

function About() {
  return (
    <section className="about">
      <div className="about__photo-container"></div>
      <div className="about__text-container">
        <h2 className="about__title">Об авторе</h2>
        <p className="about__text">Приветствую, меня зовут Максим. Я окончил бакалавриат по специальности "прикладная математика", а в данный момент являюсь студентом курса веб-разработки в ЯндексПрактикуме. Во время обучения изучал и применял следующие инструменты и технологии: HTML5, CSS3, JavaScript, Git, React, JSX, основы серверной разработки с Node.js и Express.js.</p>
        <p className="about__text">Данное обучение помогло лучше раскрыть себя. Позволило смоделировать рабочие ситуации, научило самостоятельно находить их решения и задало темп для профессионального развития.</p>
      </div>
    </section>
  )
}

export default About;
