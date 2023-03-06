import { ExperienceBar } from '@/components/ExperienceBar'
import { Profile } from '@/components/Profile'
import { Inter } from 'next/font/google'
import styles from '../styles/pages/Home.module.css'
import Head from 'next/head'
import { CompletedChallenges } from '@/components/CompletedChallenges'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={styles.container}>
      <ExperienceBar />

      <section>
        <div>
          <Profile />
          <CompletedChallenges />
        </div>
        <div>

        </div>
      </section>
    </div>
  )
}