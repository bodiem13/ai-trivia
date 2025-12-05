// hooks/useQuestions.ts
"use client";

import { useEffect, useState } from "react";
import {
  Models_MultipleChoiceQuestionDifficulty,
  Models_MultipleChoiceQuestionSet
} from "../../packages/QuestionAPI/src";

export function useQuestions(
  difficulty: Models_MultipleChoiceQuestionDifficulty
) {
  const [questions, setQuestions] = useState<Models_MultipleChoiceQuestionSet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {

    let mounted = true;

    const fetchQuestions = async () => {
      try {
        // Ensure proper protocol
        const cdnHost = process.env.NEXT_PUBLIC_CDN_ENDPOINT_HOSTNAME as string;

        const BASE = cdnHost.startsWith("http") ? cdnHost : `https://${cdnHost}`;

        // Format date folder: yyyy-MM-dd
        const today = new Date().toISOString().split("T")[0];

        // Determine file by difficulty; default to 'easy' if not provided
        const diff = difficulty?.toLowerCase() ?? "easy";
        const fileName = `${diff}.json`;

        // Build full path: <cdnHost>/<date>/<difficulty>.json
        const url = `${BASE}/questions/${today}/${fileName}`;

        const res = await fetch(url, { cache: "no-store" });

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
  }, [difficulty]);

  return { questions, loading, error };
}
