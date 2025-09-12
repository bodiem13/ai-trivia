'use client';

import { Models_MultipleChoiceQuestionSet } from "../../packages/QuestionAPI/src/models/Models_MultipleChoiceQuestionSet";
import { Models_MultipleChoiceQuestion } from "../../packages/QuestionAPI/src/models/Models_MultipleChoiceQuestion";
import { Models_MultipleChoiceQuestionType } from "../../packages/QuestionAPI/src/models/Models_MultipleChoiceQuestionType";
import QuestionList from "@/components/QuestionList";

// Temporary mock data for testing
const mockQuestions: Models_MultipleChoiceQuestionSet = {
  questions: [
    {
      id: "1",
      question: "What is 2+2?",
      options: [
        { id: "A", text: "3" },
        { id: "B", text: "4" },
        { id: "C", text: "5" },
        { id: "D", text: "6" },
      ],
      correctAnswer: { id: "B", text: "4" },
      type: Models_MultipleChoiceQuestionType.STANDARD,
    },
    {
      id: "2",
      question: "Capital of France?",
      options: [
        { id: "A", text: "Berlin" },
        { id: "B", text: "Madrid" },
        { id: "C", text: "Paris" },
        { id: "D", text: "Rome" },
      ],
      correctAnswer: { id: "C", text: "Paris" },
      type: Models_MultipleChoiceQuestionType.STANDARD,
    },
  ]
};

export default function Page() {
  return (
    <main style={{ padding: "1rem" }}>
      <h1>Trivia Game</h1>
      <QuestionList questionSet={mockQuestions} />
    </main>
  );
}
