import ReactMarkdown from 'react-markdown'
import { Link, useParams } from 'react-router-dom'
import { allTopics, topicMap } from '../data/topics'
import styles from './TopicPage.module.css'

const markdownModules = import.meta.glob('../content/topics/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
})

const markdownBySlug = Object.fromEntries(
  Object.entries(markdownModules).map(([modulePath, markdown]) => {
    const fileName = modulePath.split('/').pop() || ''
    const slug = fileName.replace('.md', '')
    return [slug, markdown]
  })
)

function withInteractiveTooltips(markdownText) {
  return markdownText.replace(
    /\[\{([^\]|{}]+)\}\|([^\]]+)\]/g,
    (_, label, tip) => `[${label}](# "${tip.replace(/"/g, '&quot;')}")`
  )
}

function TopicPage() {
  const { slug } = useParams()
  const topic = topicMap[slug]
  const markdownSource = markdownBySlug[slug]

  if (!topic) {
    return (
      <section className={styles.notFound}>
        <h2>Тема не найдена</h2>
        <p>Проверьте ссылку или вернитесь к списку всех разделов.</p>
        <Link to="/" className={styles.backLink}>
          Вернуться на главную
        </Link>
      </section>
    )
  }

  const currentIndex = allTopics.findIndex((item) => item.slug === topic.slug)
  const nextTopic = allTopics[currentIndex + 1]
  const parsedMarkdown = withInteractiveTooltips(
    markdownSource || `# ${topic.title}\n\nМатериал для этой темы пока не добавлен.`
  )

  return (
    <article className={styles.topicPage}>
      <p className={styles.grade}>{topic.grade}</p>
      <div className={styles.markdownBody}>
        <ReactMarkdown
          components={{
            a: ({ href, title, children }) => {
              if (href === '#' && title) {
                return (
                  <span className={styles.tooltipTarget} tabIndex={0} data-tip={title}>
                    {children}
                  </span>
                )
              }

              return (
                <a href={href} title={title} target="_blank" rel="noreferrer">
                  {children}
                </a>
              )
            }
          }}
        >
          {parsedMarkdown}
        </ReactMarkdown>
      </div>

      <div className={styles.navigation}>
        <Link to="/" className={styles.backLink}>
          Все темы
        </Link>
        {nextTopic ? (
          <Link className={styles.nextLink} to={`/topics/${nextTopic.slug}`}>
            Следующая тема: {nextTopic.title}
          </Link>
        ) : (
          <span className={styles.doneLabel}>Это последняя тема программы.</span>
        )}
      </div>
    </article>
  )
}

export default TopicPage
