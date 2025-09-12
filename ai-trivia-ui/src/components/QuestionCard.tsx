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
};

export default function QuestionCard({ question }: Props) {
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
          {question.options.map((option, idx) => (
            <Button
              key={idx}
              appearance="secondary"
              style={{ justifyContent: "flex-start" }}
            >
              {option.text}
            </Button>
          ))}
        </div>
      </CardPreview>

      <CardFooter>
        <Text size={200} italic>
          Select your answer
        </Text>
      </CardFooter>
    </Card>
  );
}
