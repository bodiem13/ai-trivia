"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { Models_MultipleChoiceQuestionDifficulty as Difficulty } from "../../packages/QuestionAPI/src";
import HomeScreen from "@/screens/HomeScreen/HomeScreen";
import QuizScreen from "@/screens/QuizScreen/QuizScreen";
import { useTrivia } from "./providers/TriviaProvider";


export default function Page() {
  const [gameState, setGameState] = useState<"home" | "quiz">("home");
  const { setDifficulty } = useTrivia();

  const selectDifficulty = (selected: Difficulty) => {
    setDifficulty(selected);
    setGameState("quiz"); // 🚀 this flips the view to quiz
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        {gameState === "home" && <HomeScreen selectDifficulty={selectDifficulty} />}
        {gameState === "quiz" && (
          <QuizScreen />
        )}
      </div>
    </div>
  );
}
