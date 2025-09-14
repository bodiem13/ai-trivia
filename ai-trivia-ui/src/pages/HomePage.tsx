"use client";

import { useRouter } from "next/navigation";
import { Button, Title1, Body1 } from "@fluentui/react-components";
import { useTrivia } from "@/app/providers/TriviaProvider";
import { Models_MultipleChoiceQuestionDifficulty as Difficulty } from "../../packages/QuestionAPI/src";

export default function HomePage() {
  const router = useRouter();
  const { setDifficulty } = useTrivia();

  const selectDifficulty = (difficulty: Difficulty) => {
    setDifficulty(difficulty);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6">
      <Title1>🎉 Welcome to AI Trivia!</Title1>
      <Body1>Choose your difficulty to get started:</Body1>

      <div className="flex gap-4 mt-6">
        <Button appearance="secondary" onClick={() => selectDifficulty(Difficulty.EASY)}>
          Easy
        </Button>
        <Button appearance="secondary" onClick={() => selectDifficulty(Difficulty.MEDIUM)}>
          Medium
        </Button>
        <Button appearance="secondary" onClick={() => selectDifficulty(Difficulty.HARD)}>
          Hard
        </Button>
      </div>
    </div>
  );
}
