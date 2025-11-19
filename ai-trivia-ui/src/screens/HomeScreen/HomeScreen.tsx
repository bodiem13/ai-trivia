"use client";

import { useState, useEffect } from "react";
import styles from "./HomeScreen.module.css";

import HomeHeader from "../../components/HomeHeader/HomeHeader";
import HomeFooter from "../../components/HomeFooter/HomeFooter";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import DifficultySelector from "../../components/DifficultySelector/DifficultySelector";
import InstructionsScreen from "../InstructionsScreen/InstructionsScreen";

import { Models_MultipleChoiceQuestionDifficulty as Difficulty } from "../../../packages/QuestionAPI/src";

interface HomeScreenProps {
  selectDifficulty: (difficulty: Difficulty) => void;
}

export default function HomeScreen({ selectDifficulty }: HomeScreenProps) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [timeUntilNextDay, setTimeUntilNextDay] = useState<string>("");

  // Timer until next day (midnight)
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const nextMidnight = new Date();
      nextMidnight.setHours(24, 0, 0, 0);
      const diff = nextMidnight.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeUntilNextDay(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  if (showInstructions) {
    return <InstructionsScreen onBack={() => setShowInstructions(false)} />;
  }

  return (
    <div className={styles.container}>
      <HomeHeader />

      <div className={styles.mainContent}>
        <CategoryCard
          title="Today's Category: General Knowledge"
          description="A mix of fun facts from history, science, and culture."
        />

        <div className={styles.timer}>
          ⏰ Next quiz in: {timeUntilNextDay}
        </div>

        <DifficultySelector onSelect={selectDifficulty} />
      </div>

      {/* Footer for instructions and future actions */}
      <HomeFooter onShowInstructions={() => setShowInstructions(true)} />
    </div>
  );
}
