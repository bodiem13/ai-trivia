"use client";

import { Button, Card, Text, Title2 } from "@fluentui/react-components";
import { getRank } from "@/utilities/scoring";
import styles from "./FinishScreen.module.css";
import { Models_MultipleChoiceQuestionDifficulty as Difficulty } from "../../../packages/QuestionAPI/src";
import { DIFFICULTY_CONFIG } from "@/config/difficultyConfig";

interface Props {
  score: number;
  totalQuestions: number;
  difficulty: Difficulty;
  onDone: () => void;
}

export default function FinishScreen({
  score,
  totalQuestions,
  difficulty,
  onDone,
}: Props) {
  const maxScore = totalQuestions === 0 ? 0 : totalQuestions * 
    (difficulty === DIFFICULTY_CONFIG.Easy.difficulty ? 1 : difficulty === DIFFICULTY_CONFIG.Medium.difficulty ? 2 : 4);

  const rank = getRank(score, totalQuestions, difficulty);
  const accuracy = Math.round((score / maxScore) * 100);

  return (
    <main className={styles.container}>
      <Card className={styles.card}>
        <Title2>🎉 Quiz Complete!</Title2>

        <div className={styles.summary}>
          <Text size={500} weight="semibold">
            Final Score: {score} / {maxScore}
          </Text>

          <Text>Difficulty: {difficulty}</Text>
          <Text>Accuracy: {accuracy}%</Text>
          <Text className={styles.rank}>Your Rank: {rank}</Text>

          <Text className={styles.leaderboardHint}>
            🏁 Leaderboards & Play Against Friends coming soon
          </Text>
        </div>

        <Button appearance="primary" onClick={onDone}>
          Done
        </Button>
      </Card>
    </main>
  );
}
