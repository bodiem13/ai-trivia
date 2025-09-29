"use client";

import {
  Card,
  CardHeader,
  CardPreview,
  CardFooter,
  Button,
  Text,
  tokens,
} from "@fluentui/react-components";
import { Models_MultipleChoiceQuestion } from "../../packages/QuestionAPI/src/models/Models_MultipleChoiceQuestion";
import styles from "./QuestionCard.module.css";

type Props = {
  question: Models_MultipleChoiceQuestion;
  onSelect: (choice: string) => void;
  selectedId?: string | null;
  showNextQuestion: boolean;
  onNext: () => void;
  isLast: boolean;
};

export default function QuestionCard({
  question,
  onSelect,
  selectedId,
  showNextQuestion,
  onNext,
  isLast,
}: Props) {
  return (
    <Card className={styles.card}>
      <CardHeader header={<Text weight="semibold">{question.question}</Text>} />

      <CardPreview>
        <div className={styles.optionsContainer}>
          {question.options.map((option, idx) => {
            const isSelected = selectedId === option.id;
            const isCorrect = option.id === question.correctAnswer.id;

            let optionClass = styles.option;
            if (selectedId) {
              if (isCorrect) optionClass = `${styles.option} ${styles.correct}`;
              else if (isSelected) optionClass = `${styles.option} ${styles.wrong}`;
            }

            return (
              <Button
                key={idx}
                appearance="secondary"
                className={optionClass}
                onClick={() => onSelect(option.id)}
                disabled={!!selectedId}
              >
                {option.text}
              </Button>
            );
          })}
        </div>
      </CardPreview>

      <CardFooter className={styles.footer}>
        {showNextQuestion ? (
          <Button
            appearance="primary"
            onClick={onNext}
            disabled={!selectedId}
            className={styles.nextBtn}
          >
            {isLast ? "Finish" : "Next Question →"}
          </Button>
        ) : (
          <Text size={200} italic>
            Select your answer
          </Text>
        )}
      </CardFooter>
    </Card>
  );
}
