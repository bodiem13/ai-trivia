"use client";

import { useEffect, useState } from "react";
import { DefaultService, Models_MultipleChoiceQuestionSet } from '../../packages/QuestionAPI/src';
import QuestionList from "@/components/QuestionList";

export default function HomePage() {
  const [questions, setQuestions] = useState<Models_MultipleChoiceQuestionSet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const result = await DefaultService.listMultipleChoiceQuestions(); // 🚀 your backend call
        setQuestions(result);
      } catch (error) {
        console.error("Failed to fetch questions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <div>Loading questions...</div>;
  if (!questions) return <div>No questions found.</div>;

  return (
    <main style={{ padding: "1rem" }}>
      <h1>AI Trivia</h1>
      <QuestionList questionSet={questions ?? []} />
    </main>
  );
}
