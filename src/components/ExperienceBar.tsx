import { ChallengesContext } from '@/contexts/ChallengesContext'
import { useContext } from 'react'

import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext)

  const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        {/* este estilo abaixo está sendo definido em inline, porque não é algo que vai cotinuar sempre igual */}
        <div style={{ width: `${percentToNextLevel}%`}} /> 
        <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
          {currentExperience}
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  )
}