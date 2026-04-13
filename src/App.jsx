import { useMemo, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import { gradeGroups, gradeOrder } from './data/topics'
import HomePage from './pages/HomePage'
import TopicPage from './pages/TopicPage'
import styles from './App.module.css'

function App() {
  const [selectedGrade, setSelectedGrade] = useState('all')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const sortedGroups = useMemo(
    () =>
      [...gradeGroups].sort(
        (a, b) => gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade)
      ),
    []
  )

  return (
    <div className={styles.layout}>
      <Sidebar
        gradeGroups={sortedGroups}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className={styles.content}>
        <header className={styles.mobileHeader}>
          <button
            type="button"
            className={
              isSidebarOpen
                ? `${styles.burgerButton} ${styles.burgerButtonOpen}`
                : styles.burgerButton
            }
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Открыть навигацию"
            aria-expanded={isSidebarOpen}
            aria-controls="sidebar-nav"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <p>Навигация по темам</p>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                gradeGroups={sortedGroups}
                selectedGrade={selectedGrade}
                onSelectGrade={setSelectedGrade}
              />
            }
          />
          <Route path="/topics/:slug" element={<TopicPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
