"use client";

import { useState, ReactNode } from "react";
import './globals.css';
import styles from "./page.module.css";

import { Models_MultipleChoiceQuestionDifficulty as Difficulty } from "../../packages/QuestionAPI/src";
import HomeScreen from "@/screens/HomeScreen/HomeScreen";
import QuizScreen from "@/screens/QuizScreen/QuizScreen";
import { useTrivia } from "./providers/TriviaProvider";

interface AppContainerProps {
  children: ReactNode;
}

function AppContainer({ children }: AppContainerProps) {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default function Page() {
  const [gameState, setGameState] = useState<"home" | "quiz">("home");
  const { setDifficulty } = useTrivia();

  const selectDifficulty = (selected: Difficulty) => {
    setDifficulty(selected);
    setGameState("quiz"); // flips the view to quiz
  };

  return (
    <AppContainer>
      {gameState === "home" && <HomeScreen selectDifficulty={selectDifficulty} />}
      {gameState === "quiz" && <QuizScreen />}
    </AppContainer>
  );
}
