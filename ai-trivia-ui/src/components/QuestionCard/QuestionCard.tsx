"use client";

import {
  Card,
  CardHeader,
  CardFooter,
  Button,
  Text,
  RadioGroup,
  Radio,
  Field,
} from "@fluentui/react-components";
import {
  Checkmark20Regular,
  Dismiss20Regular,
  Trophy20Regular,
} from "@fluentui/react-icons";
import { useState } from "react";
import { Models_MultipleChoiceQuestion } from "../../../packages/QuestionAPI/src/models/Models_MultipleChoiceQuestion";
import styles from "./QuestionCard.module.css";
import { Models_MultipleChoiceQuestionDifficulty } from "../../../packages/QuestionAPI/src/models/Models_MultipleChoiceQuestionDifficulty";

type Props = {
  question: Models_MultipleChoiceQuestion;
  onNext: (isCorrect: boolean) => void;
  isLast: boolean;
  questionIndex: number;
  totalQuestions: number;
  difficulty: Models_MultipleChoiceQuestionDifficulty | null;
  currentScore: number;
  onAnswer: (wasCorrect: boolean) => void;
};

export default function QuestionCard({
  question,
  onNext,
  isLast,
  questionIndex,
  totalQuestions,
  difficulty,
  currentScore,
  onAnswer,
}: Props) {
  const [selectedId, setSelectedId] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const correctId = question.correctAnswer.id;
  const isCorrectAnswer = selectedId === correctId;

  const handleSubmit = () => {
    if (selectedId) {
      setSubmitted(true);
      const wasCorrect = selectedId === correctId;
      onAnswer(wasCorrect);  // notify parent QuizScreen
    }
  };


  const handleNext = () => {
    setSelectedId("");
    setSubmitted(false);
    onNext(isCorrectAnswer);
  };

  return (
    <Card className={styles.card}>
      {/* ✅ TOP STATUS BAR */}
      <div className={styles.topBar}>
        <Text size={300} weight="medium">
          Question {questionIndex + 1} of {totalQuestions}
        </Text>

        <div className={styles.topRight}>
          <span className={styles.difficultyBadge}>{difficulty}</span>

          <span className={styles.score}>
            <Trophy20Regular />
            {currentScore} pts
          </span>
        </div>
      </div>

      <CardHeader header={<Text weight="semibold">{question.question}</Text>} />

      <Field>
        <RadioGroup
          value={selectedId}
          onChange={(e, data) => setSelectedId(data.value)}
          disabled={submitted}
          className={styles.radioGroup}
        >
          {question.options.map(option => {
            const isSelected = selectedId === option.id;
            const isCorrect = submitted && option.id === correctId;
            const isWrong = submitted && isSelected && !isCorrect;

            const rowClass = isCorrect
              ? styles.correctRow
              : isWrong
              ? styles.wrongRow
              : styles.optionRow;

            return (
              <div key={option.id} className={rowClass}>
                <Radio
                  value={option.id}
                  className={styles.radioFullWidth}
                  label={
                    <div className={styles.labelRow}>
                      <span className={styles.labelText}>{option.text}</span>
                      <span className={styles.labelIcon}>
                        {submitted && isCorrect && <Checkmark20Regular />}
                        {submitted && isWrong && <Dismiss20Regular />}
                      </span>
                    </div>
                  }
                />
              </div>
            );
          })}
        </RadioGroup>
      </Field>

      <CardFooter>
        <div className={styles.footerButtons}>
          <Button
            appearance="primary"
            disabled={!selectedId || submitted}
            onClick={handleSubmit}
          >
            Submit
          </Button>

          <Button appearance="secondary" disabled={!submitted} onClick={handleNext}>
            {isLast ? "Finish" : "Next Question →"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
