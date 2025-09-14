// components/screens/QuizScreen.tsx
"use client";

import { useEffect, useState } from "react";
import QuestionList from "@/components/QuestionList";

import { useTrivia } from "@/app/providers/TriviaProvider";
import { DefaultService, Models_MultipleChoiceQuestionDifficulty, Models_MultipleChoiceQuestionSet } from "../../packages/QuestionAPI/src";

export default function QuizScreen() {
  const { difficulty } = useTrivia(); // 🎯 get chosen difficulty from context
  const [questions, setQuestions] = useState<Models_MultipleChoiceQuestionSet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // 👇 Example: assumes API can accept difficulty param
        const result = await DefaultService.listMultipleChoiceQuestions({
          difficulty: difficulty ?? undefined
        });
        setQuestions(result);
      } catch (error) {
        console.error("Failed to fetch questions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [difficulty]); // 🔄 refetch when difficulty changes

  if (loading) return <div>Loading questions...</div>;
  if (!questions) return <div>No questions found.</div>;

  return (
    <main style={{ padding: "1rem" }}>
      <h1>AI Trivia - {difficulty}</h1>
      <QuestionList questionSet={questions ?? []} />
    </main>
  );
}
