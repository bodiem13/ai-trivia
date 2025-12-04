// hooks/useQuestions.ts
"use client";

import { useEffect, useState } from "react";
import {
  Models_MultipleChoiceQuestionDifficulty,
  Models_MultipleChoiceQuestionSet
} from "../../packages/QuestionAPI/src";

export function useQuestions(
  cdnHost: string,
  difficulty?: Models_MultipleChoiceQuestionDifficulty
) {
  const [questions, setQuestions] = useState<Models_MultipleChoiceQuestionSet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!cdnHost) {
      setError(new Error("CDN host is missing"));
      setLoading(false);
      return;
    }

    let mounted = true;

    const fetchQuestions = async () => {
      try {
        // Normalize host → full URL
        const BASE = cdnHost.startsWith("http")
          ? cdnHost
          : `https://${cdnHost}`;

        const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
        const fileName = difficulty
          ? `questions-${difficulty.toLowerCase()}.json`
          : `questions.json`;

        const url = `${BASE}/questions/${today}/${fileName}`;

        const res = await fetch(url, {
          cache: "no-store"
        });

        if (!res.ok) {
          throw new Error(`CDN fetch failed: ${res.status}`);
        }

        const data: Models_MultipleChoiceQuestionSet = await res.json();

        if (mounted) setQuestions(data);

      } catch (err) {
        if (mounted) setError(err as Error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchQuestions();

    return () => {
      mounted = false;
    };
  }, [cdnHost, difficulty]);

  return { questions, loading, error };
}
