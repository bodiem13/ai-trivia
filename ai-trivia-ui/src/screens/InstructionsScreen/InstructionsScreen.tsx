"use client";

import { Button, Title2, Body1 } from "@fluentui/react-components";
import styles from "./InstructionsScreen.module.css";

interface Props {
  onBack: () => void;
}

export default function InstructionsScreen({ onBack }: Props) {
  return (
    <div className={styles.container}>
      <Title2 className={styles.title}>📜 How to Play</Title2>

      <div className={styles.box}>
        <Body1>🗓️ Play once per day — 4 questions per day.</Body1>
        <Body1>📚 Categories are random: History, Science, Pop Culture, etc.</Body1>
        <Body1>🎯 Pick difficulty: Easy, Medium, Hard.</Body1>
        <Body1>🤖 First 3 questions are trivia, 4th is a fun AI opinion question.</Body1>

        <div className={styles.scoringBox}>
          <Body1><strong>Scoring per question:</strong> 
            <span className={styles.green}> 🟢 Easy 1</span> | 
            <span className={styles.yellow}> 🟡 Medium 2</span> | 
            <span className={styles.red}> 🔴 Hard 4</span>
          </Body1>
        </div>
      </div>

      <Button appearance="secondary" size="medium" className={styles.backButton} onClick={onBack}>
        Back
      </Button>
    </div>
  );
}
