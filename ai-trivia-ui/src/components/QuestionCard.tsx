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

type Props = {
  question: Models_MultipleChoiceQuestion;
  onSelect: (choice: string) => void;
  selectedId? : string | null;
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
  isLast }: Props) {
  return (
    <Card
      style={{
        marginBottom: "1rem",
        padding: "1rem",
        borderRadius: tokens.borderRadiusLarge,
      }}
    >
      <CardHeader
        header={<Text weight="semibold">{question.question}</Text>}
      />

      <CardPreview>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {question.options.map((option, idx) => {
            let customStyle: React.CSSProperties = { justifyContent: "flex-start" };

            if (selectedId) {
              if (option.id === question.correctAnswer.id) {
                customStyle = { ...customStyle, border: "2px solid green" };
              } else if (option.id === selectedId && option.id !== question.correctAnswer.id) {
                customStyle = { ...customStyle, border: "2px solid red" };
              }
            }

            return (
              <Button
              key={idx}
              appearance="secondary"
              style={customStyle}
              onClick={() => onSelect(option.id)}
              disabled={!!selectedId}
            >
              {option.text}
            </Button>
            )
          }
          )}
        </div>
      </CardPreview>

      <CardFooter>
        {showNextQuestion ? (
          <Button appearance="primary" onClick={onNext} disabled={!selectedId}>
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
