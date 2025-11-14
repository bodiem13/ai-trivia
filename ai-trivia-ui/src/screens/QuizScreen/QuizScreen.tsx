// components/screens/QuizScreen.tsx
"use client";

import { useTrivia } from "@/app/providers/TriviaProvider";
import { useQuestions } from "@/hooks/useQuestions";
import { useState } from "react";
import { Models_MultipleChoiceQuestion } from "../../../packages/QuestionAPI/src";
import QuestionCard from "@/components/QuestionCard";

export default function QuizScreen() {
  const { difficulty } = useTrivia();
  const { questions, loading, error } = useQuestions(difficulty ?? undefined);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>Failed to load questions: {error.message}</div>;
  if (!questions) return <div>No questions found.</div>;

  const isLast = currentIndex === questions.questions.length - 1;

  const currentQuestion: Models_MultipleChoiceQuestion = questions.questions[currentIndex];

  const handleNext = () => {
    if (isLast) {
      setFinished(true);
    }
    else{
      setCurrentIndex((i) => i + 1)
    }
  }

  if (finished) {
    return (
      <main style={{ padding: "1rem" }}>
        <h1>AI Trivia - {difficulty}</h1>
        <h2>🎉 You’ve finished the quiz!</h2>
        {/* Later: we can show score, summary, restart button, etc. */}
      </main>
    );
  }

  return (
    <main style={{ padding: "1rem" }}>
      <h1>AI Trivia - {difficulty}</h1>
      <QuestionCard 
        question={currentQuestion}
        onNext={handleNext}
        isLast={isLast}
      />
    </main>
  );
}
