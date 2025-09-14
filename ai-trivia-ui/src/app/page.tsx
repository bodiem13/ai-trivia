"use client";

import HomePage from "@/pages/HomePage";
import MultipleChoiceQuestionPage from "@/pages/MultipleChoiceQuestionPage";
import { useState } from "react";

export default function Page() {
  const [gameState, setGameState] = useState<"home" | "quiz">("home");
  const [difficulty, setDifficulty] = useState<string | null>(null);

  if (gameState === "home") {
    return (
      <HomePage />
    );
  }

  if (gameState === "quiz") {
    return <MultipleChoiceQuestionPage /* pass difficulty here */ />;
  }

  return null;
}
