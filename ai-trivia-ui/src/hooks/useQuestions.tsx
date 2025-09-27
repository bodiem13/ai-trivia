// hooks/useQuestions.ts
"use client";

import { useEffect, useState } from "react";
import { DefaultService, Models_MultipleChoiceQuestionDifficulty, Models_MultipleChoiceQuestionSet } from "../../packages/QuestionAPI/src";

export function useQuestions(difficulty?: Models_MultipleChoiceQuestionDifficulty) {
  const [questions, setQuestions] = useState<Models_MultipleChoiceQuestionSet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchQuestions = async () => {
      try {
        const result = await DefaultService.listMultipleChoiceQuestions({
          difficulty: difficulty ?? undefined,
        });
        console.log("Result of API call:", result);
        if (mounted) setQuestions(result);
      } catch (err) {
        if (mounted) setError(err as Error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchQuestions();
    return () => {
      mounted = false; // cleanup if unmounted
    };
  }, [difficulty]);

  return { questions, loading, error };
}
