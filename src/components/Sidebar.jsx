import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'

function Sidebar({ gradeGroups, isOpen, onClose }) {
  const sidebarClassName = isOpen ? `${styles.sidebar} ${styles.open}` : styles.sidebar

  return (
    <>
      <button
        type="button"
        aria-label="Закрыть навигацию"
        className={isOpen ? `${styles.overlay} ${styles.overlayVisible}` : styles.overlay}
        onClick={onClose}
      ></button>

      <aside className={sidebarClassName}>
        <div className={styles.brandRow}>
          <div className={styles.brand}>
            <p className={styles.brandSub}>Тематическое пособие</p>
            <h1>Информатика</h1>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Закрыть боковую панель"
          >
            ×
          </button>
        </div>

        <nav id="sidebar-nav" aria-label="Навигация по темам">
          {gradeGroups.map((group) => (
            <section className={styles.group} key={group.grade}>
              <h2>{group.grade}</h2>
              <ul>
                {group.topics.map((topic) => (
                  <li key={topic.slug}>
                    <NavLink
                      to={`/topics/${topic.slug}`}
                      className={({ isActive }) =>
                        isActive ? `${styles.topicLink} ${styles.active}` : styles.topicLink
                      }
                      onClick={onClose}
                    >
                      {topic.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
