import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookie from 'js-cookie';
import challenges from '../../challenges.json'
import { LevelUpModal } from '@/components/LevelUpModal';

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number; 
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}


interface ChallengesProviderProps {
  // ReactNode é quando o children é um componente React
  children: ReactNode
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState<any>(null);
  const [isLevelUpModal, setIsLvelUpModal] = useState(false)

  const experienceToNextLevel = Math.pow(((level + 1) * 4), 2);

  useEffect(() => {
    Notification.requestPermission
  }, [])

  useEffect(() => {
    Cookie.set('level', String(level));
    Cookie.set('currentExperience', String(currentExperience));
    Cookie.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setLevel(level + 1);
    setIsLvelUpModal(true);
  }

  function closeLevelUpModal() {
    setIsLvelUpModal(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/public_notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }
  
  const { amount } = activeChallenge;

  let finalExperience = currentExperience + amount;

  if (finalExperience > experienceToNextLevel) {
    finalExperience = finalExperience - experienceToNextLevel;
    levelUp()
  }

  setCurrentExperience(finalExperience);
  setActiveChallenge(null)
  setChallengesCompleted(challengesCompleted + 1)

}

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        closeLevelUpModal

      }}>
      {children}

      {isLevelUpModal && <LevelUpModal />}
    </ChallengesContext.Provider>

  )
}
