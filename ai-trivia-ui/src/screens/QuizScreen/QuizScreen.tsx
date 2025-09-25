// components/screens/QuizScreen.tsx
"use client";

import { useTrivia } from "@/app/providers/TriviaProvider";
import { useQuestions } from "@/hooks/useQuestions";
import QuestionList from "@/components/QuestionList";

export default function QuizScreen() {
  const { difficulty } = useTrivia();
  const { questions, loading, error } = useQuestions(difficulty ?? undefined);

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>Failed to load questions: {error.message}</div>;
  if (!questions) return <div>No questions found.</div>;

  return (
    <main style={{ padding: "1rem" }}>
      <h1>AI Trivia - {difficulty}</h1>
      <QuestionList questionSet={questions} />
    </main>
  );
}
