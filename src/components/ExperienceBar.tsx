import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
  return (
    <header className={styles.experienceBar}>
      <span>8 xp</span>
      <div>
        {/* este estilo abaixo está sendo definido em inline, porque não é algo que vai cotinuar sempre igual */}
        <div style={{ width: '50%'}} /> 
        <span className={styles.currentExperience} style={{ left: '50%' }}>300 xp</span>
      </div>
      <span>800 xp</span>
    </header>
  )
}