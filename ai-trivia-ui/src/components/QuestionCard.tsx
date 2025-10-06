"use client";

import {
  Card,
  CardHeader,
  CardPreview,
  CardFooter,
  Button,
  Text,
} from "@fluentui/react-components";
import { useState } from "react";
import { Models_MultipleChoiceQuestion } from "../../packages/QuestionAPI/src/models/Models_MultipleChoiceQuestion";
import styles from "./QuestionCard.module.css";

type Props = {
  question: Models_MultipleChoiceQuestion;
  onNext: () => void;
  isLast: boolean;
};

export default function QuestionCard({ question, onNext, isLast }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (choiceId: string) => {
    if (!submitted) setSelectedId(choiceId);
  };

  const handleSubmit = () => {
    if (selectedId) setSubmitted(true);
  };

  const handleNext = () => {
    setSelectedId(null);
    setSubmitted(false);
    onNext();
  };

  return (
    <Card className={styles.card}>
      <CardHeader header={<Text weight="semibold">{question.question}</Text>} />

      <CardPreview>
        <div className={styles.optionsContainer}>
          {question.options.map((option) => {
            const isSelected = selectedId === option.id;
            const isCorrect = option.id === question.correctAnswer.id;

            let optionClass = styles.option;
            if (submitted) {
              if (isCorrect) optionClass = `${styles.option} ${styles.correct}`;
              else if (isSelected && !isCorrect)
                optionClass = `${styles.option} ${styles.wrong}`;
            } else if (isSelected) {
              optionClass = `${styles.option} ${styles.selected}`;
            }

            return (
              <Button
                key={option.id}
                appearance="secondary"
                className={optionClass}
                onClick={() => handleSelect(option.id)}
                disabled={submitted}
              >
                {option.text}
              </Button>
            );
          })}
        </div>
      </CardPreview>

      <CardFooter className={styles.footer}>
        <div className={styles.footerButtons}>
          <Button
            appearance="primary"
            disabled={!selectedId || submitted}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            appearance="secondary"
            disabled={!submitted}
            onClick={handleNext}
          >
            {isLast ? "Finish" : "Next Question →"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
