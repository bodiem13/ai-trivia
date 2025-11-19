"use client";

import { Button } from "@fluentui/react-components";
import { Models_MultipleChoiceQuestionDifficulty as Difficulty } from "../../../packages/QuestionAPI/src";
import styles from "./DifficultySelector.module.css";

interface Props {
  onSelect: (difficulty: Difficulty) => void;
}

export default function DifficultySelector({ onSelect }: Props) {
  return (
    <div className={styles.container}>
      <Button
        appearance="primary"
        size="large"
        onClick={() => onSelect(Difficulty.EASY)}
      >
        🟢 Easy
      </Button>

      <Button
        appearance="primary"
        size="large"
        onClick={() => onSelect(Difficulty.MEDIUM)}
      >
        🟡 Medium
      </Button>

      <Button
        appearance="primary"
        size="large"
        onClick={() => onSelect(Difficulty.HARD)}
      >
        🔴 Hard
      </Button>
    </div>
  );
}
