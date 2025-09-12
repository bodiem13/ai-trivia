"use client";

import QuestionCard from "./QuestionCard";
import { Models_MultipleChoiceQuestionSet } from "../../packages/QuestionAPI/src/models/Models_MultipleChoiceQuestionSet";

type Props = {
  questionSet: Models_MultipleChoiceQuestionSet;
};

export default function QuestionList({ questionSet }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {questionSet.questions.map((q) => (
        <QuestionCard key={q.id} question={q} />
      ))}
    </div>
  );
}
