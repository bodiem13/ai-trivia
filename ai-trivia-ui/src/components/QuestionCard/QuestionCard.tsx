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
import { Checkmark20Regular, Dismiss20Regular } from "@fluentui/react-icons";
import { useState } from "react";
import { Models_MultipleChoiceQuestion } from "../../../packages/QuestionAPI/src/models/Models_MultipleChoiceQuestion";
import styles from "./QuestionCard.module.css";

type Props = {
  question: Models_MultipleChoiceQuestion;
  onNext: () => void;
  isLast: boolean;
};

export default function QuestionCard({ question, onNext, isLast }: Props) {
  const [selectedId, setSelectedId] = useState<string>(""); // controlled
  const [submitted, setSubmitted] = useState(false);

  const correctId = question.correctAnswer.id;

  const handleSubmit = () => {
    if (selectedId) setSubmitted(true);
  };

  const handleNext = () => {
    setSelectedId("");
    setSubmitted(false);
    onNext();
  };

  return (
    <Card>
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

                      {/* show icon only after submit for clarity */}
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
