import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

function HomePage({ gradeGroups, selectedGrade, onSelectGrade }) {
  const visibleGroups =
    selectedGrade === 'all'
      ? gradeGroups
      : gradeGroups.filter((group) => group.grade === selectedGrade)

  return (
    <div className={styles.homePage}>
      <header className={styles.hero}>
        <p className={styles.kicker}>Школьный курс информатики</p>
        <h2>Маршрут по темам с 1 по 11 класс</h2>
        <p>
          Выберите класс и откройте тему. Каждая тема оформлена на отдельной странице с
          объяснением, ключевыми понятиями и мини-практикой.
        </p>
      </header>

      <section className={styles.tabsWrap} aria-label="Фильтр по классам">
        <button
          type="button"
          onClick={() => onSelectGrade('all')}
          className={selectedGrade === 'all' ? styles.tabActive : styles.tab}
        >
          Все классы
        </button>
        {gradeGroups.map((group) => (
          <button
            type="button"
            key={group.grade}
            onClick={() => onSelectGrade(group.grade)}
            className={selectedGrade === group.grade ? styles.tabActive : styles.tab}
          >
            {group.grade}
          </button>
        ))}
      </section>

      {visibleGroups.map((group) => (
        <section key={group.grade} className={styles.gradeBlock}>
          <h3>{group.grade}</h3>
          <div className={styles.grid}>
            {group.topics.map((topic, idx) => (
              <Link key={topic.slug} to={`/topics/${topic.slug}`} className={styles.card}>
                <span className={styles.index}>{String(idx + 1).padStart(2, '0')}</span>
                <h4>{topic.title}</h4>
                <p>{topic.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default HomePage
