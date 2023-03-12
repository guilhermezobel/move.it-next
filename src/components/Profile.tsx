import { ChallengesContext } from '@/contexts/ChallengesContext';
import { useContext } from 'react';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengesContext)

  return(
    <div className={styles.profileContainer}>
      <img src="https://github.com/Guilherme-Zobel.png" alt="Guilherme Zobel" />
      <div>
        <strong>Guilherme Zobel</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}