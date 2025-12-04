// components/screens/QuizScreen.tsx
"use client";

import { useTrivia } from "@/app/providers/TriviaProvider";
import { useQuestions } from "@/hooks/useQuestions";
import { useState } from "react";
import { Models_MultipleChoiceQuestion } from "../../../packages/QuestionAPI/src";
import QuestionCard from "@/components/QuestionCard/QuestionCard";
import { getPointsForDifficulty } from "@/utilities/scoring";
import FinishScreen from "../FinishScreen/FinishScreen";
export default function QuizScreen() {
  const { difficulty } = useTrivia();
  if (!difficulty) {
    throw new Error("Difficulty must be selected before starting the quiz.");
  }

  // Always at top level
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const { questions, loading, error } = useQuestions(difficulty, "General");

  // Early return for loading/error
  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>Failed to load questions: {error.message}</div>;
  if (!questions) return <div>No questions found.</div>;

  const currentQuestion = questions.questions[currentIndex];
  const isLast = currentIndex === questions.questions.length - 1;

  const handleNextQuestion = (wasCorrect: boolean) => {
    if (wasCorrect) {
      setScore(prev => prev + getPointsForDifficulty(difficulty));
    }
  };

  const handleNext = () => {
    if (isLast) {
      setFinished(true);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (finished) {
    return (
      <FinishScreen 
        score={score}
        totalQuestions={questions.questions.length}
        difficulty={difficulty}
        onDone={() => window.location.href = "/"}
      />
    );
  }

  return (
    <main style={{ padding: "1rem" }}>
      <h1>AI Trivia - {difficulty}</h1>
      <QuestionCard
        question={currentQuestion}
        onNext={handleNext}
        isLast={isLast}
        questionIndex={currentIndex + 1}
        totalQuestions={questions.questions.length}
        difficulty={difficulty}
        currentScore={score}
        onAnswer={(wasCorrect: boolean) => handleNextQuestion(wasCorrect)}
      />
    </main>
  );
}
