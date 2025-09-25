"use client";

import { Button, Title1, Body1, Card } from "@fluentui/react-components";
import { Models_MultipleChoiceQuestionDifficulty as Difficulty } from "../../../packages/QuestionAPI/src";
import styles from "./HomeScreen.module.css";

interface HomeScreenProps {
  selectDifficulty: (difficulty: Difficulty) => void;
}

export default function HomeScreen({ selectDifficulty }: HomeScreenProps) {
  return (
    <div className={styles.container}>
      <Title1 className={styles.title}>🎉 AI Trivia Challenge</Title1>
      <Body1 className={styles.subtitle}>
        Welcome! Test your knowledge, pick a difficulty, and see how far you can go.
      </Body1>

      <Card className={styles.categoryCard}>
        <h2 className={styles.categoryTitle}>Category: General Knowledge</h2>
        <p className={styles.categoryDesc}>A mix of fun facts from history, science, and culture.</p>
      </Card>

      <div className={styles.instructions}>
        <p>📜 How to Play:</p>
        <ul>
          <li>Pick a difficulty to start the quiz.</li>
          <li>Answer as many questions as you can.</li>
          <li>Try to beat your high score!</li>
        </ul>
      </div>

      <div className={styles.buttonRow}>
        <Button
          appearance="primary"
          size="large"
          className={styles.button}
          onClick={() => selectDifficulty(Difficulty.EASY)}
        >
          🟢 Easy
        </Button>
        <Button
          appearance="secondary"
          size="large"
          className={styles.button}
          onClick={() => selectDifficulty(Difficulty.MEDIUM)}
        >
          🟡 Medium
        </Button>
        <Button
          appearance="outline"
          size="large"
          className={styles.button}
          onClick={() => selectDifficulty(Difficulty.HARD)}
        >
          🔴 Hard
        </Button>
      </div>
    </div>
  );
}
